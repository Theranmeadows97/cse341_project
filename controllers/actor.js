const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getActors = async (req, res) => {
    const data = await mongodb.getDb().db('movieData').collection('actors').find();
    data.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

  const getActor = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid actor id to find an actor.');
    }
    const actorId = new ObjectId(req.params.id);
    const data = await mongodb.getDb().db('movieData').collection('actors').find({_id: actorId});
    data.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };
  
  const addActor = async (req, res) => {
    const newActor = {
      name: req.body.name,
      movie: req.body.movie
    };
    const response = await mongodb.getDb().db('movieData').collection('actors').insertOne(newActor);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'New actor failed to be added.');
    }
  };

  const updateActor = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid actor id to update an actor.');
    }
    const actorId = new ObjectId(req.params.id);
    const actor = {
      name: req.body.name,
      movie: req.body.movie
    };
    const response = await mongodb.getDb().db('movieData').collection('actors').replaceOne({_id: actorId }, actor);
    console.log(response);
    if (response.modifiedCount > 0){
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Actor failed to update.');
    }
  };
  
  const deleteActor = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid actor id to delete an actor.');
    }
    const actorId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('movieData').collection('actors').remove({_id: actorId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Actor failed to be deleted.');
    }
  };
  
  module.exports = {getActors, getActor, addActor, updateActor, deleteActor };