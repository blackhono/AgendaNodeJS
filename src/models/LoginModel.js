const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');


const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})
//                                nome do model    Schema
const LoginModel = mongoose.model('Login', LoginSchema)


//normalmente fazemos uma classe para cuidar disso e não só exportamos
//assim. Seria algo tipo:

class Login {
    constructor(body) {
        this.body = body;
        this.errors = []
        this.user = null;
    }

    async login(){
        this.valida();
        if (this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });
        if(!this.user) {
            this.errors.push('Usuário não existe');
            return;
        }
        if(!bcryptjs.compareSync(this.body.password,this.user.password)){
            this.errors.push('Senha inválida')
            this.user = null;
            return;
        }
    }

    //registra usuario
    async register() {
        this.valida();
        if (this.errors.length > 0) return;
        await this.userExists();
        if (this.errors.length > 0) return;
        //sem erros então criamos o cadastro

        const salt = bcryptjs.genSaltSync(); //
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        this.user = await LoginModel.create(this.body);

    }

    valida() {
        //validadores
        this.cleanUp();
        //validação de e-mail
        if (!validator.isEmail(this.body.email)) this.errors.push('e-mail inválido')
        //senha com 4 a 12 caracteres
        if (this.body.password.length < 4 || this.body.password.length > 12) this.errors.push('A senha precisa ter entre 4 e 12 caracteres.')

    }

    cleanUp() {
        //verificação de dado enviado, para que seja string e colocar no this.body apenas
        //os dados que queremos da requisição (nesse caso está vindo o csrf 
        //mas queremos apenas o e-mail e senha para salvar no banco de dados)
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }


    async userExists() {
            this.user = await LoginModel.findOne({ email: this.body.email });
            if(this.user) this.errors.push('Usuário já existe!')

    }
}

module.exports = Login;