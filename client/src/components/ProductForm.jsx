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
