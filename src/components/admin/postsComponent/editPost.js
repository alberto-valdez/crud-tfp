import React, { useEffect, useState } from 'react';
import '../../assets/estilos.css';

import swal from 'sweetalert';
import {Redirect} from 'react-router-dom';
import { store, storage } from '../../../firebaseConfig';
export default function EditPost({ match }) {

    const id = match.params.id;

    const[articulo, setArticulo] = useState({
        nombre: '',
        precio: '',
        detalle: '',
        tallas: '',
        color: '',
        materiales: '',
        image: ''
    
    });

    const[articuloUpdate, setArticuloUpdate] = useState({
        nombre: '',
        precio: '',
        detalle: '',
        tallas: '',
        color: '',
        materiales: '',
        image: '',
        imageName:''
    
    });
    const [statusGlobal, setStatusGlobal] = useState('WAITING');

    const [image, setImage] = useState();
    const [post, setPost] = useState({});


const changeImage = (e) =>{

    setImage(e.target.files[0]);
}

    useEffect(() => {
        store.collection('articulos').where('__name__', '==', `${id}`).get().then(snapshot=>{
            setArticulo(snapshot.docs[0].data())
        }).catch(err=>{
            console.log(err)
        })
    }, [])

    const MakeEdit =  () => {
        store.collection('articulos').doc(`${id}`).update(articuloUpdate).then(res => {
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


    const deleteOldImage = () =>{

        let imageRef = storage.ref().child((`articulos/${articulo.imageName}`));
        imageRef.delete().then(str=>{
          
        }).catch(err=>{console.log(err)})
       }

       const agregarImagen = () => {

       
        deleteOldImage();

        const updateImage = storage.ref(`articulos/${image.name}`).put(image);

        updateImage.on("state_changed", snapshot=>{}, err=>{console.log(err)}, ()=>{
            storage.ref('articulos').child(image.name).getDownloadURL().then(url=>{
                setArticuloUpdate({...articulo, image:url, imageName:image.name});
              
            })
        })

       
    }


    const deletePost = e =>{
        e.preventDefault();

        swal({
            title: "¿Estas seguro de borrar el post?",
            text: "Una vez borrado se perdera la informacion ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete)=>{

            if(willDelete){
                store.collection('articulos').doc(`${id}`).delete().then(res=>{

                 
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

    const editPost = e =>{
        e.preventDefault();

        if(image){
            agregarImagen();
        }else {
            setArticuloUpdate(articulo)
            MakeEdit();
        }
       
    }

    useEffect(()=>{

        if(articuloUpdate.image != ''){
        
        setArticuloUpdate({...articuloUpdate});
        MakeEdit();
        }
    
    },[articuloUpdate.image])

    if(statusGlobal === 'OK' || statusGlobal === 'DELETE'){

        return(
        <Redirect to='/posts/saved' />
        )
    }
    

    return (

        <div className='container topDetalle text-dark'>
            <section className='row justify-content-center'>

                <div className='col-12 col-sm-8 col-md-8'>


                    <form className='form-container' onSubmit={editPost}>
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
                    {articulo.image !== undefined ? (
                            <div className='form-group ' >
                                <img className='photoPoast' src={articulo.image}/>

                            </div>
                        ) : (
                                <div className='form-group ' >
                                    <img className='photoPoast' src="https://scontent.fpaz2-1.fna.fbcdn.net/v/t1.0-9/136354588_3758491070899967_2932755688907226245_o.jpg?_nc_cat=100&ccb=3&_nc_sid=a26aad&_nc_ohc=FuA1LPzgBRcAX-NxjGZ&_nc_ht=scontent.fpaz2-1.fna&oh=c99eb049dc2e275994c8d69e089eb6d4&oe=6049F312" />

                                </div>

                            )}
                    <div className='form-group  '>
                        <label htmlFor='foto'>Foto</label>
                        <input type='file' onChange={changeImage}  className='form-control' />
                    </div>

                    <div className='form-group '>
                    
                       <button type='submit' className='btn btn-primary'>Guardar cambios</button>
                  
                       
                       <button  className='btn btn-danger espacioButton' onClick={deletePost}>Eliminar</button>
               
                    </div>

                   


                    </form>
                </div>
            </section>

        </div>
    )
}