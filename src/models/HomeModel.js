const mongoose = require('mongoose');


const HomeSchema = new mongoose.Schema({
    titulo: {type: String, required:true},
    descricao: String
})
//                                nome do model    Schema
const HomeModel = mongoose.model(   'Home'     ,  HomeSchema   )

module.exports.HomeModel = HomeModel;

//normalmente fazemos uma classe para cuidar disso e não só exportamos
//assim. Seria algo tipo:

//  class Home {
//
//  }
//
// module.exports = Home ou module.exports.Home = Home;