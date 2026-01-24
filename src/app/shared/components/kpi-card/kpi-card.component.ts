import { Component, input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [],
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss'],
})
export class KpiCardComponent {
  title = input<string>('');
  value = input<string | number>('');
  icon = input<string>('');
  subtitle = input<string>('');
}
