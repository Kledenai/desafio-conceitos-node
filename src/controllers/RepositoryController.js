const { v4: uuid } = require('uuid');

module.exports = {
  async index (request, response) {
    const { title } = request.query;

    const repositories = request.app.get('repositories');

    const result = title
      ? repositories.filter(repository => repository.title.includes(title))
      : repositories;

    return response.status(200).json(result);
  },

  async store (request, response) {
    const { title, url, techs } = request.body;

    const repositories = request.app.get('repositories');

    const repository = { id: uuid(), title, url, techs, like: 0 };

    await repositories.push(repository);

    return response.status(201).json(repository);
  },

  async show (request, response) {
    const { id } = request.params;

    const repositories = request.app.get('repositories');

    const repository = await repositories.find(repository => repository.id === id);

    if (repository < 0) {
      return response.status(400).json({ message: 'Repository not found.' });
    }

    return response.json(repository);
  },

  async update (request, response) {
    const { id } = request.params;
    const { title, url, techs } = request.body;

    const repositories = request.app.get('repositories');

    const repositoryIndex = await repositories.findIndex(repository => repository.id === id);

    if(repositoryIndex < 0) {
      return response.status(400).json({ message: 'Project not found.' });
    }

    const repository = {
      id,
      title,
      url,
      techs,
    };

    repositories[repositoryIndex] = repository

    return response.json(project);
  },

  async delete (request, response) {
    const { id } = request.params;

    const repositories = request.app.get('repositories');

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex < 0) {
      return response.status(400).json({ message: 'Project not found.' });
    }

    repositories.splice(repositoryIndex, 1);

    return response.json({ message: 'Repository deleted successfuly' });
  }
};
