import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import productService from "../services/productService";
import ProductList from "../components/ProductList";

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const products = await productService.getProducts();
        setProducts(products);
      } catch (error) {
        setError("Error al cargar productos");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated, navigate]);

  const handleDelete = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      setError("Error al eliminar producto");
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="card">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p className="user-info">Bienvenido, {user?.name} <span>({user?.role})</span></p>
          </div>
          <div className="dashboard-actions">
            <button 
              className="btn btn-outline" 
              onClick={logout}
            >
              Cerrar sesión
            </button>
            <Link to="/products/add" className="btn">
              Agregar Producto
            </Link>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <h2>Productos</h2>
        <ProductList 
          products={products} 
          onDelete={handleDelete} 
          userRole={user?.role}
        />
      </div>
    </div>
  );
};

export default Dashboard;