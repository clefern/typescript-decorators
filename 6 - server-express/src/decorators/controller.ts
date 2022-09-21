import 'reflect-metadata';
import { AppRouter } from '../app-router';
import { MetadataKeys, Methods } from './enums';
import { Request, Response, NextFunction } from 'express';

export const bodyValidators = (keys: string[]) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }

    next();
  };
};

export const Controller = (routePrefix: string) => {
  return function (target: Function, key: string, desc: PropertyDescriptor) {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      const handler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.Path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.Method,
        target.prototype,
        key
      );
      const middleware =
        Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.Validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        if (routePrefix) {
          router[method](
            `${routePrefix}${path}`,
            ...middleware,
            validator,
            handler
          );
        } else {
          router[method](path, middleware, validator, handler);
        }
      }
    }
  };
};
