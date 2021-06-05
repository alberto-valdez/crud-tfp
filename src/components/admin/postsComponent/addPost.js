
import React, { useState, useEffect } from 'react';
import '../../assets/estilos.css';

import swal from 'sweetalert';
import {Redirect, useHistory} from 'react-router-dom';
import { storage, store } from '../../../firebaseConfig';

export default function AddPost() {

const[articulo, setArticulo] = useState({
    nombre: '',
    precio: '',
    detalle: '',
    tallas: '',
    color: '',
    materiales: '',
    image: '',
    imageName:''

});

const [start, setStart] = useState()
const [image, setImage] = useState();
const historial = useHistory();

const changeImage = (e) =>{
    setImage(e.target.files[0]);
}

const addPost = async() =>{
    try{
        setStart(true)
        const req = await store.collection('/articulos').add(articulo);
        if(req){
            swal(
                'Articulo Agregado',
                'Se completo la acción',
                'success'
            )
            setStart(null)
            historial.push('/posts/saved')
        }

    }catch(err){
        swal(
            'Error',
            'Ocurrio un error al guardar ',
            'warning'
        )
        setStart(null)
        console.log(err)
    }
}



const agregarArticulo = (e) =>{
    e.preventDefault();
    setStart(true)
    const uploadImage = storage.ref(`articulos/${image.name}`).put(image);
    uploadImage.on("state_changed", snapshot => {}, error=>{console.log(error)},
    ()=>{
        storage.ref('articulos').child(image.name).getDownloadURL().then(url=>{
            setArticulo({...articulo, image:url, imageName:image.name})
        })
    }
    )
}

useEffect(()=>{
    if(articulo.image !== ''){
        addPost()
    }
},[articulo.image])

    return (

        <section className='row justify-content-center'>

            <div className='col-12 col-sm-8 col-md-8'>


                <form className='form-container text-dark' onSubmit={agregarArticulo}>

                    <div className='form-group ' >
                        <label htmlFor='titulo'>Nombre</label>
                        <input type='text' value={articulo.nombre}  onChange={ e=> setArticulo({...articulo, nombre : e.target.value})} className='form-control' />
                    </div>
                    <div className='form-group  '>
                        <label htmlFor='contenido'>Precio</label>
                        <textarea type='text' value={articulo.precio} onChange={ e=> setArticulo({...articulo, precio: e.target.value})}  className='form-control' />
                    </div>

                    <div className='form-group  '>
                        <label htmlFor='contenido'>Detalle</label>
                        <textarea type='text' value={articulo.detalle} onChange={ e=> setArticulo({...articulo, detalle: e.target.value})}  className='form-control' />
                    </div>

                    <div className='form-group  '>
                        <label htmlFor='contenido'>Tallas</label>
                        <textarea type='text' value={articulo.tallas} onChange={ e=> setArticulo({...articulo, tallas: e.target.value})}  className='form-control' />
                    </div>

                    <div className='form-group  '>
                        <label htmlFor='contenido'>Color</label>
                        <textarea type='text' value={articulo.color} onChange={ e=> setArticulo({...articulo, color: e.target.value})}  className='form-control' />
                    </div>

                    <div className='form-group  '>
                        <label htmlFor='contenido'>Materiales</label>
                        <textarea type='text' value={articulo.materiales} onChange={ e=> setArticulo({...articulo, materiales: e.target.value})}  className='form-control' />
                    </div>
                    

                    <div className='form-group  '>
                        <label htmlFor='foto'>Foto</label>
                        <input type='file'  name='file0' onChange={changeImage}  className='form-control' />
                    </div>

                    <div className='form-group  '>
                       <button type='submit' className='btn btn-dark'>Publicar</button>
                    </div>

                    {start ? (
                    <span>
                    <div className='form-group d-flex justify-content-center  '>
                        <div className="spinner-border text-center" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>

                    <div className='form-group d-flex justify-content-center  '> 
                        Subiendo Articulo
                    </div>
                        </span>
                   
                    ):(
                        <span></span>
                    )

                    }
                   
                </form>

                
            </div>
        </section>

    )
}