# V-Lab Frontend

Este repositório contém o desenvolvimento da seleção de **frontend do V-Lab**, estruturado com foco em boas práticas de arquitetura, organização visual e aderência ao **Padrão Digital de Governo (DSGOV)**.

---

## 🎯 Objetivo do Projeto

Construir uma base sólida de frontend utilizando **Angular 16+**, preparada para escalabilidade e manutenção, respeitando princípios de acessibilidade, consistência visual e organização arquitetural.

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

- **Angular 16+**
- **TypeScript**
- **CSS Custom Properties (tokens de design)**
- **SCSS** para estilização
- **Trello** para organização
- **Gemini** como suporte de aprendizado guiado

---