import React, { useState, useEffect } from 'react';
import AddPost from "./addPost";
import '../../assets/estilos.css'
import { Link } from "react-router-dom";

import { store } from '../../../firebaseConfig';


export default function PostList() {



    const [posts, setPosts] = useState([])

    useEffect(() => {

       store.collection('articulos').get().then(snapshot=>{
           const data = []
           snapshot.forEach((doc)=>data.push({...doc.data(), id:doc.id}));
            setPosts(data)
        })

    }, [])

    const id = '123';


    if (posts.length >= 1) {

        const postsMap = posts.map((ps, i) => {
            return (
                <section key={i}>



                    <form className='form-container topPost text-dark'>
                        {ps.image !== null ? (
                            <div className='form-group ' >
                                <img className='photoPoast' src={ps.image}/>

                            </div>
                        ) : (
                                <div className='form-group ' >
                                    <img className='photoPoast' src="https://scontent.fpaz2-1.fna.fbcdn.net/v/t1.0-9/136354588_3758491070899967_2932755688907226245_o.jpg?_nc_cat=100&ccb=3&_nc_sid=a26aad&_nc_ohc=FuA1LPzgBRcAX-NxjGZ&_nc_ht=scontent.fpaz2-1.fna&oh=c99eb049dc2e275994c8d69e089eb6d4&oe=6049F312" />

                                </div>

                            )}
                        <div className='form-group  '>
                            <label htmlFor='contenido'>{ps.nombre}</label>
                        </div>
                        <div className='form-group  '>
                            <label htmlFor='foto'>{ps.precio}</label>

                        </div>

                        <div className='form-group  '>
                            <Link to={'/posts/edit/' + ps.id} className='btn btn-warning'>Editar</Link>
                        </div>
                    </form>

                </section>
            )
        })

        return (
            <div className='container topDetalle'>

                <AddPost />
                <section className='row justify-content-center topDetalle'>
                    <div className='col-12 col-sm-8 col-md-8'>
                        {postsMap}
                    </div>
                </section>

            </div>
        )

    } else if (posts.length === 0) {

        return (
            <div className='container topDetalle'>

                <AddPost />
                <section className='row justify-content-center topDetalle'>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                </section>

            </div>
        )
    } else {

        return (
            <div className='container topDetalle'>

                <AddPost />
                <section className='row justify-content-center topDetalle'>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden"></span>
                        </div>

                        <div>
                            <h3>Algo salió mal :S </h3>
                        </div>
                    </div>
                </section>

            </div>
        )
    }

}