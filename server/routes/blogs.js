const express = require('express');

const router = new express.Router();

const Blog = require('../models/blog');

router.route('/')
  .get((req, res) => {
    Blog.find({})
      .then(posts => res.send(posts))
      .catch(err => res.status(400).send(err));
  })
  .post((req, res) => {
    Blog.create(req.body)
      .then(post => res.send(post))
      .catch(err => res.status(400).send(err));
  });

router.route('/:id')
  .get((req, res) => {
    Blog.findById(req.params.id)
      .then(post => res.send(post))
      .catch(err => res.status(400).send(err));
  })
  .put((req, res) => {
    Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(Blog.find({}))
      .then(posts => res.send(posts))
      .catch(err => res.status(400).send(err));
  })
  .delete((req, res) => {
    Blog.findByIdAndRemove(req.params.id)
      .then(Blog.find({}))
      .then(posts => res.send(posts))
      .catch(err => res.status(400).send(err));
  });

module.exports = router;
