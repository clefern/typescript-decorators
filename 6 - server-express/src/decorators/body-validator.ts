import 'reflect-metadata';
import { MetadataKeys } from './enums';

export const bodyValidator = (...keys: string[]) => {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.Validator, keys, target, key);
  };
};
