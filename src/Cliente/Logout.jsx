import { useNavigate } from "react-router-dom"

function Logout() {
    const navigate = useNavigate();
    const eseguiLogout = () => {
        
        navigate("/")
    }
    return(
        <><button onClick={eseguiLogout}>Logout</button></>
    )
}

export default Logout;