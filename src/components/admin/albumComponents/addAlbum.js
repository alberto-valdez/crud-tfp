import React, { useState, useEffect } from 'react';

import swal from 'sweetalert';
import {Redirect, useHistory} from 'react-router-dom';

import '../../assets/estilos.css'
import { storage, store } from '../../../firebaseConfig';

export default function AddAlbum({ match }) {

    const id = match.params.id;

    const [image, setImage] = useState();

    const [disco, setAlbum] = useState({
        album: '',
        lanzamiento:'',
        artista: '',
        spotify: '',
        appleMusic: '',
        image:'',
        imageName:''
    })
    const changeImage = (event) => {
        setImage(event.target.files[0]);
    }

    const historial = useHistory();
   
    const agregarAlbum = (e) => {
        e.preventDefault()
        
        const uploadImage = storage.ref(`albums/${image.name}`).put(image);
        
        uploadImage.on("state_changed", snapshot =>{}, error=>{console.log(error)},
            ()=>{
                storage.ref('albums').child(image.name).getDownloadURL().then(url=>{
                    setAlbum({...disco, image:url, imageName:image.name})
                })
            }
            )            
    }

    const makeIt = async() =>{
      
        try{
            const agregar = await store.collection(`/artista/${id}/albums/`).add(disco);
            if(agregar){
                swal(
                    'Artista Agregado',
                    'Se completo la acción',
                    'success'
                )

                historial.push('/artistas/detalle/'+id)


            }
        }catch(err){
            console.log(err)
                swal(
                    'Hubo un error al agregar',
                    'Intente más tarde',
                    'warning'
                )
            }
        }
    

    useEffect(()=>{
            if(disco.image != ''){
                makeIt();
            }
    },[disco.image])



    return (
        <div className='container topDetalle'>

            <form onSubmit={agregarAlbum} className="form-row justify-content-md-center  ">
                <div className='col-md-8'>
                    <label htmlFor='tituloAlbum'>Título del álbum</label>
                    <input type='text' value={disco.album} onChange={e => setAlbum({ ...disco, album: e.target.value })} className='form-control' />
                </div>

                <div className='col-md-8'>
                    <label htmlFor='artista'>Nombre del autor</label>
                    <input type='text' value={disco.artista} onChange={e => setAlbum({ ...disco, artista: e.target.value })} className='form-control' />
                </div>

                <div className='col-md-8'>
                    <label htmlFor='artista'>Año de lanzamiento</label>
                    <input type='text' value={disco.lanzamiento} onChange={e => setAlbum({ ...disco, lanzamiento: e.target.value })} className='form-control' />
                </div>

                <div className="col-md-8">
                    <label htmlFor="image" className="form-label">Portada</label>
                    <input className="form-control " name='file0' id="formFileSm" type="file" onChange={changeImage} required />
                </div>

                <div className='col-md-8 topDetalle'>
                    <h5>Stream de distribución: </h5>
                </div>

                <div className='col-md-8'>
                    <label htmlFor='spotify'>Spotify</label>
                    <input type='text' value={disco.spotify} onChange={e => setAlbum({ ...disco, spotify: e.target.value })} className='form-control' />
                </div>

                <div className='col-md-8'>
                    <label htmlFor='appleMusic'>Apple Music</label>
                    <input type='text' value={disco.appleMusic} onChange={e => setAlbum({ ...disco, appleMusic: e.target.value })} className='form-control' />
                </div>



                <div className='col-md-8 topDetalle'>
                    <button type='submit' className='btn btn-success'>Agregar álbum</button>
                </div>
            </form>

        </div>
    )
}