import { BinarySearchTreeNode } from './bst-node';

export class BinarySearchTree<T> {
	private root: BinarySearchTreeNode<T> | null;

	constructor(private readonly getKeyFunction: (data: T) => number) {
		this.root = null;
	}

	isEmpty(): boolean {
		return this.root === null;
	}

	min(): T | null {
		return this.root ? this.root.min() : this.root;
	}

	max(): T | null {
		return this.root ? this.root.max() : this.root;
	}

	find(key: number): T | null {
		return this.root ? this.root.find(key) : this.root;
	}

	insert(data: T): BinarySearchTree<T> {
		if (this.root === null) {
			this.root = new BinarySearchTreeNode<T>(data, this.getKeyFunction);
		} else {
			this.root.insert(data);
		}

		return this;
	}

	delete(key: number): BinarySearchTree<T> {
		this.root = BinarySearchTreeNode.delete(this.root, key);

		return this;
	}

	traverse(traversalType: BinarySearchTreeNode.TraversalTypes = 'inOrder'): T[] {
		if (this.root === null) return [];

		if (traversalType === 'levelOrder') return this.root.bfsTraversal();

		return this.root.dfsTraversal(traversalType);
	}

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.root;
	}
	//#endregion Print
}
