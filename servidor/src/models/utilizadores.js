var Sequelize = require("sequelize");
var sequelize = require("./database");
const bcrypt = require("bcrypt"); // Encrypts the password to store in the database

var Utilizador = sequelize.define(
  "utilizadores",
  {
    iduser: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomeuser: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    pass: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telemovel: Sequelize.STRING(9), // Phone number
    cpe: Sequelize.STRING(20),
    nif: Sequelize.STRING(9),
    morada: Sequelize.STRING, // Address
    gastoComprador: Sequelize.FLOAT, // Buyer spending
    consumoComprador: Sequelize.INTEGER, // Buyer consumption
    nCompras: Sequelize.INTEGER, // Number of purchases
    servicosVendidos: Sequelize.INTEGER, // Services sold
    totalGanho: Sequelize.FLOAT, // Total earnings
  },
  {
    timestamps: false,
  }
);

Utilizador.beforeCreate((user, options) => {
  return bcrypt
    .hash(user.pass, 10)
    .then((hash) => {
      user.pass = hash;
    })
    .catch((err) => {
      throw new Error();
    });
});

module.exports = Utilizador;
