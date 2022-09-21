import { CharactersCollection } from './collections/CharactersCollection';
import { LinkedList } from './collections/LinkedList';
import { NumbersCollection } from './collections/NumbersCollection';
import { Sorter } from './Sorter';

const collection = new NumbersCollection([10, 3, -5, 0]);
collection.sort();
console.log(collection.data);

const collectionString = new CharactersCollection('Cleber');
collectionString.sort();
console.log(collectionString.data);

const linkedList = new LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-3);
linkedList.add(4);
linkedList.sort();
linkedList.print();
console.log(JSON.stringify(linkedList.head));
