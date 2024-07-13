import { MaxHeap, MinHeap } from './classes';
import { HeapProtocol } from './classes/heap-protocol';

function insert<T>(heap: HeapProtocol<T>, data: T) {
	heap.insert(data);

	console.log(`heap.insert(${data}):`, heap);
}

function get<T>(heap: HeapProtocol<T>) {
	console.log(`heap.get():`, heap.get());
	console.log(`Resulting heap:`, heap);
}

function testHeap(type: 'min' | 'max') {
	console.log(`----------     ${type.toUpperCase()} HEAP     ----------`);

	const heap = new (type === 'min' ? MinHeap : MaxHeap)<number>(x => x);

	insert(heap, 5);
	insert(heap, 2);
	insert(heap, 4);
	insert(heap, 8);
	insert(heap, 6);

	get(heap);
	get(heap);
	get(heap);
	get(heap);
	get(heap);
	get(heap);
}

testHeap('min');
