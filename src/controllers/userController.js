  const User = require("../../src/models/User");
  const userRepository =require('../../src/repositories/userRepository');
  // import selecaoRepository from "../repositories/userRepository.js";
  
  exports.getAllUsers = async function (req, res) {
    const find = selecaoRepository.findAll();
    res.json(find);
  };
  
  exports.createUser = async function (req, res) {};
  
  exports.updateUser = async function (req, res) {};
  
  exports.deleteUser = async function (req, res) {};
  