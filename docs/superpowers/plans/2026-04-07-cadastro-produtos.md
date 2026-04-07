# Cadastro de Produtos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar um app full-stack simples de cadastro de produtos com React (Vite) no frontend e Express no backend, usando array in-memory como "banco de dados".

**Architecture:** Backend Express na porta 3001 expõe uma REST API com CRUD de produtos. Frontend React (Vite) na porta 5173 faz fetch direto para o backend. Dados vivem em um array in-memory no servidor — sem banco de dados, sem configuração extra.

**Tech Stack:** Node.js, Express, React, Vite, fetch API nativa

---

## File Map

### Backend (`server/`)
- `server/package.json` — dependências do servidor (express, cors)
- `server/index.js` — servidor Express + array in-memory + rotas CRUD

### Frontend (`client/`)
- `client/package.json` — dependências do client (react, vite)
- `client/vite.config.js` — config do Vite
- `client/index.html` — HTML raiz
- `client/src/main.jsx` — entry point React
- `client/src/App.jsx` — estado global + orquestração de componentes
- `client/src/components/ProductList.jsx` — tabela de produtos com botões editar/deletar
- `client/src/components/ProductForm.jsx` — formulário criar/editar produto

---

## Task 1: Setup do Backend

**Files:**
- Create: `server/package.json`
- Create: `server/index.js`

- [ ] **Step 1: Criar `server/package.json`**

```json
{
  "name": "produtos-server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  }
}
```

- [ ] **Step 2: Instalar dependências do servidor**

```bash
cd server && npm install
```

Esperado: `node_modules/` criado, sem erros.

- [ ] **Step 3: Criar `server/index.js` com array in-memory e rotas CRUD**

```js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: 'Camiseta', price: 49.9, stock: 100 },
  { id: 2, name: 'Calça Jeans', price: 129.9, stock: 50 },
  { id: 3, name: 'Tênis', price: 219.9, stock: 30 },
];
let nextId = 4;

// Listar todos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Buscar por ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(product);
});

// Criar
app.post('/api/products', (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null) {
    return res.status(400).json({ error: 'name, price e stock são obrigatórios' });
  }
  const product = { id: nextId++, name, price: Number(price), stock: Number(stock) };
  products.push(product);
  res.status(201).json(product);
});

// Atualizar
app.put('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Produto não encontrado' });
  const { name, price, stock } = req.body;
  products[idx] = { ...products[idx], name, price: Number(price), stock: Number(stock) };
  res.json(products[idx]);
});

// Deletar
app.delete('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Produto não encontrado' });
  products.splice(idx, 1);
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

- [ ] **Step 4: Testar o servidor manualmente**

```bash
cd server && npm run dev
```

Em outro terminal:
```bash
curl http://localhost:3001/api/products
```

Esperado: array JSON com 3 produtos.

- [ ] **Step 5: Commit**

```bash
git init
git add server/
git commit -m "feat: backend Express com CRUD de produtos in-memory"
```

---

## Task 2: Setup do Frontend (Vite + React)

**Files:**
- Create: `client/package.json`
- Create: `client/vite.config.js`
- Create: `client/index.html`
- Create: `client/src/main.jsx`

- [ ] **Step 1: Criar `client/package.json`**

```json
{
  "name": "produtos-client",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

- [ ] **Step 2: Instalar dependências do client**

```bash
cd client && npm install
```

Esperado: `node_modules/` criado, sem erros.

- [ ] **Step 3: Criar `client/vite.config.js`**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 4: Criar `client/index.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cadastro de Produtos</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Criar `client/src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 6: Commit**

```bash
git add client/
git commit -m "feat: setup Vite + React para o client"
```

---

## Task 3: Componente ProductForm

**Files:**
- Create: `client/src/components/ProductForm.jsx`

- [ ] **Step 1: Criar `client/src/components/ProductForm.jsx`**

```jsx
import { useState, useEffect } from 'react';

export default function ProductForm({ onSubmit, editingProduct, onCancel }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setStock(editingProduct.stock);
    } else {
      setName('');
      setPrice('');
      setStock('');
    }
  }, [editingProduct]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || price === '' || stock === '') return;
    onSubmit({ name, price: Number(price), stock: Number(stock) });
    setName('');
    setPrice('');
    setStock('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
      <div>
        <label>Nome: </label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Preço: </label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Estoque: </label>
        <input
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
          required
        />
      </div>
      <button type="submit">{editingProduct ? 'Salvar' : 'Adicionar'}</button>
      {editingProduct && (
        <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>
          Cancelar
        </button>
      )}
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/ProductForm.jsx
git commit -m "feat: componente ProductForm"
```

---

## Task 4: Componente ProductList

**Files:**
- Create: `client/src/components/ProductList.jsx`

- [ ] **Step 1: Criar `client/src/components/ProductList.jsx`**

```jsx
export default function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p>Nenhum produto cadastrado.</p>;
  }

  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço (R$)</th>
          <th>Estoque</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price.toFixed(2)}</td>
            <td>{product.stock}</td>
            <td>
              <button onClick={() => onEdit(product)}>Editar</button>{' '}
              <button onClick={() => onDelete(product.id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/ProductList.jsx
git commit -m "feat: componente ProductList"
```

---

## Task 5: App.jsx — Orquestração e Integração com API

**Files:**
- Create: `client/src/App.jsx`

- [ ] **Step 1: Criar `client/src/App.jsx`**

```jsx
import { useState, useEffect } from 'react';
import ProductList from './components/ProductList.jsx';
import ProductForm from './components/ProductForm.jsx';

const API = 'http://localhost:3001/api/products';

export default function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');

  async function fetchProducts() {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProducts(data);
    } catch {
      setError('Erro ao carregar produtos. O servidor está rodando?');
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleCreate(product) {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    fetchProducts();
  }

  async function handleUpdate(product) {
    await fetch(`${API}/${editingProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    setEditingProduct(null);
    fetchProducts();
  }

  async function handleDelete(id) {
    if (!window.confirm('Deletar este produto?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchProducts();
  }

  function handleSubmit(product) {
    if (editingProduct) {
      handleUpdate(product);
    } else {
      handleCreate(product);
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Cadastro de Produtos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ProductForm
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />
      <ProductList
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
      />
    </div>
  );
}
```

- [ ] **Step 2: Testar a aplicação completa**

Em dois terminais separados:

Terminal 1:
```bash
cd server && npm run dev
```

Terminal 2:
```bash
cd client && npm run dev
```

Abrir `http://localhost:5173` no browser.

Verificar:
- Lista de 3 produtos aparece
- Formulário cria novo produto
- Botão Editar preenche o formulário
- Salvar atualiza o produto na lista
- Deletar remove o produto com confirmação

- [ ] **Step 3: Commit final**

```bash
git add client/src/App.jsx
git commit -m "feat: App.jsx com integração completa à API"
```

---

## Task 6: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Criar `README.md`**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: README com instruções de uso"
```
