import React, { useEffect, useState } from "react";

import swal from 'sweetalert';
import {Redirect} from 'react-router-dom';


import '../../assets/estilos.css'
import { store, storage } from "../../../firebaseConfig";
export default function EditAlbums({ match }) {

    const id = match.params.id;
    const idalbum = match.params.idalbum;

    const [image, setImage] = useState();
    const [statusGlobal, setStatusGlobal] = useState('WAITING');
    const [disco, setAlbum] = useState({
        album: '',
        artista: '',
        spotify: '',
        appleMusic: '',
        image:'',
        lanzamiento:'',
        imageName:''
    })

    const [albumUpdate, setAlbumUpdate] = useState({
        album: '',
        artista: '',
        spotify: '',
        appleMusic: '',
        image:'',
        lanzamiento:'',
        imageName:''
    })

    useEffect(() => {
     store.collection(`artista/${id}/albums`).where("__name__", "==", `${idalbum}`).get().then(snapshot=>{
         setAlbum(snapshot.docs[0].data());
     });
    }, [])


    useEffect(()=>{

        if(albumUpdate.image != ''){
        setAlbumUpdate({...albumUpdate});
        MakeEditAlbum();
        }
    
    },[albumUpdate.image])

 

    const changeImage = (event) => {
        setImage(event.target.files[0]);
    }

    const MakeEditAlbum =  () => {
console.log('que pedo')
       store.collection('artista').doc(`${id}`).collection('albums').doc(`${idalbum}`).update(albumUpdate).then(res => {
        setStatusGlobal('OK')
                    swal(
                        'album Editado',
                        'Se completo la acción',
                        'success'
                    )
        }).catch(err=>{
                    swal(
                        'Error',
                        'No pudimos realizar la accion',
                        'warning'
                    )
                    })

    }


    const agregarImagen = () => {

       
        deleteOldImage();

        const updateImage = storage.ref(`albums/${image.name}`).put(image);

        updateImage.on("state_changed", snapshot=>{}, err=>{console.log(err)}, ()=>{
            storage.ref('albums').child(image.name).getDownloadURL().then(url=>{
                setAlbumUpdate({...disco, image:url, imageName:image.name});
              
            })
        })

       
    }


    const putAlbum = (e) => {

        e.preventDefault();
        if(image){
            agregarImagen()
            
        } else {
            setAlbumUpdate(disco)
            MakeEditAlbum();
        }

    }

    const deleteOldImage = () =>{

     let imageRef = storage.ref().child((`albums/${disco.imageName}`));
     imageRef.delete().then(str=>{
         console.log(str)
     }).catch(err=>{console.log(err)})
    }


    const deleteAlbum = (e) =>{

        e.preventDefault();

        swal({
            title: "¿Estas seguro de borrar el Registro del álbum?",
            text: "Una vez borrado se perdera la informacion ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete)=>{

            if(willDelete){
              store.collection('artista').doc(`${id}`).collection('albums').doc(`${idalbum}`).delete().then(res=>{

                  deleteOldImage();
                    setStatusGlobal('DELETE')
                    swal(
                        'Álbum eliminado',
                        'El álbum ha si sido borrado de la lista del artista',
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
    if (statusGlobal === 'OK') {
        return (
            <Redirect to={'/artistas'} />
        )
    }

    if (statusGlobal === 'DELETE') {
        return (
            <Redirect to={'/artistas'} />
        )
    }

    
    return (
        <div className='container topDetalle'>

            <form onSubmit={putAlbum} className="form-row justify-content-md-center  ">
                <div className='col-md-8'>
                    <label htmlFor='tituloAlbum'>Título del álbum</label>
                    <input type='text' defaultValue={disco.album} onChange={e => setAlbum({ ...disco, album: e.target.value })} className='form-control' />
                </div>

                <div className='col-md-8'>
                    <label htmlFor='artista'>Nombre del autor</label>
                    <input type='text' defaultValue={disco.artista} onChange={e => setAlbum({ ...disco, artista: e.target.value })} className='form-control' />
                </div>

                <div className='col-md-8'>
                    <label htmlFor='artista'>lanzamiento</label>
                    <input type='text' defaultValue={disco.lanzamiento} onChange={e => setAlbum({ ...disco, lanzamiento: e.target.value })} className='form-control' />
                </div>

                {disco.image !== null ? (
                    <div className='col-md-8'>
                        <img className="imgDetalleEdit" src={disco.image} alt="" />
                    </div>
                ) : (
                        <div className="col-md-">
                            <img className="imgDetalleEdit" src="https://uss.com.ar/corporativo/wp-content/themes/consultix/images/no-image-found-360x260.png" alt="" />

                        </div>
                    )}

                <div className="col-md-8">
                    <label htmlFor="image" className="form-label">Portada</label>
                    <input className="form-control " name='file0' id="formFileSm" type="file" onChange={changeImage}  />
                </div>

                <div className='col-md-8 topDetalle'>
                    <h5>Stream de distribución: </h5>
                </div>

                <div className='col-md-8'>
                    <label htmlFor='spotify'>Spotify</label>
                    <input type='text' defaultValue={disco.spotify} onChange={e => setAlbum({ ...disco, spotify: e.target.value })} className='form-control' />
                </div>

                <div className='col-md-8'>
                    <label htmlFor='appleMusic'>Apple Music</label>
                    <input type='text' defaultValue={disco.appleMusic} onChange={e => setAlbum({ ...disco, appleMusic: e.target.value })} className='form-control' />
                </div>



                <div className='col-md-8 topDetalle'>
                    <button type='submit' className='btn btn-warning'>Editar</button>
                    <button onClick = {deleteAlbum} className='btn btn-danger espacioButton'>Eliminar</button>
                </div>
            </form>

        </div>
    )
}