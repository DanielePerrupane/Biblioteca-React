import {Link} from "react-router-dom"

function NavBarLibro() {
    return(
        <>
                <p>
                    <Link to={"/InserisciLibro"}>| Inserisci un nuovo Libro |</Link>
                    <Link to={"/GestioneLibro"}> Gestisci Libro |</Link>
                    <Link to={"/InserisciGenere"}> Inserisci Genere |</Link>
                </p>
        </>
    )
}

export default NavBarLibro;