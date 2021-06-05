
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';


import Router from './router';
import {UserProvider, UseUsuario} from './components/assets/userContext';

export default () => <UserProvider>
                    <App></App>
                     </UserProvider>

function App() {
  
  return (
    <Router/>
  );
}


