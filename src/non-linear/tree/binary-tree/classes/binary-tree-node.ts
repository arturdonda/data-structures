import { Queue, Stack } from '../../../../linear';

export class BinaryTreeNode<T> {
	left: BinaryTreeNode<T> | null;
	right: BinaryTreeNode<T> | null;
	data: T;

	constructor(data: T) {
		this.left = null;
		this.right = null;
		this.data = data;
	}

	traverse(traversalType: BinaryTreeNode.TraversalTypes = 'inOrder'): T[] {
		if (traversalType === 'levelOrder') return this.bfsTraversal();

		return this.dfsTraversal(traversalType);
	}

	//#region Traversal
	private bfsTraversal(): T[] {
		const queue = new Queue<BinaryTreeNode<T>>();
		const result: T[] = [];

		queue.enqueue(this);

		while (queue.isEmpty() === false) {
			const current = queue.dequeue() as BinaryTreeNode<T>;

			result.push(current.data);

			if (current.left) queue.enqueue(current.left);
			if (current.right) queue.enqueue(current.right);
		}

		return result;
	}

	private dfsTraversal(dfsTraversalType: BinaryTreeNode.DfsTraversalTypes): T[] {
		const result: T[] = [];
		const stack = new Stack<BinaryTreeNode<T>>();

		switch (dfsTraversalType) {
			case 'inOrder': {
				let current: BinaryTreeNode<T> | null = this;

				while (current !== null || stack.isEmpty() === false) {
					while (current !== null) {
						stack.push(current);
						current = current.left;
					}

					current = stack.pop() as BinaryTreeNode<T>;
					result.push(current.data);

					current = current.right;
				}

				break;
			}
			case 'preOrder': {
				stack.push(this);

				while (stack.isEmpty() === false) {
					const current = stack.pop() as BinaryTreeNode<T>;
					result.push(current.data);

					if (current.right) stack.push(current.right);
					if (current.left) stack.push(current.left);
				}

				break;
			}
			case 'postOrder': {
				stack.push(this);

				while (stack.isEmpty() === false) {
					const current = stack.pop() as BinaryTreeNode<T>;
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

	includes(findFunction: (data: T) => boolean): boolean {
		const stack = new Stack<BinaryTreeNode<T>>();

		stack.push(this);

		while (stack.isEmpty() === false) {
			const current = stack.pop() as BinaryTreeNode<T>;

			if (findFunction(current.data)) return true;

			if (current.right) stack.push(current.right);
			if (current.left) stack.push(current.left);
		}

		return false;
	}

	sum(mapFunction: (data: T) => number): number {
		const stack = new Stack<BinaryTreeNode<T>>();
		let sum = 0;

		stack.push(this);

		while (stack.isEmpty() === false) {
			const current = stack.pop() as BinaryTreeNode<T>;

			sum += mapFunction(current.data);

			if (current.right) stack.push(current.right);
			if (current.left) stack.push(current.left);
		}

		return sum;
	}

	min(mapFunction: (data: T) => number): number {
		const stack = new Stack<BinaryTreeNode<T>>();
		let min = Infinity;

		stack.push(this);

		while (stack.isEmpty() === false) {
			const current = stack.pop() as BinaryTreeNode<T>;

			min = Math.min(min, mapFunction(current.data));

			if (current.right) stack.push(current.right);
			if (current.left) stack.push(current.left);
		}

		return min;
	}

	max(mapFunction: (data: T) => number): number {
		const stack = new Stack<BinaryTreeNode<T>>();
		let max = -Infinity;

		stack.push(this);

		while (stack.isEmpty() === false) {
			const current = stack.pop() as BinaryTreeNode<T>;

			max = Math.max(max, mapFunction(current.data));

			if (current.right) stack.push(current.right);
			if (current.left) stack.push(current.left);
		}

		return max;
	}

	maxPath(mapFunction: (data: T) => number): number {
		const left = this.left ? this.left.maxPath(mapFunction) : 0;
		const right = this.right ? this.right.maxPath(mapFunction) : 0;

		return mapFunction(this.data) + Math.max(left, right);
	}

	allPaths(path: T[] = []): T[][] {
		path.push(this.data);

		if (this.left === null && this.right === null) return [path];

		const left = this.left ? this.left.allPaths(path.slice()) : [];
		const right = this.right ? this.right.allPaths(path.slice()) : [];

		return [...left, ...right];
	}

	allLeaves(): T[] {
		const leaves: T[] = [];

		const stack = new Stack<BinaryTreeNode<T>>();

		stack.push(this);

		while (stack.isEmpty() === false) {
			const current = stack.pop() as BinaryTreeNode<T>;

			if (current.left === null && current.right === null) leaves.push(current.data);

			if (current.right) stack.push(current.right);
			if (current.left) stack.push(current.left);
		}

		return leaves;
	}

	invert(): BinaryTreeNode<T> {
		const left = this.left;
		const right = this.right;

		this.left = right === null ? null : right.invert();
		this.right = left === null ? null : left.invert();

		return this;
	}

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return { data: this.data, left: this.left, right: this.right };
	}
	//#endregion Print
}

export namespace BinaryTreeNode {
	export type DfsTraversalTypes = 'inOrder' | 'preOrder' | 'postOrder';
	export type BfsTraversalTypes = 'levelOrder';
	export type TraversalTypes = DfsTraversalTypes | BfsTraversalTypes;
}
