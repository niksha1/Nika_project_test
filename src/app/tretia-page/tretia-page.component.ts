import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Изменено с RouterLink на Router
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface AuthResponse {
  // Добавлен интерфейс для типизации ответа
  data: {
    access_token: string;
  };
  // другие поля ответа, если есть
}

@Component({
  selector: 'app-tretia-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule], // RouterModule вместо RouterLink
  templateUrl: './tretia-page.component.html',
  styleUrls: ['./tretia-page.component.css'],
})
export class TretiaPageComponent {
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private http: HttpClient,
    private router: Router, // Правильный сервис для навигации
  ) {}

  onSubmit() {
    if (this.profileForm.invalid) return;

    const requestBody = {
      email: this.profileForm.value.email!,
      password: this.profileForm.value.password!,
      //agreeToDataProcessing: true,
    };

    this.http
      .post<AuthResponse>(
        'https://core.nekta.cloud/api/auth/login',
        requestBody,
      )
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.data.access_token);
          this.router.navigate(['./metering_devices']).catch((err) => {}); // Правильный синтаксис navigate
        },
        error: (err) => {
          console.error('Ошибка запроса:', err);
          alert('Неверные данные для входа');
        },
      });
  }
}
