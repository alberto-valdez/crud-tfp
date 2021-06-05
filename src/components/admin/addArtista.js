import React, { useState, useEffect } from 'react';

import { Redirect, useHistory } from 'react-router-dom';
import '../assets/estilos.css';
import swal from 'sweetalert';
import { store, storage } from '../../firebaseConfig';


export default function AddArtista() {


    const [statusGlobal, setStatusGlobal] = useState('WAITING');

    const [tipoArtista, setTipoArtista] = useState({
        tipoUno: '',
        tipoDos: '',
        tipoTres: ''
    })
    const historial = useHistory();

    var stringTipos; 
    
    useEffect(() => {        
        stringTipos = tipoArtista.tipoUno + ' ' + tipoArtista.tipoDos + ' ' +tipoArtista.tipoTres;
        setArtista({...artista, tipo:stringTipos})
    }, [tipoArtista])

    const [artista, setArtista] = useState(
        {
            nombre: '',
            descripcion: '',
            instagram: '',
            facebook: '',
            spotify: '',
            appleMusic: '',
            soundcloud: '',
            tipo: '',
            image: '',
            imageName:''

        });

    const [image, setImage] = useState();
 
    const makeIt = async() =>{
        try{
            const agregar = await store.collection('/artistas').add(artista);
            if(agregar){
                swal(
                    'Artista Agregado',
                    'Se completo la acción',
                    'success'
                )

                historial.push('/artistas')


            }
        }catch(err){
                swal(
                    'Hubo un error al agregar',
                    'Intente más tarde',
                    'warning'
                )
            }
        }
    

    const agregarArtista = (e) => {
            e.preventDefault()
            
            const uploadImage = storage.ref(`artistas/${image.name}`).put(image);
            
            uploadImage.on("state_changed", snapshot =>{}, error=>{console.log(error)},
                ()=>{
                    storage.ref('artistas').child(image.name).getDownloadURL().then(url=>{
                        setArtista({...artista, image:url, imageName: image.name})
                    })
                }
                )            
    }

    const changeImage = (event) => {
        setImage(event.target.files[0])
    }


    useEffect(()=>{
        if(artista.image != ''){
            makeIt();
        }
    },[artista.image])

    return (
        <div className="container  topDetalle">

            <form onSubmit={agregarArtista} >
                <div className="form-row justify-content-md-center  ">

                    <div className="form-group col-md-8">
                        <label htmlFor="nombre">Nombre del artista</label>
                        <input type="text" value={artista.nombre} onChange={e => setArtista({ ...artista, nombre: e.target.value })} className="form-control" required />
                    </div>

                    <div className="form-group col-md-8">
                        <label htmlFor="descripcion">Descripcion del artista</label>
                        <textarea type="text" value={artista.descripcion} onChange={e => setArtista({ ...artista, descripcion: e.target.value })} className="form-control" required />
                    </div>

                    <div className="form-group col-md-8">
                        <label htmlFor="instagram">Instagram del artista</label>
                        <input type="text" value={artista.instagram} onChange={e => setArtista({ ...artista, instagram: e.target.value })} className="form-control" required />
                    </div>

                    <div className="form-group col-md-8">
                        <label htmlFor="facebook">Facebook del artista</label>
                        <input type="text" value={artista.facebook} onChange={e => setArtista({ ...artista, facebook: e.target.value })} className="form-control" required />
                    </div>

                    <div className="form-group col-md-8">
                        <label htmlFor="spotify">Spotify del artista</label>
                        <input type="text" value={artista.spotify} onChange={e => setArtista({ ...artista, spotify: e.target.value })} className="form-control" required />
                    </div>

                    <div className="form-group col-md-8">
                        <label htmlFor="appleMusic">Apple Music del artista</label>
                        <input type="text" value={artista.appleMusic} onChange={e => setArtista({ ...artista, appleMusic: e.target.value })} className="form-control" required />
                    </div>

                    <div className="form-group col-md-8">
                        <label htmlFor="Soundclod">Soundclod del artista</label>
                        <input type="text" value={artista.soundCloud} onChange={e => setArtista({ ...artista, soundcloud: e.target.value })} className="form-control" required />
                    </div>

                    <div className="form-group col-md-8">
                        <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1"   value='mc' onChange={e=>{setTipoArtista({...tipoArtista, tipoUno: e.target.value})}}/>
                        <label className="form-check-label" for="flexRadioDefault1">
                            MC
                     </label>
                    </div>
                    <div className="form-group col-md-8">
                        <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2"   value='productor' onChange={e=>{setTipoArtista({...tipoArtista, tipoDos: e.target.value})}}/>
                        <label className="form-check-label" for="flexRadioDefault2">
                           Productor
                        </label>
                    </div>

                    <div className="form-group col-md-8">
                        <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2"   value='beatmaker' onChange={e=>{setTipoArtista({...tipoArtista, tipoTres: e.target.value})}}/>
                        <label className="form-check-label" for="flexRadioDefault2">
                            BeatMaker
                        </label>
                    </div>

                    <div className="form-group col-md-8">
                        <label htmlFor="image" className="form-label">Foto del artista</label>
                        <input className="form-control " name='file0' id="formFileSm" type="file" onChange={changeImage} required />
                    </div>

                    <div className="form-group col-md-8">
                        <button className="btn btn-success" type="submit">Agregar</button>
                    </div>
                </div>
            </form>

        </div>
    )
}