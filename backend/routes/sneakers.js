const express = require('express');
const routes = express.Router();
const controleurs = require('../controleurs/sneaker.js');

//définir les routes
routes.get('/sneakers', controleurs.getSneakers);
routes.get('/sneakers/:id', controleurs.getSneakersById);

module.exports = routes;