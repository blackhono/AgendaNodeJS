require('dotenv').config();

const express = require('express');
const app = express();


const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.emit('conexaoEstabelecida')
        console.log('Conexão com a base de dados OK')
    })
    .catch(e => console.log(e));


const session = require('express-session');
const MongoStorage = require('connect-mongo');
const flash = require('connect-flash');
const path = require('path');
const routes = require('./routes');
const helmet = require('helmet');
const csrf = require('csurf');


const { meuMiddlewareGlobal, checkCsrfError, csrfMiddleware } = require(path.resolve(__dirname, 'src', 'middlewares', 'middleware'));


app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "script-src": ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"],
        "style-src": ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css", "'unsafe-inline'"],
      },
    })
  );

/* app.use(
    helmet.contentSecurityPolicy({
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"],
        styleSrc: ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  ); */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionOptions= {
    secret: 'segredoDoDiego',
    store: MongoStorage.create({mongoUrl:process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized:false,
    cookie: {
        maxAge: 1000*60*60*24*7,
        httpOnly: true,
    }
}
app.use(session(sessionOptions));
app.use(flash());

app.use(csrf());
//app.use(bodyParser.urlencoded({extended:false}));



app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//app.use(cookieParser());

app.use(meuMiddlewareGlobal);
app.use(csrfMiddleware);
app.use(checkCsrfError);

app.use(routes);



app.on('conexaoEstabelecida', ()=>{
    app.listen(3000, (() => {
        console.log('Acessar: http://localhost:3000');
        console.log('servidor executando na porta 3000');
        console.log()
    }));
})