import {Link} from "react-router-dom";
import {useState, useEffect} from "react"; 
import {DataTable} from "primereact/datatable"
import { Column } from "primereact/column";
import NavBarLibro from "./NavBarLibro";
import LogoutOperatore from "./LogoutOperatore";
import NavBarOperatore from "./NavBarOperatore";
function GestioneLibro() {

    const [titolo, setTitolo] = useState('');
    const [libroTrovato, setLibroTrovato] = useState(null);
    const [lista, setListaGeneri] = useState([]);
    const [listaLibri, setListaLibri] = useState([]);
    const [titoloMod, setTitoloMod] = useState('');
    const [autoreMod, setAutoreMod] = useState('');
    const [genereMod, setGenereMod] = useState('');
    const [costoMod, setCostoMod] = useState('');

    const catturaTitoloMod = (e) => {
        setTitoloMod(e.target.value);
    }
    const catturaAutore = (e) => {
        setAutoreMod(e.target.value);
    }
    const catturaCosto = (e) => {
        setCostoMod(e.target.value);
    }
    const catturaGenere = (e) => {
        setGenereMod(e.target.value);
    }


    const catturaTitolo = (e) => {
        setTitolo(e.target.value);
    }

    function listaGeneri() {
        fetch("http://localhost:8080/Biblioteca/Libro/listaGeneri",{
            method: 'get'
        })
        .then(response => {
            response.json().then(listaTrovata => {
                console.log("lista trovata" + listaTrovata)
                setListaGeneri(listaTrovata);
                
            })
        })
    }

    useEffect(() => {
        listaGeneri();
    }, []);

    function cercaLibro() {
        console.log(titolo);
        
        fetch(`http://localhost:8080/Biblioteca/Libro/cercaLibro/${encodeURIComponent(titolo)}`,{
            method: 'get'
        })
        .then(response => {
            console.log(response.status);
            if(response.status===200)
            {
                console.log("libro trovato");
                setTitolo('');
                response.json().then(libro => {
                    setLibroTrovato(libro);
                    setAutoreMod(libro.autoreLibro);
                    setTitoloMod(libro.titoloLibro);
                    setCostoMod(libro.costoGiornaliero);
                    setGenereMod(libro.genere.nomeGenere)
                    console.log(libro);
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
            setTitolo('');
            alert(error);
        })
    }

    function modificaLibro() {
        console.log("modifica");
        console.log(titoloMod);
        console.log(autoreMod);
        console.log("genere: " + genereMod);
        console.log("costo: " + costoMod);

        fetch("http://localhost:8080/Biblioteca/Libro/modificaLibro",{
            method: 'put',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                idLibro: libroTrovato.idLibro,
                autoreLibro: autoreMod,
                costoGiornaliero: costoMod,
                titoloLibro: titoloMod,
                genere: {
                    idGenere: genereMod,
                    descrizioneGenere: lista[genereMod-1].descrizioneGenere,
                    nomeGenere: lista[genereMod-1].nomeGenere
                }
            })
        })
        .then(response => {
            console.log(response.status);
            if(response.status===200)
            {
                alert("MODIFICA AVVENUTA CON SUCCESSO!");
                setLibroTrovato(null);
            }
            if(response.status===204)
            {
                alert("TITOLO GIA' ESISTENTE")
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

    function eliminaLibro() {
        console.log("elimina");
        console.log(libroTrovato.idLibro)
        fetch(`http://localhost:8080/Biblioteca/Libro/eliminaLibro/${encodeURIComponent(libroTrovato.idLibro)}`,{
            method: 'delete'
        })
        .then(response => {
            if(response.status===200)
            {
                alert("LIBRO ELIMINATO!")
                setLibroTrovato(null);
            }
            else 
            {
                throw new Error("ERRORE IN FASE DI ELIMINAZIONE");  
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
        <>
            <div>
                <h1>Gestione Libro </h1>
                <LogoutOperatore/><br />
                <NavBarOperatore/>
                <NavBarLibro/>
            </div>

            <div className="">
                
                inserisci titolo <input type="text" onChange={catturaTitolo}/>
                <button className="blueButton" onClick={cercaLibro}>Cerca</button>
            </div>

            
                {libroTrovato && (
                    <div className="flex flex-col gap-3 items-center">
                        Titolo <input type="text" value={titoloMod} onChange={catturaTitoloMod}/>
                        Autore <input type="text" value={autoreMod} onChange={catturaAutore}/>
                        Costo GG <input type="text" value={costoMod} onChange={catturaCosto}/> 
                        Genere 
                        <select name="idGenere" id="" required onChange={catturaGenere}>
                            <option value={libroTrovato.genere.idGenere}>{libroTrovato.genere.nomeGenere}</option>
                            {/* Aggiungere while con i generi dinamici */}
                            {lista.map((genere, i) => (
                                <option key={i} value={genere.idGenere}>{genere.nomeGenere}</option>
                            ))}
                        </select>
                        <p>
                            <button className="blueButton" onClick={modificaLibro}>Modifica</button>
                            <button className="redButton" onClick={eliminaLibro}>Elimina</button>
                        </p>
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
            
        </>
    ) 
}

export default GestioneLibro;