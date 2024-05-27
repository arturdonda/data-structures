import { LinkedList } from '../../linked-list/classes';
import { StackProtocol } from '../interfaces';

export class Stack<T> implements StackProtocol<T> {
	private readonly data: LinkedList<T>;

	constructor() {
		this.data = new LinkedList<T>();
	}

	push(item: T): void {
		this.data.insert(item, 'end');
	}

	pop(): T | undefined {
		const tail = this.data.peek('end');

		this.data.delete('end');

		return tail;
	}

	peek(): T | undefined {
		return this.data.peek('end');
	}

	get size(): number {
		return this.data.size;
	}

	isEmpty(): boolean {
		return this.size === 0;
	}
}
