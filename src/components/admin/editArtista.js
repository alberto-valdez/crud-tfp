import React, { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom';
import '../assets/estilos.css';
import swal from 'sweetalert';
import { store, storage } from '../../firebaseConfig';


export default function EditArtista({match}){

    const id = match.params.id;
    const [statusGlobal, setStatusGlobal] = useState('WAITING');

    const [artista, setArtista] = useState(
        {
            nombre: '',
            descripcion: '',
            instagram: '',
            facebook: '',
            spotify: '',
            appleMusic: '',
            soundcloud: '',
            image:'', 
            imageName:''

        });

    const [artistaUpdate, setArtistaUpdate] = useState({
        nombre: '',
        descripcion: '',
        instagram: '',
        facebook: '',
        spotify: '',
        appleMusic: '',
        soundcloud: '',
        image:'', 
        imageName:''
    })

        useEffect(() => {
            store.collection('artistas').where('__name__', '==', `${id}`).get().then(snapshot=>{
                setArtista(snapshot.docs[0].data())
            }).catch(err=>{
                console.log(err)
            })
         }, [])

  
    const [image, setImage] = useState();

   const deleteOldImage = () => {
    let imageRef = storage.ref().child((`artistas/${artista.imageName}`));
    imageRef.delete().then(str=>{
        console.log(str)
    }).catch(err=>{console.log(err)})
   
   
   }

   const makeEdit = () =>{
       
       store.collection('artistas').doc(`${id}`).update(artistaUpdate).then(res => {
           setStatusGlobal('OK')
        swal(
            'Artista Editado',
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

        const updateImage = storage.ref(`artistas/${image.name}`).put(image);

        updateImage.on("state_changed", snapshot=>{}, err=>{console.log(err)}, ()=>{
            storage.ref('artistas').child(image.name).getDownloadURL().then(url=>{
                setArtistaUpdate({...artista, image: url, imageName:image.name});
               
            })
        })

        
       
    }

    


    const editArtista = e => {
        e.preventDefault();
        if(image){
            agregarImagen()
            
        } else {
            setArtistaUpdate(artista)
            makeEdit();
        }

    }


    useEffect(()=>{

        if(artistaUpdate.image !== ''){
        setArtistaUpdate({...artistaUpdate});
        makeEdit();
        }
    
    },[artistaUpdate.image])


    const changeImage = (event) => {
        setImage(event.target.files[0])
    }
    
    if (statusGlobal === 'OK') {
        return (
            <Redirect to={'/artistas'} />
        )
    }

    return(



        <div className="container  topDetalle">

        <form onSubmit={editArtista} >
            <div className="form-row justify-content-md-center  ">

                <div className="form-group col-md-8">
                    <label htmlFor="nombre">Nombre del artista</label>
                    <input type="text"  defaultValue={artista.nombre} onChange={e => setArtista({ ...artista, nombre: e.target.value })} className="form-control" required/>
                </div>

                <div className="form-group col-md-8">
                    <label htmlFor="descripcion">Descripcion del artista</label>
                    <textarea type="text" defaultValue={artista.descripcion} onChange={e => setArtista({ ...artista, descripcion: e.target.value })} className="form-control" required/>
                </div>

                <div className="form-group col-md-8">
                    <label htmlFor="instagram">Instagram del artista</label>
                    <input type="text" defaultValue={artista.instagram} onChange={e => setArtista({ ...artista, instagram: e.target.value })} className="form-control" required/>
                </div>

                <div className="form-group col-md-8">
                    <label htmlFor="facebook">Facebook del artista</label>
                    <input type="text" defaultValue={artista.facebook} onChange={e => setArtista({ ...artista, facebook: e.target.value })} className="form-control" required/>
                </div>

                <div className="form-group col-md-8">
                    <label htmlFor="spotify">Spotify del artista</label>
                    <input type="text" defaultValue={artista.spotify} onChange={e => setArtista({ ...artista, spotify: e.target.value })} className="form-control" required/>
                </div>

                <div className="form-group col-md-8">
                    <label htmlFor="appleMusic">Apple Music del artista</label>
                    <input type="text" defaultValue={artista.appleMusic} onChange={e => setArtista({ ...artista, appleMusic: e.target.value })} className="form-control" required/>
                </div>

                <div className="form-group col-md-8">
                    <label htmlFor="Soundclod">Soundclod del artista</label>
                    <input type="text" defaultValue={artista.soundcloud} onChange={e => setArtista({ ...artista, soundcloud: e.target.value })} className="form-control" required/>
                </div>

                {artista.image !== null ? (
                        <div className="col-md-8">
                                <img className="imgDetalleEdit" src={artista.image} alt="" />
                          

                        </div>
                    ) : (
                            <div className="col-md-">
                              <img className="imgDetalleEdit" src="https://uss.com.ar/corporativo/wp-content/themes/consultix/images/no-image-found-360x260.png" alt="" />

                            </div>
                        )}

                <div className="form-group col-md-8">
                    <label htmlFor="image" className="form-label">Foto del artista</label>
                    <input className="form-control " name='file0' id="formFileSm" type="file" onChange={changeImage} />
                </div>

                <div className="form-group col-md-8">
                    <button className="btn btn-warning" type="submit">Editar</button>
                </div>
            </div>
        </form>

    </div>
    )
}