import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TuiRoot} from '@taiga-ui/core';
import {TuiTabBar} from '@taiga-ui/addon-mobile';
import {TuiButton} from '@taiga-ui/core';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'untitled2';
}

