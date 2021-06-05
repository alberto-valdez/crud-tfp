import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//CRUD
import Navbar from './components/admin/navbar';
import ArtistasComponent from './components/admin/artistasComponent';
import artistaDetalle from './components/admin/artistaDetalle';
import addArtista from './components/admin/addArtista';
import editArtista from './components/admin/editArtista';
import AddAlbum from './components/admin/albumComponents/addAlbum';
import AlbumList from './components/admin/albumComponents/albumList';
import EditAlbums from './components/admin/albumComponents/editAlbum';
import PostList from './components/admin/postsComponent/postlist';
import EditPost from './components/admin/postsComponent/editPost';

import Login from './components/admin/login';


import FooterPro from './components/admin/footerPro';

import {UseUsuario} from './components/assets/userContext';
import { ProtectedRoute } from './components/admin/protectedRoutes';
import { Contacto } from './components/admin/contacto';



function router() {
    const {usuario} = UseUsuario();

    return (
        <BrowserRouter>
        { usuario ? (
            <Navbar /> 
        ) : (
                <span></span>
        )

        }
        

            <Switch>

                {/* Artistas */}

                <ProtectedRoute exact path="/admin" component={ArtistasComponent} />
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/artistas" component={ArtistasComponent} />
                <ProtectedRoute exact path="/artistas/detalle/:id" component={artistaDetalle} />
                <ProtectedRoute exact path="/artistas/editar/:id" component={editArtista} />
                <ProtectedRoute exact path="/artistas/agregar" component={addArtista} />
                <ProtectedRoute exact path="/artistas/detalle/agregaralbum/:id" component={AddAlbum} />
                <ProtectedRoute exact path="/artistas/detalle/albums/:id" component={AlbumList} />
                <ProtectedRoute exact path="/artistas/detalle/editAlbum/:id/:idalbum" component={EditAlbums} />



                {/* Articulos */}
                <ProtectedRoute exact path="/posts" component={PostList} />
                <ProtectedRoute exact path="/posts/edit/:id" component={EditPost} />
                <Route exact path="/posts/saved" render={
                    () => {
                        return (
                            <Redirect to="/posts" />
                        )
                    }
                } />

                <ProtectedRoute exact path="/contacto" component={Contacto} />
                <Route exact path="/contacto/deleted" render={
                    () => {
                        return (
                            <Redirect to="/contacto" />
                        )
                    }
                } />
               
            </Switch>

                <FooterPro/> 

        </BrowserRouter>
    );
}


export default router;