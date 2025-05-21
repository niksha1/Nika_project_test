import { Component, Injectable } from '@angular/core';
import { Api_metering_devises } from '../../../api/api_metering_devises';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app_metering_devices_search',
  standalone: true,
  templateUrl: './metering_devices_search.html',
  styleUrls: ['./metering_devices_search.css'],
  imports: [FormsModule],
})
@Injectable({
  providedIn: 'root',
})
export class MeteringDevicesSearch {
  searchQuery: string = '';

  constructor(protected apiService: Api_metering_devises) {}

  onSearch(): void {
    this.apiService.setSearchString(this.searchQuery);
  }
}
