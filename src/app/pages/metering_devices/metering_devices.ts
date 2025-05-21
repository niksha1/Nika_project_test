import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Api_metering_devises } from '../../api/api_metering_devises';
import { MeteringDevicesPaginationComponent } from './metering-devices-pagination/metering-devices-pagination.component';
import { MeteringDevicesSearch } from './metering_devices_search/metering-devices-search';

@Component({
  selector: 'app_metering_devices',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MeteringDevicesPaginationComponent,
    MeteringDevicesSearch,
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
  sortDirection: 'asc' | 'desc' = 'desc';
  sortStates: { [key: string]: 'asc' | 'desc' } = {};

  constructor(public apiService: Api_metering_devises) {
    this.sortStates = {
      id: 'desc',
      name: 'asc',
      last_active: 'desc',
    };
  }

  ngOnInit(): void {
    this.apiService.tableDevices();
  }

  sortBy(field: string): void {
    if (this.sortField !== field) {
      this.sortField = field;
      this.sortDirection = this.sortStates[field];
    } else {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.sortStates[field] = this.sortDirection;
    }
    this.apiService.sortField = field;
    this.currentPage = 1;
    this.apiService.tableDevices();
    this.apiService.sort = this.sortDirection;
  }
}
