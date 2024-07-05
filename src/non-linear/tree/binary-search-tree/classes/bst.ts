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
		return BinarySearchTreeNode.min(this.root);
	}

	max(): T | null {
		return BinarySearchTreeNode.max(this.root);
	}

	find(key: number): T | null {
		return BinarySearchTreeNode.find(this.root, key);
	}

	insert(data: T): BinarySearchTree<T> {
		this.root = BinarySearchTreeNode.insert(this.root, data, this.getKeyFunction);

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
