import React from 'react'

export default props => {
    
    const rows = props.agendamentos.map( agendamento => {
        return(
            <tr key={agendamento.id}>
                <td>{agendamento.nomeDaCrianca}</td>
                <td>{agendamento.tipoDaSessao}</td>
                <td>{agendamento.tema}</td>
                <td>{agendamento.hora_agendada}</td>
                <td>{agendamento.dia}</td>
                <td>{agendamento.mes}</td>
                <td>{agendamento.ano}</td>
                <td>{agendamento.status}</td>
                <td>
                    <button className="btn btn-success" title="Efetivar"
                            disabled={agendamento.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(agendamento, `EFETIVADO`)} 
                            type="button">
                            <i className="pi pi-check"></i>
                    </button>
                    <button className="btn btn-warning" title="Cancelar"
                            disabled={agendamento.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(agendamento, `CANCELADO`)} 
                            type="button">
                            <i className="pi pi-times"></i>
                    </button>
                    <button type="button" 
                            className="btn btn-primary" title="Editar"
                            onClick={e => props.editarAction(agendamento.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" 
                            className="btn btn-danger" title="Deletar"
                            onClick = {e => props.deleteAction(agendamento)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })
    
    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome da criança</th>
                    <th scope="col">Tipo da sessão</th>
                    <th scope="col">Tema da sessão</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Dia</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Ano</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}