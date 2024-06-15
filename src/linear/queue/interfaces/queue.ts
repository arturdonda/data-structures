export interface QueueProtocol<T> {
	enqueue: (item: T) => void;
	dequeue: () => T | undefined;
	peek: () => T | undefined;
	length: number;
	isEmpty: () => boolean;
}
