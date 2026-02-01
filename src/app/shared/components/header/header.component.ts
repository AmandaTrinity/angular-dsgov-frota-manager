import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  /** URL e texto alternativo do logo */
  @Input() public logoUrl: string = "assets/images/logo.svg";
  @Input() public logoAlt: string = "logo";

  /** Texto que aparece ao lado do logo */
  @Input() public headerSign: string =
    "Ministério de Minas e Energia";

  /** Título e subtítulo do header */
  @Input() public headerTitle: string = "Frota Gerencial de Combustíveis";

  /** Labels e placeholder do campo de busca */
  @Input() public searchLabel: string = "Texto da pesquisa";
  @Input() public searchPlaceholder: string = "O que você procura?";

  /**
   * Caso queira gerar um menu dinâmico,
   * basta passar um array de objetos { label, route }.
   * Use *ngFor no template.
   */
  @Input() public menuItems: { label: string; route: string }[] = [];

  /**
   * Controla se o menu responsivo está visível.
   * Pode ser inicializado pelo componente-pai:
   * <app-header [menuVisible]="valorInicial" …>.
   */
  @Input() public menuVisible: boolean = false;

  /** Dispara sempre que menuVisible for alternado */
  @Output() public menuToggled = new EventEmitter<boolean>();

  /** Dispara quando o usuário submete um termo de busca */
  @Output() public searchSubmitted = new EventEmitter<string>();

  /** Controla visibilidade da área de busca */
  public isSearchOpen = false;

  /** Armazena o texto digitado no campo de busca */
  public searchQuery = "";

  /**
   * Inverte menuVisible e emite menuToggled com o valor atual.
   */
  public toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
    this.menuToggled.emit(this.menuVisible);
  }

  /** Abre a área de busca */
  public openSearch(): void {
    this.isSearchOpen = true;
  }

  /** Fecha a área de busca e limpa o searchQuery */
  public closeSearch(): void {
    this.isSearchOpen = false;
    this.searchQuery = "";
  }

  /**
   * Emite o termo de busca se não estiver vazio (após trim).
   */
  public submitSearch(): void {
    const termo = this.searchQuery.trim();
    if (termo) {
      this.searchSubmitted.emit(termo);
    }
  }
}
