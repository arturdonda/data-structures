export interface ArrayProtocol<T> {
	length: number;
	get: (index: number) => T | undefined;
	insert: (value: T, index?: number) => void;
	delete: (index: number) => void;
	[Symbol.iterator]: () => { next(): { value: T; done: boolean } };
}
