// Libs
import { Request } from 'express';

// Services
import * as google from './google';
import * as facebook from './facebook';

// Storage
import * as Storage from '../storage/users';

// Types
import { IUser } from '../types/users';
// import { sendSMS } from './sms';

export const me = (req: Request) => {
  if (req.session && req.session.user) {
    return Storage.getItem(req.session.user).then((user: IUser) => Promise.resolve(user)).catch(() => Promise.reject());
  }

  if (req.session && req.session.google) {
    return google.getUser(req.session.google).then(googleUser => {
      return gauth(googleUser).then(user => Promise.resolve(user));
    }).catch(() => Promise.reject());
  }

  if (req.isAuthenticated() && req.user) { 
    return fbauth(req.user).then(user => Promise.resolve(user)).catch(() => Promise.reject());
  }

  return Promise.reject();
}

const combineGoogle = (user: IUser, guser: any): IUser => {
  return { ...user, google: { name: google.getName(guser), photo: google.getPhoto(guser), email: google.getEmail(guser) } };
}

const combineFacebook = (user: IUser, guser: any): IUser => {
  return { ...user, facebook: { name: facebook.getName(guser), photo: facebook.getPhoto(guser), email: facebook.getEmail(guser) } };
} 

export const gauth = (data: any) => {
  const id = google.getId(data);

  return Storage.findItem({ _google: id }).then(user => combineGoogle(user, data)).catch(() => {
    const name = google.getName(data);
    const pic = google.getPhoto(data);

    return register({ _google: id, ...name, pic, photos: pic && [ pic ], verified: true }).then(created => combineGoogle(created, data));
  });
}

export const fbauth = (data: any) => {
  const id = facebook.getId(data);

  return Storage.findItem({ _facebook: id }).then(user => combineFacebook(user, data)).catch(() => {
    const name = facebook.getName(data);
    const pic = facebook.getPhoto(data);

    return register({ _facebook: id, ...name, pic, photos: pic && [ pic ], verified: true, }).then(created => combineFacebook(created, data));
  });
}

export const register = async (data: any) => {
  let phone = data.phone && data.phone.split(/\D/).filter((i: string) => !!i).join('').substr(-11);

  if (phone && phone.length === 10) {
    phone = '7' + phone;
  }

  console.log(phone);

  if (phone && phone.length < 11 && phone.length > 0) {
    return Promise.reject({ exist: 'phone' });
  }

  const existLogin = data.login && await Storage.findItem({ login: data.login }).catch(() => undefined);
  const existEmail = data.email && await Storage.findItem({ email: data.email }).catch(() => undefined);
  const existPhone = data.phone && await Storage.findItem({ phone: phone }).catch(() => undefined);

  if (existLogin) {
    return Promise.reject({ exist: 'login' });
  }

  if (existEmail) {
    return Promise.reject({ exist: 'email' });
  }

  if (existPhone) {
    console.log('conflict phone');
    return Promise.reject({ exist: 'phone' });
  }

  // const code = '0000';

  console.log('try send sms');

  if (!data._google && !data._facebook) {
    // sendSMS(data.phone, 'Код проверки: ' + code);
    // sendSMS(data.phone, code);
  }

  console.log('sms sent');

  return Storage.createItem({ ...data, phone, code: !data._google && !data._facebook && '0000', password: !data._google && !data._facebook && !data.password ? '1234' : data.password }).then(user => user);
}

export const login = async (data: any) => {
  if (!data.login || !data.password) {
    return Promise.reject();
  }

  const existLogin = await Storage.findItem({ login: data.login, password: data.password }).catch(() => undefined);
  const existEmail = await Storage.findItem({ email: data.login, password: data.password }).catch(() => undefined);
  const existPhone = await Storage.findItem({ phone: data.login, password: data.password }).catch(() => undefined);

  if (existLogin) {
    return Promise.resolve(existLogin as IUser);
  }

  if (existEmail) {
    return Promise.resolve(existEmail as IUser);
  }

  if (existPhone) {
    return Promise.resolve(existPhone as IUser);
  }

  return Promise.reject();
}

export const verify = (id: string, data: any) => {
  return Storage.findItem({ _id: id, ...data }).then(() => {
    Storage.updateItem(id, { verified: true, code: undefined }).then(() => null);
  })
}