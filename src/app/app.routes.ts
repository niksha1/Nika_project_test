import { ApplicationConfig, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page';
import { TretiaPageComponent } from './tretia-page/tretia-page.component';
import { provideHttpClient } from '@angular/common/http';
import { Metering_devices } from './metering_devices/metering_devices';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Добавляем HTTP-клиент
  ],
};
export const routes: Routes = [
  {
    path: 'first-page',
    component: FirstPageComponent,
  },
  {
    path: 'second-page',
    component: SecondPageComponent,
  },
  {
    path: 'tretia-page',
    component: TretiaPageComponent,
  },
  {
    path: 'metering_devices',
    component: Metering_devices,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// Убедитесь, что НЕТ дублирования `routes`!
