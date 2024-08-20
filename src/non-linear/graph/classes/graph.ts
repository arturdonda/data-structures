export class Graph {
	readonly isWeighted: boolean;
	readonly isDirected: boolean;

	protected adjacencyList: Map<Graph.Key, Map<Graph.Key, number>>;

	constructor(params?: Graph.ConstructorParams) {
		this.isDirected = params?.directed === undefined ? true : params.directed;
		this.isWeighted = params?.weighted === undefined ? true : params.weighted;

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
	addNode(key: Graph.Key) {
		if (this.adjacencyList.has(key)) return;

		this.adjacencyList.set(key, new Map());
	}

	removeNode(key: Graph.Key) {
		this.adjacencyList.delete(key);

		this.adjacencyList.forEach(edges => edges.delete(key));
	}
	//#endregion Nodes

	//#region Edges
	addEdge(from: Graph.Key, to: Graph.Key, weight?: number): void {
		if (this.isWeighted && weight === undefined) throw new Error('Weight is required on a weighted Graph.');

		this.checkIfNodeExists(from);
		this.checkIfNodeExists(to);

		this.adjacencyList.get(from)!.set(to, this.isWeighted ? weight! : 1);

		if (this.isDirected) return;

		this.adjacencyList.get(to)!.set(from, this.isWeighted ? weight! : 1);
	}

	removeEdge(from: Graph.Key, to: Graph.Key) {
		this.checkIfNodeExists(from);
		this.checkIfNodeExists(to);

		this.adjacencyList.get(from)!.delete(to);

		if (this.isDirected) return;

		this.adjacencyList.get(to)!.delete(from);
	}
	//#endregion Edges

	get(key: Graph.Key) {
		const node = this.adjacencyList.get(key);

		if (node === undefined) return node;

		return [...node.entries()].map(([neighbourKey, neighbourWeight]) => ({ key: neighbourKey, weight: neighbourWeight }));
	}

	//#region Static Methods
	static fromAdjacencyList(adjacencyList: Record<Graph.Key, Graph.Key[]>): Graph;
	static fromAdjacencyList(adjacencyList: Record<Graph.Key, { key: Graph.Key; weight: number }[]>): Graph;
	static fromAdjacencyList(adjacencyList: Record<Graph.Key, (Graph.Key | { key: Graph.Key; weight: number })[]>) {
		console.log({
			values: Object.values(adjacencyList),
			find: Object.values(adjacencyList).find(x => x.length)?.[0],
			typeof: typeof Object.values(adjacencyList).find(x => x.length)?.[0],
			weighted: typeof Object.values(adjacencyList).find(x => x.length)?.[0] === 'object',
		});

		const graph = new Graph({ directed: true, weighted: typeof Object.values(adjacencyList).find(x => x.length)?.[0] === 'object' });

		for (const [key, neighbours] of Object.entries(adjacencyList)) {
			graph.addNode(key);

			for (const neighbour of neighbours) {
				if (typeof neighbour === 'object') {
					graph.addNode(neighbour.key);
					graph.addEdge(key, neighbour.key, neighbour.weight);
				} else {
					graph.addNode(neighbour);
					graph.addEdge(key, neighbour);
				}
			}
		}

		return graph;
	}

	static fromArrayOfEdges(arr: [Graph.Key, Graph.Key][]): Graph;
	static fromArrayOfEdges(arr: [Graph.Key, Graph.Key, number][]): Graph;
	static fromArrayOfEdges(arr: ([Graph.Key, Graph.Key] | [Graph.Key, Graph.Key, number])[]): Graph {
		const graph = new Graph({ directed: false, weighted: typeof arr[0][2] === 'number' });

		for (const [nodeA, nodeB, weight] of arr) {
			graph.addNode(nodeA);
			graph.addNode(nodeB);

			graph.addEdge(nodeA, nodeB, weight);
		}

		return graph;
	}
	//#endregion Static Methods

	protected checkIfNodeExists(key: Graph.Key) {
		if (this.adjacencyList.has(key)) return;

		throw new Error(`Node ${key} does not exist!`);
	}

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.toJSON();
	}

	toJSON(): object {
		const result: Record<Graph.Key, any[]> = {};

		this.adjacencyList.forEach((edges, key, adjacencyList) => {
			result[key] = this.get(key)!.map(x => (this.isWeighted ? x : x.key));
		});

		return result;
	}

	toString() {
		return JSON.stringify(this.toJSON());
	}
	//#endregion Print
}

export namespace Graph {
	export type ConstructorParams = { weighted?: boolean; directed?: boolean };
	export type Key = string | number;
}
