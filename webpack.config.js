const path = require('path'); //commonJS é o padrão do node.

module.exports = {
    mode: 'development',
    entry: './frontend/main.js',
    output: {
      path: path.resolve(__dirname, 'public', 'assets', 'js'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
    },
    devtool: 'source-map'
  };
/* 
 mode development só gera o arquivo mas não minificado
 mode production gera o arquivo minificado

 entry é o arquivo raiz js

 output é um objeto com a saida do código do bundle

    no node temos acesso a variavel __dirname que é o diretório atual
    e como está dentro do path.resolve basta adicionarmos o caminho até
    a pasta que queremos, da mesma maneira do exemplo acima.

    filename é o nome do arquivo.

    module

    devtool:'source-map' faz o mapeamento já que o arquivo fica diferente
    (estaremos vendo o bundle no navegador) então o source map procura o 
    arquivo correto.


    a primeira regra em rules foi feita para meu JAVASCRIPT
    a segunda regra (outro objeto) foi feita para meu CSS

*/