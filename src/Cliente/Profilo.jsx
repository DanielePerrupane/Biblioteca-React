import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import {DataTable} from "primereact/datatable"
import { Column } from "primereact/column";




function Profilo() {

    const location = useLocation();
    const {user} = location.state || {};
    const navigate = useNavigate();
    const [listaLibriPrenotati, setListaLibri] = useState([]);

    


    function prendiListaLibriPrenotati()
    {
        fetch(`http://localhost:8080/Biblioteca/Cliente/prendiListaLibriPrenotati/${user}`,{
            method: 'get'
        })
        .then(response => {
            response.json().then(lista => {
                console.log(lista);
                setListaLibri(lista);
            })
        })
    }

    useEffect(() => {
        prendiListaLibriPrenotati();
    },[])

    return(
        <div className="w-200 h-500 bg-amber-50 rounded-2xl ">
            <div>

                <Logout></Logout>
                <h2 className="text-black">Benvenuto/a nel tuo profilo {user} </h2>
                
            </div>

            <p className="bg-amber-100 text-shadow-amber-100">
                <Link to="/Profilo" state={{user:user}}>| Home Page |</Link>
                <Link to="/Prenota" state={{user:user}}> Prenota |</Link>
                <Link to="/AreaPersonale" state={{user:user}}> Area Personale |</Link>
            </p>

            <div className="text-black">
                Qui visualizzo i libri prenotati 
                
                <DataTable value={listaLibriPrenotati} paginator rows={3} emptyMessage="Nessun libro prenotato :(">
                    <Column field="autoreLibro" header="Autore" sortable/>
                    <Column field="titoloLibro" header="Titolo" sortable/>
                    <Column field="costoGiornaliero" header="Costo GG" sortable/>
                    <Column field="nomeGenere" header="Genere" sortable/>
                </DataTable>
            </div>
            
        </div>
    )
}

export default Profilo;