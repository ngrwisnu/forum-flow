export interface UserType {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type UsersResponse = UserType[];
