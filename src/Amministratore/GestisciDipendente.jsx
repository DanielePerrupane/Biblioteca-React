import { useState } from "react";
import LogoutOperatore from "./LogoutOperatore";
import NavBarOperatore from "./NavBarOperatore";


function GestisciDipendente() {

    const [cfDaRic, setCfDaRic] = useState('');
    const [opTrovato, setOpTrovato] = useState(null);
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [cf, setCf] = useState('');
    const [user, setUser] = useState('');
    const [psw, setPsw] = useState('');
    const [categoria, setCat] = useState('');

    const catturaCfDaRic = (e) => {
        setCfDaRic(e.target.value);
    }

    const catturaNome = (e) => {
        console.log(nome);
        setNome(e.target.value);
    }
    const catturaCognome = (e) => {
        setCognome(e.target.value);
    }
    const catturaUser = (e) => {
        setUser(e.target.value);
    }
    const catturaPsw = (e) => {
        setPsw(e.target.value);
    }
    const catturaIdCat = (e) => {
        setCat(e.target.value);
    }

    function modificaOperatore() {
        console.log(categoria)
        fetch("http://localhost:8080/Biblioteca/Operatore/modificaOperatore", {
            method: 'put',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                    cfOperatore: cf,
                    cognomeOperatore: cognome,
                    nomeOperatore: nome,
                    pswOperatore: psw,
                    usernameOperatore: user,
                    categoriaOperatore: {
                        idCategoriaOperatore: categoria=="amministratore" ? 1 : 2,
                        nomeCategoriaOperatore: categoria
                    }
            })
        })
        .then(response => {
            if(response.status===200)
            {
                // Modifica effettuata
                alert("MODIFICA EFFETTUATA CON SUCCESSO!")
                setOpTrovato(null);
            }
            if(response.status===500)
            {
                // ERRORE DEL SERVER
                throw new Error("ERRORE DEL SERVER")
            }
        })
        .catch(error => {
            alert(error);
        })
    }

    function cercaOperatore() {
        console.log(cfDaRic);
        fetch(`http://localhost:8080/Biblioteca/Operatore/cercaOperatore/${cfDaRic}`,{
            method: 'get'
        })
        .then(response => {
            if(response.status===200)
            {
                response.json().then(operatore => {
                    console.log(operatore.nomeOperatore);
                    console.log(operatore);
                    setOpTrovato(operatore);
                    setNome(operatore.nomeOperatore);
                    setCognome(operatore.cognomeOperatore);
                    setCf(operatore.cfOperatore);
                    setUser(operatore.usernameOperatore);
                    setPsw(operatore.pswOperatore);
                    setCat(operatore.categoriaOperatore.idCategoriaOperatore==1 ? "amministratore" : "operatore" )
                })
            }
            if(response.status===204)
            {
                setOpTrovato(null);
                throw new Error("NESSUN OPERATORE TROVATO");
            }
            if(response.status===500)
            {
                setOpTrovato(null);
                throw new Error("ERRORE DEL SERVER");
            }
        })
        .catch(error => {
            alert(error)
        })
    }

    return(
        <>
            <div>
                <h1>Gestisci Dipendente</h1>
                <LogoutOperatore/>
            </div>
            <NavBarOperatore/>
            <div>
                <label htmlFor="cfDaRic">Inserisci Cf </label><input type="text" id="cfDaRic" onChange={catturaCfDaRic}/>
                <button className="blueButton" onClick={cercaOperatore}>Cerca</button>
            </div>
            {opTrovato && (
                <div className="flex flex-col gap-3 items-center">

                    <label htmlFor="nome">Nome</label><input type="text" id="nome" value={nome} onChange={catturaNome}/>
                    <label htmlFor="cognome">Cognome</label><input type="text" id="cognome" value={cognome} onChange={catturaCognome}/>
                    <label htmlFor="cf">Cod Fisc</label><input type="text" id="cf" value={cf} readOnly/>
                    <label htmlFor="user">Username</label><input type="text" id="user" value={user} onChange={catturaUser}/>
                    <label htmlFor="psw">Password</label><input type="text" id="psw" value={psw} onChange={catturaPsw}/>
                    <label htmlFor="categoria">Categoria Assegnata</label><input type="text" id="categoria" value={categoria} readOnly/>
                    <label htmlFor="catMod">Nuova Categoria</label>
                    <select name="" id="catMod" onChange={catturaIdCat}>
                        <option value={opTrovato.categoriaOperatore.idCategoriaOperatore}>--------------</option>
                        <option value="amministratore">amministratore</option>
                        <option value="operatore">operatore</option>
                    </select>
                    <button className="blueButton" onClick={modificaOperatore}>Modifica</button>
                    

                </div>
            )}
        </>
    )
}

export default GestisciDipendente;