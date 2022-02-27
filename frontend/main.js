import 'core-js/stable';
import 'regenerator-runtime/runtime';

console.log('olá mundo!')

import LoginCadastro from './modules/Login';

const login = new LoginCadastro('.form-login');
const cadastro = new LoginCadastro('.form-cadastro')

login.init();
cadastro.init();




import './assets/css/style.css';

//não esqueça nesse projeto tem que rodar os dois scripts
// npm start
// npm run dev 