import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Importando página de Login
import Logon from './pages/Logon';
//Importar página Register: cadastro das ONGs
import Register from './pages/Register';
//Importando página Profile: listar os casos da ONG que esta logada no sistema
import Profile from './pages/Profile';
//Importando página NewIncident: cadastrar novo caso
import NewIncident from './pages/NewIncident';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>{/* Switch: garante que apenas uma rota seja conectada por momento */}
                <Route path="/" exact component={Logon} />{/*Primeira rota*/}
                <Route path="/register" component={Register} />{/*Seguenda rota*/}
                <Route path="/profile" component={Profile} />{/*Terceira rota*/}
                <Route path="/incidents/new" component={NewIncident} />{/*Quarta rota*/}
            </Switch>
        </BrowserRouter>
    );
}