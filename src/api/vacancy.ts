// Libs
import { Router } from 'express';

// Storage
import * as Storage from '../storage/vacancy';
import * as UserStorage from '../storage/users';

export const createApi = (router: Router) => {
  router.post('/api/v1/vacancy/find', function(req, res) {
    Storage.findItems(req.body).then(items => {
      return Promise.all(items.map(item => !item || !item.company ? Promise.resolve({}) : UserStorage.getItem(item.company))).then(users => {
        const result = items.map((i, j) => ({ ...i, user: users[j] }));
        
        res.send(req.body.name ? result.filter(i => JSON.stringify(i).toLowerCase().split(req.body.name.toLowerCase().trim()).length > 1) : result);
      })
    });
  });

  router.get('/api/v1/vacancy', function(req, res) {
    Storage.getItems().then(items => {
      return Promise.all(items.map(item => !item || !item.company ? Promise.resolve({}) : UserStorage.getItem(item.company))).then(users => {
        res.send(items.map((i, j) => ({ ...i, user: users[j] })));
      })
    });
  });
  
  router.post('/api/v1/vacancy', function(req, res) {
    Storage.createItem(req.body).then(user => res.send(user));
  });

  router.get('/api/v1/vacancy/:id', function(req, res) {
    Storage.getItem(req.params.id).then(item => {
      if (!item || !item.company) {
        return res.sendStatus(400);
      }

      UserStorage.getItem(item.company).then(user => {
        res.send({ ...item, user });
      })
    });
  });
  
  router.patch('/api/v1/vacancy/:id', function(req, res) {
    Storage.updateItem(req.params.id, req.body).then(user => res.send(user));
  });
  
  router.delete('/api/v1/vacancy/:id', function(req, res) {
    Storage.removeItem(req.params.id).then(() => res.send(null));
  });
}