import { Component, signal } from '@angular/core';
import { FormComponent } from './components/form.component/form.component';
import { BackgroundComponent } from './components/background.component/background.component';

@Component({
  selector: 'app-root',
  imports: [FormComponent, BackgroundComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('angular-task1');
}
