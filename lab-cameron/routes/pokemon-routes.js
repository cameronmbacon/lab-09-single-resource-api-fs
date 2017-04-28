'use strict';

const debug = require('debug')('http:pokemon-routes');
const Pokemon = require('../model/pokemon');
const storage = require('../lib/storage');

module.exports = function(router) {
  router.get('/api/pokemon', function(req, res) {
    debug('GET /api/pokemon');
    if (req.url.query.id) {
      storage.fetchPokemon('pokemon', req.url.query.id)
      .then(pokemon => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(pokemon));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });

  router.post('/api/pokemon', function(req, res) {
    debug('POST /api/pokemon');
    try {
      let pokemon = new Pokemon(req.body.name, req.body.type);
      storage.createPokemon('pokemon', pokemon)
      .then(newPokemon => {
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(newPokemon));
        res.end();
      });
    } catch(err) {
      console.error(err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  router.put('/api/pokemon', function(req, res) {
    debug('PUT /api/pokemon');
    storage.updatePokemon('pokemon', req.body.id, req.body)
    .then(pokemon => {
      res.writeHead(202, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(pokemon));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    });
    return;
  });

  router.delete('/api/pokemon', function(req, res) {
    debug('DELETE /api/pokemon');
    if (req.url.query.id) {
      storage.deletePokemon('pokemon', req.url.query.id)
      .then(() => {
        res.writeHead(204, {'Content-Type': 'application/json'});
        res.write('pokemon successfully deleted');
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });
};
