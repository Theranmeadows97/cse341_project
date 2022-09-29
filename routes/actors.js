const express = require('express');
const routes = express.Router();

const actorsController = require('../controllers/actor');

routes.get('/', actorsController.getActors);

routes.get('/:id', actorsController.getActor);

routes.post('/', actorsController.addActor);

routes.put('/:id', actorsController.updateActor);

routes.delete('/:id', actorsController.deleteActor);

module.exports = routes;