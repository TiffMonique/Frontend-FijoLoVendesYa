import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Context = createContext({});

export function ContextUserProvider({children}){
    const [logged, setlogged] = useState(false);
    const [admin, setadmin] = useState(false);
    const [idSesion, setidSesion] = useState(null);

    useEffect(async() => {
       await axios
      .get(
        "http://localhost:4000/api/tienda/sesion", {withCredentials:true}
      )
      .then((response) => {
        console.log();
        const admin = response.data.admin;
        const logged = response.data.logged;
        const idSesion = response.data.idSesion
        setlogged(logged==true);
        setadmin(admin==true);
        setidSesion(idSesion)
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);

    return <Context.Provider value={{logged, admin, idSesion, setlogged, setadmin, setidSesion}}>
        {children}
    </Context.Provider>
}

export default Context;