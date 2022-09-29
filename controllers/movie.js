const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getMovies = async (req, res) => {
  const data = await mongodb.getDb().db('movieData').collection('movies').find();
  data.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getMovie = async (req, res) => {
  const movieId = new ObjectId(req.params.id);
  const data = await mongodb.getDb().db('movieData').collection('movies').find({_id: movieId});
  data.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const addMovie = async (req, res) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    subGenres: req.body.subGenres,
    rating: req.body.rating,
    content: req.body.content,
    releaseYear: req.body.releaseYear,
    purchaseDate: req.body.purchaseDate
  };
  const response = await mongodb.getDb().db('movieData').collection('movies').insertOne(newMovie);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'New movie failed to be added.');
  }
};
const updateMovie = async (req, res) => {
  const movieId = new ObjectId(req.params.id);
  const movie = {
    title: req.body.title,
    genre: req.body.genre,
    subGenres: req.body.subGenres,
    rating: req.body.rating,
    content: req.body.content,
    releaseYear: req.body.releaseYear,
    purchaseDate: req.body.purchaseDate
  };
  const response = await mongodb.getDb().db('movieData').collection('movies').replaceOne({_id: movieId }, movie);
  console.log(response);
  if (response.modifiedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Movie failed to update.');
  }
};

const deleteMovie = async (req, res) => {
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('movieData').collection('movies').remove({_id: movieId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Movie failed to be deleted.');
  }
};

const getActors = async (req, res) => {
    const data = await mongodb.getDb().db('movieData').collection('actors').find();
    data.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

module.exports = { getMovies, getMovie, addMovie, updateMovie, deleteMovie, getActors };