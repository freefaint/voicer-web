// Types
import { IUser, ISkill } from "./users";

export interface IVacancy {
  _id?: string;

  company?: string;

  name?: string;
  salary?: string;
  text?: string;

  department?: string;
  sphere?: string;
  age?: string;
  experience?: string;
  address?: string;
  timetable?: string;
  skills?: ISkill[];
  time?: string;

  user?: IUser;
}