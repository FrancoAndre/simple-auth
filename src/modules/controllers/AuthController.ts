import { Request, Response } from "express";
import UsersService from '../services/UsersService';
import z from 'zod';
import { Users } from "@prisma/client";
import bcrypt from 'bcrypt';
import { formatZodError } from "../../lib/zodError";
import { encrypt } from "../../lib/jwt";


const AuthController = {

  async authenticate(req: Request, res: Response){
    try {
      const schema = z.object({
        email: z.string({ message: 'E-mail is required!' }).email({message: 'E-mail is incorrect!'}),
        password: z.string({ message: 'Password is required' }).min(8, { message: "Password need 8 or more characters!" }),
      });

      const data = schema.parse(req.body);

      const user: Users = await UsersService.getUserByEmail(data.email);

      if(!user){
        return res.status(400).json({ errors: 'User with this e-mail not found!'});
      }

      const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

      if(!isPasswordCorrect){
        return res.status(400).json({ errors:'E-mail or password are incorrect!'});
      }
      const token = await encrypt({ id: user.id })

      return res.status(201).json({ user: { username: user.username, email: user.email }, token });

    }catch(error: any){
      return res.status(400).json({errors: formatZodError(error) });
    }
  }

}

export default AuthController;
