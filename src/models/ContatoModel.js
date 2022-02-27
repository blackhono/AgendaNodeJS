const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    name: {type: String, required:true},
    lastName: {type: String, required:false, default: ''},
    email: {type: String, required:false, default: ''},
    telephone: {type: String, required:false, default: ''},
    criadoEm: {type:Date, default:Date.now}
})
//                                nome do model    Schema
const ContatoModel = mongoose.model(   'Contato'     ,  ContatoSchema   )



//normalmente fazemos uma classe para cuidar disso e não só exportamos
//assim. Seria algo tipo:

  class Contato {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.contato = null;
    }
    async register(){
        this.valida()
        if (this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body)

    }

    static buscaPorId = async(id)=>{
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findById(id);
        return contato;
    }

    //lembrando que da para fazer filtro no find mandando um objeto
    //tipo ContatoModel.find({email:'emailprocurado'})
    //mas no momento só quero a ordem de acordo com que foram criados
    // 1 para crescente e -1 para decrescente
    static buscaContatos = async()=>{
        const contatos = await ContatoModel.find().sort({criadoEm: -1})
        return contatos;
    }
    static delete = async(id)=>{
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findByIdAndDelete(id);
        return contato;
    }

    async edit(id){
        if(typeof id !== "string") return;
        this.valida();
        if (this.errors.length > 0) return;
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
    }

    valida() {
        //validadores
        this.cleanUp();

        if(!this.body.name ) this.errors.push('Nome é um campo obrigatório')
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('e-mail inválido')
        if (!this.body.telephone && !this.body.email) this.errors.push('É necessário pelo menos um contato para registro: e-mail ou telefone');
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
            name: this.body.name,
            lastName: this.body.lastName,
            email: this.body.email,
            telephone: this.body.telephone
        }
    }

  }


module.exports = Contato;



//dica caso fosse findOne({_id:id, name:name})
//quando usar findOne tem que dizer qual dado bate com qual chave do banco de dados.