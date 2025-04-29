import {Link} from "react-router-dom"
import NavBarLibro from "./NavBarLibro";
import { useEffect, useState } from "react";
import LogoutOperatore from "./LogoutOperatore";
function InserisciLibro() {

    

    const [lista, setListaGeneri] = useState([]);
    const [autore, setAutore] = useState('');
    const [costoGiornaliero, setCosto] = useState('');
    const [titolo, setTitolo] = useState('');
    const [genere,setGenere] = useState('');

    const catturaAutore = (e) =>{
        setAutore(e.target.value);
    }

    const catturaCosto = (e) => {
        setCosto(e.target.value);
    }
    const catturaTitolo = (e) => {
        setTitolo(e.target.value);
    }
    const catturaGenere = (e) => {
        setGenere(e.target.value);
    }

    
   
    
    function listaGeneri() {
        fetch("http://localhost:8080/Biblioteca/Libro/listaGeneri",{
            method: 'get'
        })
        .then(response => {
            response.json().then(listaTrovata => {
                console.log(listaTrovata)
                setListaGeneri(listaTrovata);
                
            })
        })
    }

    useEffect(() => {
        listaGeneri();
    }, []);
    

    function inserisciLibro() {
        console.log(autore);
        console.log(costoGiornaliero);
        console.log(titolo);
        console.log(genere);
        

        fetch("http://localhost:8080/Biblioteca/Libro/inserisciLibro",{
            method: 'post',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                autoreLibro: autore,
                costoGiornaliero: costoGiornaliero,
                titoloLibro: titolo,
                genere: {
                    idGenere: genere,
                    descrizioneGenere: lista[genere-1].descrizioneGenere,
                    nomeGenere: lista[genere-1].nomeGenere
                }
            })
        })
        .then(response => {
            console.log("entrato")
            console.log(response.status)

            if(response.status===201)
            {
                
                alert("INSERIMENTO AVVENUTO CON SUCCESSO!")
            }
            if(response.status===204)
            {   
                
                throw new Error("TITOLO GIA' PRESENTE!");
            }
            if(response.status===500)
            {
                
                throw new Error("ERRORE DEL SERVER!");
            }

        })
        .catch(error => {
            alert(error);
        })

    }

    return(
        <>
            <div>
                <h1>Inserisci un nuovo Libro</h1>
                <LogoutOperatore></LogoutOperatore>
                <NavBarLibro/>
            </div>

            <div className="flex flex-col gap-3 items-center">
                Autore <input type="text" onChange={catturaAutore}/>
                Costo Giornaliero <input type="number" onChange={catturaCosto}/>
                Titolo <input type="text" onChange={catturaTitolo}/>
                Genere 
                <select name="idGenere" id="" required onChange={catturaGenere}>
                    <option value="">--------------</option>
                    {/* Aggiungere while con i generi dinamici */}
                    {lista.map((genere, i) => (
                        <option key={i} value={genere.idGenere}>{genere.nomeGenere}</option>
                    ))}
                </select>
                <button onClick={inserisciLibro}>Inserisci</button>
                
            </div>
        </>
    )
}

export default InserisciLibro;