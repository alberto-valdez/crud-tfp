import React, { useState, useEffect } from 'react';

import {NavLink} from 'react-router-dom';
import { store } from '../../../firebaseConfig';

export default function AlbumList({ match }) {
    var id = match.params.id;

    const [discografia, setDiscografia] = useState([]);


    useEffect(() => {

       store.collection(`/artista/${id}/albums`) .get().then(snapshot=>{
           const data = [];
           snapshot.forEach((doc)=>data.push({...doc.data(), id:doc.id}));
           console.log(data)
           setDiscografia(data)
       })
    }, [])


    if (discografia.length >= 1) {
        const DiscMap = discografia.map((discos, i) => {
            return <tr key={i}>
                <th scope='row'>{discos.album}</th>
                <td>{discos.artista}</td>
                <td> <NavLink className='btn btn-warning' to={`/artistas/detalle/editAlbum/${id}/${discos.id}`}>Ver más</NavLink></td>
            </tr>
        })



    return (

        <div className='container topDetalle'>
            <table className="table table-dark ">
                <thead>
                    <tr>
                        <th scope='col'>Titulo</th>
                        <th scope='col'>Artista</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {DiscMap}
                </tbody>

            </table>

        </div>
    )
}else if(discografia.length === 0){
    return(
        <div className="d-flex justify-content-center">
       
         <h3>No hay albums de este artista</h3>
       
      </div>
    )
} else {
    return(
        <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    )

}
}