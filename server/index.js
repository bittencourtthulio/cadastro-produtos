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
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Produto não encontrado' });
  products.splice(idx, 1);
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
