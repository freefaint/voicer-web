// Libs
import mongoose from 'mongoose';

// Types
import { IVacancy } from '../types/vacancy';

const schema = new mongoose.Schema({
  company: String,

  name: String,
  salary: String,
  text: String,
});

const model = mongoose.model('vacancy', schema, 'vacancy');

const safe = (user: (mongoose.Document & { _doc?: IVacancy }) | null) => {
  if (user === null) {
    return Promise.reject();
  }

  return user._doc;
}

const safeArr = (user: (mongoose.Document & { _doc?: IVacancy })) => {
  return user._doc;
}

export const getItems = () => {
  return model.find().then(users => users.filter(i => i !== null).map(safeArr));
};

export const createItem = (data: IVacancy) => {
  return model.insertMany(data).then(users => safe((users as unknown as mongoose.Document[])[0]));
};

export const getItem = (id: string) => {
  return model.findById(id).then(user => safe(user));
};

export const findItem = async (data: {}) => {
  return model.findOne(data).then(user => safe(user));
};

export const findItems = async (data: {}) => {
  return model.find(data).then(users => users.filter(i => i !== null).map(safeArr));
};

export const updateItem = (id: string, data: IVacancy) => {
  return model.findByIdAndUpdate(id, data, { new: true }).then(user => safe(user));
};

export const removeItem = (id: string) => {
  return model.findByIdAndDelete(id).then(() => null);
};