import { Request, Response } from "express";
import UsersService from '../services/UsersService';
import z from 'zod';
import { Users } from "@prisma/client";
import bcrypt from 'bcrypt';
import { formatZodError } from "../../lib/zodError";
import { encrypt } from "../../lib/jwt";


const AuthController = {

  async authenticate(req: Request, res: Response){
      const schema = z.object({
        email: z.string({ message: 'E-mail is required!' }).email({message: 'E-mail is incorrect!'}),
        password: z.string({ message: 'Password is required' }).min(8, { message: "Password need 8 or more characters!" }),
      });

      const dataParsed = schema.safeParse(req.body);

      if(!dataParsed.success){
        return res.status(400).json({errors: formatZodError(dataParsed.error) });
      }

      const user: Users | null = await UsersService.getUserByEmail(dataParsed.data.email);

      if(!user){
        return res.status(400).json({ errors: 'User with this e-mail not found!'});
      }

      const isPasswordCorrect = await bcrypt.compare(dataParsed.data.password, user.password);

      if(!isPasswordCorrect){
        return res.status(400).json({ errors:'E-mail or password are incorrect!'});
      }
      const token = await encrypt({ id: user.id })

      return res.status(200).json({ user: { username: user.username, email: user.email }, token });

  }

}

export default AuthController;
