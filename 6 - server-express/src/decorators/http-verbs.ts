import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetadataKeys } from './enums/metadata-keys';
import { Methods } from './enums/methods';

export interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

// factory pattern for route handlers
export const routeBinder = (method: string) => {
  return (path: string) => {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
    };
  };
};

export const Get = routeBinder(Methods.Get);
export const Post = routeBinder(Methods.Post);
export const Put = routeBinder(Methods.Put);
export const Delete = routeBinder(Methods.Delete);
export const Patch = routeBinder(Methods.Patch);
