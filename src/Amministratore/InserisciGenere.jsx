import NavBarLibro from "./NavBarLibro";
import {useState} from "react";
import LogoutOperatore from "./LogoutOperatore";
import NavBarOperatore from "./NavBarOperatore";



function InserisciGenere() {
    const [nome, setNome] = useState('');
    const [descrizione, setDescrizione] = useState('');

    const catturaNome = (e) => {
        setNome(e.target.value);
        console.log(nome);
        
    }
    const catturaDescrizione = (e) => {
        setDescrizione(e.target.value);
        console.log(descrizione);
    }

    function inserisciGenere() {
        console.log(nome + " " + descrizione) 

        fetch("http://localhost:8080/Biblioteca/Libro/inserisciGenere",{
            method: 'post',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                descrizioneGenere: descrizione,
                nomeGenere: nome
            })
        })
        .then(response => {
            if(response.status===200)
            {
                alert("INSERIMENTO AVVENUTO CON SUCCESSO!");
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
    return(
        <>
            <h1>Inserisci Genere</h1>
            <LogoutOperatore></LogoutOperatore><br />
            <NavBarOperatore/>
            <NavBarLibro/>
            <div className="flex flex-col gap-3 items-center">
                Descrizione<textarea className="bg-zinc-500" name="" id="" onChange={catturaDescrizione}></textarea>
                Nome<input type="text" className="bg-zinc-500 w-28" onChange={catturaNome}/>
                <button className="blueButton" onClick={inserisciGenere}>Inserisci</button>
            </div>
        </>
    )
}

export default InserisciGenere;