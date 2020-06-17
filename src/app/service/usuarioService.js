import ApiService from '../apiservice'

class LoginService extends ApiService {
    constructor(){
        super('/api/logins')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    salvar(usuario){
        return this.post('/', usuario)
    }
}

export default LoginService;