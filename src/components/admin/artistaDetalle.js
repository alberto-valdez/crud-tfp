

import React, { useState, useEffect } from 'react';

import { Link, Redirect } from 'react-router-dom';
import '../assets/estilos.css';
import swal from 'sweetalert';
import { store, storage } from '../../firebaseConfig';


export default function ArtistaDetalle({ match }) {

    const id = match.params.id;
    const [statusDelete, setStatusDelete]=  useState('WATING');

    const [artista, setArtista] = useState({});

    useEffect(() => {
       store.collection('artistas').where('__name__', '==', `${id}`).get().then(snapshot=>{
           setArtista(snapshot.docs[0].data())
       }).catch(err=>{
           console.log(err)
       })
    }, [])


   const deleteImage = () =>{
    
    let imageRef = storage.ref().child((`artistas/${artista.imageName}`));
    imageRef.delete().then(str=>{
        console.log(str)
    }).catch(err=>{console.log(err)})
   
   }


    const deleteArtista = e =>{
        e.preventDefault();

        swal({
            title: "¿Estas seguro de borrar el Registro del artista?",
            text: "Una vez borrado se perdera la informacion ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete)=>{

            if(willDelete){
        store.collection('artistas').doc(`${id}`).delete().then(res=>{
                      
                    deleteImage();
                    setStatusDelete('DELETE') 
                    swal(
                        'Artista borrado',
                        'El artista ha si sido borrado correctamente',
                        'success'
                      )
        })
        
            } else{

                swal(
                    'Se cancelo la acción borrar',
                    
                  )

            }
        })
       
    
    }

    if(statusDelete === 'DELETE'){
        return(
           <Redirect to ={'/admin'}/>
        )
    }

    return (


        <div className='text-center container topDetalle'>
            <div className="card mb-3 cardStyle" >

                <div className="row g-0">


                    {artista.image !== null ? (
                        <div className="col-md-4">
                                <img className="imgDetalle" src={artista.image} alt="" />
                          

                        </div>
                    ) : (
                            <div className="col-md-4">
                              <img className="imgDetalle" src="https://uss.com.ar/corporativo/wp-content/themes/consultix/images/no-image-found-360x260.png" alt="" />

                            </div>
                        )}
 




                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title text-dark">{artista.nombre}</h5>
                            <p className="card-text text-dark">{artista.descripcion}</p>

                            <p className="card-text text-dark">Redes sociales:</p>

                            <p className="card-text"><Link className="card-text" to={{ pathname: 'https://' + artista.instagram }} target="_blank" >{artista.instagram}</Link></p>
                            <p className="card-text"><Link className="card-text" to={{ pathname: 'https://' + artista.facebook }} target="_blank" >{artista.facebook}</Link></p>
                            <p className="card-text"><Link className="card-text" to={{ pathname: 'https://' + artista.spotify }} target="_blank" >{artista.spotify}</Link></p>
                            <p className="card-text"><Link className="card-text" to={{ pathname: 'https://' + artista.appleMusic }} target="_blank" >{artista.appleMusic}</Link></p>
                            <p className="card-text"><Link className="card-text" to={{ pathname: 'https://' + artista.soundcloud }} target="_blank" >{artista.soundcloud}</Link></p>
                            <div className="col-md-12">
                                <Link className="btn btn-warning espacioButton" to={"/artistas/editar/" +id} >Editar</Link>
                                <Link className="btn btn-secondary espacioButton" to={"/artistas/detalle/albums/"+id} >Ver álbums</Link>
                                <Link className="btn btn-info  espacioButton" to={"/artistas/detalle/agregaralbum/"+id} >Agregar álbum</Link>
                                <button className="btn btn-danger  espacioButton" onClick = {deleteArtista} >Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}