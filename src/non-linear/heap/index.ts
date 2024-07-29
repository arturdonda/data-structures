import { Heap } from './classes';

function testHeap(heapType: Heap.Type, initialData?: number[]) {
	console.log('\n', `----------     ${heapType.toUpperCase()} HEAP${initialData ? 'IFY' : ''}     ----------`, '\n');

	const heap = (function createHeap() {
		if (initialData) {
			console.log('Initial Data = ', initialData, '\n');

			return Heap.heapify(initialData, n => n, heapType);
		}

		const heap = new Heap<number>(n => n, heapType);

		for (let i = 0; i < 5; i++) {
			const value = Math.floor(Math.random() * 100);

			heap.insert(value);

			console.log(`heap.insert(${value})`, ' | Heap = ', heap);
		}

		return heap;
	})();

	while (heap.isEmpty === false) {
		const value = heap.get();
		console.log('heap.get() = ', value, ' | Heap = ', heap);
	}
}

const generateArray = (length: number) => Array.from({ length }, () => Math.floor(Math.random() * 100));

testHeap(Heap.Type.max);
testHeap(Heap.Type.min);
testHeap(Heap.Type.max, generateArray(5));
testHeap(Heap.Type.min, generateArray(5));
