import { Graph } from './classes';

function printGraphData(title: string, graph: Graph) {
	console.log('\n', `-----   ${title}   -----`);
	console.log('# of nodes:', graph.nodesCount);
	console.log('# of edges:', graph.edgesCount);
	console.log('Is Empty:', graph.isEmpty);
	console.log('Graph:', graph);
}

const graph = new Graph();

graph.addNode('a');
graph.addNode('b');
graph.addNode('c');
graph.addNode('d');
graph.addNode('e');
graph.addNode('f');

graph.addEdge('a', 'b');
graph.addEdge('a', 'c');
graph.addEdge('b', 'c');
graph.addEdge('b', 'd');
graph.addEdge('c', 'f');
graph.addEdge('e', 'b');

/*
    Constructed Graph is:

    a   →   c   →   f
    ↓   ↗
    b   ←   e
    ↓
    d

    {
        a: [ 'b', 'c' ],
        b: [ 'c', 'd' ],
        c: [ 'f' ],
        d: [],
        e: [ 'b' ],
        f: []
    }
*/

printGraphData('INITIAL GRAPH', graph);

graph.removeEdge('c', 'f');
printGraphData('REMOVED EDGE (c, f)', graph);

graph.removeNode('b');
printGraphData('REMOVED NODE (b)', graph);

const adjacencyList = {
	a: ['b', 'c'],
	b: ['c', 'd'],
	c: ['f'],
	d: [],
	e: ['b'],
	f: [],
};

printGraphData('GRAPH FROM ADJACENCY LIST', Graph.fromAdjacencyList(adjacencyList));

const edgesList: [string, string][] = [
	['a', 'b'],
	['b', 'c'],
	['c', 'a'],
];

printGraphData('GRAPH FROM EDGES LIST', Graph.fromArrayOfEdges(edgesList));
