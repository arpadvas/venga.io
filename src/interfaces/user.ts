export interface IUser {
  email: string;
  name: string;
  password: string;
  activateToken: string;
  active: boolean;
  profilePicture: { url: string };
  backgroundPicture: { url: string };
  description: string;
  gender: string;
  country: string;
}