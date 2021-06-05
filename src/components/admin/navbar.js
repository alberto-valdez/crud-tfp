
import React, {useState, useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import { auth } from '../../firebaseConfig';
import swal from 'sweetalert';
import {UseUsuario} from '../assets/userContext';

const NvabarAdmin = props =>{
  const historial = useHistory();
  
  const[isNavCollapsed, setCollapsed] = useState(true);
  
  const {setUsuario} = UseUsuario();
  
  const handleNavCollapse = () => setCollapsed(!isNavCollapsed);
  
  const logout = (e) => {
    e.preventDefault();
    swal({
      title: "¿Quieres cerrar sesión?",
      icon:'warning',
      buttons: true,
      dangerMode: true,
  }).then((willDelete)=>{
      if(willDelete){
        setUsuario(null)
          auth.signOut();

          historial.push('/login')
       
      } else {
          swal('Se canceló la acción')
      }
  })
  }
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand">TodosFlotanPro/Admin</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse': ''} navbar-collapse`}id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <NavLink to='/artistas' className="nav-link">Artistas </NavLink >
            </li>
            <li className="nav-item">
            <NavLink to='/posts' className="nav-link">Articulos </NavLink >
            </li>
            <li className="nav-item">
            <NavLink to='/contacto' className="nav-link">Contacto </NavLink >
            </li>
            {/* <li className="nav-item">
            <NavLink to='/podcast' className="nav-link">Podcast </NavLink >
            </li> */}

          </ul>
        </div>

        <button onClick={logout} className="nav-link logout btn btn-dark">LogOut</button>
      </nav>
    )
}

export default NvabarAdmin;