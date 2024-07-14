# Heap

A Heap is a **complete binary tree data structure that satisfies the heap property**: in a max heap, for any given node, the value of the node is greater than or equal to the values of its children, ensuring that the largest value is at the root. Conversely, in a min heap, the value of the node is less than or equal to the values of its children, ensuring that the smallest value is at the root. Heaps are commonly used to implement **priority queues**.

## Characteristics

- **Complete Binary Tree**: Heaps are typically implemented as complete binary trees, meaning all levels are fully filled except possibly for the last level, which is filled from left to right.
- **Heap Property**: In a max heap, the parent node's value is greater than or equal to its children's values. In a min heap, the parent node's value is less than or equal to its children's values.
- **Array Representation**: Heaps are often implemented using arrays, where the parent-child relationship can be easily calculated using index arithmetic: for a given parent node at index i, the left child is located at index 2\*i + 1, and the right child is located at index 2\*i + 2.

## Advantages

- **Efficient Priority Queue Operations**: Heaps provide efficient implementations of priority queues, supporting quick access to the highest (max heap) or lowest (min heap) priority element.
- **Fast Insertion and Deletion**: Insertions and deletions are efficient, with a time complexity of O(log n), making heaps suitable for dynamic datasets.
- **Space Efficient**: Heaps do not require additional pointers, making them space efficient when implemented as arrays.

## Disadvantages

- **Not Suitable for Search**: Heaps are **not optimized for searching arbitrary elements**, as they do not maintain a sorted order beyond the heap property.
- **Balancing Overhead**: Maintaining the heap property during insertions and deletions requires balancing operations, which can add complexity.
- **Fixed Structure**: The complete binary tree structure can be restrictive for certain applications where more flexible tree structures are needed.

## Common Operations

- **Insert**: Adds a new element to the heap while maintaining the heap property.
- **Get**: Retrieves and removes the root element (max or min) from the heap and rebalances it to maintain the heap property.
- **Peek**: Retrieves, but does not remove, the root element (max or min) of the heap.
- **Heapify**: Converts an arbitrary array into a heap by adjusting the elements to satisfy the heap property.
- **isEmpty**: Checks if the heap is empty.
- **getSize**: Returns the number of elements in the heap.

## Time Complexity

| Operation | Average  | Worst Case |
| --------- | -------- | ---------- |
| Access    | O(1)     | O(1)       |
| Search    | O(n)     | O(n)       |
| Insertion | O(log n) | O(log n)   |
| Deletion  | O(log n) | O(log n)   |

## Use Cases

- **Priority Queues**: Used to implement priority queues, where elements are processed based on priority.
- **Heap Sort**: An efficient sorting algorithm that leverages the heap structure to sort elements in O(n log n) time.
- **Graph Algorithms**: Used in algorithms like Dijkstra's shortest path and Prim's minimum spanning tree for efficient vertex and edge selection.
- **Event Simulation**: Employed in discrete event simulation systems to manage events in a priority order.
- **Memory Management**: Utilized in memory management systems for efficient allocation and deallocation of memory blocks.

## Considerations

- **Array vs. Tree Implementation**: Heaps are typically implemented as arrays for space efficiency, but tree-based implementations can be used for more flexible structures.
- **Balancing Overhead**: While balancing is necessary to maintain the heap property, it can add overhead, especially in highly dynamic datasets.
- **Not for Arbitrary Search**: Heaps are not suitable for applications requiring frequent arbitrary element searches, as they do not maintain a fully sorted order.

Heaps are powerful data structures for managing dynamic sets of elements with a priority order. They provide efficient implementations of priority queues, support fast insertion and deletion operations, and are used in various applications, including sorting, graph algorithms, and memory management. However, their use is best suited for scenarios where the primary operations involve accessing the highest or lowest priority element, rather than arbitrary searches.
