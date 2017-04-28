'use strict';

const debug = require('debug')('http:storage');
// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
// const mkdirp = require('mkdirp');
// const del = require('del');

const storage = {};

module.exports = exports = {};

exports.createPokemon = function(schema, pokemon) {
  debug('#createPokemon');
  if (!schema) return Promise.reject(new Error('Schema required'));
  if (!pokemon) return Promise.reject(new Error('Pokemon required'));
  if (!storage[schema]) storage[schema] = {};

  storage[schema][pokemon.id] = pokemon;

  return Promise.resolve(pokemon);
};

exports.fetchPokemon = function(schema, id) {
  return new Promise((resolve, reject) => {
    debug('#fetchPokemon');
    if (!schema) return reject(new Error('Schema required'));
    if (!id) return reject(new Error('Id required.'));

    let schemaName = storage[schema];
    if (!schemaName) return reject(new Error('Schema not found'));

    let pokemon = schemaName[id];
    if (!pokemon) return reject(new Error('Pokemon not found'));

    resolve(pokemon);
  });
};

exports.updatePokemon = function(schema, id, newPoke) {
  return new Promise((resolve, reject) => {
    debug('#updatePokemon');
    if (!schema) return reject(new Error('Schema required'));
    if (!id) return reject(new Error('Id required.'));

    let schemaName = storage[schema];
    if (!schemaName) return reject(new Error('Schema not found'));

    let pokemon = schemaName[id];
    if (!pokemon) return reject(new Error('Pokemon not found'));

    if (newPoke.name) pokemon.name = newPoke.name;
    if (newPoke.type) pokemon.type = newPoke.type;

    resolve(pokemon);
  });
};

exports.deletePokemon = function(schema, id) {
  return new Promise((resolve, reject) => {
    debug('#deletePokemon');
    if (!schema) return reject(new Error('Schema required'));
    if (!id) return reject(new Error('Id required.'));

    let schemaName = storage[schema];
    if (!schemaName) return reject(new Error('Schema not found'));

    let pokemon = schemaName[id];
    if (!pokemon) return reject(new Error('Pokemon not found'));

    delete storage[schema][id];

    resolve();
  });
};
