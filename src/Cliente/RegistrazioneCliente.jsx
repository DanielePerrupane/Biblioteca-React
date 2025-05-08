import { useState } from "react";
import NavBar from "./NavBar";
import './RegistrazioneCliente.css'
import {Link, useNavigate} from "react-router-dom";

    





function RegistrazioneCliente() {
    const [nomeCliente, setNome] = useState('');
    const [cognomeCliente,setCognome] = useState('');
    const [cfCliente, setCf] = useState('');
    const [email, setEmail] = useState('');
    const [nTel, setNTel] = useState('');
    const [user, setUser] = useState('');
    const [psw, setPsw] = useState('');

    const navigate = useNavigate();

    const catturaNome = (e) => {
        setNome(e.target.value)
        
    } 
    const catturaCognome = (e) => {
        setCognome(e.target.value)
    }
    const catturaCf = (e) => {
        setCf(e.target.value)
    }
    const catturaEmail = (e) => {
        setEmail(e.target.value)
    }
    const catturaNTel = (e) => {
        setNTel(e.target.value)
        
    } 
    const catturaUsername = (e) => {
        setUser(e.target.value)
    }
    const catturaPsw = (e) => {
        setPsw(e.target.value)
    }
    

    function RegistraCliente() {
        console.log(nomeCliente)
        console.log(cognomeCliente)
        console.log(cfCliente)
        console.log(email)
        console.log(nTel)
        console.log(user)
        console.log(psw)
        
        class Cliente{
            constructor(_nome,_cognome,_cf,_email,_nTel,_user,_psw){
                this.nomeCliente=_nome;
                this.cognomeCliente=_cognome;
                this.cfCliente=_cf;
                this.emailCliente=_email;
                this.numTelCliente=_nTel;
                this.usernameCliente=_user;
                this.pswCliente=_psw;
            }
        }

        let c = new Cliente(nomeCliente,cognomeCliente,cfCliente,email,nTel,user,psw);

        console.log(JSON.stringify(c))

        fetch("http://localhost:8080/Biblioteca/Cliente/registraCliente",{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(c)
        })
        .then(response => {
            if(response.status===201)
            {
                alert("REGISTRAZIONE AVVENUTA CON SUCCESSO");
                //Aggiungere un eventuale redirect
            }
            if(response.status===204)
            {
                throw new Error("Cliente non creato")
            }
            if(response.status===400)
            {
                throw new Error("Username o codice Fiscale già in uso");
            }
            if(response.status===500)
            {
                throw new Error("Errore del server");
            }
        })
        .catch(error => {
            alert(error)
            //Aggiungere redirect
        })
       
        
    
    }


    return(
        <>
            <div className="flex flex-col gap-3 container">
                <h1>Registrazione Cliente</h1>
                
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" onChange={catturaNome}/>
                <label htmlFor="cognome">Cognome</label>
                <input type="text" id="cognome" onChange={catturaCognome}/>
                <label htmlFor="cf">Cod Fiscale</label>
                <input type="text" id="cf" onChange={catturaCf}/>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" onChange={catturaEmail}/>
                <label htmlFor="numTel">Num Telefono</label>
                <input type="text" id="numTel" onChange={catturaNTel}/>
                <label htmlFor="user">Username</label>
                <input type="text" id="user" onChange={catturaUsername}/>
                <label htmlFor="psw">Password</label>
                <input type="text" id="psw" onChange={catturaPsw}/>
                <p>
                    <button className="blueButton" onClick={RegistraCliente}>Registrati</button>
                    <button className="redButton" onClick={() => navigate("/")}>Indietro</button>
                </p>

            </div>
        </>
    )
}

export default RegistrazioneCliente;