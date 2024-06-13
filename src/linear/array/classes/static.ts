import { ArrayProtocol } from '../interfaces/array';

export class StaticArray<T> implements ArrayProtocol<T> {
	private data: T[];

	constructor(private readonly size: number) {
		this.data = new Array<T>();
	}

	get length() {
		return this.data.length;
	}

	get(index: number) {
		this.validateIndex(index);

		return this.data[index];
	}

	insert(value: T, index: number = this.length) {
		if (this.length >= this.size) throw new Error('Overflow: array is full');

		this.validateIndex(index);

		this.data[index] = value;
	}

	delete(index: number) {
		this.validateIndex(index);

		this.data.splice(index, 1);
	}

	//#region Validation
	private validateIndex(index: number) {
		if (index >= 0 && index < this.size) return;

		throw new Error(`Out of Bound: index must be between 0 and ${this.size - 1}`);
	}
	//#endregion Validation

	//#region Print
	toString() {
		return this.data.toString();
	}

	toJSON() {
		return this.data;
	}

	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.data;
	}
	//#endregion Print

	//#region Iterator
	[Symbol.iterator]() {
		let index = 0;

		return {
			next: () => ({ done: index >= this.length, value: this.data[index++] }),
		};
	}
	//#endregion Iterator
}
