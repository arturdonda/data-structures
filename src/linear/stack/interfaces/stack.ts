export interface StackProtocol<T> {
	push: (item: T) => void;
	pop: () => T | undefined;
	peek: () => T | undefined;
	size: number;
	isEmpty: () => boolean;
}
