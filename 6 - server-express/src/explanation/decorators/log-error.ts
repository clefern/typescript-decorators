export function logError(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  console.log('logError, target: ', target);
  console.log('logError, key: ', key);
  console.log('originalMethod', originalMethod);
}
