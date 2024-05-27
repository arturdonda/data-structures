import { LinkedList } from '../../linked-list/classes';
import { QueueProtocol } from '../interfaces';

export class Queue<T> implements QueueProtocol<T> {
	private readonly data: LinkedList<T>;

	constructor() {
		this.data = new LinkedList<T>();
	}

	enqueue(item: T): void {
		this.data.insert(item, 'end');
	}

	dequeue(): T | undefined {
		const head = this.peek();

		this.data.delete('start');

		return head;
	}

	peek(): T | undefined {
		return this.data.peek('start');
	}

	get size(): number {
		return this.data.size;
	}

	isEmpty(): boolean {
		return this.size === 0;
	}
}
