import { LinkedListNode } from '../../../linear/linked-list/classes/node';

export class HashMap<K extends { toString(): string }, V> {
	private _size: number;
	private buckets: HashMap.Bucket<K, V>[];

	constructor(capacity: number = 16) {
		this.buckets = new Array(capacity).fill(null);
		this._size = 0;
	}

	// Returns the number of items in the hashmap.
	get size(): number {
		return this._size;
	}

	// Checks if the hashmap is empty.
	get isEmpty(): boolean {
		return this.size === 0;
	}

	// Adds a key-value pair to the hashmap.
	insert(key: K, value: V): void {
		const index = this.hash(key);
		let current = this.buckets[index];

		// If bucket is empty, populate it with new linked list
		if (current === null) {
			this.buckets[index] = new LinkedListNode({ key, value });
			this._size++;

			return;
		}

		// If bucket is already populated (collision)
		while (current) {
			if (current.data.key === key) {
				current.data.value = value;

				return;
			}

			if (current.next === null) break;

			current = current.next;
		}

		current.next = new LinkedListNode({ key, value });
		this._size++;
	}

	// Removes a key-value pair from the hashmap.
	delete(key: K): void {
		const index = this.hash(key);
		let current = this.buckets[index];

		if (current === null) return;

		let prev: HashMap.Bucket<K, V> = null;

		while (current) {
			if (current.data.key === key) {
				if (prev === null) {
					this.buckets[index] = current.next;
				} else {
					prev.next = current.next;
				}

				return;
			}

			prev = current;
			current = current.next;
		}
	}

	// Retrieves the value associated with a given key.
	get(key: K): V | null {
		const index = this.hash(key);
		let current = this.buckets[index];

		if (current === null) return null;

		while (current) {
			if (current.data.key === key) return current.data.value;

			current = current.next;
		}

		return null;
	}

	// Checks if a given key is present in the hashmap
	contains(key: K): boolean {
		return this.get(key) !== null;
	}

	// Hash Function that receives a key and returns a number (index of buckets)
	private hash(key: K): number {
		return (
			key
				.toString()
				.split('')
				.reduce((sum, current, index, array) => (sum += current.charCodeAt(0)), 0) % this.buckets.length
		);
	}

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.toJSON();
	}

	toJSON() {
		return this.buckets.map(bucket => {
			let current = bucket;

			if (current === null) return [];

			let result: { key: K; value: V }[] = [];

			while (current) {
				result.push(current.data);

				current = current?.next;
			}

			return result;
		});
	}

	toString() {
		return JSON.stringify(this.toJSON());
	}
	//#endregion Print
}

export namespace HashMap {
	export type Bucket<K extends { toString(): string }, V> = LinkedListNode<{ key: K; value: V }> | null;
}
