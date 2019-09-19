const db = require('../database/dbConfig.js');

module.exports = {
    findMyJokes,
    findPublic,
    findBy,
    add,
    findById,
    findByUser,
    updateJoke,
    deleteJoke
};

function findMyJokes({ author }) {
    return db('jokes')
        .select('id', 'setup', 'punchline', 'userId', 'author', 'public')
        .where({ author });
}

function findPublic() {
    return db('jokes')
        .select('id', 'setup', 'punchline', 'userID', 'author', 'public')
        .where({ public: 1 });
}

function findBy(filter) {
    return db('jokes').where(filter);
  }
  
  async function add(joke) {
    const [id] = await db('jokes').insert(joke);
  
    return findById(id);
  }
  
  function findById(id) {
    return db('jokes')
      .where({ id })
      .first();
  }

  function findByUser(author) {
      return db('jokes')
      .where({ author, public: 1 });
  }

  function updateJoke(changes, id) {
      return db('jokes')
        .update(changes)
        .where({ id });
  }

  function deleteJoke(id) {
      return db('jokes')
        .del()
        .where({ id });
  }