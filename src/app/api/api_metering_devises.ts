import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

interface iDevice {
  id: number;
  name: string;
  last_active?: number;
  total: number;
}

interface iMeteringDevicesResponse {
  data: iDevice[];
  last_page: number;
  total: number;
}

interface iBodyGetMeteringDevice {
  page: number;
  last_page: number;
  sort_field: string;
  sort: string;
  search_string: string | null;
  device_state: string;
  is_archived: boolean;
  paginate: boolean;
  append_fields: string[];
  per_page: number;
}

const defaultBody: iBodyGetMeteringDevice = {
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

@Injectable({
  providedIn: 'root',
})
export class Api_metering_devises {
  public lastPage: number = 0;
  public lastPage$ = new BehaviorSubject<number>(0);

  private apiUrl = 'https://core.nekta.cloud/api/device/metering_devices';
  devices: iDevice[] = [];
  currentPage: number = 1;

  sortField: string = 'id';
  sort: 'asc' | 'desc' = 'desc';

  constructor(private http: HttpClient) {}

  private currentSearchString: string = ''; // Обычная переменная для хранения текущего значения
  private searchStringSubject = new BehaviorSubject<string>(''); // Для реактивных подписок

  setSearchString(search: string) {
    this.currentSearchString = search;
    this.searchStringSubject.next(search);
    this.tableDevices(1); // Сбрасываем на первую страницу при новом поиске
    console.log(this.searchStringSubject);
  }

  getDevices(params: Partial<iBodyGetMeteringDevice> = {}): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}` || '',
    });
    const body: iBodyGetMeteringDevice = {
      ...defaultBody,
      ...params,
      search_string: this.currentSearchString || null,
    };
    return this.http.post(this.apiUrl, body, { headers });
  }

  tableDevices(page: number = 1): void {
    this.currentPage = page;
    this.getDevices({
      page: this.currentPage,
      sort_field: this.sortField,
      sort: this.sort,
    }).subscribe({
      next: (response: any) => {
        const lastPage = response.data.metering_devices.last_page;
        this.lastPage$.next(lastPage);
        this.devices = response.data.metering_devices.data.map(
          (device: iDevice) => ({
            ...device,
            last_active: device.last_active
              ? DateTime.fromSeconds(device.last_active).toFormat(
                  'dd.MM.yyyy HH:mm',
                )
              : undefined,
          }),
        );
      },
      error: (error) => {
        console.error('Ошибка при загрузке устройств:', error);
      },
    });
  }
}
