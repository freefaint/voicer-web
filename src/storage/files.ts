// Libs
import mongoose from 'mongoose';

// Types
import { IFile } from '../types/files';

const schema = new mongoose.Schema({
  name: String,
  type: String,
  size: Number,
  data: Buffer,
});

const model = mongoose.model('files', schema, 'files');

const safe = (file: (mongoose.Document & { _doc?: IFile }) | null) => {
  if (file === null) {
    return Promise.reject();
  }

  return file._doc;
}

export const upload = (data: IFile) => {
  return model.insertMany(data).then(users => (users as unknown as mongoose.Document[]).map(safe)[0]);
};

export const get = (id: string) => {
  return model.findById(id).then(file => safe(file));
};

export const remove = (id: string) => {
  return model.findByIdAndDelete(id).then(() => null);
};