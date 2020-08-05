// Libs
import { Router } from 'express';

// Services
import { me } from '../services/auth';

// Storage
import * as Storage from '../storage/messages';
import * as UsersStorage from '../storage/users';

export const createApi = (router: Router) => {
  router.get('/api/v1/messages', function(req, res) {
    me(req).then(user => {
      return Promise.all([Storage.list({ from: user._id }), Storage.list({ to: user._id })]).then(async ([mine, me]) => {
        const usersIds: string[] = [];

        mine.map(i => {
          if (i.to && usersIds.indexOf(i.to) === -1) {
            usersIds.push(i.to);
          }
        });

        me.map(i => {
          if (i.from && usersIds.indexOf(i.from) === -1) {
            usersIds.push(i.from);
          }
        });

        const users = await Promise.all(usersIds.map(id => UsersStorage.getItem(id)));
        
        res.send(users);
      }).catch(() => res.sendStatus(401));
    }).catch(() => res.sendStatus(401));
  });
  
  router.get('/api/v1/messages/:id', function(req, res) {
    me(req).then(user => {
      return Promise.all([Storage.list({ from: user._id, to: req.params.id }), Storage.list({ from: req.params.id, to: user._id })]).then(([mine, me]) => res.send([ ...mine, ...me ])).catch(() => res.sendStatus(401));
    }).catch(() => res.sendStatus(401));
  });
  
  router.post('/api/v1/messages/:id', function(req, res) {
    me(req).then(user => {
      Storage.send({ ...req.body, from: user._id, to: req.params.id }).then(messages => res.send(messages));
    }).catch(() => res.sendStatus(401));
  });

  router.patch('/api/v1/messages/:id', function(req, res) {
    me(req).then(() => {
      Storage.read(req.params.id).then(messages => res.send(messages));
    }).catch(() => res.sendStatus(401));
  });
}