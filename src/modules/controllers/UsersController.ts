import { Request, Response } from "express";
import { UsersInterface } from "../../@types/usersInterface";
import UsersService from "../services/UsersService";
import z from 'zod';
import { formatZodError } from '../../lib/zodError';

const UsersController = {

  async getUserController(req: Request, res: Response){
    const user: UsersInterface = await UsersService.getUserById(req?.body?.userId);

    res.json({ user }).status(200);
  },

  async createUser(req: Request, res: Response){

    try {

      const schema = z.object({
        username: z.string({ message: 'Username is required' }).min(4, { message: "Username needs 4 or more characters!" }),
        email: z.string({ message: 'E-mail is required' }).email().min(4, { message: "E-mail invalid!" }),
        password: z.string({ message: 'Password is required' }).min(8, { message: "Password need 8 or more characters!" }),
      });

      const data = schema.parse(req.body);

      const haveUserWithThisEmail = await UsersService.getUserByEmail(data.email);

      if(haveUserWithThisEmail){
        return res.status(400).json({ error: 'This e-mail is already in use.'},);
      }

      const user: UsersInterface = await UsersService.create(data);

      return res.status(201).json({ users: user });

    }catch(error: any){

      return res.status(400).json({errors: formatZodError(error) });

    }
  }

}


export default UsersController;
