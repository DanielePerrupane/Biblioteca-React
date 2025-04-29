import { useNavigate } from "react-router-dom";

function LogoutOperatore() 
{
    const navigate = useNavigate();
    function effettuaLogout() {
        navigate("/LoginOperatore")
    }
    return(
    <>
        <button onClick={effettuaLogout}>Logout</button>
    </>
    )
}

export default LogoutOperatore;