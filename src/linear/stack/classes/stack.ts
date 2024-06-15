import { LinkedList } from '../../linked-list/classes';
import { StackProtocol } from '../interfaces';

export class Stack<T> implements StackProtocol<T> {
	private readonly data: LinkedList<T>;

	constructor() {
		this.data = new LinkedList<T>();
	}

	push(item: T): void {
		this.data.insert(item);
	}

	pop(): T | undefined {
		const tail = this.peek();

		this.data.delete();

		return tail;
	}

	peek(): T | undefined {
		return this.data.get(this.data.length - 1);
	}

	get length(): number {
		return this.data.length;
	}

	isEmpty(): boolean {
		return this.length === 0;
	}
}
