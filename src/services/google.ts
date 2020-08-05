// Libs
import { google } from 'googleapis';
import { Credentials } from 'google-auth-library';

// Google
const oauth2Client = new google.auth.OAuth2(
  "886222037713-9gaq01hfufiuk7r6feqvdjhqa5g09c5k.apps.googleusercontent.com",
  "dlVWCMFXzhpP2OFYi8BJI0zi",
  (process.env.PROTOCOL || 'https') + '://' + (process.env.DOMAIN || 'localhost') + '/auth/google'
);

google.options({auth: oauth2Client});

export const genURL = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/plus.me', 'profile', 'email', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(' '),
  });
};

export const getToken = (code: string) => {
  return oauth2Client.getToken(code).then(resp => resp.tokens);
};

export const logout = (token: Credentials) => {
  if (!token.access_token) {
    return Promise.reject();
  }
  
  return oauth2Client.revokeToken(token.access_token).then(resp => resp);
};


export const getUser = (token: Credentials) => {
  oauth2Client.credentials = token;
  
  return google.people("v1").people.get({resourceName: 'people/me', personFields: 'names,emailAddresses,photos,metadata'}).then(resp => resp);
};

export const getId = (data: any) => {
  const source = data.data.metadata.sources.find((i: any) => i.type === 'PROFILE');

  return source && source.id;
};

export const getEmail = (data: any) => {
  const email = data.data.emailAddresses.find((i: any) => i.metadata && i.metadata.primary && i.metadata.verified);

  return email && email.value;
};

export const getName = (data: any) => {
  const name = data.data.names.find((i: any) => i.metadata && i.metadata.primary);

  return { firstName: name.givenName, lastName: name.familyName };
};

export const getPhoto = (data: any) => {
  const photo = data.data.photos.find((i: any) => i.metadata && i.metadata.primary);

  return photo && photo.url;
};