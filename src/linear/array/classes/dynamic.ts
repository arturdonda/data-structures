import { ArrayProtocol } from '../interfaces/array';
import { StaticArray } from './static';

export class DynamicArray<T> implements ArrayProtocol<T> {
	private size = 4;
	private data: StaticArray<T>;

	constructor() {
		this.data = new StaticArray<T>(this.size);
	}

	get length() {
		return this.data.length;
	}

	get(index: number) {
		try {
			return this.data.get(index);
		} catch (error) {
			console.log('Trying to get out of bound item... Index = ', index);

			return undefined;
		}
	}

	insert(value: T, index?: number) {
		try {
			this.data.insert(value, index);
		} catch (error) {
			console.log('Static array size limit reached!');

			this.relocate();

			this.insert(value, index);
		}
	}

	delete(index: number) {
		return this.data.delete(index);
	}

	private relocate() {
		console.log('Relocating array...');

		this.size *= 2;

		const newData = new StaticArray<T>(this.size);

		for (const item of this.data) {
			newData.insert(item);
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

	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.data;
	}
	//#endregion Print

	//#region Iterator
	[Symbol.iterator]() {
		let index = 0;

		return {
			next: () => ({ done: index >= this.length, value: this.data.get(index++) }),
		};
	}
	//#endregion Iterator
}
