import { Queue, Stack } from '../../../../linear';

export class BinarySearchTreeNode<T> {
	private data: T;
	private left: BinarySearchTreeNode<T> | null;
	private right: BinarySearchTreeNode<T> | null;

	constructor(data: T, private readonly getKeyFunction: (data: T) => number) {
		this.data = data;
		this.left = null;
		this.right = null;
	}

	get key(): number {
		return this.getKeyFunction(this.data);
	}

	static min<T>(node: BinarySearchTreeNode<T> | null): T | null {
		if (node === null) return null;

		let current: BinarySearchTreeNode<T> = node;

		while (current.left !== null) {
			current = current.left;
		}

		return current.data;
	}

	static max<T>(node: BinarySearchTreeNode<T> | null): T | null {
		if (node === null) return null;

		let current: BinarySearchTreeNode<T> = node;

		while (current.right !== null) {
			current = current.right;
		}

		return current.data;
	}

	static find<T>(node: BinarySearchTreeNode<T> | null, key: number): T | null {
		// Reached null node without finding corresponding key -> key not present!
		if (node === null) return null;

		// Found node with corresponding key -> return node
		if (key === node.key) return node.data;

		// Key is lesser than current node key -> search in left subtree
		if (key < node.key) return BinarySearchTreeNode.find(node.left, key);

		// Key is greater than current node key -> search in right subtree
		return BinarySearchTreeNode.find(node.right, key);
	}

	static insert<T>(node: BinarySearchTreeNode<T> | null, data: T, getKeyFunction: (data: T) => number): BinarySearchTreeNode<T> {
		const key = getKeyFunction(data);

		// current node is null -> insert here!
		if (node === null) return new BinarySearchTreeNode<T>(data, getKeyFunction);

		// key already present -> do not override (won't accept collisions)
		if (key === node.key) return node;

		if (key < node.key) {
			// Key is lesser than curent node key -> insert in left subtree
			node.left = BinarySearchTreeNode.insert(node.left, data, getKeyFunction);
		} else {
			// Key is greater than curent node key -> insert in right subtree
			node.right = BinarySearchTreeNode.insert(node.right, data, getKeyFunction);
		}

		return node;
	}

	static delete<T>(node: BinarySearchTreeNode<T> | null, key: number): BinarySearchTreeNode<T> | null {
		if (node === null) return node;

		if (key < node.key) {
			// Key is less than node's key -> delete from and update left sub-tree\

			node.left = BinarySearchTreeNode.delete(node.left, key);
		} else if (key > node.key) {
			// Key is greater than node's key -> delete from and update right sub-tree

			node.right = BinarySearchTreeNode.delete(node.right, key);
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

			node.data = BinarySearchTreeNode.min(node.right)!;
			node.right = BinarySearchTreeNode.delete(node.right, node.key);
		}

		return node;
	}

	//#region Traversal
	bfsTraversal(): T[] {
		const queue = new Queue<BinarySearchTreeNode<T>>();
		const result: T[] = [];

		queue.enqueue(this);

		while (queue.isEmpty() === false) {
			const current = queue.dequeue() as BinarySearchTreeNode<T>;

			result.push(current.data);

			if (current.left) queue.enqueue(current.left);
			if (current.right) queue.enqueue(current.right);
		}

		return result;
	}

	dfsTraversal(dfsTraversalType: BinarySearchTreeNode.DfsTraversalTypes): T[] {
		const result: T[] = [];
		const stack = new Stack<BinarySearchTreeNode<T>>();

		switch (dfsTraversalType) {
			case 'inOrder': {
				let current: BinarySearchTreeNode<T> | null = this;

				while (current !== null || stack.isEmpty() === false) {
					while (current !== null) {
						stack.push(current);
						current = current.left;
					}

					current = stack.pop() as BinarySearchTreeNode<T>;
					result.push(current.data);

					current = current.right;
				}

				break;
			}
			case 'preOrder': {
				stack.push(this);

				while (stack.isEmpty() === false) {
					const current = stack.pop() as BinarySearchTreeNode<T>;
					result.push(current.data);

					if (current.right) stack.push(current.right);
					if (current.left) stack.push(current.left);
				}

				break;
			}
			case 'postOrder': {
				stack.push(this);

				while (stack.isEmpty() === false) {
					const current = stack.pop() as BinarySearchTreeNode<T>;
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
export namespace BinarySearchTreeNode {
	export type DfsTraversalTypes = 'inOrder' | 'preOrder' | 'postOrder';
	export type BfsTraversalTypes = 'levelOrder';
	export type TraversalTypes = DfsTraversalTypes | BfsTraversalTypes;
}
