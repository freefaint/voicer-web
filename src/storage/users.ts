// Libs
import mongoose from 'mongoose';

// Types
import { IUser } from '../types/users';

const schema = new mongoose.Schema({
  _google: String,
  _facebook: String,

  email: String,
  phone: String,
  
  type: String,
  code: String,
  verified: Boolean,

  firstName: String,
  lastName: String,
  middleName: String,

  companyName: String,
  companyUrName: String,
  companySize: String,
  companyINN: String,
  companyUrAddress: String,
  companyPhone: String,
  companyBankAccount: String,
  companyBankKPP: String,
  companyBankBIK: String,
  companyDescription: String,

  sphere: String,

  skills: Array,
  education: Array,

  sex: String,
  nick: String,
  birthDay: String,
  webSite: String,
  address: String,
  workPhone: String,

  login: String,
  password: String,

  pic: String,

  photos: Array,
  videos: Array,
  docs: Array,
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