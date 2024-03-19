/* eslint-disable @typescript-eslint/ban-types */
import { CreateUserInput } from '../schema/user.schema';
import { Request, Response } from 'express';
import { createUser } from '../service/user.service';
export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
  const body = req.body;

  try {
    const user = await createUser(body);
    return res.send('user created successfully!');
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).send('Account already exists');
    }

    return res.status(500).send(e);
  }
}
