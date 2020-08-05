// Types
import { IUser } from 'types/users';

export const getName = (user: IUser) => {
  const { firstName, lastName, middleName, google, facebook } = user;

  const googleName = google && google.name && `${google.name.firstName} ${google.name.lastName}`.trim();
  const facebookName = facebook && facebook.name && `${facebook.name.firstName} ${facebook.name.lastName}`.trim();

  const name = `${lastName || ''} ${firstName || ''} ${middleName || ''}`.trim() || googleName || facebookName;

  return user.type === 'COMPANY' ? user.companyName : name;
}