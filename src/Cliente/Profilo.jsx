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
        <div className="w-200 h-500 rounded-2xl ">
            <div>

            <h2 className="text-black">Username: {user} </h2>
            <p><Logout/></p>
                
            </div>

            <p className=" text-shadow-amber-100">
                <Link to="/Profilo" state={{user:user}}>| Home Page |</Link>
                <Link to="/Prenota" state={{user:user}}> Prenota |</Link>
                <Link to="/AreaPersonale" state={{user:user}}> Area Personale |</Link>
            </p>

            <div className="text-black">
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