import { ArrayProtocol } from '../interfaces/array';
import { StaticArray } from './static';

export class DynamicArray<T> implements ArrayProtocol<T> {
	private data: StaticArray<T>;

	constructor(private size: number = 4) {
		this.data = new StaticArray<T>(this.size);
	}

	get length() {
		return [...this.data].filter(x => typeof x !== 'undefined').length;
	}

	get(index: number) {
		return this.data.get(index);
	}

	set(index: number, value: T) {
		try {
			this.data.set(index, value);
		} catch (error) {
			console.log('Static array size limit reached!');

			this.relocate();

			this.set(index, value);
		}
	}

	private relocate() {
		console.log('Relocating array...');

		this.size *= 2;

		const newData = new StaticArray<T>(this.size);

		for (let i = 0; i < this.data.length; i++) {
			newData.set(i, this.data.get(i));
		}

		this.data = newData;

		console.log('Array relocated!');
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
			next: () => ({ done: index >= this.data.length, value: this.data.get(index++) }),
		};
	}
	//#endregion Iterator
}
