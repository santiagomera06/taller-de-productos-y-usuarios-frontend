import { Link } from "react-router-dom";

const ProductList = ({ products, onDelete, userRole }) => {
  return (
    <div className="product-list-container">
      {products.length === 0 ? (
        <div className="no-products">No hay productos disponibles</div>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.category} - ${product.price}</p>
              </div>
              
              <div className="product-actions">
                <Link 
                  to={`/products/edit/${product.id}`} 
                  className="btn btn-outline"
                >
                  Editar
                </Link>
                
                {userRole === 'admin' && (
                  <button 
                    className="btn btn-danger"
                    onClick={() => onDelete(product.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;