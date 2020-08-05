// Libs
import { Router } from 'express';

// Storage
import * as Storage from '../storage/users';

export const createApi = (router: Router) => {
  router.post('/api/v1/users/find', function(req, res) {
    Storage.findItems(req.body).then(users => res.send(users));
  });

  router.get('/api/v1/users', function(req, res) {
    Storage.getItems().then(users => res.send(users));
  });
  
  router.post('/api/v1/users', function(req, res) {
    Storage.createItem(req.body).then(user => res.send(user));
  });

  router.get('/api/v1/users/:id', function(req, res) {
    Storage.getItem(req.params.id).then(user => res.send(user));
  });
  
  router.patch('/api/v1/users/:id', function(req, res) {
    Storage.updateItem(req.params.id, req.body).then(user => res.send(user));
  });
  
  router.delete('/api/v1/users/:id', function(req, res) {
    Storage.removeItem(req.params.id).then(() => null);
  });
}