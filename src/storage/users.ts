// Libs
import mongoose from 'mongoose';

// Types
import { IUser } from '../types/users';

const schema = new mongoose.Schema({
  login: String,
  password: String,
  admin: Boolean
});

const model = mongoose.model('users', schema, 'users');

const safe = (user: (mongoose.Document & { _doc?: IUser }) | null) => {
  if (user === null) {
    return Promise.reject();
  }

  return { ...user._doc, code: undefined, password: undefined };
}

export const getItems = () => {
  return model.find().then(users => users.map(safe));
};

export const createItem = (data: IUser) => {
  return model.insertMany(data).then(users => safe((users as unknown as mongoose.Document[])[0]));
};

export const getItem = async (id: string) => {
  return model.findById(id).then(user => safe(user));
};

export const findItem = async (data: {}) => {
  return model.findOne(data).then(user => safe(user));
};

export const findItems = async (data: {}) => {
  return model.find(data).then(users => users.map(safe));
};

export const updateItem = (id: string, data: IUser) => {
  return model.findByIdAndUpdate(id, data, { new: true }).then(user => safe(user));
};

export const removeItem = (id: string) => {
  return model.findByIdAndDelete(id).then(() => null);
};