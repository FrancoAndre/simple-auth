import { Users } from "@prisma/client";

export type UsersInterface = Omit<Users, 'password'>;

export type UserCreateAndUpdateInterface = Omit<Users, 'id' | 'createdAt'>;
