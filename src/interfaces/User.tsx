export interface IUser {
  uid?: string;
  userName?: string;
  email?: string;
  password?: string;
}

export interface IUserBodyData {
  gender?: string;
  weight: number;
  height: number;
  mealsPerDay: number;
}
