export class Heap<T> {
	private heap: T[];
	private lastIndex: number;
	private getPriorityFunction: Heap.GetPriorityFn<T>;
	private heapType: Heap.Type;

	constructor({ getPriorityFunction, heapType }: Heap.ConstructorParams<T>) {
		this.heap = [];
		this.lastIndex = -1;
		this.getPriorityFunction = getPriorityFunction;
		this.heapType = heapType ?? Heap.Type.max;
	}

	get size(): number {
		return this.lastIndex + 1;
	}

	isEmpty(): boolean {
		return this.lastIndex === -1;
	}

	peek(): T | null {
		if (this.isEmpty()) return null;

		return this.heap[0];
	}

	insert(data: T): Heap<T> {
		// Increments lastIndex
		this.lastIndex++;

		// Adds new item to the last position
		this.heap[this.lastIndex] = data;

		// Calls fixUpward method to sort and apply heap property from bottom to top (as the new element was inserted at the bottom)
		this.fixUpward();

		return this;
	}

	get(): T | null {
		if (this.isEmpty()) return null;

		// Get root
		const root = this.heap[0];

		// Swap root and last item
		this.swapPositions(0, this.lastIndex);

		// Remove last item (root) from heap
		this.lastIndex--;
		this.heap.length = this.lastIndex + 1;

		// Calls fixDownward method to sort and apply heap property from top to bottom (as the last element is now wrongly positioned at the root)
		this.fixDownward();

		return root;
	}

	// Fixes the heap property from bottom to top - used on insert method
	private fixUpward(): void {
		let currentIndex = this.lastIndex;

		while (currentIndex >= 0) {
			const parentIndex = Heap.getParentIndex(currentIndex);

			if (parentIndex < 0 || this.isHeapPropertyValid(parentIndex, currentIndex)) break;

			this.swapPositions(parentIndex, currentIndex);

			currentIndex = parentIndex;
		}
	}

	// Fixes the heap property from top to bottom - used on delete method
	private fixDownward(): void {
		if (this.isEmpty()) return;

		let currentIndex = 0;

		while (currentIndex <= this.lastIndex) {
			let leftChildIndex = Heap.getLeftChildIndex(currentIndex);
			let rightChildIndex = Heap.getRightChildIndex(currentIndex);

			// as rightChildIndex is bigger than leftChildIndex, if leftChildIndex is out of bound, then right child is out of bound as well
			if (leftChildIndex > this.lastIndex) break;

			const childToSwap =
				// if only right child is out of bound
				rightChildIndex > this.lastIndex
					? leftChildIndex // then use left child
					: // otherwise, if both children are in range, use the one with highest priority
					this.isHeapPropertyValid(leftChildIndex, rightChildIndex)
					? leftChildIndex
					: rightChildIndex;

			if (this.isHeapPropertyValid(currentIndex, childToSwap)) break;

			this.swapPositions(currentIndex, childToSwap);
			currentIndex = childToSwap;
		}
	}

	//#region Static Methods
	static heapify<T>(arr: T[]): Heap<T> {
		// Throws because each concrete class must implement it's own version.
		throw new Error('Not implemented yet!');
	}
	//#endregion Static Methods

	//#region Helpers
	private isHeapPropertyValid(firstIndex: number, secondIndex: number): boolean {
		if (this.heapType === Heap.Type.max) return this.getPriorityFunction(this.heap[firstIndex]) > this.getPriorityFunction(this.heap[secondIndex]);

		return this.getPriorityFunction(this.heap[firstIndex]) < this.getPriorityFunction(this.heap[secondIndex]);
	}

	private swapPositions(firstIndex: number, secondIndex: number) {
		const temp: T = this.heap[firstIndex];

		this.heap[firstIndex] = this.heap[secondIndex];
		this.heap[secondIndex] = temp;
	}

	private static getLeftChildIndex(index: number) {
		return 2 * index + 1;
	}

	private static getRightChildIndex(index: number) {
		return 2 * index + 2;
	}

	private static getParentIndex(index: number) {
		return Math.floor((index - 1) / 2);
	}
	//#endregion Helpers

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.heap;
	}
	//#endregion Print
}

export namespace Heap {
	export type ConstructorParams<T> = { getPriorityFunction: GetPriorityFn<T>; heapType?: Type };

	export type GetPriorityFn<T> = (data: T) => number;

	export enum Type {
		max = 'max',
		min = 'min',
	}
}
