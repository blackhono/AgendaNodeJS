const Contato = require('../models/ContatoModel');

module.exports.index = async(req, res) => {
    try{
        const listaContatos = await Contato.buscaContatos();
        res.render('index', { listaContatos })

    }catch(e){
        console.log(e);
    }
}

