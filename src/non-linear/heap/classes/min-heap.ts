import { Heap } from './heap';

export class MinHeap<T> extends Heap<T> {
	constructor(getPriorityFunction: Heap.ConstructorParams<T>['getPriorityFunction']) {
		super({ getPriorityFunction, heapType: Heap.Type.min });
	}
}
