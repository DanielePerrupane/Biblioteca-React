import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useState } from "react";



function Prenota() {

    const oggi = new Date().toISOString().split("T")[0];

    const location = useLocation();
    const {user} = location.state || {};

    const [dataInizio, setDataInizio] = useState('');
    const [dataFine, setDataFine] = useState('');
    const [acconto, setAcconto] = useState('');
    const [totale, setTotale] = useState('');
    const [titolo, setTitolo] = useState('');
    const [libroTrovato, setLibroTrovato] = useState(null);

    const catturaDataInizio = (e) => {
        setDataInizio(e.target.value);
    }

    const catturaDataFine = (e) => {
        setDataFine(e.target.value);
    }

    const catturaAcconto = (e) => {
        setAcconto(e.target.value);
    }

    const catturaTotale = (e) => {
        setTotale(e.target.value);
    }
    
    const catturaTitolo = (e) => {
        setTitolo(e.target.value);
    }

    function cercaLibro() {
        console.log("titolo: "+ titolo);
        
        fetch(`http://localhost:8080/Biblioteca/Libro/cercaLibro/${encodeURIComponent(titolo)}`,{
            method: 'get'
        })
        .then(response => {
            console.log(response.status);
            if(response.status===200)
            {
                console.log("2: " + titolo);
                
                response.json().then(libro => {
                    setLibroTrovato(libro);
                    
                })
                
            }
            if(response.status===204)
            {
                
                throw new Error("LIBRO NON TROVATO");

            }
            if(response.status===500)
            {
                throw new Error("ERRORE DEL SERVER");
            }
        })
        .catch(error => {
            setLibroTrovato(null);
            alert(error);
        })
    }

    function prenotaLibro() {
        console.log(dataInizio);
        console.log(dataFine);
        console.log(acconto);
        console.log(totale);
        console.log("---------------------------- titolo: " + titolo)

        fetch("http://localhost:8080/Biblioteca/Cliente/prenotaLibro", {
            method: 'post',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                dataInizio: dataInizio,
                dataFine: dataFine,
                acconto: acconto,
                totale: totale,
                username: user,
                titoloLibro: titolo
            }) 
        })
        .then(response => {
            if(response.status===201)
            {
                alert("INSERIMENTO AVVENUTO CON SUCCESSO");
                setLibroTrovato(null);
            }
            if(response.status===500)
            {
                setLibroTrovato(null);
                throw new Error("ERRORE DEL SERVER");
                
            }
        })
        .catch(error => {
            alert(error);
        })
    }

    return(
        <div className="w-200 h-500 bg-amber-50 rounded-2xl">
            
            <div>
                <p><Logout/></p>
                <h2 className="text-black">Effettua una prenotazione {user} </h2>
            </div>
            <p className="bg-amber-100 text-shadow-amber-100">

                <Link to="/Profilo" state={{user:user}}>| Home Page |</Link>
                <Link to="/Prenota" state={{user:user}}> Prenota |</Link>
                <Link to="/AreaPersonale" state={{user:user}}> Area Personale |</Link>
                
            </p>

            <div className="text-black ">
                <p>Qui visualizzo e prenoto i libri disponibili</p> <br />
                <div>
                    <h2><strong>Cerca Libri</strong></h2>
                    <strong>Titolo</strong> <input type="text" onChange={catturaTitolo}/>
                    <button onClick={cercaLibro} className="text-white">Cerca</button>
                </div>
                {libroTrovato && (
                    <div className="flex flex-col gap-3 items-center">
                    Data inizio <input type="date" onChange={catturaDataInizio} min={oggi}/>
                    Data fine <input type="date" onChange={catturaDataFine} min={oggi}/>
                    Acconto <input type="number" onChange={catturaAcconto} min={0}/>
                    Totale <input type="number" onChange={catturaTotale} min={0}/>
                    <button className="text-white" onClick={prenotaLibro}>Prenota</button>
                    </div>
                )}

                
                
            </div>
            
        </div>
    )
}
export default Prenota;