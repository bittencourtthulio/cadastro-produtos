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
    await fetch(`${API}`, {
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
