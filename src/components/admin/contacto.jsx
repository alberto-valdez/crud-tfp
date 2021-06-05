import React, { useState, useEffect } from 'react';
import { store } from '../../firebaseConfig';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

export const Contacto = () => {
    const [msg, setMsg] = useState([])
    const historial = useHistory();
    const deleteCard = (id) =>{ 


        swal({
            title: "¿Estas seguro de borrar el mensaje?",
            text: "Una vez borrado se perderá la información y no se podrá recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete)=>{

            if(willDelete){ 
                store.collection('contacto').doc(`${id}`).delete().then(res=>{
                    historial.push('/contacto/deleted')
                        swal(
                            'Eliminado',
                             'mensaje ha sido eliminado',
                             'success'
                             )
        
                }).catch(err=>{
                    swal(
                        'Error',
                         'mensaje ha sido eliminado',
                         'Warning'
                         )
                })
            }else {
                swal(
                    'Se cancelo la acción borrar',
                    
                  )
            }


        })
     
    }

    useEffect(()=>{
        store.collection('contacto').get().then(snapshot=>{
            const data = [];
            snapshot.forEach((docs)=>{
                data.push({...docs.data(), id: docs.id});
            })
            setMsg(data);
        })
    },[])

    const mensajes = msg.map((mensaje, i)=>{
        return(
            <section>


            <div className="card my-2 mx-2"  style={{width:530}}>
            <div className="card-body text-dark">
                <h5 className="card-title">{mensaje.nombre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{mensaje.correo}</h6>
                <p className="card-text">{mensaje.comentario}</p>
               
                <button className="btn btn-danger" onClick={()=>{deleteCard(mensaje.id)}}>Eliminar</button>
            </div>
            </div>
              
            </section>
        )
    })

    if(msg.length >= 1){
        return (
            <div className=''>
            <div className='d-flex justify-content-center mt-5 flex-wrap'>
                {mensajes}
    
            </div>
            </div>
           
        )
    }else {
        return (
            <div>
    <div className='d-flex justify-content-center mt-5 flex-wrap'>
               <h3>Aún no hay mensajes</h3>
            </div>
            </div>
        )
    }
 
}