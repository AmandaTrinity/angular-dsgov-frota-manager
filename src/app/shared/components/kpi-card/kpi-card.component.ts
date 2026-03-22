import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-kpi-card',
  imports: [SkeletonModule],
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss'],
})
export class KpiCardComponent {
  title = input<string>('');
  value = input<string | number>('');
  icon = input<string>('');
  subtitle = input<string>('');
  loading = input<boolean>(true);
}
