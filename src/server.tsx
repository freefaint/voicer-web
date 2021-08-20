// Env
// import fs from 'fs';
import path from 'path';
import http from 'http';
// import https from 'https';

// Libs
import express, { Router } from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';

// Api
import { createApi as createAuthApi } from './api/auth';
import { createApi as createUsersApi } from './api/users';
import { createApi as createFilesApi } from './api/files';
import { createApi as createOrderApi } from './api/order';
import { createApi as createGroupsApi } from './api/groups';
import { createApi as createProductsApi } from './api/products';

// Express
const app = express();
const router = Router();

// Mongoose
const connect = () => {
  mongoose.connect('mongodb://localhost/voicer', { useNewUrlParser: true, useUnifiedTopology: true }).catch(connect);
}

connect();

app.use(express.static(__dirname + '/../build'));
app.use(bodyParser.json());
app.use(session({ secret: 'whoops', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

createAuthApi(router);
createUsersApi(router);
createFilesApi(router);
createOrderApi(router);
createGroupsApi(router);
createProductsApi(router);

router.get([ '/*' ], function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../build/index.html'));
});

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use('/', router);

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 8081);