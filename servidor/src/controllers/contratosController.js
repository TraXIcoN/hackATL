var sequelize = require("../models/database");
var Contratos = require("../models/contratos");
var Infraestruturas = require("../models/infraestruturas");
const controllers = {};

controllers.contratos_list = async (req, res) => {
  const data = await Contratos.findAll({
    include: [Infraestruturas],
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

controllers.contratos_detail = async (req, res) => {
  const { id } = req.params;
  const data = await Contratos.findAll({
    where: { utilizadorIdC: id },
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

controllers.contratos_detailid = async (req, res) => {
  const { id } = req.params;
  const data = await Contratos.findAll({
    where: { idcontrato: id },
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

controllers.contratos_create = async (req, res) => {
  // Data
  const {
    idcontrato,
    estado,
    duracao,
    datacontrato,
    infraestruturaIdinfraestrutura,
    ofertaIdoferta,
    utilizadorIdV,
    utilizadorIdC,
  } = req.body;
  // Create
  const data = await Contratos.create({
    idcontrato: idcontrato,
    estado: estado,
    duracao: duracao,
    datacontrato: datacontrato,
    infraestruturaIdinfraestrutura: infraestruturaIdinfraestrutura,
    ofertaIdoferta: ofertaIdoferta,
    utilizadorIdV: utilizadorIdV,
    utilizadorIdC: utilizadorIdC,
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      console.log("Error: " + error);
      return error;
    });
  // Return response
  res.status(200).json({
    success: true,
    message: "Registered",
    data: data,
  });
};

controllers.contratos_update = async (req, res) => {
  // Parameter get id
  const { id } = req.params;
  // Parameter POST
  const { estado } = req.body;
  // Update data
  const data = await Contratos.update(
    {
      estado: estado,
    },
    {
      where: { idcontrato: id },
    }
  )
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

module.exports = controllers;
