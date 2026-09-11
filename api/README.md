# Frota Gerencial – API

Backend do sistema **Frota Gerencial**, construído com **NestJS + Prisma + PostgreSQL**, substituindo o antigo mock (`json-server`) por uma API real com modelagem relacional, validação, paginação/filtros e agregações para o dashboard.

## Stack

- **NestJS 11** (TypeScript, arquitetura modular)
- **Prisma 6** + **PostgreSQL**
- **class-validator** / **class-transformer** para DTOs
- **Swagger** (`/docs`) para documentação automática da API

## Domínio modelado

- `Veiculo` — placa, modelo, marca, ano, tipo de combustível, status
- `Motorista` — nome, CPF (validado por dígito verificador), CNH, status
- `Abastecimento` — vincula motorista + veículo, calcula `valorTotalPago` no servidor (`valorLitro * quantidadeLitros`), nunca confia no valor enviado pelo cliente

## Como executar localmente

### Pré-requisitos

- Node.js 22+
- Docker (para o Postgres local)

### Passo a passo

```bash
cp .env.example .env
docker compose up -d       # sobe o Postgres em localhost:5433
npm install
npm run prisma:migrate     # cria as tabelas
npm run seed                # popula com os dados de public/assets/mocks/db.json
npm run start:dev
```

API disponível em `http://localhost:3001/api`
Documentação Swagger em `http://localhost:3001/docs`

## Endpoints

### Veículos — `/api/veiculos`
`GET` (paginado, filtros `search`, `status`, `tipoCombustivel`) · `GET /:id` · `POST` · `PATCH /:id` · `DELETE /:id`

### Motoristas — `/api/motoristas`
`GET` (paginado, filtros `search`, `status`) · `GET /:id` · `POST` · `PATCH /:id` · `DELETE /:id`

### Abastecimentos — `/api/abastecimentos`
`GET` (paginado, filtros `uf`, `tipoCombustivel`, `motoristaId`, `veiculoId`, `dataInicio`, `dataFim`, ordenação `sortBy`/`sortOrder`) · `GET /:id` · `POST` · `PATCH /:id` · `DELETE /:id`

### Dashboard — `/api/dashboard/resumo`
Agregações prontas para os gráficos do frontend: total gasto, total de litros, gasto por tipo de combustível, gasto por UF e série mensal. Aceita `dataInicio`/`dataFim`.

## Regras de negócio já implementadas

- `valorTotalPago` sempre recalculado no backend
- Placa validada por regex (padrão antigo e Mercosul)
- CPF validado por dígito verificador (algoritmo oficial)
- Exclusão de `Veiculo`/`Motorista` com abastecimentos vinculados é bloqueada pelo banco (`onDelete: Restrict`) e retorna erro tratado
- Filtro global de exceções padroniza toda resposta de erro (`statusCode`, `path`, `timestamp`, `message`)

## Scripts

| Script | Descrição |
|---|---|
| `npm run start:dev` | API em modo watch |
| `npm run build` | build de produção |
| `npm run prisma:migrate` | cria/aplica migrations (dev) |
| `npm run prisma:deploy` | aplica migrations em produção |
| `npm run seed` | popula o banco a partir do mock antigo |
| `npm run prisma:studio` | abre o Prisma Studio |
| `npm test` | testes unitários |

## Roadmap (próximas fases)

- **Fase 4** — regras de negócio adicionais e mensagens de erro mais específicas por campo
- **Fase 5** — autenticação JWT + roles (`admin`, `gestor`, `operador`)
- **Fase 6** — cobertura de testes unitários e e2e
- **Fase 7** — logging estruturado e endpoint de health mais completo
- **Fase 8** — CI/CD (GitHub Actions) e deploy (Render/Railway)
- **Fase 9** — integração completa com o frontend Angular (trocar a `apiUrl` do mock, novos serviços/facades para veículos e motoristas, interceptor de erro)
