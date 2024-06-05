import { SignJWT, jwtVerify } from 'jose';
import {Request, Response, NextFunction } from 'express';

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function validAuth(req: Request, res: Response, next: NextFunction): Promise<any>{
  try {
    const header = req.headers.authorization;

    const token = header?.split(' ')[1];

    if(token === undefined || token === ''){
      return res.status(400).json({ message: 'token is required!' });
    }

    const decodedToken = await decrypt(token!);

    req.body.userId = decodedToken.id;

    next();
  }catch(error: any){
    return res.status(400).json({ message: 'token is required!' });
  }
}
