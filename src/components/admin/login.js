import proLogo from '../assets/imagen/tfp.png'
import { useState, useEffect } from 'react'

import { Redirect, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { UseUsuario } from '../assets/userContext';
import { auth } from '../../firebaseConfig';

export default function Login(){


  
    const historial = useHistory();
    const [loginState, setLoginState] = useState({
        user:'',
        pass:''
    })

    const [redirectState, setRedirectState] = useState(false);

  async function enviar (e){
      e.preventDefault()
      console.log('ola')
      auth.signInWithEmailAndPassword(loginState.user, loginState.pass).then(res=>{
        historial.push('/admin'); 
     }).catch(err=>{
      
         if(err.code == 'auth/wrong-password' || err.code == 'user-not-found' ){
             console.log('Usuario o contraseña incorrecto')
         }
     })
  }

  

    return(
        <div className='container'>


            <div className='row contacto'> 
            
            <div className='col-lg-6 img-contacto'>
              <img  src={proLogo}/>
               
            </div>

            <div className='col-lg-6 form-contacto'>
                <form className='form-group' onSubmit={enviar}>
                    <h2>Login</h2>
                    <input type='text'  className='form-control' placeholder='Usuario' onChange={e=>{setLoginState({...loginState, user: e.target.value})}}/>
                    <input type='password'  className='form-control' placeholder='Contraseña' onChange={e=>{setLoginState({...loginState, pass: e.target.value})}}/>
                    
            <button  type='submit' className='btn btn-danger  btn-lg btn-block'>Iniciar Sesión</button>
                </form>
            </div>
            
            </div>
            

        </div>
    )
}