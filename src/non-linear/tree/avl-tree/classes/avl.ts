import { AvlTreeNode } from './avl-node';

export class AvlTree<T> {
	private root: AvlTreeNode<T> | null;

	constructor(private readonly getKeyFunction: (data: T) => number) {
		this.root = null;
	}

	isEmpty(): boolean {
		return this.root === null;
	}

	min(): T | null {
		return AvlTreeNode.min(this.root);
	}

	max(): T | null {
		return AvlTreeNode.max(this.root);
	}

	find(key: number): T | null {
		return AvlTreeNode.find(this.root, key);
	}

	insert(data: T): AvlTree<T> {
		this.root = AvlTreeNode.insert(this.root, data, this.getKeyFunction);

		return this;
	}

	delete(key: number): AvlTree<T> {
		this.root = AvlTreeNode.delete(this.root, key);

		return this;
	}

	traverse(traversalType: AvlTreeNode.TraversalTypes = 'inOrder'): T[] {
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
