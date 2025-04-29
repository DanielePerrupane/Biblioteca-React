import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import NavBar from './Cliente/NavBar'
import { useNavigate,Link } from 'react-router-dom'

function App() {
  
  const [username, setUser] = useState('');
  const [psw, setPsw] = useState('');
  const navigate = useNavigate();

  const catturaUsername = (e) => {
    setUser(e.target.value);
    
  }
  const catturaPsw = (e) => {
    setPsw(e.target.value);
    
  }

  function effettuaLogin() {

    console.log("user: "+username);
    console.log("psw: "+psw);

    fetch("http://localhost:8080/Biblioteca/Cliente/login",{
      method: 'post',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({
        user: username,
        psw: psw
      })
    })
    .then(response => {
      if(response.status===200){
        
         
          //redirect 
          navigate("/Profilo",{
            state: { user: username }
          })
        
      }
      if(response.status===400)
      {
        alert("USERNAME INESISTENTE.")
      }
      if(response.status==401)
      {
        
          alert("PASSWORD ERRATA");
        
      }
      if(response.status===500)
      {
        throw new Error("Errore del server");
      }
      
    })
    .catch(error => {
      alert(error);
    })

  }

  return (
    <>
      <div className='flex flex-col gap-3'>
      <h1>Login Cliente</h1>
        
        <label htmlFor="user">Username</label>
        <input type="text" id="user" onChange={catturaUsername}/>
        <label htmlFor="psw">Password</label>
        <input type="password" id="psw" onChange={catturaPsw}/>
        <p>
          <button onClick={effettuaLogin}>Login</button>
          <Link to={"/RegistrazioneCliente"}>Registrati</Link>
        </p>
      </div>
    </>
  )
}

export default App
