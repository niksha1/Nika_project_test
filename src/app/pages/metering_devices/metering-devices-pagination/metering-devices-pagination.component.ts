import { Component } from '@angular/core';
import { Api_metering_devises } from '../../../api/api_metering_devises';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs'; // interface iDevice {

// interface iDevice {
//   id: number;
//   name: string;
//   last_active?: number;
// }

@Component({
  selector: 'app-metering-devices-pagination',
  imports: [AsyncPipe],
  templateUrl: './metering-devices-pagination.component.html',
  standalone: true,
  styleUrl: './metering-devices-pagination.component.css',
})
export class MeteringDevicesPaginationComponent {
  currentPage: number = 1;

  constructor(protected apiService: Api_metering_devises) {}

  last_page = of(0);

  ngOnInit(): void {
    this.apiService.tableDevices(this.currentPage);
    this.last_page = this.apiService.lastPage$;
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
