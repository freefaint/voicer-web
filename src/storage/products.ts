// Libs
import mongoose from 'mongoose';

// Types
import { Product } from '../types/product';

const schema = new mongoose.Schema({
  user: String,
  id: String,
  name: String,
  cost: String,
  weight: String,
  category: String,
  age: String,
  description: String,
  textcolor: String,
  names: String,
  img: String,
});

const model = mongoose.model('products', schema, 'products');

const safe = (user: (mongoose.Document & { _doc?: Product }) | null) => {
  if (user === null) {
    return Promise.reject();
  }

  return { ...user._doc, code: undefined, password: undefined };
}

export const getItems = () => {
  return model.find().then(users => users.map(safe));
};

export const createItem = (data: Product) => {
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

export const updateItem = (id: string, data: Product) => {
  return model.findByIdAndUpdate(id, data, { new: true }).then(user => safe(user));
};

export const removeItem = (id: string) => {
  return model.findByIdAndDelete(id).then(() => null);
};

export const putItems = (data: Product[]) => {
  return model.insertMany(data).then(() => null);
};

export const clearItems = (data: Product[]) => {
  return model.deleteMany(data).then(() => null);
};