export abstract class HeapProtocol<T> {
	protected heap: T[];
	protected lastIndex: number;

	// Checks if the heap property is valid for given two elements
	protected abstract isHeapPropertyValid(firstIndex: number, secondIndex: number): boolean;

	constructor(protected readonly getPriorityFunction: (data: T) => number) {
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

	insert(data: T): HeapProtocol<T> {
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

		// Calls fixDownward method to sort and apply heap property from top to bottom (as the last element is now position at the root)
		this.fixDownward();

		return root;
	}

	// Fixes the heap property from bottom to top - used on insert method
	protected fixUpward(): void {
		let currentIndex = this.lastIndex;
		let parentIndex = this.getParentIndex(currentIndex);

		while (parentIndex >= 0 && !this.isHeapPropertyValid(parentIndex, currentIndex)) {
			this.swapPositions(parentIndex, currentIndex);

			currentIndex = parentIndex;
			parentIndex = this.getParentIndex(currentIndex);
		}
	}

	// Fixes the heap property from top to bottom - used on delete method
	protected fixDownward(): void {
		if (this.isEmpty()) return;

		let currentIndex = 0;

		while (currentIndex <= this.lastIndex) {
			let leftChildIndex = this.getLeftChildIndex(currentIndex);
			let rightChildIndex = this.getRightChildIndex(currentIndex);

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

	//#region Helpers
	// Swaps two elements
	protected swapPositions(firstIndex: number, secondIndex: number) {
		const temp: T = this.heap[firstIndex];

		this.heap[firstIndex] = this.heap[secondIndex];
		this.heap[secondIndex] = temp;
	}

	protected getLeftChildIndex(index: number) {
		return 2 * index + 1;
	}

	protected getRightChildIndex(index: number) {
		return 2 * index + 2;
	}

	protected getParentIndex(index: number) {
		return Math.floor((index - 1) / 2);
	}
	//#endregion Helpers

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.heap;
	}
	//#endregion Print
}
