# Frota Gerencial – V-Lab

Este repositório contém o sistema **Frota Gerencial**, desenvolvido em Angular seguindo o **Padrão Digital de Governo (DSGOV)**. O projeto permite visualizar, gerenciar e monitorar veículos de uma frota, com interface moderna, responsiva e acessível.

---

## 🚦 Demonstração

- **Frontend:** [angular-dsgov-frota-manager.vercel.app](https://angular-dsgov-frota-manager.vercel.app/)
- **API Mock:** [mock-frota-manager.onrender.com/abastecimentos](https://mock-frota-manager.onrender.com/abastecimentos)

## 🎯 Objetivo do Projeto

Construir uma solução web para gestão de frotas, permitindo o acompanhamento de abastecimentos, motoristas, veículos e indicadores, pronta para produção e fácil de manter.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- npm 10+

### Instalação

```bash
# Instalar dependências
npm install
```

### Executar aplicação localmente

```bash
# Terminal 1 - Rodar o mock server (API fake)
npm run mock

# Terminal 2 - Rodar a aplicação Angular
npm start
```

Acesse em: [http://localhost:4200](http://localhost:4200)
API local: [http://localhost:3000/abastecimentos](http://localhost:3000/abastecimentos)

### Deploy em Produção

- Frontend: [https://angular-dsgov-frota-manager.vercel.app/](https://angular-dsgov-frota-manager.vercel.app/)
- API: [https://mock-frota-manager.onrender.com/abastecimentos](https://mock-frota-manager.onrender.com/abastecimentos)

### Endpoints disponíveis (Mock API)

- `GET /abastecimentos` - Lista todos os abastecimentos
- `GET /abastecimentos/:id` - Busca abastecimento por ID
- `POST /abastecimentos` - Cria novo abastecimento
- `PUT /abastecimentos/:id` - Atualiza abastecimento
- `DELETE /abastecimentos/:id` - Remove abastecimento

---

## 🧠 Metodologia de Trabalho

Mesmo com um tempo de desenvolvimento reduzido, foi adotada uma organização prévia para garantir clareza e produtividade ao longo do processo.

- **Prototipação inicial de baixa fidelidade (papel)**  
  Utilizada para validar rapidamente a estrutura das telas e o fluxo de navegação antes da implementação.

- **Organização das tarefas**  
  O acompanhamento do desenvolvimento é feito através do Trello, permitindo uma visão clara do progresso e das prioridades do projeto:  
  👉 https://trello.com/b/GPChYR9o/v-lab-front

- **Aprendizado guiado com IA**  
  A ferramenta **Gemini** está sendo utilizada como apoio ao aprendizado guiado, auxiliando na tomada de decisões técnicas e na compreensão de conceitos durante o desenvolvimento.

- **Fluxo de Desenvolvimento com Pull Requests (PRs)**  
  Para garantir a qualidade e a revisão do código, cada nova funcionalidade ou correção é desenvolvida em uma branch separada e integrada à branch `main` por meio de um Pull Request. Isso evita commits diretos na branch principal e promove a colaboração.

---

## 🎨 Design System e Padrões Visuais

O projeto segue os fundamentos do **Design System do Governo Federal (DSGOV)**, garantindo consistência visual, acessibilidade e reutilização de padrões.

Documentação utilizada:  
👉 https://www.gov.br/ds/fundamentos-visuais/espacamento

---

## 🧱 Arquitetura

O projeto adota o **padrão Facade**, promovendo:

- Separação entre lógica de negócio e apresentação
- Componentes mais simples e reutilizáveis
- Facilidade de manutenção e escalabilidade

Estrutura base de camadas:

- `components` – Componentes visuais
- `facades` – Intermediação entre componentes e serviços
- `services` – Regras de negócio e comunicação

---

## 🛠️ Tecnologias Utilizadas

- **Angular 20**
- **TypeScript**
- **RxJS** para programação reativa
- **JSON Server** para mock da API
- **ng-apexcharts** para visualização de dados
- **CSS Custom Properties** (tokens de design)
- **SCSS** para estilização
- **Trello** para organização
- **Gemini** como suporte de aprendizado guiado

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── core/
│   │   ├── facades/       # Camada de intermediação
│   │   ├── services/      # Serviços e lógica de negócio
│   │   └── models/        # Interfaces e tipos
│   ├── shared/
│   │   └── components/    # Componentes reutilizáveis
│   └── pages/             # Páginas da aplicação
└── public/
  └── assets/
    └── mocks/         # Dados mockados (db.json)

```
### © 2026 – Projeto Frota Gerencial | V-Lab

---
