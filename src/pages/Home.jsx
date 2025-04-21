
import { useNavigate } from "react-router-dom";
import '../../src/styles.css';

function Home() {
    const navigate = useNavigate();
    const inicio = () => {
        navigate('/login');
    }
    return (
        <div className="home-container">
            <div className="hero-section">
            <h1>Bienvenido</h1>
            <button className="btn" onClick={()=>{inicio()}}>Inicio de Sesion</button> 
            </div>
        </div>
    )
}
export default Home;