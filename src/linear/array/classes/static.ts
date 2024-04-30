import { ArrayProtocol } from '../interfaces/array';

export class StaticArray<T> implements ArrayProtocol<T> {
	private data: T[];

	constructor(private readonly size: number) {
		this.data = new Array<T>(size);
	}

	get length() {
		return this.data.length;
	}

	get(index: number) {
		if (index < 0) throw new Error(`Out of bound: index must be between 0 and ${this.size - 1}`);

		return this.data[index];
	}

	set(index: number, value: T) {
		if (index < 0 || index >= this.size) throw new Error(`Out of bound: index must be between 0 and ${this.size - 1}`);

		this.data[index] = value;
	}

	//#region Print
	toString() {
		return this.data.toString();
	}

	toJSON() {
		return this.data;
	}

	[Symbol.for('nodejs.util.inspect.custom')](depth: any, inspectOptions: any, inspect: any) {
		return this.data;
	}
	//#endregion Print

	//#region Iterator
	[Symbol.iterator]() {
		let index = 0;

		return {
			next: () => ({ done: index >= this.data.length, value: this.data[index++] }),
		};
	}
	//#endregion Iterator
}
