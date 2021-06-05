import React, { useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
const portalRoot = document.getElementById('portal')

export default class Portal extends Component {
    constructor(){
        super();
        this.el = document.createElement('div');
    }

    componentDidMount = () =>{
        portalRoot.appendChild(this.el);

    }

    componentWillUnmount = () => {

        portalRoot.removeChild(this.el);

    }

    render(){
        const { children } = this.props;
        return ReactDOM.createPortal(children, this.el);
        
    }
}