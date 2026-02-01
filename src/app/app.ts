import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrBreadcrumb } from "@govbr-ds/webcomponents-angular/standalone";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { MenuComponent } from "./shared/components/menu/menu.component";

interface BreadcrumbItem {
  label: string;
  url?: string;
  active?: boolean;
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    BrBreadcrumb,
  ],
  templateUrl: "./app.html",
  styleUrls: ["./app.scss"],
})
export class AppComponent {
  isMenuVisible = true;

  breadcrumbItems: BreadcrumbItem[] = [
    { label: "Dashboard", url: "javascript:void(0)", active: true },
  ];

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
