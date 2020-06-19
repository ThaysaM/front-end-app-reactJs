import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import {withRouter} from 'react-router-dom'
import * as messagens from '../../components/toastr'

import LancamentoService from '../../app/service/agendamentoService'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroAgendamento extends React.Component{
    
    state = {
        id: null,
        nomeDaMae: '',
        telefone: '',
        nomeDaCrianca: '',
        idadeDaCrianca: '',
        sexoDaCrianca: '', 
        tipoDaSessao: '',
        tema: '',
        status: '',
        hora_agendada: '',
        dia: '',
        mes: '',
        ano: '',
        login: null, 
        atualizado: false
    
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    componentDidMount(){ //atualizar o formulário
        const params = this.props.match.params
        if(params.id){
            this.service
                .obterPorId(params.id)
                .then(response => {
                    this.setState({...response.data, atualizado: true})
                }).catch(erro => {
                    messagens.mensagemErro(erro.response.data)
                })
        }
        
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const {nomeDaMae, telefone, nomeDaCrianca, idadeDaCrianca, sexoDaCrianca, tipoDaSessao, tema,  hora_agendada, dia, mes,ano } = this.state;
        const agendamento = { nomeDaMae, telefone, nomeDaCrianca, idadeDaCrianca, sexoDaCrianca, tipoDaSessao, tema,  hora_agendada, dia, mes,ano, login: usuarioLogado.id };
        
        try{
            this.service.validar(agendamento)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messagens.mensagemErro(msg));
            return false;
        }

        console.log(agendamento)
         this.service
            .salvar(agendamento)
            .then(response => {
                this.props.history.push('/home')
                messagens.mensagemSucesso('Lançamento cadastrado com sucesso!')
            }).catch(erro => {
                messagens.mensagemErro(erro.response.data)
        })

        
    }

    atualizar = () => {
        const { id, nomeDaMae, telefone, nomeDaCrianca, idadeDaCrianca, sexoDaCrianca, tipoDaSessao, tema, status,  hora_agendada, dia, mes,ano, login } = this.state;
        const agendamento = { id, nomeDaMae, telefone, nomeDaCrianca, idadeDaCrianca, sexoDaCrianca, tipoDaSessao, tema, status,hora_agendada, dia, mes,ano, login };
        
        console.log(agendamento)
         this.service
            .atualizar(agendamento)
            .then(response => {
                this.props.history.push('/home')
                messagens.mensagemSucesso('Lançamento atualizado com sucesso!')
            }).catch(erro => {
                messagens.mensagemErro(erro.response.data)
        })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name] : value})


    }

    render(){

        const meses = this.service.obterListaMeses();
        const dias = this.service.obterListaDias();
        const horas = this.service.obterListaHoras();
        const sexos = this.service.obterListaSexo();
        const temas = this.service.obterListaTemas();
        const tidoSessao = this.service.obterListaTipoSessao();


        return(
            <div className="row">
                <div className="col-md-12" style={{position:'relative', left: '10px'} }>
                    <div className="bs-docs-section">
                        <Card title={this.state.atualizado ? 'Atualização de agendamento': 'Cadastro de agendamento'}>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormGroup id="inputNomeDaMae" label="Seu nome: *">
                                        <input id="inputNomeDaMae" type="text" 
                                                className="form-control" 
                                                name="nomeDaMae"
                                                value={this.state.nomeDaMae}
                                                onChange={this.handleChange}/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup id="inputTelefone" label="Telefone: *">
                                        <input id="inputTelefone"  
                                                type="text" 
                                                className="form-control"
                                                name="telefone" 
                                                value={this.state.telefone}
                                                onChange={this.handleChange}/>
                                    </FormGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <FormGroup id="inputNomeDaCrianca" label="Nome da criança: *">
                                        <input id="inputNomeDaCrianca" 
                                                type="text" 
                                                className="form-control"
                                                name="nomeDaCrianca" 
                                                value={this.state.nomeDaCrianca}
                                                onChange={this.handleChange}/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup id="inputIdadeDaCrianca" label="Idade da criacaça: *">
                                        <input id="inputIdadeDaCrianca"  
                                                type="text" 
                                                className="form-control"
                                                name="idadeDaCrianca" 
                                                value={this.state.idadeDaCrianca}
                                                onChange={this.handleChange}/>
                                    </FormGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <FormGroup id="inputSexoDaCrianca" label="Sexo da criança: *">
                                        <SelectMenu id="inputSexoDaCrianca"
                                                    name="sexoDaCrianca"
                                                    value={this.state.sexoDaCrianca}
                                                    onChange={this.handleChange}
                                                    lista={sexos} 
                                                    className="form-control"/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-4">
                                    <FormGroup id="inputTipoDaSessao" label="Tipo da Sessão: *">
                                        <SelectMenu id="inputTipoDaSessao" 
                                                     name="tipoDaSessao"
                                                    value={this.state.tipoDaSessao}
                                                    onChange={this.handleChange}
                                                    lista={tidoSessao} 
                                                    className="form-control"/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-4">
                                    <FormGroup id="inputTema" label="Tema da Sessão: *">
                                        <SelectMenu id="inputTema" 
                                                    name="tema"
                                                    value={this.state.tema}
                                                    onChange={this.handleChange}
                                                    lista={temas} 
                                                    className="form-control"/>
                                    </FormGroup>
                                </div>    
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormGroup id="inputAno" label="Ano: *">
                                        <input id="inputAno"  
                                                type="text" 
                                                className="form-control"
                                                name="ano" 
                                                value={this.state.ano}
                                                onChange={this.handleChange}/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup id="inputMes" label="Mês: *">
                                        <SelectMenu id="inputMes" 
                                                    name="mes"
                                                    value={this.state.mes}
                                                    onChange={this.handleChange}
                                                    lista={meses} 
                                                    className="form-control"/>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormGroup id="inputDia" label="Dia: *">
                                        <SelectMenu id="inputDia" 
                                                    name="dia"
                                                    value={this.state.dia}
                                                    onChange={this.handleChange}
                                                    lista={dias} 
                                                    className="form-control"/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup id="inputHora_agendada" label="Hora: *">
                                        <SelectMenu id="inputHora_agendada" 
                                                    name="hora_agendada"
                                                    value={this.state.hora_agendada}
                                                    onChange={this.handleChange}
                                                    lista={horas} 
                                                    className="form-control"/>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <FormGroup id="inputStatus" label="Status:">
                                        <input  type="text" 
                                                className="form-control"
                                                name="status" 
                                                value={this.state.status}
                                                disabled/>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    {this.state.atualizado ?
                                        (
                                            <button onClick={this.atualizar}
                                                    className="btn btn-primary">
                                                    <i className="pi pi-refresh"></i>
                                                    Atualizar                                                    
                                                    </button>
                                        ):(
                                            <button onClick={this.submit} 
                                                    className="btn btn-success">
                                                    <i className="pi pi-save"></i>
                                                    Salvar
                                            </button>
                                        )
                                    }
                                    <button onClick={e => this.props.history.push('/home')}
                                            className="btn btn-danger">
                                            <i className="pi pi-times"></i>
                                            Cancelar
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CadastroAgendamento)