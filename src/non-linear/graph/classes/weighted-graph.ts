export class WeightedGraph {
	protected adjacencyList: Map<string, Map<string, number>>;

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

		this.adjacencyList.set(key, new Map());
	}

	removeNode(key: string) {
		this.adjacencyList.delete(key);

		this.adjacencyList.forEach(edges => edges.delete(key));
	}
	//#endregion Nodes

	//#region Edges
	addEdge(from: string, to: string, weight: number): void {
		this.checkIfNodeExists(from);
		this.checkIfNodeExists(to);

		this.adjacencyList.get(from)!.set(to, weight);
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

		return Array.from(node).map(([key, weight]) => ({ key, weight }));
	}

	//#region Static Methods
	static fromAdjacencyList(adjacencyList: Record<string, { key: string; weight: number }[]>): WeightedGraph {
		const weightedGraph = new WeightedGraph();

		for (const [key, neighbors] of Object.entries(adjacencyList)) {
			weightedGraph.addNode(key);

			for (const neighbor of neighbors) {
				weightedGraph.addNode(neighbor.key);
				weightedGraph.addEdge(key, neighbor.key, neighbor.weight);
			}
		}

		return weightedGraph;
	}

	static fromArrayOfEdges(arr: [string, string, number][]): WeightedGraph {
		const weightedGraph = new WeightedGraph();

		for (const [nodeA, nodeB, weight] of arr) {
			weightedGraph.addNode(nodeA);
			weightedGraph.addNode(nodeB);

			weightedGraph.addEdge(nodeA, nodeB, weight);
			weightedGraph.addEdge(nodeB, nodeA, weight);
		}

		return weightedGraph;
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
		const result: Record<string, any[]> = {};

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
