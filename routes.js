const express = require('express');
const route = express.Router();

//aqui em routes temos o controle das rotas
//então fazemos o import dos controllers aqui

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const errorController = require('./src/controllers/errorController');

const { loginRequired } = require('./src/middlewares/middleware');

//Rotas Home
route.get('/', homeController.index);

//Rotas Login
route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

//Rotas de Contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get(`/contato/index/:id`, loginRequired, contatoController.editIndex)
route.post(`/contato/edit/:id`, loginRequired, contatoController.edit)
route.get(`/contato/delete/:id`, loginRequired, contatoController.delete)


//Rotas Erro
//Metódos GET
route.get('/*', errorController.notFind);


module.exports = route;
