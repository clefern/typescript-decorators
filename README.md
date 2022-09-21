## Type inference

Type inference is the process of automatically determining the type of an expression. TypeScript uses type inference to provide type information when there is no explicit type annotation. For example, in this code:

```typescript
let x = 3;
```

Here, we declare a variable x without specifying its type. Because we initialize it with a number, TypeScript infers that x has the type number.

## Type Annotation

Type Annotation is the interfaces/classes that we make and also use from other libraries explicitly defining the type. It is a way to define the structure of an object, providing better code hints and intellisense for the IDE.

```typescript
let x: number = 3;
```

Here, we declare a variable x with the type number. This type annotation is optional, but it can be useful as documentation, and as a way to explicitly check that your assumptions about the types of values are correct.

## Type Annotation vs Type Inference

Type inference is a way to provide type information when there is no explicit type annotation. Type annotation is the process of explicitly defining the type of a variable. Type inference is a subset of type annotation.

## implicit vs explicit

### Implicit

Implicit is the process of automatically determining the type of an expression. TypeScript uses type inference to provide type information when there is no explicit type annotation. For example, in this code:

in our example, we are passing a user that has the same properties of the Mappable interface, but we are not explicitly saying that the user is of type Mappable. TypeScript is able to infer that the user is of type Mappable.

```typescript
export class User {
  ...
}
export class CustomMap {
  ...
  addMarker(mappable: Mappable): void {...}
}
// then we pass user that don't implement the mappable interface
// although it has the same properties that satisfy the mappable interface
map.addMarker(new User()); // it doesn't show errors
```

### Explicit

Explicit is the process of explicitly defining the type of a variable. Type inference is a subset of type annotation.

For our example above, we can explicitly say that the user class needs to implement the Mappable interface. This is a good practice to get the error in the right place, in the user class, instead of the get it when your are using a map instance the map users in the map displayed.

```typescript
export class User implements Mappable {...}
```

## Tsconfig

The tsconfig.json file is a configuration file for the TypeScript compiler. It is used to specify the root files and the compiler options required to compile the project.

`tsc --init` will create a tsconfig.json file in the current directory.
rootDir: The root directory of input files. Use to control the output directory structure with outDir.
outDir: Redirect output structure to the directory.

`tsc -w` will watch for changes in the files and compile them.

TSC command line just compile the files, but not run them. To run the compiled files, we need to use node.
`node build/index.js`

For that we install nodemon to watch for changes in the files and run them.
Other package that we can use is concurrently to run multiple commands at the same time.

Put that command in the package.json file:

```json
"scripts": {
  "start:build": "tsc -w",
  "start:run": "nodemon build/index.js",
  "start": "concurrently npm:start:*",
}
```

The third start command will run the first two commands at the same time. Every command that start with start: will be run.

TSC command line just compile the files, but it doesn't bundle them. To bundle the files we need to use a bundler like webpack.

## Linked List

A linked list is a linear data structure, in which the elements are not stored at contiguous memory locations. The elements in a linked list are linked using pointers.

### Singly Linked List

A singly linked list is a linked list in which each node points to the next node in the list. The last node points to null.

### Doubly Linked List

A doubly linked list is a linked list in which each node points to the next node and the previous node in the list. The first node points to null.

### Circular Linked List

A circular linked list is a linked list in which the last node points to the first node.

### Singly Circular Linked List

A singly circular linked list is a singly linked list in which the last node points to the first node.

### Doubly Circular Linked List

A doubly circular linked list is a doubly linked list in which the last node points to the first node.

## Abstract Classes

An abstract class is a special kind of class that can't be instantiated directly. It can only be extended. Abstract classes are often used as base classes from which other classes may be derived.

```typescript
abstract class Department {
  constructor(public name: string) {}
  printName(): void {
    console.log('Department name: ' + this.name);
  }
  abstract printMeeting(): void; // must be implemented in derived classes
}
```

# Stats

## types for Node modules

When we are using typescript with node we need to install a package called @types/node to get the types for the node modules.

### Generics

Generics are a way to create a component that can work over a variety of types rather than a single one. This allows users to consume these components and use their own types.

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

### Generic Class Types

```typescript
static createInstanceWithGenericClassDependencies<
  A extends Analyzer,
  O extends OutputTarget
>(
  team: string,
  analyzer: { new (teamName: string): A },
  output: { new (): O }
): Summary {
  return new Summary(new analyzer(team), new output());
}

// Then we can use it like so
const summary = Summary.createInstanceWithGenericClassDependencies(
  'Man United',
  AverageGoalsAnalyzer, // this is a class reference
  ConsoleReport // this is a class reference
  // that is going to new instantiated by summary class
);
```

### Generics Object Keys

When we want to return a generic object property correctly typed we need to use the keyof keyword. To use K as a key in T we first need to K extends keyof T.

K represents a string literal type that will use to access the object property like so (T[K]) and return its specific type. To use K as a key in T we need to use the square brackets notation.

```typescript
export class Attributes<T> {
  constructor(private data: T) {}

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }
}
```

When we want to return an object with a generic key, we need to use the index signature.

```typescript
interface GenericObject {
  [key: string]: string;
}
```

### Generic Constraints

We can use generic constraints to make sure that the generic type is a specific type. For example, we can make sure that the generic type is an object.

```typescript
function printName<T extends { name: string }>(obj: T): void {
  console.log(obj.name);
}
```

### Generic Constraints with keyof

We can use the keyof keyword to make sure that the generic type is an object with a specific key.

```typescript
function printName<T extends { name: string }, K extends keyof T>(
  obj: T,
  key: K
): void {
  console.log(obj[key]);
}
```

### Type Guards

Type guards are some expressions that perform a runtime check that guarantees the type in some scope.

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

or

```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

### Type Aliases

Type aliases create a new name for a type. Type aliases are sometimes similar to interfaces, but can name primitives, unions, tuples, and any other types that you’d otherwise have to write by hand.

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}
```

### Interfaces vs Type Aliases

Interfaces create a new name for a type, giving you the ability to name any type and possibly to include multiple types in the name. Type aliases don’t create a new name — for instance, error messages won’t use the alias name. Type aliases are sometimes similar to interfaces, but can name primitives, unions, tuples, and any other types that you’d otherwise have to write by hand.

### Intersection Types

Intersection types combine multiple types into one. This allows you to add together existing types to get a single type that has all the features you need. For example, Person & Serializable & Loggable is a Person and Serializable and Loggable. That means an object of this type will have all members of all three types.

```typescript
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}
```

### Discriminated Unions

Discriminated unions are a powerful way of working with unions in TypeScript. They allow us to have a union of types that all have a common property, and then use a type guard on that property to narrow down the union.

```typescript
interface Square {
  kind: 'square';
  size: number;
}
interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}
interface Circle {
  kind: 'circle';
  radius: number;
}
type Shape = Square | Rectangle | Circle;
function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.height * s.width;
    case 'circle':
      return Math.PI * s.radius ** 2;
  }
}
```

## Inheritance

Inheritance is a way to form new classes using classes that have already been defined. The newly formed classes are called derived classes, and the classes that we derive from are called base classes. A class may inherit from another class by using the extends keyword.

Characteristics of inheritance:

- A derived class may override any method of its base class.
- A method defined in a derived class shadows a method with the same name in the base class.

Characterized of super:

- The super keyword is used to access and call functions on an object's parent.
- The super keyword can be used to call the constructor of a parent class.
- The super keyword must be used before the this keyword is used.

Characterized of static:

- Static members are accessed using the class name and not the class instance.
- Static members are shared among all instances of the class.

Characterized of abstract:

- Abstract classes are base classes from which other classes may be derived.
- Abstract classes may not be instantiated directly.
- Abstract methods are methods that are declared, but not implemented in the abstract class.
- Abstract methods must be implemented by derived classes.

Characterized of readonly:

- Readonly properties must be initialized at their declaration or in the constructor.

Characterized of private:

- Private members can only be accessed by their containing class.

Characterized of protected:

- Protected members can be accessed within their containing class, or by instances of derived classes.

Characterized of public:

- Public members can be accessed anywhere.

Characterized of getter and setter:

- Getters and setters are used to intercept access to a member of an object.
- Getters and setters are accessed like properties.

Characterized of constructor:

- A constructor is a special method that is executed during the creation of an object.
- A constructor is a member of the class, and can be called using the new keyword.

Characterized of interface:

- An interface is a syntactical contract that an entity should conform to.
- Interfaces are used to define the structure of an object.
- Interfaces are used to define the structure of a class.
- Interfaces are used to define the structure of a function.

Characterized of type:

- A type is a name given to a type definition.
- Types are used to define the structure of an object.
- Types are used to define the structure of a class.
- Types are used to define the structure of a function.

Characterized of enum:

- An enum is a way of giving more friendly names to sets of numeric values.
- Enums are used to define a set of named constants.

Characterized of namespace:

- Namespaces are used to organize code into logical groups and to prevent name collisions.

Characterized of module:

- Modules are used to organize code into logical groups and to prevent name collisions.

Characterized of import:

- The import keyword is used to reference external modules.

Characterized of export:

- The export keyword is used to make classes, functions, objects, values, and types available to other modules.

Characterized of extends:

- The extends keyword is used to create a class which is a child of another class.

Characterized of implements:

- The implements keyword is used to create a class which is a child of another class.

#### Inheritance

Characterized by an 'is a' relationship:

- An 'is a' is a relationship between two classes where one class is a specialized version of another class.

#### Composition

Characterized by an 'has a' relationship:

- An 'has a' is a relationship between two classes where one class uses another class as a member variable.

Characterized by an 'uses a' relationship:

- An 'uses a' is a relationship between two classes where one class uses another class as a parameter.

## Composition vs Inheritance

Composition is a way to form new classes using classes that have already been defined. The newly formed classes are called derived classes, and the classes that we derive from are called base classes. A class may inherit from another class by using the extends keyword.

Characteristics of composition:

- A derived class may override any method of its base class.
- A method defined in a derived class shadows a method with the same name in the base class.

The community misunderstands the difference between composition and inheritance. There is a concept of composition in OOP, but it is not the same as composition in FP. Like cloning different methods into a new object having the same methods. This is like inheritance, but it is not the same as inheritance.

## Framework

### Json Server

Save the data using json-server in a local file.:

```bash
npm install -g json-server
```

```bash
json-server --watch db.json
```

```json
{
  "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "typicode" }
}
```

## Decorators

Decorators are a feature that allow us to annotate or modify classes and class members. Decorators are a stage 2 proposal for JavaScript and are available as an experimental feature of TypeScript.

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello, ' + this.greeting;
  }
}
```

### Serialize

Serialize is a process of converting an object into a stream of bytes to store the object or transmit it to memory, a database, or a file. Its main purpose is to save the state of an object in order to be able to recreate it when needed. The reverse process is called deserialization.

```typescript
import { serialize, deserialize } from 'class-transformer';

class User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  isAdmin: boolean;
}

const user = new User();
user.id = 1;
user.firstName = 'John';
user.lastName = 'Doe';
user.age = 25;
user.isAdmin = false;

const plainUser = serialize(user);
console.log(plainUser); // { id: 1, firstName: 'John', lastName: 'Doe', age: 25, isAdmin: false }

const userFromPlain = deserialize(User, plainUser);
console.log(userFromPlain); // User { id: 1, firstName: 'John', lastName: 'Doe', age: 25, isAdmin: false }
```

### Deserialize

Deserialize is a process of converting a stream of bytes into an object. Its main purpose is to recreate an object from a stream of bytes.

## TsConfig

### Strict

Strict mode is a new feature in TypeScript 2.3 that enables a variety of type checking behavior that results in safer programs. Enabling strict mode in your project is as simple as setting the strict flag to true in your tsconfig.json file.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## The importance of typescript

#### One of the most important things that typescript does is:

Understand the different properties that an object has:

#### Type definition files

Type definition files are files that describe the shape of modules. They allow us to import modules that don't have type definitions built in. For example, if we want to use the lodash library, we can install the type definition file for it using npm:

```bash
npm install --save-dev @types/lodash
```

## Decorators

Decorators are a feature that allow us to annotate or modify classes and class members. Decorators are a stage 2 proposal for JavaScript and are available as an experimental feature of TypeScript.

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello, ' + this.greeting;
  }
}
```

To use decorators, you must enable the experimentalDecorators and emitDecoratorMetadata compiler options either on the command line or in your tsconfig.json:

```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "commonjs",
    "experimentalDecorators": true
  }
}
```

## Property Decorators

A property decorator is declared before a property declaration. A property decorator cannot be used in a declaration file, or in any other ambient context (such as in the body of a declare function).

```typescript
function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() {
    return this._x;
  }

  @configurable(false)
  get y() {
    return this._y;
  }
}
```

## Metadata - Reflect

The Reflect object is built-in and provides methods for interceptable JavaScript operations. The methods are the same as those of the Proxy object. Reflect is not a function object, so it is not constructible.

```typescript
import 'reflect-metadata';

const plane = {
  color: 'red',
};

Reflect.defineMetadata('note', 'hi there', plane);

const note = Reflect.getMetadata('note', plane);

console.log(note);
```
