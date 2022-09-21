import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetadataKeys } from './enums';

export const Use = (middleware: RequestHandler) => {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.Middleware, target, key) || [];
    Reflect.defineMetadata(
      MetadataKeys.Middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
};
