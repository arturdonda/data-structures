import { BinarySearchTree } from './classes';

class User {
	private readonly _id: number;
	private readonly _name: string;

	constructor(params: { id: number; name: string }) {
		this._id = params.id;
		this._name = params.name;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return { id: this.id, name: this.name };
	}
	//#endregion Print
}

const bst = new BinarySearchTree<User>(user => user.id);

bst.insert(new User({ id: 5, name: 'User 5' }));
bst.insert(new User({ id: 3, name: 'User 3' }));
bst.insert(new User({ id: 2, name: 'User 2' }));
bst.insert(new User({ id: 1, name: 'User 1' }));
bst.insert(new User({ id: 4, name: 'User 4' }));
bst.insert(new User({ id: 8, name: 'User 8' }));
bst.insert(new User({ id: 6, name: 'User 6' }));
bst.insert(new User({ id: 7, name: 'User 7' }));
bst.insert(new User({ id: 9, name: 'User 9' }));

/* Constructed Binary Search Tree is
          5
        /   \
       3     8
     /  \   /  \
    2    4 6    9
   /        \
  1          7
*/

console.log('In Order:', bst.traverse('inOrder')); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log('Pre Order:', bst.traverse('preOrder')); // [5, 3, 2, 1, 4, 8, 6, 7, 9]
console.log('Post Order:', bst.traverse('postOrder')); // [1, 2, 4, 3, 7, 6, 9, 8, 5]
console.log('Level Order:', bst.traverse('levelOrder')); // [5, 3, 8, 2, 4, 6, 9, 1, 7]

console.log(bst);

bst.delete(5);

/* Resulting Binary Search Tree is
          6
        /   \
       3     8
     /  \   /  \
    2    4 7    9
   /
  1
*/

console.log('In Order:', bst.traverse('inOrder')); // [1, 2, 3, 4, 6, 7, 8, 9]

console.log(bst);

console.log({ min: bst.min(), max: bst.max() });

console.log('key === 7', bst.find(7));
console.log('key === 70', bst.find(70));
