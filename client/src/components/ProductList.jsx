export default function ProductList({ products, onEdit, onDelete }) {
  if (!products || products.length === 0) {
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
