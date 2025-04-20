  import { useState, useEffect } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import axios from "axios";
  import { useAuth } from "../../contexts/AuthContext";
  import productService from "../../services/productService";

  const EditProduct = () => {
    // Hooks y parámetros
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Estados
    const [formData, setFormData] = useState({
      name: "",
      category: "",
      price: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // Cargar producto al montar el componente
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const product = await productService.getProductById(id);
          setFormData({
            name: product.name,
            category: product.category,
            price: product.price.toString()
          });
        } catch (err) {
          setError(err.message || "Error al cargar el producto");
        } finally {
          setIsFetching(false);
        }
      };

      fetchProduct();
    }, [id]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:3001/api/products/${id}`,
          { 
            ...formData, 
            price: parseFloat(formData.price),
            userId: user.id 
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        navigate("/dashboard");
      } catch (err) {
        setError(err.response?.data?.error || "Error al actualizar producto");
      } finally {
        setIsLoading(false);
      }
    };

    if (isFetching) return <div>Cargando producto...</div>;

    return (
      <div className="form-container">
        <h2>Editar Producto</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Categoría:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? "Actualizando..." : "Actualizar Producto"}
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate("/dashboard")}
              className="btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default EditProduct;