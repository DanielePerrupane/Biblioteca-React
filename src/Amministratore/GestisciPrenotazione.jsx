import NavBarOperatore from "./NavBarOperatore";
import LogoutOperatore from "./LogoutOperatore";
import { useState, useEffect } from "react";
import {DataTable} from "primereact/datatable"
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';

function GestisciPrenotazione() {

    const [listaPrenotazioni, setLista] = useState(null);
    const [mostraTabella, setMostraTabella] = useState(true);
    
    const [dataInizio, setDataInizio] = useState('');
    const [dataFine, setDataFine] = useState('');
    const [acconto, setAcconto] = useState('');
    const [totale, setTotale] = useState('');
    const [titolo, setTitolo] = useState('');
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
    const [listaLibri, setListaLibri] = useState([]);
    
    const catturaDataInizio = (e) => {
        setDataInizio(e.target.value);
        console.log(dataInizio)
    }
    const catturaDataFine = (e) => {
        setDataFine(e.target.value);
        console.log(dataFine)
    }
    const catturaAcconto = (e) => {
        setAcconto(e.target.value);
        console.log(acconto)
    }
    const catturaTotale = (e) => {
        setTotale(e.target.value);
        console.log(totale)
    }
    const catturaTitolo = (e) => {
        setTitolo(e.target.value);
        console.log(titolo)
    }


    function prendiPrenotazioni() {

        fetch("http://localhost:8080/Biblioteca/Operatore/prendiPrenotazioni",{
            method: 'get'
        })
        .then(response => {
            if(response.status===200){
                console.log(response);
                response.json().then(lista => {
                    setLista(lista);
                })
            }
            if(response.status===500)
            {
                throw new Error("ERRORE DEL SERVER");
            }
        })          
        .catch(error => {
            alert(error);
        })
    }

    useEffect(() => {
        prendiPrenotazioni();
    }, []);

    useEffect(() => {
        console.log("listaPrenotazioni aggiornata:", listaPrenotazioni);
    }, [listaPrenotazioni]);
    
    function handleModifica(rowData) {
        console.log("Modifica");
        console.log(rowData);
        setMostraTabella(false);
        setDataInizio(rowData.dataInizio)
        setDataFine(rowData.dataFine)
        setAcconto(rowData.acconto)
        setTotale(rowData.totale)
        setTitolo(rowData.titoloLibro)   
        setUsername(rowData.username)
        setId(rowData.idPrenotazione);   
    }

    function chiudiModifica()
    {
        setMostraTabella(true);
    }


    function handleElimina(rowData) {
        console.log("Elimina");
        console.log(rowData.idPrenotazione);

        fetch(`http://localhost:8080/Biblioteca/Operatore/eliminaPrenotazione/${rowData.idPrenotazione}`,{
            method: 'delete'
        })
        .then(response => {
            if(response.status===200)
            {
                alert("ELIMINAZIONE AVVENUTA CON SUCCESSO!");
                prendiPrenotazioni();
               
            }
            if(response.status===500)
            {
                throw new Error("Errore del server!")
            }
        })
        .catch(error => {
            alert(error);
        })
    }

    function effettuaModifica() {
        console.log(dataInizio)
        console.log(dataFine)
        console.log(acconto)
        console.log(totale)
        console.log(username)
        console.log(id)
        console.log(titolo)

        fetch("http://localhost:8080/Biblioteca/Operatore/modificaPrenotazione", {
            
            method: 'put',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                idPrenotazione:id,
                dataInizio: dataInizio,
                dataFine: dataFine,
                acconto: acconto,
                totale: totale,
                username: username,
                titoloLibro: titolo
            })

        })
        .then(response => {
            if(response.status===200)
            {
                alert("MODIFICA EFFETTUATA CON SUCCESSO!")
                setMostraTabella(true);
                prendiPrenotazioni();
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
                <h1>Gestisci Prenotazione</h1>
                <LogoutOperatore/><br />
                <NavBarOperatore></NavBarOperatore>
            </div>

            {mostraTabella && (
                <div>
                {/* Qui visualizzo l'elenco delle prenotazioni con un tasto di modifica e di elimina */}
                <DataTable  
                    value={listaPrenotazioni} 
                    paginator 
                    rows={5} 
                    emptyMessage="nessuna prenotazione presente"
                    >
                    <Column field="idPrenotazione" header="ID" sortable/>
                    <Column field="dataInizio" header="DataInizio" sortable/>
                    <Column field="dataFine" header="DataFine" sortable/>
                    <Column field="acconto" header="Acconto" sortable/>
                    <Column field="totale" header="Totale" sortable/>
                    <Column field="acconto" header="Acconto" sortable/>
                    <Column field="username" header="Cf Cliente" sortable/>
                    <Column field="titoloLibro" header="Titolo Libro" sortable/>
                    <Column header="Azioni" body={(rowData) => (
                        <>
                            <button className="blueButton" onClick={() => handleModifica(rowData)}>Modifica</button>
                            <button className="redButton" onClick={() => handleElimina(rowData)}>Elimina</button>
                        </>
                    ) }>
                    
                    </Column>
                </DataTable>
            </div>
            )}

            {mostraTabella==false && (
                <div className="flex flex-col items-center ">
                    <label htmlFor="id">Id</label><input id="id" type="text" value={id} readOnly/><br />
                    <label htmlFor="dataInizio">Data Inizio</label><input id="dataInizio" type="date" onChange={catturaDataInizio} value={dataInizio}/><br />
                    <label htmlFor="dataFine">Data Fine</label><input id="dataFine" type="date" onChange={catturaDataFine} value={dataFine}/><br />
                    <label htmlFor="acconto">Acconto</label><input id="acconto" type="number" onChange={catturaAcconto} value={acconto}/><br />
                    <label htmlFor="tot">Totale</label><input id="tot" type="number" onChange={catturaTotale} value={totale}/><br />
                    {/* mettere una select con tutti i titoli disponibili */}
                    <label htmlFor="titolo">Titolo</label>
                    {/* <input id="titolo" type="text" onChange={catturaTitolo} value={titolo}/><br /> */}
                    <select name="" id="titolo" value={listaLibri.idLibro} onChange={catturaTitolo}>
                        <option value="">{titolo}</option>
                        {listaLibri.map((libro,i) => (
                            <option key={i} value={libro.titoloLibro}>{libro.titoloLibro}</option>
                        ))}
                    </select><br />
                    <label htmlFor="cf">cf</label><input id="cf" type="text" value={username} readOnly/><br />
                    <button className="blueButton" onClick={effettuaModifica}>Modifica</button>
                    <button className="redButton" onClick={chiudiModifica}>Torna indietro</button>
                </div>
            )}
            
        </>
    )
}

export default GestisciPrenotazione;