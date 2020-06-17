import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import imagem from '../imagens/Home.png'
import imagemBailarina from '../imagens/bailarina.jpg'
import imagemMickey from '../imagens/mickey.jpg'
import imagemBalao from '../imagens/balao.jpg'
import imagemColorir from '../imagens/colorir.jpg'
import imagemQuarto from '../imagens/quarto.jpg'
import imagemBanho from '../imagens/banho.jpg'
import imagemCrianca1 from '../imagens/crianca1.jpg'
import imagemCrianca2 from '../imagens/crianca2.jpg'
import imagemCrianca3 from '../imagens/crianca3.jpg'
import imagemCrianca4 from '../imagens/crianca4.jpg'
import imagemCrianca5 from '../imagens/crianca5.jpg'
import imagemCrianca6 from '../imagens/crianca6.jpg'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService'
import { mensagemErro }  from '../components/toastr'

class Login extends React.Component{
    
    state = {
        email: '',
        senha: ''
    }

    constructor(){
        super()
        this.service = new UsuarioService();
    }

    entrar = async () =>{
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            LocalStorageService.adicionarItem('_usuario_logado', response.data)
            this.props.history.push('/home')
        }).catch (erro => {
            mensagemErro(erro.response.data)
        })
    }

    preparFormularioCadastro = () =>{
        this.props.history.push('/cadastro-usuario')
    }

    render(){
        return(           
            <div className="row">
                <div className="col-md-6" style={{top: '65px'}}>
                    <img src={imagem} className="img-fluid" alt=""/>
                </div>
                <div className="col-md-6" style={ {position:'relative', left: '10px'} }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email *" htmlFor="exampleInputEmail">
                                                <input type="email"
                                                    value={this.state.email}
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    className="form-control"
                                                    id="exampleInputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email"/>
                                            </FormGroup>
                                            <FormGroup label="Senha *" htmlFor="exampleInputPassword">
                                                <input type="password"
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({senha: e.target.value})}
                                                    className="form-control"
                                                    id="exampleInputPassword"
                                                    placeholder="Password"/>
                                            </FormGroup>
                                            <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                            <button onClick={this.preparFormularioCadastro}className="btn btn-danger">Cadastrar</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="col-md-6" style={{top: '75px'}}>
                    <Card title="Mais vistos">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <img src={imagemBailarina} className="img-fluid" alt="" style={{marginLeft: '10px'}}/>
                                    <img src={imagemMickey} className="img-fluid" alt="" style={{marginLeft: '20px'}}/>
                                    <img src={imagemBalao} className="img-fluid" alt="" style={{marginLeft: '20px'}}/>
                                    <img src={imagemColorir} className="img-fluid" alt="" style={{marginLeft: '10px', marginTop: '20px'}}/>
                                    <img src={imagemQuarto} className="img-fluid" alt="" style={{marginLeft: '20px', marginTop: '20px'}}/>
                                    <img src={imagemBanho} className="img-fluid" alt="" style={{marginLeft: '20px', marginTop: '20px'}}/>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-md-6" style={{top: '75px'}}>
                    <Card title="Galeria">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                <img src={imagemCrianca1} className="img-fluid" alt="" style={{marginLeft: '10px'}}/>
                                    <img src={imagemCrianca2} className="img-fluid" alt="" style={{marginLeft: '20px'}}/>
                                    <img src={imagemCrianca3} className="img-fluid" alt="" style={{marginLeft: '20px'}}/>
                                    <img src={imagemCrianca4} className="img-fluid" alt="" style={{marginLeft: '10px', marginTop: '20px'}}/>
                                    <img src={imagemCrianca5} className="img-fluid" alt="" style={{marginLeft: '20px', marginTop: '20px'}}/>
                                    <img src={imagemCrianca6} className="img-fluid" alt="" style={{marginLeft: '20px', marginTop: '20px'}}/>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)