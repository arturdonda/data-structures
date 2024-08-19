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
			result[key] = this.isWeighted ? [...edges.entries()].map(([key, weight]) => ({ key, weight })) : [...edges.keys()];
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
