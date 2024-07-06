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

function printUserTree(message: string, avlTree: AvlTree<User>) {
  console.log(
    message,
    avlTree.traverse('preOrder').map(u => u.id)
  );
}

(function leftLeftRotationExample() {
  const avl = new AvlTree<User>(user => user.id);

  avl.insert(new User({ id: 1, name: 'User 1' }));
  avl.insert(new User({ id: 2, name: 'User 2' }));
  avl.insert(new User({ id: 3, name: 'User 3' }));

  /*
      1
       \      rotateLeft(1)     2
        2     ------------>    / \
         \                    1   3
          3
  */
  printUserTree('Left Left rotation example:', avl); // [2, 1, 3]
})();

(function rightRightRotationExample() {
  const avl = new AvlTree<User>(user => user.id);

  avl.insert(new User({ id: 3, name: 'User 3' }));
  avl.insert(new User({ id: 2, name: 'User 2' }));
  avl.insert(new User({ id: 1, name: 'User 1' }));

  /*
          3
         /    rotateRight(3)     2
        2     ------------->    / \
       /                       1   3
      1
  */

  printUserTree('Right Right rotation example:', avl); // [2, 1, 3]
})();

(function leftRightRotationExample() {
  const avl = new AvlTree<User>(user => user.id);

  avl.insert(new User({ id: 1, name: 'User 1' }));
  avl.insert(new User({ id: 3, name: 'User 3' }));
  avl.insert(new User({ id: 2, name: 'User 2' }));

  /*
      1                     1
       \   rotateRight(3)    \      rotateLeft(1)     2
        3  ------------->     2     ------------>    / \
       /                       \                    1   3
      2                         3
  */

  printUserTree('Left Right rotation example:', avl); // [2, 1, 3]
})();

(function rightLeftRotationExample() {
  const avl = new AvlTree<User>(user => user.id);

  avl.insert(new User({ id: 3, name: 'User 3' }));
  avl.insert(new User({ id: 1, name: 'User 1' }));
  avl.insert(new User({ id: 2, name: 'User 2' }));

  /*
      3                       3
     /    rotateLeft(1)      /    rotateRight(3)     2
    1     ------------>     2     ------------->    / \
     \                     /                       1   3
      2                   1
  */

  printUserTree('Right Left rotation example:', avl); // [2, 1, 3]
})();

(function bigAvlTreeExample() {
  const avl = new AvlTree<User>(user => user.id);

  avl.insert(new User({ id: 1, name: 'User 1' }));
  avl.insert(new User({ id: 2, name: 'User 2' }));
  avl.insert(new User({ id: 3, name: 'User 3' }));
  avl.insert(new User({ id: 4, name: 'User 4' }));
  avl.insert(new User({ id: 5, name: 'User 5' }));
  avl.insert(new User({ id: 6, name: 'User 6' }));

  /*               
      1                         2                      2                           2                        2                             4     
       \      rotateLeft(1)    / \                    / \        rotateLeft(3)    / \                      / \        rotateLeft(2)      / \   
        2     ------------>   1   3   ----------->   1   3       ------------>   1   4     ----------->   1   4       ------------>     2   5  
         \                                                \                         / \                      / \                       / \   \ 
          3                                                4                       3   5                    3   5                     1   3   6
                                                            \                                                    \                              
                                                             5                                                    6                   
  */

  printUserTree('Big AVL Tree example:', avl); // [4, 2, 1, 3, 5, 6]
})();
