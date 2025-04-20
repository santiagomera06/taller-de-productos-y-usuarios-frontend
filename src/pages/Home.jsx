
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
    const inicio = () => {
        navigate('/login');
    }
    return (
        <div>
            <h1>Bienvenido</h1>
            <button onClick={()=>{inicio()}}>Inicio de Sesion</button> 
        </div>
    )
}
export default Home;