// Libs
import mongoose from 'mongoose';

// Types
import { IMessage } from '../types/messages';

const schema = new mongoose.Schema({
  from: String,
  to: String,

  date: String,
  read: Boolean,

  text: String
});

const model = mongoose.model('messages', schema, 'messages');

const safe = (message: (mongoose.Document & { _doc?: IMessage }) | null) => {
  if (message === null) {
    return Promise.reject();
  }

  return message._doc;
}

export const send = (data: IMessage) => {
  return model.insertMany({ ...data, date: new Date().toISOString() }).then(users => (users as unknown as mongoose.Document[]).map(safe)[0]);
};

export const read = (id: string) => {
  return model.findByIdAndUpdate(id, { read: true }, { new: true }).then(user => safe(user));
};

export const get = (id: string) => {
  return model.findById(id).then(file => safe(file));
};

export const list = (message: IMessage): Promise<IMessage[]> => {
  return model.find(message).then(messages => messages.map(safe) as IMessage[]);
};