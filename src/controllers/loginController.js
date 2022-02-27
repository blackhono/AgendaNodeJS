const Login = require('../models/LoginModel')

module.exports.index = (req, res) => {
    //console.log(req.session.user)
    if(req.session.user){
        return res.render('login-logado')
    }
    res.render('login');
}


module.exports.register = async (req, res) => {
    const login = new Login(req.body);
    try {
        await login.register();
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/login');
            })
            return;
        }
        req.flash('success', 'Usuário criado com sucesso!');
        req.session.save(() => {
            return res.redirect('/login');
        })

        //res.send(login.errors);

    } catch (e) {
        console.log(e)
        res.render('404');
    }

}

module.exports.login = async (req, res) => {
    const login = new Login(req.body);
    try {
        await login.login();
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/login');
            })
            return;
        }

        req.flash('success', 'Login efetuado com sucesso!');
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('/');
        })

        //res.send(login.errors);

    } catch (e) {
        console.log(e)
        res.render('404');
    }

}

module.exports.logout = async(req, res) => {
    await req.session.destroy();
    return res.redirect('/login');
}