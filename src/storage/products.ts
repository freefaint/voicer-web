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
  names: Array,
  img: String,
  group: Array,
});

const model = mongoose.model('products', schema, 'products');

const safe = (item: (mongoose.Document & { _doc?: Product }) | null): Product => {
  return { ...item!._doc! };
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

export const clearItems = (data: Product) => {
  return model.deleteMany(data).then(() => null);
};