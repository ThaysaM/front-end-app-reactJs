import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import SelectMenu from '../components/selectMenu'
import LancamentosTable from './lancamento/lancamentosTable'
import AgendamentoService from '../app/service/agendamentoService'
import LocalStorageService from '../app/service/localstorageService'


import {mensagemErro, mensagemSucesso}  from '../components/toastr'

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

class Home extends React.Component{
    
    state = {
        ano: '',
        mes: '',
        hora: '',
        dia: '',
        agendamento: [],
        showConfirmDialog: false ,
        agendamentoDeletar: {}
    }

    constructor(){
        super();
        this.service = new AgendamentoService();
    }

    busca = () =>{
        if(!this.state.ano){
            mensagemErro('O preenchimento do campo Ano é obrigatório.')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        
        const agendamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            dia: this.state.dia,
            login: usuarioLogado.id
        }

        this.service
        .consultar(agendamentoFiltro)
        .then(resposta => {
            this.setState({agendamento: resposta.data})
        }).catch(erro => {
            console.log(erro)
        })
    }

    editar = (id) => {
        console.log('Editando o agendamento', id)
    }

    abrirConfirmacao = (agendamento) =>{
        this.setState({showConfirmDialog : true, agendamentoDeletar: agendamento})
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog : false, agendamentoDeletar: {} })
    }

    deletar = () => {
        this.service
            .deletar(this.state.agendamentoDeletar.id)
            .then(response => {
                const agendamentos = this.state.agendamento;
                const index = agendamentos.indexOf(this.state.agendamentoDeletar)
                agendamentos.splice(index, 1);
                this.setState({agendamentos: agendamentos, showConfirmDialog: false})
                mensagemSucesso('Agendamento deletado com sucesso!')     
            }).catch(erro => {
                mensagemErro('Ocorreu um erro ao tentar deletar agendamento.')
            })

    }

    render(){
        const meses =  this.service.obterListaMeses();
        const horas = this.service.obterListaHoras();
        const dias = this.service.obterListaDias();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar}/>
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary"/>
            </div>
        );

        return(
            <div className="row">
                <div className="col-md-12" style={{position:'relative', left: '10px'} }>
                    <div className="bs-docs-section">
                        <Card title="Consultar agendamentos">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="bs-component">
                                        <FormGroup htmlFor="inputAno" label="Ano: *">
                                            <input type="text" 
                                                className="form-control" 
                                                id="exampleInputAno"
                                                value={this.state.ano}
                                                onChange={e => this.setState({ano: e.target.value})}
                                                placeholder="Digite o Ano"/>
                                        </FormGroup> 

                                        <FormGroup htmlFor="inputMes" label="Mês: *">
                                            <SelectMenu id="inputMes"
                                                        value={this.state.mes} 
                                                        onChange={e => this.setState({mes: e.target.value})}
                                                        className='form-control'
                                                        lista={meses}/>
                                        </FormGroup>

                                        <FormGroup htmlFor="inputDia" label="Dia: *">
                                            <SelectMenu id="inputDia"
                                                        value={this.state.dia} 
                                                        onChange={e => this.setState({dia: e.target.value})}
                                                        className='form-control'
                                                        lista={dias}/>
                                        </FormGroup>
                                        
                                        <FormGroup htmlFor="inputHoras" label="Hora: *">
                                            <SelectMenu id="inputHoras" 
                                                        value={this.state.hora} 
                                                        onChange={e => this.setState({hora: e.target.value})}
                                                        className='form-control'
                                                        lista={horas}/>
                                        </FormGroup>

                                        <button onClick={this.busca} type="button" className="btn btn-success">Buscar</button>
                                        <button type="button" className="btn btn-danger">Agendar</button>                                
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <div className="bs-component">
                            <Card title = "Seus agendamentos">
                                <LancamentosTable agendamentos={this.state.agendamento}
                                                    deleteAction={this.abrirConfirmacao}
                                                    editarAction={this.editar}/>

                                <div>
                                    <Dialog header="Confirmação" 
                                            visible={this.state.showConfirmDialog}
                                            style={{width: '50vw'}} 
                                            footer={confirmDialogFooter}
                                            modal={true} 
                                            onHide={() => this.setState({showConfirmDialog: false})}>
                                        Confirma a exclusão deste agendamento?
                                    </Dialog>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home)