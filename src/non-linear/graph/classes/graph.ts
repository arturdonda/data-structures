export class Graph {
	protected adjacencyList: Map<string, Set<string>>;

	constructor() {
		this.adjacencyList = new Map();
	}

	get isEmpty() {
		return this.nodesCount === 0;
	}

	get nodesCount() {
		return this.adjacencyList.size;
	}

	get edgesCount() {
		let result = 0;

		this.adjacencyList.forEach(edges => {
			result += edges.size;
		});

		return result;
	}

	//#region Nodes
	addNode(key: string) {
		if (this.adjacencyList.has(key)) return;

		this.adjacencyList.set(key, new Set());
	}

	removeNode(key: string) {
		this.adjacencyList.delete(key);

		this.adjacencyList.forEach(edges => edges.delete(key));
	}
	//#endregion Nodes

	//#region Edges
	addEdge(from: string, to: string): void {
		this.checkIfNodeExists(from);
		this.checkIfNodeExists(to);

		this.adjacencyList.get(from)!.add(to);
	}

	removeEdge(from: string, to: string) {
		this.checkIfNodeExists(from);
		this.checkIfNodeExists(to);

		this.adjacencyList.get(from)!.delete(to);
	}
	//#endregion Edges

	get(key: string) {
		const node = this.adjacencyList.get(key);

		if (node === undefined) return node;

		return Array.from(node);
	}

	//#region Static Methods
	static fromAdjacencyList(adjacencyList: Record<string, string[]>): Graph {
		const graph = new Graph();

		for (const [key, neighbors] of Object.entries(adjacencyList)) {
			graph.addNode(key);

			for (const neighbor of neighbors) {
				graph.addNode(neighbor);
				graph.addEdge(key, neighbor);
			}
		}

		return graph;
	}

	static fromArrayOfEdges(arr: [string, string][]): Graph {
		const graph = new Graph();

		for (const [nodeA, nodeB] of arr) {
			graph.addNode(nodeA);
			graph.addNode(nodeB);

			graph.addEdge(nodeA, nodeB);
			graph.addEdge(nodeB, nodeA);
		}

		return graph;
	}
	//#endregion Static Methods

	protected checkIfNodeExists(key: string) {
		if (this.adjacencyList.has(key)) return;

		throw new Error(`Node ${key} does not exist!`);
	}

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.toJSON();
	}

	toJSON(): object {
		const result: Record<string, string[]> = {};

		this.adjacencyList.forEach((edges, key, adjacencyList) => {
			result[key] = this.get(key)!;
		});

		return result;
	}

	toString() {
		return JSON.stringify(this.toJSON());
	}
	//#endregion Print
}
