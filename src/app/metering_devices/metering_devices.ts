import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateTime } from 'luxon';

interface Device {
  id: number;
  name: string;
  last_active?: number; // Указываем, что это число (Unix Timestamp)
}

@Component({
  selector: 'app_metering_devices',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './metering_devices.html',
  styleUrls: ['./metering_devices.css'],
})
@Injectable({
  providedIn: 'root',
})
export class Metering_devices {
  devices: Device[] = [];

  apiUrl = 'https://core.nekta.cloud/api/device/metering_devices';

  constructor(private http: HttpClient) {}

  getDevices() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}` || '',
    });

    const body = {
      page: 1,
      last_page: 0,
      sort_field: 'id',
      sort: 'desc',
      search_string: null,
      device_state: 'all',
      is_archived: false,
      paginate: true,
      append_fields: ['active_polling', 'attributes', 'tied_point'],
      per_page: 10,
    };
    this.http.post(this.apiUrl, body, { headers }).subscribe({
      next: (response: any) => {
        // Предполагаем, что массив устройств в response.data
        this.devices = response.data.metering_devices.data.map(
          (device: any) => ({
            ...device,
            last_active: device.last_active
              ? DateTime.fromSeconds(device.last_active).toFormat(
                  'dd.MM.yyyy HH:mm',
                )
              : undefined,
          }),
        ); // Проверь структуру ответа API
        console.log(response.data);
      },
      error: (error) => {
        console.error('Ошибка при загрузке устройств:', error);
      },
    });
  }

  //devices: any[] = []; // Массив для хранения устройств

  ngOnInit(): void {
    this.getDevices();
  }
}
