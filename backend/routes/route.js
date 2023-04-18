const express = require('express');
const routes = express.Router();
const controleurs = require('../controleurs/controleurs.js');

//définir les routes
routes.get('/hightechs', controleurs.gethightechs);
routes.get('/hightech/:id', controleurs.gethightechById);

module.exports = routes;