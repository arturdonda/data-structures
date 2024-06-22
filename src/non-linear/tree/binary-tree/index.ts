import { BinaryTreeNode } from './classes';

type User = { id: number; name: string };

const root = new BinaryTreeNode<User>({ id: 1, name: 'User 1' });
root.left = new BinaryTreeNode({ id: 2, name: 'User 2' });
root.right = new BinaryTreeNode({ id: 3, name: 'User 3' });
root.left.left = new BinaryTreeNode({ id: 4, name: 'User 4' });
root.left.right = new BinaryTreeNode({ id: 5, name: 'User 5' });

/* Constructed binary tree is
          1
        /   \
       2      3
     /   \
    4     5
*/

console.log('In Order Traversal', root.traverse('inOrder')); // [4, 2, 5, 1, 3]

console.log('Pre Order Traversal', root.traverse('preOrder')); // [1, 2, 4, 5, 3]

console.log('Post Order Traversal', root.traverse('postOrder')); // [4, 5, 2, 3, 1]

console.log('Level Order Traversal', root.traverse('levelOrder')); // [1, 2, 3, 4, 5]

console.log('Includes user.id === 4: ', root.includes(user => user.id === 4)); // true

console.log('Includes user.id === 7: ', root.includes(user => user.id === 7)); // false

console.log('Includes user.id > 2 && user.id < 4: ', root.includes(user => user.id > 2 && user.id < 4)); // true

console.log('Sum user.id: ', root.sum(user => user.id)); // 15

console.log('Min user.id: ', root.min(user => user.id)); // 1

console.log('Max user.id: ', root.max(user => user.id)); // 5

console.log('Max user.id path: ', root.maxPath(user => user.id)); // 8

console.log('All paths: ', root.allPaths()); // [[1, 2, 4], [1, 2, 5], [1, 3]]

console.log('All leaves: ', root.allLeaves()); // [4, 5, 3]

console.log('Invert: ', root.invert());
/*
          1
        /   \
       3      2
            /   \
           5     4
*/