// Rest
import { get, del, upload } from './common';

export const add = (file: File, onProgress?: (percent: number) => void, compress?: boolean) => {
  return upload('/files', file, onProgress, compress);
}

export const info = (id: string): Promise<{ name: string, type: string }> => {
  return get('/files/' + id + '/info');
}

export const remove = (id: string): Promise<null> => {
  return del('/files/' + id);
}