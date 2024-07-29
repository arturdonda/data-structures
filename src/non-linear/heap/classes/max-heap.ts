import { Heap } from './heap';

export class MaxHeap<T> extends Heap<T> {
	constructor(getPriorityFunction: Heap.GetPriorityFn<T>) {
		super(getPriorityFunction, Heap.Type.max);
	}

	static heapify<T>(arr: T[], getPriorityFunction: Heap.GetPriorityFn<T>): Heap<T> {
		return super.heapify(arr, getPriorityFunction, Heap.Type.max);
	}
}
