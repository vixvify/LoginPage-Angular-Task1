import { Component, signal } from '@angular/core';
import { LoginMainPage } from './login/pages/login-main/login-main.page';

@Component({
  selector: 'app-root',
  imports: [LoginMainPage],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('angular-task1');
}
