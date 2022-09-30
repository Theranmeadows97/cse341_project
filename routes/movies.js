const express = require('express');
const routes = express.Router();


const moviesController = require('../controllers/movie');
const validation = require('../middleware/validateMovie');

routes.get('/', moviesController.getMovies);

routes.get('/:id', moviesController.getMovie);

routes.post('/', validation.saveMovie, moviesController.addMovie);

routes.put('/:id', validation.saveMovie, moviesController.updateMovie);

routes.delete('/:id', moviesController.deleteMovie);

module.exports = routes;