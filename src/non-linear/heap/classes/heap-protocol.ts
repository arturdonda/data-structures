export abstract class HeapProtocol<T> {
	protected heap: T[];
	protected lastIndex: number;

	/*
	Sorts the heap to make sure the heap property is still valid.
	It is abstract because it's implementation varies from a Max heap and a Min heap.
	*/
	protected abstract fixUpward(): void; // Fixes the heap property from bottom to top
	protected abstract fixDownward(): void; // Fixes the heap property from top to bottom

	constructor(protected readonly getPriorityFunction: (data: T) => number) {
		this.heap = [];
		this.lastIndex = -1;
	}

	isEmpty(): boolean {
		return this.lastIndex === -1;
	}

	insert(data: T): HeapProtocol<T> {
		// Adds new item to the last position
		this.lastIndex++;

		this.heap[this.lastIndex] = data;

		// Then calls abstract fixUpward method to sort and apply heap property
		this.fixUpward();

		return this;
	}

	get(): T | null {
		if (this.isEmpty()) return null;

		const root = this.heap[0];
		const lastItem = this.heap[this.lastIndex];

		this.heap[0] = lastItem;

		this.lastIndex--;
		this.heap.length = this.lastIndex + 1;

		this.fixDownward();

		return root;
	}

	protected swapPositions(firstIndex: number, secondIndex: number) {
		const temp: T = this.heap[firstIndex];

		this.heap[firstIndex] = this.heap[secondIndex];
		this.heap[secondIndex] = temp;
	}

	//#region Get relative nodes

	/*
	For a given heap node at index i:
		left child index = 2 * i + 1
		right child index = 2 * i + 2
		parent index = (i - 1) / 2
	*/

	protected getLeftChildIndex(index: number) {
		return 2 * index + 1;
	}

	protected getRightChildIndex(index: number) {
		return 2 * index + 2;
	}

	protected getParentIndex(index: number) {
		return Math.floor((index - 1) / 2);
	}
	//#endregion Get relative nodes

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.heap;
	}
	//#endregion Print
}
