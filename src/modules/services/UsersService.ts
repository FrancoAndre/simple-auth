import { Users } from '@prisma/client';
import UsersRepository from '../repositories/UsersRepository';
import bcrypt from 'bcrypt';
import { UserCreateAndUpdateInterface, UsersInterface } from '../../@types/usersInterface';


const UsersService = {

  async getAll(){
    const users: UsersInterface[] = await UsersRepository.getAll();
    return users;
  },

  async getUserByEmail(email: string){
    const user: Users = await UsersRepository.getUserByEmail(email);
    return user;
  },

  async getUserById(id: number){
    const user: UsersInterface = await UsersRepository.getUserById(id);
    return user;
  },

  async create(User: UserCreateAndUpdateInterface){
    const passwordhash = await bcrypt.hash(User.password, 10);

    const newUser = {
      ...User,
      password: passwordhash,
    }

    const userCreated: UsersInterface = await UsersRepository.create(newUser);
    return userCreated;
  },

  async update(User: Users, id: number){
    const userUpdated: UsersInterface = await UsersRepository.update(User, id);
    return userUpdated;
  },

  async delete(id: number){
    await UsersRepository.delete(id);
  },

  async login(email: string, password: string){
    const userLogin: Users = await UsersRepository.getUserByEmail(email);

    if(!userLogin){
      throw new Error('User with this email not found!');
    }

    const isPasswordCorrect = await bcrypt.compare(password, userLogin.password);

    if(!isPasswordCorrect){
      throw new Error('E-mail or password are incorrect!');
    }

    return userLogin;
  },

}


export default UsersService;
