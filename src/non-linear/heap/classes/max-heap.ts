import { Heap } from './heap';

export class MaxHeap<T> extends Heap<T> {
	constructor(getPriorityFunction: Heap.ConstructorParams<T>['getPriorityFunction']) {
		super({ getPriorityFunction, heapType: Heap.Type.max });
	}
}
