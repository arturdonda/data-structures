export class LinkedListNode<T> {
	data: T;
	next: LinkedListNode<T> | null;

	constructor(data: T) {
		this.data = data;
		this.next = null;
	}

	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.data;
	}
}

export class SinglyLinkedListNode<T> extends LinkedListNode<T> {}

export class DoublyLinkedListNode<T> {
	data: T;
	prev: DoublyLinkedListNode<T> | null;
	next: DoublyLinkedListNode<T> | null;

	constructor(data: T) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}

	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.data;
	}
}
