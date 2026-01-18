# V-Lab Frontend

Este repositório contém o desenvolvimento da seleção de **frontend do V-Lab**, estruturado com foco em boas práticas de arquitetura, organização visual e aderência ao **Padrão Digital de Governo (DSGOV)**.

---

## 🎯 Objetivo do Projeto

Construir uma base sólida de frontend utilizando **Angular 20**, preparada para escalabilidade e manutenção, respeitando princípios de acessibilidade, consistência visual e organização arquitetural.

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

### Executar aplicação

```bash
# Terminal 1 - Rodar o mock server (API fake)
npm run mock

# Terminal 2 - Rodar a aplicação Angular
npm start
```

A aplicação estará disponível em: `http://localhost:4200`  
A API mock estará disponível em: `http://localhost:3000`

### Endpoints disponíveis (Mock API)

- `GET http://localhost:3000/abastecimentos` - Lista todos os abastecimentos
- `GET http://localhost:3000/abastecimentos/:id` - Busca abastecimento por ID
- `POST http://localhost:3000/abastecimentos` - Cria novo abastecimento
- `PUT http://localhost:3000/abastecimentos/:id` - Atualiza abastecimento
- `DELETE http://localhost:3000/abastecimentos/:id` - Remove abastecimento

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

---
