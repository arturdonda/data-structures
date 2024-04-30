export interface ArrayProtocol<T> {
	length: number;
	get: (index: number) => T;
	set: (index: number, value: T) => void;
	[Symbol.iterator]: () => { next(): { value: T; done: boolean } };
}
