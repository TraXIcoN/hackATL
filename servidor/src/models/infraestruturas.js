var Sequelize = require("sequelize");
var sequelize = require("./database");

var Utilizadores = require("./utilizadores");
var Infraestruturas = sequelize.define(
  "infraestruturas",
  {
    idinfraestrutura: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: Sequelize.STRING,
    capacidadegeracao: Sequelize.INTEGER, // Generation capacity
    tipoproducao: Sequelize.STRING, // Production type
    areadeproducao: Sequelize.INTEGER, // Production area
    morada: Sequelize.STRING, // Address
  },
  {
    timestamps: false,
  }
);

Infraestruturas.belongsTo(Utilizadores);
Utilizadores.hasMany(Infraestruturas);

module.exports = Infraestruturas;
