import { LinkedList } from './classes';

const linkedList = new LinkedList<User>();

linkedList.insert({ id: 0, name: 'User 0', email: 'user_zero@email.com' });
linkedList.insert({ id: 1, name: 'User 1', email: 'user_one@email.com' });
linkedList.insert({ id: 2, name: 'User 2', email: 'user_two@email.com' });

console.log('linkedList:', linkedList);
console.log('size:', linkedList.size);

const user = linkedList.find(user => user.id === 1);

console.log('user: ', user);

linkedList.filter(user => user.id % 2 === 0);

console.log('linkedList:', linkedList);
console.log('size:', linkedList.size);

const emailLinkedList = linkedList.map(user => user.email.toUpperCase());

console.log('emailLinkedList: ', emailLinkedList);

type User = { id: number; name: string; email: string };
