export class GenericTreeNode<T> {
	data: T;
	children: GenericTreeNode<T>[];

	constructor(data: T) {
		this.data = data;
		this.children = [];
	}

	addChild(child: GenericTreeNode<T>): void {
		this.children.push(child);
	}
}
