import React from 'react'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import CadastroAgendamento from '../views/lancamento/cadastro-agendamento'
import {AuthConsumer} from '../main/provedorAutenticacao'


import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'


function RotaAutenticada({component: Component, isUsuarioAutenticado,...props}){
    return(
        <Route {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado){
                return(
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={{pathname : '/login', state : {from : componentProps.location}}} />
                )
            }
        }}/>
    )
}
function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario}/>
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-agendamento/:id?" component={CadastroAgendamento}/>
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}/>)}
    </AuthConsumer>
)

