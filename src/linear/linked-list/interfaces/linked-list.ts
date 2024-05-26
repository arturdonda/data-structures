export abstract class LinkedListProtocol<T> {
	abstract get size(): number;
	abstract insert: (data: T, position?: LinkedListProtocol.Position) => void;
	abstract delete: (position?: LinkedListProtocol.Position) => void;
	abstract find: (filterFunction: LinkedListProtocol.FilterFunction<T>) => T | undefined;
	abstract filter: (filterFunction: LinkedListProtocol.FilterFunction<T>) => LinkedListProtocol<T>;
	abstract map: <U>(mapFunction: LinkedListProtocol.MapFunction<T, U>) => LinkedListProtocol<U>;
}

export namespace LinkedListProtocol {
	export type Position = 'start' | 'end';
	export type FilterFunction<T> = (data: T) => boolean;
	export type MapFunction<T, U> = (data: T) => U;
}
