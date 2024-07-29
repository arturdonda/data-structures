export class Heap<T> {
	private heap: T[];
	private getPriorityFunction: Heap.GetPriorityFn<T>;
	private heapType: Heap.Type;

	constructor(getPriorityFunction: Heap.GetPriorityFn<T>, heapType: Heap.Type = Heap.Type.max) {
		this.heap = [];
		this.getPriorityFunction = getPriorityFunction;
		this.heapType = heapType;
	}

	get size(): number {
		return this.heap.length;
	}

	get isEmpty(): boolean {
		return this.heap.length === 0;
	}

	peek(): T | null {
		if (this.isEmpty) return null;

		return this.heap[0];
	}

	insert(data: T): Heap<T> {
		// Adds new item to the last position
		this.heap.push(data);

		// Calls heapifyUp method to sort and apply heap property from bottom to top (as the new element was inserted at the bottom)
		this.heapifyUp();

		return this;
	}

	get(): T | null {
		if (this.isEmpty) return null;

		// Swap root and last item
		this.swapPositions(0, this.lastIndex);

		// Remove last item (root) from heap
		const root = this.heap.pop()!;

		// Calls heapifyDown method to sort and apply heap property from top to bottom (as the last element is now wrongly positioned at the root)
		this.heapifyDown();

		return root;
	}

	static heapify<T>(arr: T[], getPriorityFunction: Heap.GetPriorityFn<T>, heapType?: Heap.Type): Heap<T> {
		const heap = new Heap<T>(getPriorityFunction, heapType);
		heap.heap = arr;

		for (let index = Heap.getParentIndex(heap.lastIndex); index >= 0; index--) {
			heap.heapifyDown(index);
		}

		return heap;
	}

	//#region Helpers
	private get lastIndex() {
		return this.heap.length - 1;
	}

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

	// Fixes the heap property from bottom to top - used on insert method
	private heapifyUp(): void {
		let currentIndex = this.lastIndex;

		while (currentIndex >= 0) {
			const parentIndex = Heap.getParentIndex(currentIndex);

			if (parentIndex < 0 || this.isHeapPropertyValid(parentIndex, currentIndex)) break;

			this.swapPositions(parentIndex, currentIndex);

			currentIndex = parentIndex;
		}
	}

	// Fixes the heap property from top to bottom - used on delete method and on heapSort algorithm (static heapify)
	private heapifyDown(currentIndex: number = 0): void {
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
	//#endregion Helpers

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.heap;
	}
	//#endregion Print
}

export namespace Heap {
	export type GetPriorityFn<T> = (data: T) => number;

	export enum Type {
		max = 'max',
		min = 'min',
	}
}
