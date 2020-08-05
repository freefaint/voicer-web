// Types
import { IUser } from "./users";

export interface IResume {
  _id?: string;

  student?: string;

  name?: string;
  salary?: string;
  text?: string;

  user?: IUser;
}