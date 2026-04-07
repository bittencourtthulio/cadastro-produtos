# Cadastro de Produtos

App full-stack simples com React + Express para demonstração em aula.

## Estrutura

```
├── server/   # Express API (porta 3001)
└── client/   # React + Vite (porta 5173)
```

## Como rodar

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

Abrir: http://localhost:5173

## API

| Método | Rota                  | Descrição         |
|--------|-----------------------|-------------------|
| GET    | /api/products         | Listar produtos   |
| GET    | /api/products/:id     | Buscar por ID     |
| POST   | /api/products         | Criar produto     |
| PUT    | /api/products/:id     | Atualizar produto |
| DELETE | /api/products/:id     | Deletar produto   |
