# 🍔 Sistema de Hamburgueria

Sistema interno para hamburgueria desenvolvido com **Spring Boot** (backend) e **Angular 17** (frontend).

---

## Estrutura do Projeto

```
Delivery/
├── backend/          ← Spring Boot (Java 17)
└── frontend/         ← Angular 17
```

---

## Backend (Spring Boot)

### Requisitos
- Java 17+
- Maven 3.8+

### Como rodar

```bash
cd backend
mvn spring-boot:run
```

API disponível em: `http://localhost:8080`

Banco de dados H2 em memória — console em: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:hamburgueria`
- User: `sa` | Senha: *(vazio)*

### Usuário padrão (criado automaticamente)
- Username: `admin`
- Senha: `admin123`

### Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Login |
| GET/POST/PUT/DELETE | `/api/funcionarios` | CRUD Funcionários |
| GET/POST | `/api/pontos` | Listar pontos |
| POST | `/api/pontos/entrada/{id}` | Bater entrada |
| POST | `/api/pontos/saida/{id}` | Bater saída |
| GET/POST/PUT/DELETE | `/api/produtos` | CRUD Produtos |
| GET/POST | `/api/pedidos` | Listar / Criar pedidos |
| PATCH | `/api/pedidos/{id}/status` | Atualizar status |
| GET | `/api/pedidos/dashboard` | Dados do dashboard |

---

## Frontend (Angular)

### Requisitos
- Node.js 18+
- Angular CLI 17+

### Como rodar

```bash
cd frontend
npm install
ng serve
```

Aplicação em: `http://localhost:4200`

### Páginas

| Rota | Descrição | Login obrigatório |
|------|-----------|:-----------------:|
| `/login` | Tela de login | Não |
| `/dashboard` | Pedidos e vendas do dia | Sim |
| `/funcionarios` | CRUD de funcionários | Sim |
| `/pontos` | Registro de ponto | Sim |
| `/produtos` | CRUD de produtos | Sim |
| `/pedidos` | Criar e gerenciar pedidos | Sim |
| `/cliente` | Cardápio + fazer pedido | Não |

---

## Status dos Pedidos

`RECEBIDO` → `EM_PREPARO` → `PRONTO` → `ENTREGUE`
# lux-buguer
