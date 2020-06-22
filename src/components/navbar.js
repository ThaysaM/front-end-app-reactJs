import React from 'react'

import NavbarItem from './navbarItem'
import {AuthConsumer} from '../main/provedorAutenticacao'

function Navbar(props){
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-secondary">
        <div className="container" style={ {position:'relative'} }>
            <a href="#/home" className="navbar-brand">Estúdio Fotográfico</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <NavbarItem render={props.isUsuarioAutenticado} href="#/cadastro-usuario" label="Usuários"/>
                    <NavbarItem render={props.isUsuarioAutenticado}href="#/home" label="Agendamentos"/>
                    <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" label="Sair"/>  
                </ul>
            </div>
        </div>
        </div>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao}/>
        )}
    </AuthConsumer>
)