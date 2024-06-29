import { Queue, Stack } from '../../../../linear';

export class BinarySearchTreeNode<T> {
	private data: T;
	private left: BinarySearchTreeNode<T> | null;
	private right: BinarySearchTreeNode<T> | null;

	constructor(data: T, private readonly getKey: (data: T) => number) {
		this.data = data;
		this.left = null;
		this.right = null;
	}

	get key() {
		return this.getKey(this.data);
	}

	get min(): T {
		let current: BinarySearchTreeNode<T> = this;

		while (current.left !== null) {
			current = current.left;
		}

		return current.data;
	}

	get max(): T {
		let current: BinarySearchTreeNode<T> = this;

		while (current.right !== null) {
			current = current.right;
		}

		return current.data;
	}

	traverse(traversalType: BinarySearchTreeNode.TraversalTypes = 'inOrder'): T[] {
		if (traversalType === 'levelOrder') return this.bfsTraversal();

		return this.dfsTraversal(traversalType);
	}

	//#region Traversal
	private bfsTraversal(): T[] {
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

	private dfsTraversal(dfsTraversalType: BinarySearchTreeNode.DfsTraversalTypes): T[] {
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

	find(key: number): T | null {
		if (key === this.key) return this.data;

		if (key < this.key) return this.left ? this.left.find(key) : this.left;

		return this.right ? this.right.find(key) : this.right;
	}

	insert(data: T): void {
		const key = this.getKey(data);

		if (this.key === key) return;

		if (key < this.key) {
			if (this.left) return this.left.insert(data);

			this.left = new BinarySearchTreeNode<T>(data, this.getKey);
		} else {
			if (this.right) return this.right.insert(data);

			this.right = new BinarySearchTreeNode<T>(data, this.getKey);
		}
	}

	delete(key: number): void {
		BinarySearchTreeNode.delete(this, key);
	}

	private static delete<T>(node: BinarySearchTreeNode<T> | null, key: number): BinarySearchTreeNode<T> | null {
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

			node.data = node.right!.min;
			node.right = BinarySearchTreeNode.delete(node.right, node.key);
		}

		return node;
	}

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return { key: this.key, left: this.left, right: this.right };
	}
	//#endregion Print
}

export namespace BinarySearchTreeNode {
	export type DfsTraversalTypes = 'inOrder' | 'preOrder' | 'postOrder';
	export type BfsTraversalTypes = 'levelOrder';
	export type TraversalTypes = DfsTraversalTypes | BfsTraversalTypes;
}
