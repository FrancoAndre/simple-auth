import prisma from "../../lib/prisma";
import { UserCreateAndUpdateInterface, UsersInterface } from "../../@types/usersInterface";
import { Users } from "@prisma/client";

const UsersReposity = {

  async getUserById(id: number){
    const user: UsersInterface = await prisma.users.findFirstOrThrow({
      select: {
        password: false,
        id: true,
        createdAt: true,
        email: true,
        username: true,
      },
      where: {
        id: id
      }
    });
    return user;
  },

  async getUserByEmail(email: string){
    const user: Users | null = await prisma.users.findFirst({
      where: {
        email: email
      }
    });
    return user;
  },


  async create(User: UserCreateAndUpdateInterface){
    const userCreated: UsersInterface = await prisma.users.create(
      {
        data: User,
        select: {
          password: false,
          id: true,
          createdAt: true,
          email: true,
          username: true,
        }
      },
    )
    return userCreated;
  },

  async update(User: UserCreateAndUpdateInterface, id: number){
    const userUpdated: UsersInterface = await prisma.users.update({
      where: { id: id },
      data: User,
      select: {
        password: false,
        id: true,
        createdAt: true,
        email: true,
        username: true,
      }
    })
    return userUpdated;
  },

  async delete(id: number){
    await prisma.users.delete({
      where: { id: id }
    })
  }

}

export default UsersReposity;
