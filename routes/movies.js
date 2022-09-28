const express = require('express');
const routes = express.Router();

const moviesController = require('../controllers/movie');

routes.get('/', moviesController.getMovies);

routes.get('/:id', moviesController.getMovie);

routes.post('/', moviesController.addMovie);

routes.put('/:id', moviesController.updateMovie);

routes.delete('/:id', moviesController.deleteMovie);

module.exports = routes;