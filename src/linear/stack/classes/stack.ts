import { StackProtocol } from '../interfaces';

export class Stack<T> implements StackProtocol<T> {
	private readonly data: T[];

	constructor() {
		this.data = [];
	}

	push(item: T): void {
		this.data.push(item);
	}

	pop(): T | undefined {
		return this.data.pop();
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
