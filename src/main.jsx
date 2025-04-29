import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import RegistrazioneCliente from './Cliente/RegistrazioneCliente.jsx';
import Profilo from './Cliente/Profilo.jsx';
import './index.css'
import App from './App.jsx'
import AreaPersonale from './Cliente/AreaPersonale.jsx';
import Prenota from './Cliente/Prenota.jsx';
import LoginOperatore from './Amministratore/LoginOperatore.jsx';

import InserisciDipendente from './Amministratore/InserisciDipendente.jsx';
import GestisciDipendente from './Amministratore/GestisciDipendente.jsx';
import GestioneLibro from './Amministratore/GestioneLibro.jsx';
import InserisciLibro from './Amministratore/InserisciLibro.jsx';
import InserisciGenere from './Amministratore/InserisciGenere.jsx';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Tema PrimeReact
import 'primereact/resources/primereact.min.css';                 // Stili base dei componenti
import 'primeflex/primeflex.css';                                 // Layout PrimeFlex



const router = createBrowserRouter([

  {
    path:"/",
    element: <App></App>
  },
  {
    path:"/RegistrazioneCliente",
    element: <RegistrazioneCliente/>
  },
  {
    path:"/Profilo",
    element: <Profilo/>
  }
  ,
  {
    path:"/AreaPersonale",
    element: <AreaPersonale/>
  }
  ,
  {
    path:"/Prenota",
    element: <Prenota/>
  }
  ,
  {
    path:"/LoginOperatore",
    element: <LoginOperatore/>
  }
  ,
  {
    path:"/InserisciDipendente",
    element: <InserisciDipendente/>
  }
  ,
  {
    path: "/GestisciDipendente",
    element: <GestisciDipendente/>
  }
  ,
  {
    path: "/GestioneLibro",
    element: <GestioneLibro/>
  }
  ,
  {
    path: "/InserisciLibro",
    element: <InserisciLibro/>
  }
  ,
  {
    path: "/InserisciGenere",
    element: <InserisciGenere/>
  }
  ,


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
