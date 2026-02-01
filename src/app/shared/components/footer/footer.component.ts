import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {
  BrFooter,
  BrFooterCategory,
  BrFooterItem,
  BrFooterLegal,
  BrFooterLogo,
  BrFooterSocial,
} from "@govbr-ds/webcomponents-angular/standalone";

interface FooterItem {
  text: string;
  href: string;
}

interface FooterCategory {
  label: string;
  items: FooterItem[];
}

interface SocialLink {
  icon: string;
  description: string;
  href: string;
}

interface PartnerLogo {
  src: string;
  description: string;
  // Se sempre true, não é necessário incluí-lo aqui:
  // isPartner?: boolean;
}

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [
    CommonModule,
    BrFooter,
    BrFooterCategory,
    BrFooterSocial,
    BrFooterLogo,
    BrFooterLegal,
    BrFooterItem,
  ],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /** Tema do footer: "light" ou "dark" */
  @Input() public theme: "light" | "dark" = "dark";

  /** URL e descrição do logo principal */
  @Input() public mainLogo: { url: string; description: string } = {
    url: "assets/images/logo.svg",
    description: "Logo do Site",
  };

  /** Categorias com seus itens */
  @Input() public categories: FooterCategory[] = [
    {
      label: "Assuntos",
      items: [
        { text: "Notícias", href: "https://www.gov.br/mme/pt-br/assuntos/noticias" },
        {
          text: "Secretarias",
          href: "https://www.gov.br/mme/pt-br/assuntos/secretarias",
        },
        {
          text: "Comissão de Ética",
          href: "https://www.gov.br/mme/pt-br/assuntos/comissao-de-etica",
        },
        { text: "Conselhos e Comitês", href: "https://www.gov.br/mme/pt-br/assuntos/conselhos-e-comites" },
      ],
    },
    {
      label: "Acesso a Informação",
      items: [
        {
          text: "Institucional",
          href: "https://www.gov.br/mme/pt-br/acesso-a-informacao/institucional",
        },
        { text: "Ações e Programas", href: "https://www.gov.br/mme/pt-br/acesso-a-informacao/acoes-e-programas" },
        { text: "Participação Social", href: "https://www.gov.br/mme/pt-br/acesso-a-informacao/participacao-social" },
      ],
    }
  ];

  /** Links de redes sociais */
  @Input() public socialLinks: SocialLink[] = [
    { icon: "facebook-f", description: "Facebook", href: "https://www.facebook.com/minaseenergia" },
    { icon: "twitter", description: "X", href: "https://x.com/Minas_Energia" },
    {
      icon: "linkedin-in",
      description: "Linkedin",
      href: "https://www.linkedin.com/company/ministeriominaseenergia/?viewAsMember=true",
    }
  ];

  /** Logos de parceiros */
  @Input() public partnerLogos: PartnerLogo[] = [
    {
      src: "assets/images/acesso-info.jpg",
      description: "Acesso à Informação",
    }
  ];

  /** Texto legal / licença (renderizado como HTML seguro) */
  @Input() public licenseText: string =
  "© 2026 Agência Nacional de Gás e Petróleo. Todos os direitos reservados. <br>Este sistema está licenciado sob a <strong>Licença MIT</strong>.";
}
