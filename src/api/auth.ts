// Libs
import { Router } from 'express';
import passport from 'passport';
import Facebook from 'passport-facebook';

// Services
import * as auth from '../services/auth';
import * as google from '../services/google';

// Storage
import * as UsersStorage from '../storage/users';

passport.use(new Facebook.Strategy({
  clientID: '464587970911669',
  clientSecret: '47f7352001d66521a5b3f47f8368ace9',
  callbackURL: (process.env.PROTOCOL || 'https') + '://' + (process.env.DOMAIN || 'localhost') + '/auth/facebook',

  profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

export const createApi = (router: Router) => {
  router.get('/auth/google', function(req, res) {
    const authorizeUrl = google.genURL();

    if (!req.query.code) {
      return res.redirect(authorizeUrl);
    }

    google.getToken(req.query.code as string).then(resp => {
      if (req.session) {
        req.session.google = resp;
        res.redirect('/account');
      }
    }).catch(() => {
      res.sendStatus(401);
    });
  });

  router.get('/auth/facebook', passport.authenticate('facebook', { successRedirect: '/account', failureRedirect: '/auth/facebook' }));

  router.post('/api/v1/register', function(req, res) {
    if (req.session && (req.session.user || req.session.google)) {
      return res.sendStatus(400);
    }

    auth.register(req.body).then(user => {
      if (req.session) {
        req.session.user = user._id;
      }

      res.sendStatus(200);
    }).catch(e => {
      res.status(409);
      res.send(e);
    });
  });

  router.post('/api/v1/verify', function(req, res) {
    if (!req.session || !req.session.user) {
      return res.sendStatus(401);
    }

    auth.verify(req.session.user, req.body).then(() => res.send(200)).catch(e => {
      res.status(400);
      res.send(e);
    });
  });

  router.post('/api/v1/auth', function(req, res) {
    auth.login(req.body).then(user => {
      if (req.session && user._id) {
        req.session.user = user._id;
        res.send(user);
      }
    }).catch(() => {
      res.sendStatus(401);
    })
  });

  router.patch('/api/v1/user', function(req, res) {
    if (!req.session || (!req.session.user && !req.session.google && !req.isAuthenticated())) {
      return res.sendStatus(401);
    }

    if (req.session.user) {
      return UsersStorage.getItem(req.session.user).then(user => {
        if (!user || !user._id) {
          return res.sendStatus(404);
        }

        UsersStorage.updateItem(user._id, req.body).then(() => {
          res.send(200);
        }).catch(() => {
          res.sendStatus(401);
        });
      }).catch(() => {
        res.sendStatus(401);
      });
    }

    if (req.session.google) {
      return google.getUser(req.session.google).then(googleUser => {
        auth.gauth(googleUser).then(user => {
          if (!user || !user._id) {
            return res.sendStatus(404);
          }

          UsersStorage.updateItem(user._id, req.body).then(() => {
            res.send(200);
          }).catch(() => {
            res.sendStatus(401);
          });
        });
      }).catch(() => {
        if (req.session && req.session.google) {
          req.session.google = undefined;
        }
        
        res.sendStatus(401);
      });
    }

    if (req.isAuthenticated() && req.user) { 
      return auth.fbauth(req.user).then(user => {
        if (!user || !user._id) {
          return res.sendStatus(404);
        }

        UsersStorage.updateItem(user._id, req.body).then(() => {
          res.send(200);
        }).catch(() => {
          res.sendStatus(401);
        });
      });
    }

    res.sendStatus(401);
  });

  router.get('/api/v1/user', function(req, res) {
    if (!req.session || (!req.session.user && !req.session.google && !req.isAuthenticated())) {
      return res.sendStatus(401);
    }

    if (req.session.user) {
      return UsersStorage.getItem(req.session.user).then(user => res.send(user))
        .catch(() => {
          res.sendStatus(401);
        });
    }

    if (req.session.google) {
      return google.getUser(req.session.google).then(googleUser => {
        auth.gauth(googleUser).then(user => res.send(user));
      }).catch(() => {
        if (req.session && req.session.google) {
          req.session.google = undefined;
        }
        
        res.sendStatus(401);
      });
    }

    if (req.isAuthenticated() && req.user) { 
      return auth.fbauth(req.user).then(user => res.send(user));
    }

    res.sendStatus(401);
  });

  router.get('/api/v1/logout', function(req, res) {
    if (!req.session || (!req.session.user && !req.session.google && !req.isAuthenticated())) {
      return res.sendStatus(401);
    }
  
    if (req.session.user) {
      req.session.user = undefined;
  
      return res.sendStatus(200);
    }
  
    if (req.session.google) {
      return google.logout(req.session.google).then(() => {
        if (req.session && req.session.google) {
          req.session.google = undefined;
        }
    
        return res.sendStatus(200)
      }).catch(() => {
        res.sendStatus(401);
      });
    }

    if (req.isAuthenticated()) { 
      req.logout();
      return res.sendStatus(200);
    }
  });
}