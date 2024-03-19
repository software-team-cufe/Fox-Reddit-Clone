/* eslint-disable @typescript-eslint/no-explicit-any */
// function takes schema with zod and returns a middleware that validates the request body against the schema

import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (e: any) {
    res.status(400).status(400).send(e.errors);
  }
};

export default validateResource;
