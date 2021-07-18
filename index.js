const express = require('express');
const app = express();
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

connection
  .authenticate()
  .then(() => {
    console.log("Conecção feita com sucesso");
  })
  .catch((error) => {
    console.log("Error ao conectar: ", error);
  });

var port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get("/", (req, res) => {
  Pergunta.findAll({raw: true, order:[
    ['id', 'DESC']
  ]}).then(perguntas => {
    res.render("index.ejs", {
      perguntas: perguntas
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar.ejs")
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: {id: id}
  }).then(pergunta => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: {perguntaid: pergunta.id},
        order: [
          ['id', 'DESC']
        ]
      }).then(respostas => {
        res.render("pergunta.ejs",{
          pergunta: pergunta,
          respostas: respostas
        });
      });
    }else{
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaid = req.body.pergunta;

  Resposta.create({
    corpo: corpo,
    perguntaid: perguntaid
  }).then(() => {
    res.redirect("/pergunta/"+perguntaid);
  });
});

app.listen(port, (error) => {
  if (error) {
    console.log("Error ao iniciar o servidor: ", error);
  }else{
    console.log("Servidor inicializado com sucesso!");
  }
});
