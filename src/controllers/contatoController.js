const Contato = require('../models/ContatoModel');

module.exports.index = (req, res) => {
    res.render('contato', {
        contato:{}
    });
}

module.exports.register = async(req, res) => {
    const contato = new Contato(req.body)
    try{
        await contato.register()
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(()=>{
                res.redirect('/contato/index')
            })
            return;
        }
        req.flash('success', 'Contato registrado com sucesso');
        req.session.save(()=>{
            res.redirect(`/contato/index/${contato.contato._id}`);
            return;
        })
        //res.send('oi sumido! Volta para o youtube volta... vamo curtir uns vídeos aleatórios, vamos!');
    } catch(e){
        console.log(e)
        return res.render('404');
    }
}

module.exports.editIndex = async(req, res) => {
    try{
        if(!req.params.id) return res.render('404');
        const contato = await Contato.buscaPorId(req.params.id)
        if(!contato) return res.render('404');
        res.render('contato', { contato })

    } catch(e){
        console.log(e)
        return res.render('404');
    }
}

module.exports.edit = async(req, res) => {
    try{
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(()=>{
                res.redirect('back')
            })
            return;
        }
        req.flash('success', 'Contato editado com sucesso');
        req.session.save(()=>{
            res.redirect(`/contato/index/${contato.contato._id}`);
            return;
        })
    } catch(e){
        console.log(e)
    }
}

module.exports.delete = async(req, res) => {
    try{
        if(!req.params.id) return res.render('404');
        const contato = await Contato.delete(req.params.id);
        if(!contato){
            req.flash('error', 'Contato não encontrado');
            req.session.save(()=>{
                res.redirect(`/`);
                return;
            })
        }
        req.flash('success', 'Contato excluido com sucesso');
        req.session.save(()=>{
            res.redirect(`/`);
            return;
        })
    } catch(e){
        console.log('cai aqui me levanta berg')
    }
}