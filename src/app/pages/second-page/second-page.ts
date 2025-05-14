// first-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true, // Важно для Standalone!
  imports: [CommonModule],
  template: `<h1>Второй список</h1>`
})
export class SecondPageComponent {}
