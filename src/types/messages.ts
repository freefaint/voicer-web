export interface IMessage {
  _id?: string;

  from?: string;
  to?: string;

  date?: string;
  read?: boolean;

  text?: string;
}