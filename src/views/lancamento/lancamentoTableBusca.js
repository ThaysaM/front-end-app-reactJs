import React from 'react'

export default props => {
    
    const rows = props.agendamentos.map( agendamento => {
        return(
            <tr key={agendamento.id}>
                <td>{agendamento.hora_agendada}</td>
            </tr>
        )
    })
    
    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Horários Reservados</th>    
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}