import React from 'react'

import NavbarItem from './navbarItem'


function Navbar(){
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-secondary">
        <div className="container" style={ {position:'relative'} }>
            <a href="https://bootswatch.com/" className="navbar-brand">Estudio Fotográfico</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <NavbarItem href="#/home" label="Home"/>
                    <NavbarItem href="#/cadastro-usuario" label="Usuários"/>
                    <NavbarItem href="" label="Agendamentos"/>
                    <NavbarItem href="#/login" label="Login"/>  
                </ul>
            </div>
        </div>
        </div>
    )
}

export default Navbar