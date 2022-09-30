const express = require('express');
const routes = express.Router();


const actorsController = require('../controllers/actor');
const validation = require('../middleware/validateActor');

routes.get('/', actorsController.getActors);

routes.get('/:id', actorsController.getActor);

routes.post('/', validation.saveActor, actorsController.addActor);

routes.put('/:id', validation.saveActor, actorsController.updateActor);

routes.delete('/:id', actorsController.deleteActor);

module.exports = routes;