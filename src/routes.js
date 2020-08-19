const express = require('express');
const RepositoryController = require('./controllers/RepositoryController');
const LikeController = require('./controllers/LikeController');

const routes = express.Router();

routes.get('/repositories', RepositoryController.index);
routes.post('/repositories', RepositoryController.store);
routes.get('/repositories/:id', RepositoryController.show);
routes.put('/repositories/:id', RepositoryController.update);
routes.delete('/repositories/:id', RepositoryController.delete);

routes.post('/repositories/:id/like', LikeController.like);
routes.post('/repositories/:id/deslike', LikeController.deslike);

module.exports = routes;
