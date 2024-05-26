import { LinkedListProtocol, NodeProtocol } from '../interfaces';
import { LinkedNode } from './node';

export class LinkedList<T> implements LinkedListProtocol<T> {
	private head: NodeProtocol<T> | null = null;
	private tail: NodeProtocol<T> | null = null;
	private length: number = 0;

	constructor(...initialData: T[]) {
		initialData.forEach(data => this.insert(data, 'end'));
	}

	get size(): number {
		return this.length;
	}

	insert(data: T, position: LinkedListProtocol.Position = 'end'): void {
		const newNode = new LinkedNode(data);

		if (this.length === 0) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			if (position === 'start') {
				newNode.next = this.head;
				this.head!.prev = newNode;

				this.head = newNode;
			} else {
				newNode.prev = this.tail;
				this.tail!.next = newNode;

				this.tail = newNode;
			}
		}

		this.length += 1;
	}

	delete(position: LinkedListProtocol.Position = 'end'): void {
		if (this.length === 0) return;

		if (this.length === 1) {
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

		this.length -= 1;
	}

	find(filterFunction: LinkedListProtocol.FilterFunction<T>): T | undefined {
		if (this.length === 0) return;

		for (let node = this.head; node != null; node = node.next) {
			if (filterFunction(node.data)) return node.data;
		}
	}

	filter(filterFunction: LinkedListProtocol.FilterFunction<T>): LinkedListProtocol<T> {
		if (this.length === 0) return this;

		for (let node = this.head; node != null; node = node.next) {
			if (filterFunction(node.data)) continue;

			if (node.prev) {
				node.prev.next = node.next;
			}

			if (node.next) {
				node.next.prev = node.prev;
			}

			this.length -= 1;
		}

		return this;
	}

	map<U>(mapFunction: LinkedListProtocol.MapFunction<T, U>): LinkedListProtocol<U> {
		const mappedLinkedList = new LinkedList<U>();

		if (this.length > 0) {
			for (let node = this.head; node !== null; node = node.next) {
				mappedLinkedList.insert(mapFunction(node.data));
			}
		}

		return mappedLinkedList;
	}

	//#region Util
	[Symbol.iterator]() {
		let current: NodeProtocol<T> | null = this.head;

		return {
			next: () => {
				const done = current === null;
				const value = current?.data as T;

				current = current?.next ?? null;

				return { done, value };
			},
		};
	}

	[Symbol.for('nodejs.util.inspect.custom')](depth: any, inspectOptions: any, inspect: any) {
		return this.toString();
	}

	private toString() {
		function stringifyData({ data }: NodeProtocol<T>) {
			return typeof data === 'object' ? JSON.stringify(data) : `${data}`;
		}

		const result: string[] = [];

		let current: NodeProtocol<T> | null = this.head;

		while (current !== null) {
			result.push(stringifyData(current));
			current = current.next;
		}

		return result.join();
	}
	//#endregion Util
}
