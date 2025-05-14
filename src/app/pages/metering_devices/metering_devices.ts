import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Api_metering_devises } from '../../api/api_metering_devises';
import { MeteringDevicesPaginationComponent } from './metering-devices-pagination/metering-devices-pagination.component';

interface iDevice {
  id: number;
  name: string;
  last_active?: number;
}

@Component({
  selector: 'app_metering_devices',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MeteringDevicesPaginationComponent,
  ],
  templateUrl: './metering_devices.html',
  styleUrls: ['./metering_devices.css'],
})
@Injectable({
  providedIn: 'root',
})
export class Metering_devices {
  currentPage: number = 1;
  sortField: string = 'id';
  sort: 'asc' | 'desc' = 'desc';

  constructor(public apiService: Api_metering_devises) {}

  ngOnInit(): void {
    this.apiService.tableDevices();
  }

  sortBy(field: string): void {
    if (this.sortField === field) {
      //this.apiService.sortField = field;
      this.apiService.sort = this.sort === 'asc' ? 'desc' : 'asc';
      console.log(field);
    } else {
      //this.apiService.sortField = field;
      this.sort = 'asc';
    }
    this.apiService.sortField = field;
    this.currentPage = 1; // Сбрасываем страницу
    this.apiService.tableDevices();
    //console.log(field);
  }
}
