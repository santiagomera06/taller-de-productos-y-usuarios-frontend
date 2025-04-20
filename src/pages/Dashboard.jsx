import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import productService from "../services/productService";
import ProductList from "../components/ProductList";

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
      console.error("Error deleting product:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user?.name} ({user?.role})</p>
      <button onClick={logout}>Cerrar sesión</button>
      
      <Link to="/products/add">Agregar Producto</Link>
      
      <h2>Productos</h2>
      <ProductList 
        products={products} 
        onDelete={handleDelete} 
        userRole={user?.role}
      />
    </div>
  );
};

export default Dashboard;