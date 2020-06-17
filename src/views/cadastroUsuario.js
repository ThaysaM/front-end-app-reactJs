import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroUsuario extends React.Component{
   
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }
    
    validar(){
        const mensagens = []
        if(!this.state.nome){
            mensagens.push('O campo Nome é obrigatório.')
        }

        if(!this.state.email){
            mensagens.push('O campo Email é obrigatório.')
        }else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            mensagens.push('Informe um Email válido')
        }

        if(!this.state.senha || !this.state.senhaRepeticao){
            mensagens.push('Digite a senha duas vezes.')
        }else if(this.state.senha !== this.state.senhaRepeticao){
            mensagens.push('As senhas não batem.')
        }


        return mensagens;
    }

    cadastrar = () => {
        const mensagens = this.validar();
        
        if(mensagens && mensagens.length > 0){
            mensagens.forEach((mensagens, index) => {
                mensagemErro(mensagens)
            });
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha

        }
        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso. Faça o login para acessar o sistema.')
                this.props.history.push('/login')
            }).catch(erro => {
                mensagemErro(erro.response.data)
            })
    }
    
    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (    
            <div className="row">
                <div className="col-md-12" style={{position:'relative', left: '10px'} }>
                    <div className="bs-docs-section">        
                        <Card title="Cadastro de Usuário">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <FormGroup label="Nome: *" htmlFor="inputNome">
                                            <input type="text" 
                                                id="inputNome" 
                                                className="form-control"
                                                name="nome"
                                                onChange={e => this.setState({nome: e.target.value})}/>
                                        </FormGroup>
                                        <FormGroup label="Email: *" htmlFor="inputEmail">
                                            <input type="email"
                                                id="inputEmail"
                                                className="form-control"
                                                nome="email"
                                                onChange={e => this.setState({email: e.target.value})}/>
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                                            <input type="password"
                                                id="inputSenha"
                                                className="form-control"
                                                nome="senha"
                                                onChange={e => this.setState({senha: e.target.value})}/>
                                        </FormGroup>
                                        <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                            <input type="password"
                                                id="inputRepitaSenha"
                                                className="form-control"
                                                nome="senha"
                                                onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                                        </FormGroup>
                                        <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                                        <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </Card>      
                    </div> 
                </div>
            </div>
        )
    }
}

export default withRouter (CadastroUsuario)