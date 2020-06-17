import React from 'react'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import CadastroAgendamento from '../views/lancamento/cadastro-agendamento'

import { Route, Switch, HashRouter } from 'react-router-dom'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario}/>
                <Route path="/cadastro-agendamento" component={CadastroAgendamento}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas