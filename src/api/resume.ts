// Libs
import { Router } from 'express';

// Storage
import * as Storage from '../storage/resume';
import * as UserStorage from '../storage/users';

export const createApi = (router: Router) => {
  router.post('/api/v1/resume/find', function(req, res) {
    Storage.findItems({}).then(items => {
      return Promise.all(items.map(item => !item || !item.student ? Promise.resolve({}) : UserStorage.getItem(item.student))).then(users => {
        const result = items.map((i, j) => ({ ...i, user: users[j] }));
        
        res.send(req.body.name ? result.filter(i => JSON.stringify(i).toLowerCase().split(req.body.name.toLowerCase().trim()).length > 1) : result);
      })
    });
  });

  router.get('/api/v1/resume', function(req, res) {
    Storage.getItems().then(items => {
      return Promise.all(items.map(item => !item || !item.student ? Promise.resolve({}) : UserStorage.getItem(item.student))).then(users => {
        res.send(items.map((i, j) => ({ ...i, user: users[j] })));
      })
    });
  });
  
  router.post('/api/v1/resume', function(req, res) {
    Storage.createItem(req.body).then(item => res.send(item));
  });

  router.get('/api/v1/resume/:id', function(req, res) {
    Storage.getItem(req.params.id).then(item => {
      if (!item || !item.student) {
        return res.sendStatus(400);
      }

      UserStorage.getItem(item.student).then(user => {
        res.send({ ...item, user });
      })
    });
  });
  
  router.patch('/api/v1/resume/:id', function(req, res) {
    Storage.updateItem(req.params.id, req.body).then(item => res.send(item));
  });
  
  router.delete('/api/v1/resume/:id', function(req, res) {
    Storage.removeItem(req.params.id).then(() => null);
  });
}