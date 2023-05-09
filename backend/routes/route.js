const express = require('express');
const routes = express.Router();
const controleurs = require('../controleurs/controleurs.js');
const key =require(("../Key/API_key.js"))

routes.get('/hightechs',key.authenticateKey ,controleurs.gethightechs);
routes.get('/hightech/:id',key.authenticateKey, controleurs.gethightechById);

module.exports = routes;