module.exports = {
  async like(request, response) {
    const { id } = request.params;

    const repositories = request.app.get('repositories');

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if(repositoryIndex < 0) {
      return response.status(400).json({ error: 'Repository not found.'});
    }

    const repository = repositories[repositoryIndex]

    repository.likes += 1

    return response.json(repository);
  },

  async deslike(request, response) {
    const { id } = request.params;

    const repositories = request.app.get('repositories');

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if(repositoryIndex < 0) {
      return response.status(400).json({ error: 'Repository not found.'});
    }

    const repository = repositories[repositoryIndex]

    if(repository.likes === 0) {
      return response.status(400).json({ error: "This repository don't have likes" })
    }

    repository.likes -= 1

    return response.json(repository);
  }
};
