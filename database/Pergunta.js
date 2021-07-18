const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('perguntas', {
  titulo:{
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Campo obrigatorio'
      }
    }
  },
  descricao:{
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Campo obrigatorio'
      }
    }
  } 
});

Pergunta.sync({forse: false}).then(() => {});

module.exports = Pergunta;