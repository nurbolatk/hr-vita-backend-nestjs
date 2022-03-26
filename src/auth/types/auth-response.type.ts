import { SafeUser } from '.';

export type AuthResponse = {
  accessToken: string;
  user: SafeUser;
};
