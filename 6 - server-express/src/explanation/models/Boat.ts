import { logError } from '../decorators/log-error';

@ClassDecorator
export class Boat {
  @propertyDecorator
  color: string = 'red';

  get formattedColor(): string {
    return `This boat's color is ${this.color}`;
  }

  // @testDecorator('hello world')
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generated: boolean
  ): void {
    if (speed === 'fast') {
      console.log('Param decorator: ', speed);
    } else {
      console.log('nothing');
    }
  }
}

function ClassDecorator(constructor: typeof Boat) {
  console.log('Class decorator');

  console.log('constructor: ', constructor);
}

function parameterDecorator(target: any, key: string, index: number) {
  // console.log('target: ', target);
  // console.log('key: ', key);
  // console.log('index: ', index);
}

function propertyDecorator(target: any, key: string) {
  // console.log('target: ', target);
  // console.log('key: ', key);
}

function testDecorator(value: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;
    desc.value = function () {
      try {
        method();
      } catch (error) {
        console.log(value);
      }
    };
  };
}

new Boat().pilot('fast', true);
