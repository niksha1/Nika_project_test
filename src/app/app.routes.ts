import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page';

export const routes: Routes = [
  {
    path: 'first-page',
    component: FirstPageComponent
  },
  {
    path: 'second-page',
    component: SecondPageComponent
  },
  {
    path: '',
    redirectTo: '',  // Исправлено!
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// Убедитесь, что НЕТ дублирования `routes`!
