import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useState, useEffect } from "react";

function AreaPersonale() {

    const location = useLocation();
    const {user} = location.state || {};
    const [datiTrovati, setDatiTrovati] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nome,setNome] = useState('');
    const [cognome,setCognome] = useState('');
    const [cf,setCf] = useState('');
    const [email,setEmail] = useState('');
    const [nTel,setNTel] = useState('');
    const [username,setUser] = useState('');
    const [psw,setPsw] = useState('');

    const catturaNome = (e) => {
        setNome(e.target.value);
        console.log(nome);
    }
    const catturaCognome = (e) => {
        setCognome(e.target.value);
        console.log(cognome);
    }
    
    const catturaEmail = (e) => {
        setEmail(e.target.value);
        console.log(email)
    }
    const catturaNTel = (e) => {
        setNTel(e.target.value);
        console.log(nTel);
    }
    const catturaUsername = (e) => {
        setUser(e.target.value);
        console.log(username);
    }
    const catturaPsw = (e) => {
        setPsw(e.target.value);
        console.log(psw);
    }




    useEffect(() => {
        visualizzoDati();
    }, []);

    function visualizzoDati() {
        setLoading(true);
        fetch(`http://localhost:8080/Biblioteca/Cliente/visualizzoDati/${user}`,{
            method: 'get'
        })
        .then(response => {
            if(response.status===200)
            {   
                
                return response.json();
                 
            }
            if(response.status===204)
            {
                alert("non trovato")
            }
        })
        .then(cliente => {
            setTimeout(() => {
                setDatiTrovati(cliente);
                //qui devo assegnare i valori di cliente a nome cognome ecc...
                setNome(cliente.nomeCliente);
                setCognome(cliente.cognomeCliente);
                setCf(cliente.cfCliente)
                setEmail(cliente.emailCliente);
                setNTel(cliente.numTelCliente);
                setUser(cliente.usernameCliente);
                setPsw(cliente.pswCliente);
                setLoading(false);
              }, 1000);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        })
    }

    function modificaCliente() {
        console.log(nome);
        console.log(cognome);
        console.log(cf);
        console.log(email);
        console.log(nTel);
        console.log(username);
        console.log(psw);

        fetch("http://localhost:8080/Biblioteca/Cliente/modificaCliente",{
            method: 'put',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                nomeCliente: nome,
                cognomeCliente: cognome,
                cfCliente: cf,
                emailCliente: email,
                numTelCliente: nTel,
                usernameCliente: username,
                pswCliente: psw
            })

        })
        .then(response => {
            if(response.status===200)
            {

                alert("MODIFICA AVVENUTA CON SUCCESSO");
                response.json().then(cliente => {
                    setUser(username);
                    
                })
                //qui aggiungo un reload della pagina
                visualizzoDati();
                

            }
            
            if(response.status===500)
            {
                throw new Error("ERRORE DEL SERVER");
            }
        })

    }


    return(
        <div className="w-200 h-500 bg-amber-50 rounded-2xl">
            <div>
                <p><Logout/></p>
                <h2 className="text-black">Area Personale {user} </h2>
            </div>

            <p className="bg-amber-100 text-shadow-amber-100">
                
                <Link to="/Profilo" state={{user:user}}>| Home Page |</Link>
                <Link to="/Prenota" state={{user:user}}> Prenota |</Link>
                <Link to="/AreaPersonale" state={{user:user}}> Area Personale |</Link>
                
            </p>
            {/* aggiungere onChange agli input che si vogliono modificare */}
            <div className="items-center bg-amber-500 text-black flex flex-col">
                {loading ? (
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                ) : (
                    <>
                <label htmlFor="nome">Nome</label><input id="nome" type="text" className="w-50" value={nome} onChange={catturaNome}/>
                <label htmlFor="cognome">Cognome</label><input id="cognome" type="text" className="w-50" value={cognome} onChange={catturaCognome}/>
                <label htmlFor="cf">Cod Fiscale</label><input id="cf" type="text" className="w-50" value={cf} readOnly/> 
                <label htmlFor="email">Email</label><input id="email" type="text" className="w-50" value={email} onChange={catturaEmail}/>
                <label htmlFor="ntel">n Tel</label><input id="ntel" type="text" className="w-50" value={nTel} onChange={catturaNTel}/>
                <label htmlFor="user">Username</label><input id="user" type="text" className="w-50" value={username} readOnly/>
                <label htmlFor="psw">Password</label><input id="psw" type="text" className="w-50" value={psw} onChange={catturaPsw}/>
                <button className="text-white" onClick={modificaCliente}>Modifica</button>
                </>
                )}
                
            </div>

            
            
        </div>
    )
}
export default AreaPersonale;