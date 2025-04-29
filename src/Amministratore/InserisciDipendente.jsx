import LogoutOperatore from "./LogoutOperatore";
import NavBarOperatore from "./NavBarOperatore";
import { useState } from "react";

function InserisciDipendente() {

    const {user} = location.state || {}

    const [nome,setNome] = useState('');
    const [cognome,setCognome] = useState('');
    const [cf,setCf] = useState('');
    const [username,setUsername] = useState('');
    const [psw,setPassword] = useState('');
    const [idCat,setIdCat] = useState(1);

        const catturaNome = (e) =>
        {   
            
            setNome(e.target.value)
            console.log(nome);
        }
        const catturaCognome = (e) =>
        {
            setCognome(e.target.value)
        }
        const catturaCf = (e) =>
        {
            setCf(e.target.value)
        }
        const catturaUsername = (e) =>
        {
            setUsername(e.target.value)
        }
        const catturaPsw = (e) =>
        {
            setPassword(e.target.value)
        }
        const catturaIdCat = (e) =>
        {
            setIdCat(e.target.value)   
        }

        function effettuaRegistrazione() {

            console.log(nome);
            console.log(cognome);
            console.log(cf);
            console.log(username);
            console.log(psw);
            console.log(idCat);
    
            fetch("http://localhost:8080/Biblioteca/Operatore/registrazione",{
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    cfOperatore: cf,
                    cognomeOperatore: cognome,
                    nomeOperatore: nome,
                    pswOperatore: psw,
                    usernameOperatore: username,
                    categoriaOperatore: {
                        idCategoriaOperatore: idCat,
                        nomeCategoriaOperatore: idCat==1 ? "Amministratore" : "Dipendente"
                    }
                })
            })
            .then(response => {
                if(response.status===201)
                {
                    alert("OPERATORE REGISTRATO!");
                }
                if(response.status===204)
                {
                    throw new Error("USERNAME GIA' PRESENTE");
                }
                if(response.status===400)
                {
                    throw new Error("CF GIA' IN USO");
                }
            })
            .catch(error => {
                alert(error);
            })
    
        }

    return(
        <>
            <div>
                <h1>Inserisci Dipendente</h1>
                <LogoutOperatore/> Benvenuto {user}
            </div>
            <NavBarOperatore/>
            
            
            <div  className="flex flex-col gap-3 items-center" >
            <label htmlFor="nome">Nome</label><input type="text" id="nome" onChange={catturaNome} />
            <label htmlFor="cognome">Cognome</label><input type="text" id="cognome" onChange={catturaCognome}/>
            <label htmlFor="cf">Cod Fiscale</label><input type="text"  id="cf" onChange={catturaCf}/>
            <label htmlFor="username">Username</label><input type="text"  id="username" onChange={catturaUsername}/>
            <label htmlFor="psw">Password</label><input type="text"  id="psw" onChange={catturaPsw}/>
            <label htmlFor="Categoria">Categoria</label>
            <select name="" id="Categoria" onChange={catturaIdCat}>
                <option value="none">---------------</option>
                <option value="1">Amministratore</option>
                <option value="2">Dipendente</option>
            </select>
            <p>
                <button onClick={effettuaRegistrazione}>Inserisci</button>
                
            </p>
            </div>

        
        </>
    )
}

export default InserisciDipendente;