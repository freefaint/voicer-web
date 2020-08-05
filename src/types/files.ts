export interface IFile {
  _id?: string;

  name: string;
  type: string;
  size: number;
  data: Buffer;
}