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

	traverse(type: 'inOrder' | 'preOrder' | 'postOrder' | 'levelOrder' = 'inOrder') {
		return BinaryTreeNode.traverse(this, type);
	}

	includes(findFunction: (data: T) => boolean) {
		return BinaryTreeNode.includes(this, findFunction);
	}

	sum(mapFunction: (data: T) => number) {
		return BinaryTreeNode.sum(this, mapFunction);
	}

	min(mapFunction: (data: T) => number) {
		return BinaryTreeNode.min(this, mapFunction);
	}

	max(mapFunction: (data: T) => number) {
		return BinaryTreeNode.max(this, mapFunction);
	}

	maxPath(mapFunction: (data: T) => number) {
		return BinaryTreeNode.maxPath(this, mapFunction);
	}

	allPaths() {
		return BinaryTreeNode.allPaths(this);
	}

	allLeaves() {
		return BinaryTreeNode.allLeaves(this);
	}

	invert() {
		return BinaryTreeNode.invert(this);
	}

	//#region Static Methods
	//#region Traverse
	static traverse<T>(node: BinaryTreeNode<T> | null, type: 'inOrder' | 'preOrder' | 'postOrder' | 'levelOrder' = 'inOrder') {
		if (type === 'levelOrder') return BinaryTreeNode.breadthFirstTraversal(node);

		return BinaryTreeNode.depthFirstTraversal(node, type);
	}

	// Depth First - Iterative Approach
	private static depthFirstTraversal<T>(node: BinaryTreeNode<T> | null, type: 'inOrder' | 'preOrder' | 'postOrder') {
		const result: T[] = [];
		const stack = new Stack<BinaryTreeNode<T>>();

		switch (type) {
			case 'inOrder': {
				let current = node;

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
				if (node !== null) stack.push(node);

				while (stack.isEmpty() === false) {
					const current = stack.pop() as BinaryTreeNode<T>;
					result.push(current.data);

					if (current.right) stack.push(current.right);
					if (current.left) stack.push(current.left);
				}

				break;
			}
			case 'postOrder': {
				if (node !== null) stack.push(node);

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

	// Depth First - Recursive Approach
	// private static depthFirstTraversal<T>(node: BinaryTreeNode<T> | null, type: 'inOrder' | 'preOrder' | 'postOrder', result: T[] = []): T[] {
	// 	if (node === null) return [];

	// 	const left = this.depthFirstTraversal(node.left, type, result);
	// 	const right = this.depthFirstTraversal(node.right, type, result);

	// 	switch (type) {
	// 		case 'preOrder': // Root -> Left -> Right
	// 			return [node.data, ...left, ...right];

	// 		case 'inOrder': // Left -> Root -> Right
	// 			return [...left, node.data, ...right];

	// 		case 'postOrder': // Left -> Right -> Root
	// 			return [...left, ...right, node.data];
	// 	}
	// }

	private static breadthFirstTraversal<T>(node: BinaryTreeNode<T> | null) {
		const queue = new Queue<BinaryTreeNode<T>>();
		const result: T[] = [];

		if (node !== null) queue.enqueue(node);

		while (queue.isEmpty() === false) {
			const current = queue.dequeue() as BinaryTreeNode<T>;

			result.push(current.data);

			if (current.left) queue.enqueue(current.left);
			if (current.right) queue.enqueue(current.right);
		}

		return result;
	}
	//#endregion Traverse

	static includes<T>(node: BinaryTreeNode<T> | null, findFunction: (data: T) => boolean): boolean {
		const stack = new Stack<BinaryTreeNode<T>>();

		if (node !== null) stack.push(node);

		while (stack.isEmpty() === false) {
			const current = stack.pop() as BinaryTreeNode<T>;

			if (findFunction(current.data)) return true;

			if (current.right) stack.push(current.right);
			if (current.left) stack.push(current.left);
		}

		return false;
	}

	static sum<T>(node: BinaryTreeNode<T> | null, mapFunction: (data: T) => number): number {
		const stack = new Stack<BinaryTreeNode<T>>();
		let sum = 0;

		if (node !== null) stack.push(node);

		while (stack.isEmpty() === false) {
			const current = stack.pop() as BinaryTreeNode<T>;

			sum += mapFunction(current.data);

			if (current.right) stack.push(current.right);
			if (current.left) stack.push(current.left);
		}

		return sum;
	}

	static min<T>(node: BinaryTreeNode<T> | null, mapFunction: (data: T) => number): number {
		const stack = new Stack<BinaryTreeNode<T>>();
		let min = Infinity;

		if (node !== null) stack.push(node);

		while (stack.isEmpty() === false) {
			const current = stack.pop() as BinaryTreeNode<T>;

			min = Math.min(min, mapFunction(current.data));

			if (current.right) stack.push(current.right);
			if (current.left) stack.push(current.left);
		}

		return min;
	}

	static max<T>(node: BinaryTreeNode<T> | null, mapFunction: (data: T) => number): number {
		const stack = new Stack<BinaryTreeNode<T>>();
		let max = -Infinity;

		if (node !== null) stack.push(node);

		while (stack.isEmpty() === false) {
			const current = stack.pop() as BinaryTreeNode<T>;

			max = Math.max(max, mapFunction(current.data));

			if (current.right) stack.push(current.right);
			if (current.left) stack.push(current.left);
		}

		return max;
	}

	// Max path (max root to leaf sum)
	static maxPath<T>(node: BinaryTreeNode<T> | null, mapFunction: (data: T) => number): number {
		if (node === null) return 0;

		const left = this.maxPath(node.left, mapFunction);
		const right = this.maxPath(node.right, mapFunction);

		return mapFunction(node.data) + Math.max(left, right);
	}

	// All paths
	static allPaths<T>(node: BinaryTreeNode<T> | null, path: T[] = []): T[][] {
		if (node === null) return [path];

		path.push(node.data);

		if (node.left === null && node.right === null) return [path];

		const left = node.left ? BinaryTreeNode.allPaths(node.left, path.slice()) : [];
		const right = node.right ? BinaryTreeNode.allPaths(node.right, path.slice()) : [];

		return [...left, ...right];
	}

	static allLeaves<T>(node: BinaryTreeNode<T> | null): T[] {
		const leaves: T[] = [];

		const stack = new Stack<BinaryTreeNode<T>>();

		if (node !== null) stack.push(node);

		while (stack.isEmpty() === false) {
			const current = stack.pop() as BinaryTreeNode<T>;

			if (current.left === null && current.right === null) leaves.push(current.data);

			if (current.right) stack.push(current.right);
			if (current.left) stack.push(current.left);
		}

		return leaves;
	}

	static invert<T>(node: BinaryTreeNode<T> | null): BinaryTreeNode<T> | null {
		if (node === null) return node;

		const left = node.left;
		const right = node.right;

		node.left = BinaryTreeNode.invert(right);
		node.right = BinaryTreeNode.invert(left);

		return node;
	}
	//#endregion Static Methods

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return { data: this.data, left: this.left, right: this.right };
	}
	//#endregion Print
}
