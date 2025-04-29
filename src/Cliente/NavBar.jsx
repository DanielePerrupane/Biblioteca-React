import { Link } from "react-router-dom";
function NavBar() {

    return (
        <>
            <p>
                <Link to={"/"}>| Login </Link>
                <Link to={"/RegistrazioneCliente"}>| Registrati |</Link>
                
            </p>
        </>
    )

}

export default NavBar;