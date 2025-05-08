import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useState, useEffect } from "react";
import {DataTable} from "primereact/datatable"
import { Column } from "primereact/column";


function Prenota() {

    const oggi = new Date().toISOString().split("T")[0];

    const location = useLocation();
    const {user} = location.state || {};
    const [listaLibri, setListaLibri] = useState([]);
    const [dataInizio, setDataInizio] = useState('');
    const [dataFine, setDataFine] = useState('');
    const [acconto, setAcconto] = useState('');
    const [totale, setTotale] = useState('');
    const [titolo, setTitolo] = useState('');
    const [libroTrovato, setLibroTrovato] = useState(null);
    const [costo, setCosto] = useState('');
    const [giorni, setGiorni] = useState(0); 

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
                    setCosto(libro.costoGiornaliero);
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

    useEffect(() => {
        if (dataInizio && dataFine) {
          const inizio = new Date(dataInizio);
          const fine = new Date(dataFine);
          const diffInMs = fine - inizio;
          const giorniPrenotati = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)) + 1;
    
          if (giorniPrenotati > 0) {
            setGiorni(giorniPrenotati);
            setTotale(giorniPrenotati * costo);
          } else {
            setGiorni(0);
            setTotale(0);
          }
        }
      }, [dataInizio, dataFine, costo]);

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

    function prendiListaLibri()
    {
        fetch("http://localhost:8080/Biblioteca/Libro/prendiLibri",{
            method: 'get'
        })
        .then(response => {
            response.json().then(libri => {
                console.log("lista libri: ",libri);
                setListaLibri(libri);
            })
        })
    }

    useEffect(() => {
        prendiListaLibri();
    }, [])

    return(
        <div className="w-200 h-500 rounded-2xl">
            
            <div>
            <h2 className="text-black">Username: {user} </h2>
            <p><Logout/></p>
            </div>
            <p className=" text-shadow-amber-100">

                <Link to="/Profilo" state={{user:user}}>| Home Page |</Link>
                <Link to="/Prenota" state={{user:user}}> Prenota |</Link>
                <Link to="/AreaPersonale" state={{user:user}}> Area Personale |</Link>
                
            </p>

            <div className="text-black ">
                
                <div>
                    <h2><strong>Cerca Libri</strong></h2>
                    <strong>Titolo</strong> <input type="text" onChange={catturaTitolo}/>
                    <button onClick={cercaLibro} className="blueButton">Cerca</button>
                </div>
                {libroTrovato && (
                    <div className="flex flex-col gap-3 items-center">
                    Data inizio <input type="date" onChange={catturaDataInizio} min={oggi}/>
                    Data fine <input type="date" onChange={catturaDataFine} min={oggi}/>
                    Acconto <input type="number" onChange={catturaAcconto} min={0}/>
                    Totale <input type="number" value={totale} min={0} readOnly/>
                    <button className="blueButton" onClick={prenotaLibro}>Prenota</button>
                    </div>
                )}

                {!libroTrovato && (
                    <DataTable 
                    value={listaLibri}
                    paginator
                    rows={3}
                    >
                        <Column sortable field="titoloLibro" header="Titolo"></Column>
                        <Column sortable field="autoreLibro" header="Autore"></Column>
                        <Column sortable field="costoGiornaliero" header="Costo Giornaliero"></Column>
                        <Column sortable field="genere.nomeGenere" header="Genere"></Column>


                    </DataTable>
                )}
                

                
                
            </div>
            
        </div>
    )
}
export default Prenota;