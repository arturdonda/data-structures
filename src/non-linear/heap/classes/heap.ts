export class Heap<T> {
	protected heap: T[];
	protected lastIndex: number;

	constructor(protected readonly getPriorityFunction: (data: T) => number, protected readonly heapType: 'max' | 'min' = 'max') {
		this.heap = [];
		this.lastIndex = -1;
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
		this.fixUpward(this.lastIndex);

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
	protected fixUpward(lastIndex: number): void {
		let currentIndex = lastIndex;
		let parentIndex = Heap.getParentIndex(currentIndex);

		while (parentIndex >= 0 && !this.isHeapPropertyValid(parentIndex, currentIndex)) {
			this.swapPositions(parentIndex, currentIndex);

			currentIndex = parentIndex;
			parentIndex = Heap.getParentIndex(currentIndex);
		}
	}

	// Fixes the heap property from top to bottom - used on delete method
	protected fixDownward(): void {
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
	protected isHeapPropertyValid(firstIndex: number, secondIndex: number): boolean {
		if (this.heapType === 'max') return this.getPriorityFunction(this.heap[firstIndex]) > this.getPriorityFunction(this.heap[secondIndex]);

		return this.getPriorityFunction(this.heap[firstIndex]) < this.getPriorityFunction(this.heap[secondIndex]);
	}

	protected swapPositions(firstIndex: number, secondIndex: number) {
		const temp: T = this.heap[firstIndex];

		this.heap[firstIndex] = this.heap[secondIndex];
		this.heap[secondIndex] = temp;
	}

	protected static getLeftChildIndex(index: number) {
		return 2 * index + 1;
	}

	protected static getRightChildIndex(index: number) {
		return 2 * index + 2;
	}

	protected static getParentIndex(index: number) {
		return Math.floor((index - 1) / 2);
	}
	//#endregion Helpers

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.heap;
	}
	//#endregion Print
}
