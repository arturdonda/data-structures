import { BinarySearchTreeNode } from './classes/bst-node';

type User = { id: number; name: string };
const bst = new BinarySearchTreeNode<User>({ id: 5, name: 'User 5' }, user => user.id);

bst.insert({ id: 3, name: 'User 3' });
bst.insert({ id: 2, name: 'User 2' });
bst.insert({ id: 1, name: 'User 1' });
bst.insert({ id: 4, name: 'User 4' });
bst.insert({ id: 8, name: 'User 8' });
bst.insert({ id: 6, name: 'User 6' });
bst.insert({ id: 7, name: 'User 7' });
bst.insert({ id: 9, name: 'User 9' });

/* Constructed binary search tree is
          5
        /   \
       3     8
     /  \   /  \
    2    4 6    9
   /        \
  1          7
*/

console.log('In Order:', bst.traverse('inOrder')); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

bst.delete(8);

console.log('In Order:', bst.traverse('inOrder')); // [1, 2, 3, 4, 5, 6, 7, 9]

console.log({ min: bst.min, max: bst.max });

console.log('key === 7', bst.find(7));
console.log('key === 70', bst.find(70));
