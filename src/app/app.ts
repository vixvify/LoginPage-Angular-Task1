import { Component, signal } from '@angular/core';
import { LoginPage } from './pages/login/login.page';

@Component({
  selector: 'app-root',
  imports: [LoginPage],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('angular-task1');
}
