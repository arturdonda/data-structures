import { AvlTree } from './classes';

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

(function leftLeftRotationExample() {
	const avl = new AvlTree<User>(user => user.id);

	avl.insert(new User({ id: 1, name: 'User 1' }));
	avl.insert(new User({ id: 2, name: 'User 2' }));
	avl.insert(new User({ id: 3, name: 'User 3' }));

	/*
      1                     
       \      rotateLeft(1)   2
        2     ----------->   / \
         \                  1   3
          3
  */

	console.log('--------------------------------');
	console.log('Left Left rotation example:', avl);
})();

(function rightRightRotationExample() {
	const avl = new AvlTree<User>(user => user.id);

	avl.insert(new User({ id: 3, name: 'User 3' }));
	avl.insert(new User({ id: 2, name: 'User 2' }));
	avl.insert(new User({ id: 1, name: 'User 1' }));

	/*
          3                     
         /    rotateRight(3)    2
        2     ------------->   / \
       /                      1   3
      1
  */

	console.log('--------------------------------');
	console.log('Right Right rotation example:', avl);
})();

(function leftRightRotationExample() {
	const avl = new AvlTree<User>(user => user.id);

	avl.insert(new User({ id: 1, name: 'User 1' }));
	avl.insert(new User({ id: 3, name: 'User 3' }));
	avl.insert(new User({ id: 2, name: 'User 2' }));

	/*
      1                     1                     
       \   rotateRight(3)    \      rotateLeft(1)   2
        3  ------------->     2     ----------->   / \
       /                       \                  1   3
      2                         3
  */

	console.log('--------------------------------');
	console.log('Left Right rotation example:', avl);
})();

(function rightLeftRotationExample() {
	const avl = new AvlTree<User>(user => user.id);

	avl.insert(new User({ id: 3, name: 'User 3' }));
	avl.insert(new User({ id: 1, name: 'User 1' }));
	avl.insert(new User({ id: 2, name: 'User 2' }));

	/*
      3                       3                     
     /    rotateLeft(1)      /    rotateRight(3)    2
    1     ----------->      2     ------------->   / \
     \                     /                      1   3
      2                   1
  */

	console.log('--------------------------------');
	console.log('Right Left rotation example:', avl);
})();
