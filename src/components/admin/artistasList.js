
import React, { useState, useEffect } from 'react';

import { NavLink, Link, Redirect } from 'react-router-dom';
import '../assets/estilos.css';
import { store } from '../../firebaseConfig';

export default function ArtistList() {

    const [artistas, setArtistas] = useState([]);

    const [searchTerm, setSearch] = useState('');

    const [searchArtista, setSearchArtista] = useState('');


    useEffect(() => {

       store.collection('artistas').get().then(snapshot =>{
           const data = [];
           snapshot.forEach((doc)=>data.push({...doc.data(), id: doc.id}));
           setArtistas(data);
       })

       
    }, [])

    

    


    const searching = e =>{
        e.preventDefault();

        setSearch(searchArtista);
        
    }
    if (artistas.length >= 1) {


        const ArtistaMap = artistas.filter((artista)=>{
            if(searchTerm == ''){
                return artista
            } else if(artista.nombre.toLowerCase().includes(searchTerm.toLowerCase())){
                return artista
            }
        }).map((artista, i) => {
            return (

                <tr key={i}>

                    <th scope="row">{artista.nombre}</th>
                    <td><NavLink to={'/artistas/detalle/' + artista.id} className='btn btn-light'>Ver más</NavLink></td>
                  
                </tr>


            )
        })

     

        return (

           


            <div className='container'>

       

            <div className='row topDetalle'>

                <div className='col-10'>
                    
                <div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="Buscar Artista" aria-label="Buscar" onChange={(event)=>{
      setSearchArtista(event.target.value)
  }} aria-describedby="basic-addon2"/>
  <div className="input-group-append">
    <button className="btn btn-outline-secondary" onClick={searching} type="button">Buscar</button>
  </div>
</div>
                
                </div>
                
                <div className='col-2'>
                <Link className = "btn btn-primary" to={'/artistas/agregar'}>+</Link>
                </div>
            </div>
                

       

                <table className="table table-dark ">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                          

                        </tr>
                    </thead>
                    <tbody>
                  {ArtistaMap}
                    </tbody>
                </table>
            </div>
        )



    } else if( artistas.length === 0) {
        return(

          <div className='container'>
                 <div className='row topDetalle'>

<div className='col-10'>
    
<div className="input-group mb-3">
<input type="text" className="form-control" placeholder="Buscar Artista" aria-label="Buscar" onChange={(event)=>{
setSearchArtista(event.target.value)
}} aria-describedby="basic-addon2"/>
<div className="input-group-append">
<button className="btn btn-outline-secondary" onClick={searching} type="button">Buscar</button>
</div>
</div>

</div>

<div className='col-2'>
<Link className = "btn btn-primary" to={'/artistas/agregar'}>+</Link>
</div>
</div>
<div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
            </div>
           
        )
    } else {
        return(
            <div>
                <h1>Error</h1>
            </div>
        )
    }

   


}