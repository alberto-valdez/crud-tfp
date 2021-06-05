
import React, { useState, useMemo, useEffect } from 'react'

import { auth } from '../../firebaseConfig';
const UsuarioContext = React.createContext();

export function UserProvider(props){


    const [usuario, setUsuario] = useState(null);

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
             setUsuario(user);
             
          
            } else {
                console.log('estoy entrando a null')
                setUsuario(null)
            }
        })
    },[])

    


    const value = useMemo(()=>{
        return({
            usuario,
            setUsuario
        })
    },[usuario, setUsuario]);

    return <UsuarioContext.Provider value={value} {...props} />
}

export function UseUsuario(){
    const context = React.useContext(UsuarioContext);

    if(!context){
        throw new Error('useUsuario debe estar dentro del provedor usuarioContext');
    }

    return context;
}