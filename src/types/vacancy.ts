// Types
import { IUser } from "./users";

export interface IVacancy {
  _id?: string;

  company?: string;

  name?: string;
  salary?: string;
  text?: string;

  user?: IUser;
}