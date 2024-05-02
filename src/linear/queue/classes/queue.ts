import { QueueProtocol } from '../interfaces';

export class Queue<T> implements QueueProtocol<T> {
	private readonly data: T[];

	constructor() {
		this.data = [];
	}

	enqueue(item: T): void {
		this.data.push(item);
	}

	dequeue(): T | undefined {
		return this.data.shift();
	}

	peek(): T | undefined {
		return this.data[0];
	}

	get size(): number {
		return this.data.length;
	}

	isEmpty(): boolean {
		return this.size === 0;
	}
}
