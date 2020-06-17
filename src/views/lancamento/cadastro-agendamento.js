import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import {withRouter} from 'react-router-dom'

import LancamentoService from '../../app/service/agendamentoService'

class CadastroAgendamento extends React.Component{
    
    constructor(){
        super();
        this.service = new LancamentoService();
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
                        <Card title="Informações">
                            <div className="row">
                                <div className="col-md-6">
                                    <FormGroup id="inputNomeDaMae" label="Seu nome: *">
                                        <input id="inputNomeDaMae" type="text" className="form-control" />
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup id="inputTelefone" label="Telefone: *">
                                        <input id="inputTelefone"  type="text" className="form-control"/>
                                    </FormGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <FormGroup id="inputNomeDaCrianca" label="Nome da criança: *">
                                        <input id="inputNomeDaCrianca"  type="text" className="form-control"/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup id="inputIdadeDaCrianca" label="Idade da criacaça: *">
                                        <input id="inputIdadeDaCrianca"  type="text" className="form-control"/>
                                    </FormGroup>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <FormGroup id="inputSexoDaCrianca" label="Sexo da criança: *">
                                        <SelectMenu id="inputSexoDaCrianca" lista={sexos} className="form-control"/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-4">
                                    <FormGroup id="inputTipoDaSessao" label="Tipo da Sessão: *">
                                        <SelectMenu id="inputTipoDaSessao" lista={tidoSessao} className="form-control"/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-4">
                                    <FormGroup id="inputTema" label="Tema da Sessão: *">
                                        <SelectMenu id="inputTema" lista={temas} className="form-control"/>
                                    </FormGroup>
                                </div>    
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormGroup id="inputAno" label="Ano: *">
                                        <input id="inputAno"  type="text" className="form-control"/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup id="inputMes" label="Mês: *">
                                        <SelectMenu id="inputMes" lista={meses} className="form-control"/>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormGroup id="inputDia" label="Dia: *">
                                        <SelectMenu id="inputDia" lista={dias} className="form-control"/>
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup id="inputHoras" label="Hora: *">
                                        <SelectMenu id="inputHoras" lista={horas} className="form-control"/>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <button className="btn btn-success">Salvar</button>
                                    <button className="btn btn-danger">Cancelar</button>
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