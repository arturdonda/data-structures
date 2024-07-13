import { HeapProtocol } from './heap-protocol';

export class MaxHeap<T> extends HeapProtocol<T> {
	protected fixUpward(): void {
		let currentIndex = this.lastIndex;
		let parentIndex = this.getParentIndex(currentIndex);

		while (parentIndex >= 0 && this.getPriorityFunction(this.heap[currentIndex]) > this.getPriorityFunction(this.heap[parentIndex])) {
			this.swapPositions(currentIndex, parentIndex);

			currentIndex = parentIndex;
			parentIndex = this.getParentIndex(currentIndex);
		}
	}

	protected fixDownward(): void {
		if (this.isEmpty()) return;

		let currentIndex = 0;

		while (currentIndex <= this.lastIndex) {
			let leftChildIndex = this.getLeftChildIndex(currentIndex);
			let rightChildIndex = this.getRightChildIndex(currentIndex);

			if (leftChildIndex > this.lastIndex) break; // as rightChildIndex is bigger than leftChildIndex, if leftChildIndex is out of bound, then right child is as well

			const childToSwap =
				rightChildIndex > this.lastIndex
					? leftChildIndex // if right child is out of boun, use left child
					: // otherwise if both children are in range, use the one with biggest value
					this.getPriorityFunction(this.heap[leftChildIndex]) > this.getPriorityFunction(this.heap[rightChildIndex])
					? leftChildIndex
					: rightChildIndex;

			if (this.getPriorityFunction(this.heap[currentIndex]) > this.getPriorityFunction(this.heap[childToSwap])) break;

			this.swapPositions(currentIndex, childToSwap);
			currentIndex = childToSwap;
		}
	}
}
