import { Component } from '@angular/core';
import { Api_metering_devises } from '../../../api/api_metering_devises';

interface iDevice {
  id: number;
  name: string;
  last_active?: number;
}

@Component({
  selector: 'app-metering-devices-pagination',
  imports: [],
  templateUrl: './metering-devices-pagination.component.html',
  standalone: true,
  styleUrl: './metering-devices-pagination.component.css',
})
export class MeteringDevicesPaginationComponent {
  currentPage: number = 1;

  constructor(private apiService: Api_metering_devises) {}

  ngOnInit(): void {
    this.apiService.tableDevices(this.currentPage);
  }

  paginationNextPage(): void {
    this.apiService.tableDevices(1 + this.currentPage);
    this.currentPage += 1;
  }

  paginationPrevPage(): void {
    if (this.currentPage > 1) {
      this.apiService.tableDevices(this.currentPage - 1);
      this.currentPage -= 1;
    }
  }
}
