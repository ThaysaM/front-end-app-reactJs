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
                <td>
                    <button type="button" 
                            className="btn btn-primary"
                            onClick={e => props.editarAction(agendamento.id)}>
                            Editar
                    </button>
                    <button type="button" 
                            className="btn btn-danger" 
                            onClick = {e => props.deleteAction(agendamento)}>
                            Deletar
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
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}