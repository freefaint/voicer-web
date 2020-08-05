// Libs// Libs

export const getId = (data: any) => {
  return data && data.id;
};

export const getEmail = (data: any) => {
  return '';
};

export const getName = (data: any) => {
  const name = data.displayName.split(' ');

  return { firstName: name[0], lastName: name[1] };
};

export const getPhoto = (data: any) => {
  const photo = data && data.photos && data.photos[0];

  return photo && photo.value;
};