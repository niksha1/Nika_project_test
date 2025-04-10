import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://core.nekta.cloud/api/auth/login';

  constructor(private http: HttpClient) {}

  login(
    email: string,
    password: string,
    personalDataAccess: boolean,
  ): Observable<any> {
    return this.http.post(this.apiUrl, {
      email,
      password,
      personal_data_access: personalDataAccess,
    });
  }
}
