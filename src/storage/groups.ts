// Libs
import mongoose from 'mongoose';

// Types
import { Group } from '../types/group';

const schema = new mongoose.Schema({
  user: String,
  label: String,
  description: String,
  img: String,
});

const model = mongoose.model('groups', schema, 'groups');

const safe = (item: (mongoose.Document & { _doc?: Group }) | null): Group => {
  return { ...item!._doc! };
}

export const getItems = () => {
  return model.find().then(users => users.map(safe));
};

export const createItem = (data: Group) => {
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

export const updateItem = (id: string, data: Group) => {
  return model.findByIdAndUpdate(id, data, { new: true }).then(user => safe(user));
};

export const removeItem = (id: string) => {
  return model.findByIdAndDelete(id).then(() => null);
};

export const putItems = (data: Group[]) => {
  return model.insertMany(data).then(() => null);
};

export const clearItems = (data: Group) => {
  return model.deleteMany(data).then(() => null);
};