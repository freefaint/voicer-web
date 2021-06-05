// Libs
import mongoose from 'mongoose';

// Types
import { Order } from '../types/order';

const schema = new mongoose.Schema({
  orderNumber: Number,
  date: String,
  shop: String,
  export: Boolean,
  total: Number,
  bill: Buffer,
  products: Array
});

const model = mongoose.model('order', schema, 'order');

const safe = (user: (mongoose.Document & { _doc?: Order }) | null) => {
  if (user === null) {
    return Promise.reject();
  }

  return { ...user._doc, code: undefined, password: undefined };
}

export const getItems = () => {
  return model.find().then(users => users.map(safe));
};

export const createItem = (data: Order) => {
  return model.insertMany(data).then(users => safe((users as unknown as mongoose.Document[])[0]));
};

export const getItem = async (id: string) => {
  return model.findById(id).then(user => safe(user));
};

export const getLatest = async () => {
  return model.findOne().sort({date: -1}).then(user => safe(user));
};

export const findItem = async (data: {}) => {
  return model.findOne(data).then(user => safe(user));
};

export const findItems = async (data: {}) => {
  return model.find(data).then(users => users.map(safe));
};

export const updateItem = (id: string, data: Order) => {
  return model.findByIdAndUpdate(id, data, { new: true }).then(user => safe(user));
};

export const removeItem = (id: string) => {
  return model.findByIdAndDelete(id).then(() => null);
};

export const putItems = (data: Order[]) => {
  return model.insertMany(data).then(() => null);
};

export const clearItems = (data: Order[]) => {
  return model.deleteMany(data).then(() => null);
};