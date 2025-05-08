import {Link, Navigate} from "react-router-dom"


function NavBarOperatore() {
    return (
        <>
        
            <Link to={"/InserisciDipendente"}>| Inserisci Dipendente |</Link>
            <Link to={"/GestisciDipendente"}> GestisciDipendente |</Link>
            <Link to={"/GestioneLibro"}> GestioneLibri |</Link>
            <Link to={"/GestisciPrenotazione"}> GestisciPrenotazione |</Link>

        </>
    )
}

export default NavBarOperatore;