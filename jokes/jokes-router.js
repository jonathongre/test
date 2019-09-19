const router = require('express').Router();

const Jokes = require('./jokes-model.js');
const restricted = require('../auth/restricted-middleware.js');

//Get all public jokes
router.get('/', (req, res) => {
    Jokes.findPublic()
        .then(jokes => {
            res.status(200).json(jokes);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//Get all of your jokes public and private
router.get('/:author', restricted, (req, res) => {
    let { author } = req.params
    Jokes.findMyJokes({ author })
    .then(jokes => {
        if (author === req.user.username) {
        res.status(200).json(jokes);
        }else{
            res.status(401).json({ message: 'Invalid Credentials' }); 
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
})

//Get public jokes by user
router.get('/:author/jokes', (req, res) => {
    const { author } = req.params;
    Jokes.findByUser(author)
        .then(jokes => {
            res.status(200).json(jokes);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//Add a joke
router.post('/:author', restricted, (req, res) => {
    // console.log(req.user)
    let joke = req.body;
    let userId = req.user.id;
    let author = req.params.author;
    Jokes.add({ ...joke, userId, author })
        .then(newJoke => {
            if (author  === req.user.username) {
                res.status(200).json(newJoke);
                }else{
                    res.status(401).json({ message: 'Invalid Credentials' }); 
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
});

//Update a joke by id
router.put('/:author/:id', restricted, (req, res) => {
    console.log(req.params, req.user)
    let body = req.body;
    let id = req.params.id;
    let author = req.params.author;
    Jokes.updateJoke(body, id)
        .then(updatedJoke => {
            if (author  === req.user.username) {
                res.status(200).json(updatedJoke);
                }else{
                    res.status(401).json({ message: 'Invalid Credentials' }); 
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
})

//Delete a joke
router.delete('/:author/:id', restricted, (req, res) => {
    let id = req.params.id;
    let author = req.params.author;
    Jokes.deleteJoke(id)
        .then(deleted => {
            if (author  === req.user.username) {
                res.status(200).json(deleted);
                }else{
                    res.status(401).json({ message: 'Invalid Credentials' }); 
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
})

module.exports = router;