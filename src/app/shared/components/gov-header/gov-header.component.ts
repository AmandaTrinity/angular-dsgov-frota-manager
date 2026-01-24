import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from '../../../layouts/navbar/navbar';

@Component({
  selector: 'app-gov-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './gov-header.component.html',
  styleUrls: ['./gov-header.component.scss'],
})
export class GovHeaderComponent {
  // Inputs em formato moderno (signals)
  breadcrumbs = input<Breadcrumb[]>([]);
}
