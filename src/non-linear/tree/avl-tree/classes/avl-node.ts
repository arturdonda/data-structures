import { Queue, Stack } from '../../../../linear';

export class AvlTreeNode<T> {
	private data: T;
	private left: AvlTreeNode<T> | null;
	private right: AvlTreeNode<T> | null;
	private height: number;

	constructor(data: T, private readonly getKeyFunction: (data: T) => number) {
		this.data = data;
		this.left = null;
		this.right = null;
		this.height = 1;
	}

	get key(): number {
		return this.getKeyFunction(this.data);
	}

	private static getHeight<T>(node: AvlTreeNode<T> | null): number {
		if (node === null) return 0;

		return node.height;
	}

	private static updateHeight<T>(node: AvlTreeNode<T>): void {
		const leftHeight = AvlTreeNode.getHeight(node.left);
		const rightHeight = AvlTreeNode.getHeight(node.right);

		node.height = Math.max(leftHeight, rightHeight) + 1;
	}

	private static getBalanceFactor<T>(node: AvlTreeNode<T> | null): number {
		if (node === null) return 0;

		return AvlTreeNode.getHeight(node.left) - AvlTreeNode.getHeight(node.right);
	}

	//#region Rotations
	private static rotateLeft<T>(node: AvlTreeNode<T>): AvlTreeNode<T> {
		/*
        When the balance factor is less then -1, the right subtree is bigger than left subtree by more than 1 level, so a left rotation is necessary!
        The right child becomes the root, and the current node becomes the left child of the new root.

           2
         /   \
        1     4          leftRotation(2)         4
            /   \        -------------->       /   \
           3     6                            2     6
               /   \                        /  \   /  \
              5     7                      1    3 5    7
        */

		const rightChild = node.right!;
		node.right = rightChild.left;

		rightChild.left = node;

		AvlTreeNode.updateHeight(node);
		AvlTreeNode.updateHeight(rightChild);

		return rightChild;
	}

	private static rotateRight<T>(node: AvlTreeNode<T>): AvlTreeNode<T> {
		/*
        When the balance factor grater than 1, the left subtree is bigger than right subtree by more than 1 level, so a right rotation is necessary!
        The left child becomes the root, and the current node becomes the right child of the new root.

		      6                                 4
             / \                              /   \
            4   7        rightRotation(6)    2     6
           / \           --------------->   / \   / \
          2   5                            1   3 5   7
         / \
        1   3
        */

		const leftChild = node.left!;
		node.left = leftChild.right;

		leftChild.right = node;

		AvlTreeNode.updateHeight(node);
		AvlTreeNode.updateHeight(leftChild);

		return leftChild;
	}

	private static applyRotation<T>(node: AvlTreeNode<T>): AvlTreeNode<T> {
		// BF > 1 -> left subtree is bigger -> needs right rotation!
		if (AvlTreeNode.getBalanceFactor(node) > 1) {
			if (AvlTreeNode.getBalanceFactor(node.left) < 0) node.left = AvlTreeNode.rotateLeft(node.left!);

			return AvlTreeNode.rotateRight(node);
		}

		// BF < -1 -> right subtree is bigger -> needs left rotation!
		if (AvlTreeNode.getBalanceFactor(node) < -1) {
			if (AvlTreeNode.getBalanceFactor(node.right) > 0) node.right = AvlTreeNode.rotateRight(node.right!);

			return AvlTreeNode.rotateLeft(node);
		}

		// BF within [-1, 1] range -> no rotation needed!
		return node;
	}
	//#endregion Rotations

	static min<T>(node: AvlTreeNode<T> | null): T | null {
		if (node === null) return null;

		let current: AvlTreeNode<T> = node;

		while (current.left !== null) {
			current = current.left;
		}

		return current.data;
	}

	static max<T>(node: AvlTreeNode<T> | null): T | null {
		if (node === null) return null;

		let current: AvlTreeNode<T> = node;

		while (current.right !== null) {
			current = current.right;
		}

		return current.data;
	}

	static find<T>(node: AvlTreeNode<T> | null, key: number): T | null {
		// Reached null node without finding corresponding key -> key not present!
		if (node === null) return null;

		// Found node with corresponding key -> return node
		if (key === node.key) return node.data;

		// Key is lesser than current node key -> search in left subtree
		if (key < node.key) return AvlTreeNode.find(node.left, key);

		// Key is greater than current node key -> search in right subtree
		return AvlTreeNode.find(node.right, key);
	}

	static insert<T>(node: AvlTreeNode<T> | null, data: T, getKeyFunction: (data: T) => number): AvlTreeNode<T> {
		const key = getKeyFunction(data);

		// current node is null -> insert here!
		if (node === null) return new AvlTreeNode<T>(data, getKeyFunction);

		// key already present -> do not override (won't accept collisions)
		if (key === node.key) return node;

		if (key < node.key) {
			// Key is lesser than curent node key -> insert in left subtree
			node.left = AvlTreeNode.insert(node.left, data, getKeyFunction);
		} else {
			// Key is greater than curent node key -> insert in right subtree
			node.right = AvlTreeNode.insert(node.right, data, getKeyFunction);
		}

		AvlTreeNode.updateHeight(node);
		return AvlTreeNode.applyRotation(node);
	}

	static delete<T>(node: AvlTreeNode<T> | null, key: number): AvlTreeNode<T> | null {
		if (node === null) return node;

		if (key < node.key) {
			// Key is less than node's key -> delete from and update left sub-tree\

			node.left = AvlTreeNode.delete(node.left, key);
		} else if (key > node.key) {
			// Key is greater than node's key -> delete from and update right sub-tree

			node.right = AvlTreeNode.delete(node.right, key);
		} else {
			// Key is equal to node's key -> delete node
			// We have four possible scenarios:

			// 1) Node has no children -> update parent node to point to null
			if (node.left === null && node.right === null) return null;

			// 2) Node has only left child -> update parent node to point to left child
			if (node.left && node.right === null) return node.left;

			// 3) Node has only right child -> update parent node to point to right child
			if (node.left === null && node.right) return node.right;

			// 4) Node has both children -> update parent node to point to left-most child of right child (min value from right sub-tree)
			// could also be right-most child of left child (max value from left sub-tree)

			node.data = AvlTreeNode.min(node.right)!;
			node.right = AvlTreeNode.delete(node.right, node.key);
		}

		AvlTreeNode.updateHeight(node);
		return AvlTreeNode.applyRotation(node);
	}

	//#region Traversal
	bfsTraversal(): T[] {
		const queue = new Queue<AvlTreeNode<T>>();
		const result: T[] = [];

		queue.enqueue(this);

		while (queue.isEmpty() === false) {
			const current = queue.dequeue() as AvlTreeNode<T>;

			result.push(current.data);

			if (current.left) queue.enqueue(current.left);
			if (current.right) queue.enqueue(current.right);
		}

		return result;
	}

	dfsTraversal(dfsTraversalType: AvlTreeNode.DfsTraversalTypes): T[] {
		const result: T[] = [];
		const stack = new Stack<AvlTreeNode<T>>();

		switch (dfsTraversalType) {
			case 'inOrder': {
				let current: AvlTreeNode<T> | null = this;

				while (current !== null || stack.isEmpty() === false) {
					while (current !== null) {
						stack.push(current);
						current = current.left;
					}

					current = stack.pop() as AvlTreeNode<T>;
					result.push(current.data);

					current = current.right;
				}

				break;
			}
			case 'preOrder': {
				stack.push(this);

				while (stack.isEmpty() === false) {
					const current = stack.pop() as AvlTreeNode<T>;
					result.push(current.data);

					if (current.right) stack.push(current.right);
					if (current.left) stack.push(current.left);
				}

				break;
			}
			case 'postOrder': {
				stack.push(this);

				while (stack.isEmpty() === false) {
					const current = stack.pop() as AvlTreeNode<T>;
					result.unshift(current.data);

					if (current.left) stack.push(current.left);
					if (current.right) stack.push(current.right);
				}

				break;
			}
		}

		return result;
	}
	//#endregion Traversal

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return { data: this.data, left: this.left, right: this.right };
	}
	//#endregion Print
}
export namespace AvlTreeNode {
	export type DfsTraversalTypes = 'inOrder' | 'preOrder' | 'postOrder';
	export type BfsTraversalTypes = 'levelOrder';
	export type TraversalTypes = DfsTraversalTypes | BfsTraversalTypes;
}
