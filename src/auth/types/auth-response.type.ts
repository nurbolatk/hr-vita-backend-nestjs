import { SafeUser } from '.';

export type AuthResponse = {
  token: string;
  user: SafeUser;
};
