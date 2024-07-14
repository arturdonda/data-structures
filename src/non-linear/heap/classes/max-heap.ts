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

			// as rightChildIndex is bigger than leftChildIndex, if leftChildIndex is out of bound, then right child is out of bound as well
			if (leftChildIndex > this.lastIndex) break;

			const childToSwap =
				rightChildIndex > this.lastIndex
					? leftChildIndex // if only right child is out of bound, use left child
					: // otherwise if both children are in range, use the one with biggest priority
					this.getPriorityFunction(this.heap[leftChildIndex]) > this.getPriorityFunction(this.heap[rightChildIndex])
					? leftChildIndex
					: rightChildIndex;

			if (this.getPriorityFunction(this.heap[currentIndex]) > this.getPriorityFunction(this.heap[childToSwap])) break;

			this.swapPositions(currentIndex, childToSwap);
			currentIndex = childToSwap;
		}
	}
}
