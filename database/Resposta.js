const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define("respostas", {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  perguntaid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Resposta.sync({forse: false});

module.exports = Resposta;