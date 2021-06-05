import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UseUsuario } from '../assets/userContext';
export const ProtectedRoute = ({component: Component, ...rest}) => {
    const {usuario} = UseUsuario();
    return (
        <Route {...rest} render={ props => {

            if(usuario){

                return <Component {...props}/>;
            } else {
                return <Redirect  to={'/index'}/>
            }
                
            }
        } 
        />

    )
}