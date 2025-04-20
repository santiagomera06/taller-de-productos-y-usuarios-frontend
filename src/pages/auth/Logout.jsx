import { useNavigate } from "react-router-dom";


function Logout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <button onClick={handleLogout}>Cerrar Sesión</button>
  );
}

export default Logout;

