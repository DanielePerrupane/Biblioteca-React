import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'


function LoginOperatore() {

    const [user,setUser] = useState('');
    const [psw,setPsw] = useState('');
    const navigate = useNavigate();

    const catturaUser = (e) => {
        setUser(e.target.value);
    }

    const catturaPsw = (e) => {
        setPsw(e.target.value);
    }

    function effettuaLogin() {
        console.log(user + psw)

        fetch("http://localhost:8080/Biblioteca/Operatore/login",{

            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: user,
                psw: psw
            })
            
        })
        .then(response => {
            if(response.status===200)
            {
                console.log("login")
                //navigo sulla pagina dell'operatore
                navigate("/InserisciDipendente",
                    {state: {user : user}
                })

            }

            if(response.status===401)
            {
                console.log("401")
                alert("PASSWORD ERRATA")
            }

            if(response.status===400)
            {
                console.log("400")
                alert("USERNAME ERRATO")
            }
        })
    }

    return(
        <div className="flex flex-col gap-3 items-center">
            <h1>Login Operatore</h1>

            <label htmlFor="username">Username</label><input className="w-50" type="text" id="username" onChange={catturaUser}/>
            <label htmlFor="psw">Password</label><input className="w-50" type="password" id="psw" onChange={catturaPsw}/>
            <p>
                <button onClick={effettuaLogin}>Login</button> 
            </p>

        </div>
    )
}

export default LoginOperatore;