export interface ISkill {
  name: string;
}

export interface IEducation {
  institute: string;
  facultete: string;
  speciality?: string;
  startYear: string;
  finishYear: string;
}

export interface IUser {
  _id?: string;
  _google?: string;
  _facebook?: string;
  
  email?: string;
  phone?: string;

  type?: string;
  code?: string;
  verified?: boolean;

  login?: string;
  password?: string;

  firstName?: string;
  lastName?: string;
  middleName?: string;

  companyName?: string;
  companyUrName?: string;
  companySize?: string;
  companyINN?: string;
  companyUrAddress?: string;
  companyPhone?: string;
  companyBankAccount?: string;
  companyBankKPP?: string;
  companyBankBIK?: string;
  companyDescription?: string;

  sphere?: string;

  skills?: ISkill[];
  education?: IEducation[];

  sex?: string;
  nick?: string;
  birthDay?: string,
  address?: string;
  workPhone?: string;
  webSite?: string;

  pic?: string;

  photos?: string[];
  docs?: string[];
  videos?: string[];

  google?: any;
  facebook?: any;
}