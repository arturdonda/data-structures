import { Graph } from './classes';

const graph = new Graph({ weighted: false });

function printGraphData(title: string, graph: Graph) {
	console.log('\n', `-----   ${title}   -----`);
	console.log('# of nodes:', graph.nodesCount);
	console.log('# of edges:', graph.edgesCount);
	console.log('Is Empty:', graph.isEmpty);
	console.log('Graph:', graph);
}

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

printGraphData('INITIAL GRAPH', graph);

graph.removeEdge('c', 'f');
printGraphData('REMOVED EDGE (c, f)', graph);

graph.removeNode('b');
printGraphData('REMOVED NODE (b)', graph);
