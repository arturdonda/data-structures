import { LinkedList } from './classes';

type User = { id: number; name: string; email: string };

const linkedList = new LinkedList<User>();

linkedList.insert({ id: 1, name: 'User 1', email: 'user_one@email.com' });
linkedList.insert({ id: 2, name: 'User 2', email: 'user_two@email.com' });
linkedList.insert({ id: 4, name: 'User 4', email: 'user_four@email.com' }, 100);
linkedList.insert({ id: 5, name: 'User 5', email: 'user_five@email.com' });
linkedList.insert({ id: 0, name: 'User 0', email: 'user_zero@email.com' }, -10);
linkedList.insert({ id: 3, name: 'User 3', email: 'user_three@email.com' }, 3);

console.log('linkedList:', linkedList);

console.log('length:', linkedList.length);

console.log('------------------   Get   ------------------');

console.log('head: ', linkedList.get(0));
console.log('tail: ', linkedList.get(linkedList.length - 1));
console.log('other: ', linkedList.get(3));
console.log('outOfBound1: ', linkedList.get(-1));
console.log('outOfBound2: ', linkedList.get(10));

console.log('------------------   Index Of   ------------------');

// prettier-ignore
console.log('User 4:', linkedList.indexOf(u => u.id === 4));
// prettier-ignore
console.log('User A:', linkedList.indexOf(u => u.name === 'User A'));

console.log('------------------   Find   ------------------');

const user = linkedList.find(user => user.id === 1);

console.log('user: ', user);

console.log('------------------   Filter   ------------------');

const filteredLinkedList = linkedList.filter(u => u.id % 2 === 0);

console.log('filteredLinkedList: ', filteredLinkedList);

console.log('------------------   Map   ------------------');

const mappedLinkedList = linkedList.map(u => u.email);

console.log('mappedLinkedList: ', mappedLinkedList);
