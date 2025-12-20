import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GovHeader } from './shared/components/gov-header/gov-header'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GovHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('vlab-frontend-frota-gerencial');
}
