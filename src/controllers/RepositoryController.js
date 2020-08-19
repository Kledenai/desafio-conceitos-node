const { uuid } = require('uuidv4');

module.exports = {
  index (request, response) {
    const { title } = request.query;

    const repositories = request.app.get('repositories');

    const result = title
      ? repositories.filter(repository => repository.title.includes(title))
      : repositories;

    return response.json(result);
  },

  store (request, response) {
    const { title, url, techs } = request.body;
    const likes = 0

    const repositories = request.app.get('repositories');

    const repository = {
      id: uuid(),
      title, url,
      techs,
      likes
    };

    repositories.push(repository);
    return response.json(repository);
  },

  show (request, response) {
    const { id } = request.params;

    const repositories = request.app.get('repositories');

    const repository = repositories.find(repository => repository.id === id);

    if (repository < 0) {
      return response.status(400).json({ message: 'Repository not found.' });
    }

    return response.json(repository);
  },

  update (request, response) {
    const { id } = request.params;
    const { title, techs, url } = request.body;

    const repositories = request.app.get('repositories');

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if(repositoryIndex < 0) {
      return response.status(400).json({ error: 'Repository not found.'});
    }

    const repository = {
      id,
      title,
      url,
      techs,
      likes: repositories[repositoryIndex].likes,
    }

    console.log(repository.likes)


    repositories[repositoryIndex] = repository

    return response.json(repository);
  },

  delete (request, response) {
    const { id } = request.params;

    const repositories = request.app.get('repositories');

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if(repositoryIndex < 0) {
      return response.status(400).json({ error: 'Repository not found.'});
    }

    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
  }
};
