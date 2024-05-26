import { NodeProtocol } from '../interfaces';

export class LinkedNode<T> implements NodeProtocol<T> {
	data: T;
	next: NodeProtocol<T> | null;
	prev: NodeProtocol<T> | null;

	constructor(data: T) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}
