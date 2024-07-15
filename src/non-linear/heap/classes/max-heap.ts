import { HeapProtocol } from './heap-protocol';

export class MaxHeap<T> extends HeapProtocol<T> {
	protected isHeapPropertyValid(firstIndex: number, secondIndex: number): boolean {
		return this.getPriorityFunction(this.heap[firstIndex]) > this.getPriorityFunction(this.heap[secondIndex]);
	}
}
