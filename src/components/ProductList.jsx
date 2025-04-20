import { Link } from "react-router-dom";

const ProductList = ({ products, onDelete, userRole }) => {
  return (
    <div>
      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.category} - ${product.price}
              <Link to={`/products/edit/${product.id}`}>Editar</Link>
              {userRole === 'admin' && (
                <button onClick={() => onDelete(product.id)}>Eliminar</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;