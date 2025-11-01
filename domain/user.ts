export enum ROLE {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export interface IUser {
  _id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  hash: string;
  role: ROLE;
  activated: boolean;
  deleted: boolean;
  banned: boolean;
  createdAt: Date;
  updatedAt: Date;
}
