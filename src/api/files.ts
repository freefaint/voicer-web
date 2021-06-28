// Env
// import fs from 'fs';

// Libs
import sharp from 'sharp';
import { Router } from 'express';

// Storage
import * as Storage from '../storage/files';
import { UploadedFile } from 'express-fileupload';
import Axios from 'axios';

export const createApi = (router: Router) => {
  router.get('/api/v1/files/:id/info', function(req, res) {
    Storage.get(req.params.id).then(file => {
      if (!file) {
        return res.sendStatus(404);
      }
      
      // res.attachment(file.name);
      // res.contentType(file.type);

      res.send({ name: file.name, type: file.type, size: file.size });
    });
  });

  router.get('/files/mirror', function(req, res) {
    if (!req.query.url) {
      return res.sendStatus(400);
    }

    res.set('Cache-Control', 'public, max-age=31557600');

    Axios.get(req.query.url.toString(), {
      responseType: 'arraybuffer'
    }).then(response => {
      res.contentType(response.headers['content-type']);
      res.send(Buffer.from(response.data));
      // res.send(response.data);
    }).catch(res => {
      res.sendStatus(400);
    });
  });

  router.get('/files/:id', function(req, res) {
    Storage.get(req.params.id).then(file => {
      if (!file) {
        return res.sendStatus(404);
      }
      
      // res.attachment(file.name);
      res.contentType(file.type);

      res.send(file.data);
    });
  });

  const minify = async (data: Buffer) => {
    return await sharp(data).resize(640).toBuffer();
  }
  
  router.post('/api/v1/files', async function(req, res) {
    const src = req.files && req.files.file as UploadedFile;

    if (!src) {
      return res.sendStatus(400);
    }

    console.log(req.body.compress);

    const data = req.body.compress ? await minify(src.data) : src.data;

    const file = { name: src.name, type: src.mimetype, data: data, size: src.size };

    Storage.upload(file).then(data => {
      return data ? res.send(data._id) : res.sendStatus(400);
    });
  });
  
  router.delete('/api/v1/files/:id', function(req, res) {
    Storage.remove(req.params.id).then(() => res.send(null));
  });
}