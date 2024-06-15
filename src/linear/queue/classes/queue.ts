import { LinkedList } from '../../linked-list/classes';
import { QueueProtocol } from '../interfaces';

export class Queue<T> implements QueueProtocol<T> {
	private readonly data: LinkedList<T>;

	constructor() {
		this.data = new LinkedList<T>();
	}

	enqueue(item: T): void {
		this.data.insert(item);
	}

	dequeue(): T | undefined {
		const head = this.peek();

		this.data.delete(0);

		return head;
	}

	peek(): T | undefined {
		return this.data.get(0);
	}

	get length(): number {
		return this.data.length;
	}

	isEmpty(): boolean {
		return this.length === 0;
	}
}
