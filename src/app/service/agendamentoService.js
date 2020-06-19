import ApiService from '../apiservice';
import ErroValidacao from '../../app/exception/ErroValidacao'
export default class AgendamentoService extends ApiService{
    constructor(){
        super('/api/agendamento')
    }

    obterListaMeses(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Janeiro', value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Março', value: 3},
            {label: 'Abril', value: 4},
            {label: 'Maio', value: 5},
            {label: 'Junho', value: 6},
            {label: 'Julho', value: 7},
            {label: 'Agosto', value: 8},
            {label: 'Setembro', value: 9},
            {label: 'Outubro', value: 10},
            {label: 'Novembro', value: 11},
            {label: 'Dezembro', value: 12}
        ]
    }

    obterListaHoras(){
        return [
            {label: 'Selecione...', value: ''},
            {label: '09:00', value: '09:00'},
            {label: '10:00', value: '10:00'},
            {label: '11:00', value: '11:00'},
            {label: '13:00', value: '13:00'},
            {label: '14:00', value: '14:00'},
            {label: '15:00', value: '15:00'},
            {label: '16:00', value: '16:00'}
        ]
    }

    obterListaDias(){
        return [
            {label: 'Selecione...', value: ''},
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
            {label: '5', value: 5},
            {label: '6', value: 6},
            {label: '7', value: 7},
            {label: '8', value: 8},
            {label: '9', value: 9},
            {label: '10', value: 10},
            {label: '11', value: 11},
            {label: '12', value: 12},
            {label: '13', value: 13},
            {label: '14', value: 14},
            {label: '15', value: 15},
            {label: '16', value: 16},
            {label: '17', value: 17},
            {label: '18', value: 18},
            {label: '19', value: 19},
            {label: '20', value: 20},
            {label: '21', value: 21},
            {label: '22', value: 22},
            {label: '23', value: 23},
            {label: '24', value: 24},
            {label: '25', value: 25},
            {label: '26', value: 26},
            {label: '27', value: 27},
            {label: '28', value: 28},
            {label: '29', value: 29},
            {label: '30', value: 30},
            {label: '31', value: 31}
        ]
    }

    obterListaSexo(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Feminino', value: 'MENINA'},
            {label: 'Masculino', value: 'MENINO'}
        ]
    }

    obterListaTemas(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Poderoso chefinho', value: 'PODEROSOCHEFINHO'},
            {label: 'Aviador', value: 'AVIADOR'},
            {label: 'Abelhinha', value: 'ABELHINHA'},
            {label: 'Bailarina', value: 'BAILARINA'},
            {label: 'Cowboy', value: 'COWBOY'},
            {label: 'Anjinho', value: 'ANJINHO'}
        ]
    }

    obterListaTipoSessao(){
        return[
            {label: 'Selecione...', value: ''},
            {label: 'Acompanhamento mensal', value: 'ACOMPANHAMENTOMENSAL'},
            {label: 'Smash the cake', value: 'SMACHTHECAKE'},
            {label: 'Newborn', value: 'NEWBORN'}
        ]
    }
    
    obterPorId(id){
        return this.get(`/${id}`);
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, {status})
    }

    validar(agendamento){
        const erros = [];

        
        if(!agendamento.nomeDaMae){
            erros.push("Informe seu Nome.")
        }

        if(!agendamento.telefone){
            erros.push("Informe o Telefone.")
        }

        
        if(!agendamento.nomeDaCrianca){
            erros.push("Informe o Nome da criança.")
        }
      
        if(!agendamento.idadeDaCrianca){
            erros.push("Informe a idade da criança.")
        }

        if(!agendamento.sexoDaCrianca){
            erros.push("Informe o sexo da criança.")
        }

        if(!agendamento.tipoDaSessao){
            erros.push("Informe o Tipo da sessão.")
        }

        if(!agendamento.tema){
            erros.push("Informe o Tema da sessão.")
        }

        if(!agendamento.ano){
            erros.push("Informe o Ano.")
        }
     
        if(!agendamento.mes){
            erros.push("Informe o Mês.")
        }
 
        if(!agendamento.dia){
            erros.push("Informe o Dia.")
        }

        if(!agendamento.hora_agendada){
            erros.push("Informe o Hora.")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    salvar(agendamento){
        return this.post('/', agendamento);
    }

    atualizar(agendamento){
        return this.put(`/${agendamento.id}`, agendamento);
    }

    consultar(agendamentoFiltro){
        let params = `?id=${agendamentoFiltro.login}`

        if(agendamentoFiltro.mes){
            params = `${params}&mes=${agendamentoFiltro.mes}`
        }

        if(agendamentoFiltro.hora){
            params = `${params}&hora=${agendamentoFiltro.hora}`
        }

        if(agendamentoFiltro.login){
            params = `${params}&login=${agendamentoFiltro.login}`
        }

        if(agendamentoFiltro.dia){
            params = `${params}&dia=${agendamentoFiltro.dia}`
        }

        if(agendamentoFiltro.ano){
            params = `${params}&ano=${agendamentoFiltro.ano}`
        }

     return this.get(params)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

}