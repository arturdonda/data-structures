import { Heap } from './classes';

function insert<T>(heap: Heap<T>, data: T) {
	heap.insert(data);

	console.log(`heap.insert(${data}):`, heap);
}

function get<T>(heap: Heap<T>) {
	console.log(`heap.get():`, heap.get());
	console.log(`Resulting heap:`, heap);
}

function testHeap(type: 'min' | 'max') {
	console.log(`----------     ${type.toUpperCase()} HEAP     ----------`);

	const heap = new Heap<number>(x => x, type);

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

testHeap('max');
