import { Heap } from './heap';

export class MinHeap<T> extends Heap<T> {
	constructor(getPriorityFunction: Heap.GetPriorityFn<T>) {
		super(getPriorityFunction, Heap.Type.min);
	}

	static heapify<T>(arr: T[], getPriorityFunction: Heap.GetPriorityFn<T>): Heap<T> {
		return super.heapify(arr, getPriorityFunction, Heap.Type.min);
	}
}
