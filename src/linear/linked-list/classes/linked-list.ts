import { DoublyLinkedListNode } from './node';

export class LinkedList<T> {
	private head: DoublyLinkedListNode<T> | null = null;
	private tail: DoublyLinkedListNode<T> | null = null;
	private count: number = 0;

	constructor(...initialData: T[]) {
		initialData.forEach(data => this.insert(data));
	}

	get length(): number {
		return this.count;
	}

	// O(1) if head or tail and O(n) if elsewhere
	get(index: number): T | undefined {
		if (index < 0 || index > this.count - 1) return undefined;
		if (index === 0) return this.head!.data;
		if (index === this.count - 1) return this.tail!.data;

		let current = this.head;
		for (let i = 0; i < index; i++) {
			current = current!.next;
		}

		return current!.data;
	}

	// O(n)
	indexOf(filterFunction: LinkedList.FilterFunction<T>): number {
		let index = -1;

		for (let node = this.head; node !== null; node = node.next) {
			index++;

			if (filterFunction(node.data)) return index;
		}

		return -1;
	}

	// O(1) if head or tail and O(n) if elsewhere
	insert(data: T, index?: number): void {
		const node = new DoublyLinkedListNode(data);

		if (this.count === 0) {
			this.head = node;
			this.tail = node;
		} else {
			if (index === undefined || index >= this.count - 1) {
				this.tail!.next = node;
				node.prev = this.tail;
				this.tail = node;
			} else if (index <= 0) {
				node.next = this.head!;
				this.head!.prev = node;
				this.head = node;
			} else {
				let current = this.head;

				for (let i = 0; i < index - 1; i++) {
					current = current!.next;
				}

				const next = current!.next;

				current!.next = node;
				node.prev = current;

				node.next = next;
				next!.prev = node;
			}
		}

		this.count += 1;
	}

	// O(1) if head or tail and O(n) if elsewhere
	delete(position: LinkedList.Position = 'end'): void {
		if (this.count === 0) return;

		if (this.count === 1) {
			this.head = null;
			this.tail = null;
		} else {
			if (position === 'start') {
				this.head = this.head!.next;
			} else {
				this.tail!.prev!.next = null;

				this.tail = this.tail!.prev;
			}
		}

		this.count -= 1;
	}

	// O(n)
	find(filterFunction: LinkedList.FilterFunction<T>): T | undefined {
		if (this.count === 0) return;

		for (let node = this.head; node != null; node = node.next) {
			if (filterFunction(node.data)) return node.data;
		}
	}

	// O(n)
	filter(filterFunction: LinkedList.FilterFunction<T>): LinkedList<T> {
		const filteredLinkedList = new LinkedList<T>();

		for (let node = this.head; node != null; node = node.next) {
			if (!filterFunction(node.data)) continue;

			filteredLinkedList.insert(node.data);
		}

		return filteredLinkedList;
	}

	// O(n)
	map<U>(mapFunction: LinkedList.MapFunction<T, U>): LinkedList<U> {
		const mappedLinkedList = new LinkedList<U>();

		for (let node = this.head; node !== null; node = node.next) {
			mappedLinkedList.insert(mapFunction(node.data));
		}

		return mappedLinkedList;
	}

	//#region Util
	[Symbol.iterator]() {
		let current: DoublyLinkedListNode<T> | null = this.head;

		return {
			next: () => {
				const done = current === null;
				const value = current?.data as T;

				current = current?.next ?? null;

				return { done, value };
			},
		};
	}

	[Symbol.for('nodejs.util.inspect.custom')]() {
		const data: DoublyLinkedListNode<T>[] = [];

		for (let node = this.head; node !== null; node = node.next) {
			data.push(node);
		}

		return data;
	}
	//#endregion Util
}

export namespace LinkedList {
	export type Position = 'start' | 'end';
	export type FilterFunction<T> = (data: T) => boolean;
	export type MapFunction<T, U> = (data: T) => U;
}
