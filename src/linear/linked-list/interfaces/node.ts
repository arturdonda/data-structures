export interface NodeProtocol<T> {
	data: T;
	next: NodeProtocol<T> | null;
	prev: NodeProtocol<T> | null;
}
