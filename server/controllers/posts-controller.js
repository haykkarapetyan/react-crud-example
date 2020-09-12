const knex = require('./../db')

exports.postsAll = async (req, res) => {
  knex
    .select('*') 
    .from('posts') 
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving posts: ${err}` })
    })
}

exports.postsEdit = async (req, res) => {
  knex
    .select('*') 
    .from('posts')
    .where('id', req.body.id) 
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `Edit message posts: ${err}` })
    })
}

exports.postsUpdate = async (req, res) => {
  knex('posts')
    .where('id', req.body.id) 
    .update({
      author: req.body.author,
      title: req.body.title,
      text: req.body.text
    })
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `Edit message posts: ${err}` })
    })
}

exports.postsShow = async (req, res) => {
  knex
    .select('*') 
    .from('posts')
    .where('id', req.body.id) 
    .then(postData => {
      res.json(postData)
    })
    .catch(err => {
      res.json({ message: `Show message post: ${err}` })
    })
}

exports.postsCreate = async (req, res) => {
  knex('posts')
    .insert({ 
      'author': req.body.author,
      'title': req.body.title,
      'text': req.body.text
    })
    .then(() => {
      res.json({ message: `Post \'${req.body.title}\' by ${req.body.author} created.` })
    })
    .catch(err => {
      res.json({ message: `There was an error creating ${req.body.title} post: ${err}` })
    })
}

exports.postsDelete = async (req, res) => {
  knex('posts')
    .where('id', req.body.id) 
    .del() 
    .then(() => {
      res.json({ message: `Post ${req.body.id} deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting ${req.body.id} post: ${err}` })
    })
}