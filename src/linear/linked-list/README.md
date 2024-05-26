# Linked List

A linked list is a linear data structure in which **elements are not stored at contiguous memory locations**. Each element points to the next element in the sequence, forming a chain-like structure.

## Characteristics

- **Chain of Nodes**: Linked lists consist of a collection of elements. Each element is called a **Node** and **has its own data and a pointer to the next element**.
- **Non-contiguous Memory Allocation**: Linked list elements don't need to be stored in contiguous memory locations, as each node points to the next one.
- **Head and Tail**: The first node of a linked list is called head, while the last one is called tail. Tail node points to NULL.

## Classification

- **Singly-linked list**: The simplest form of a linked list, in which each node points to the **next** one.
- **Doubly linked list**: Each node points to the **next** and to the **previous** node.
- **Circular linked list**: Its a **singly** linked list where **tail points to the head**.
- **Doubly circular linked list**: Its a **doubly** linked list where **tail points to the head**.

## Advantages

- **Dynamic Size**: Linked lists can adjust their size dynamically, making them suitable for scenarios where the number of elements is unknown or varies over time.
- **Efficient Insertion and Deletion**: Insertion and deletion operations are efficient in linked lists, especially when performed at the beginning or end of the list.
- **No Wasted Memory**: Linked lists allocate memory dynamically, minimizing wasted memory compared to arrays, where a fixed-size block is allocated regardless of the number of elements.

## Disadvantages

- **No Random Access**: Linked lists do not support random access to elements; accessing elements by index requires traversing the list from the beginning.
- **Extra Memory Overhead**: Linked lists require additional memory to store the pointers to the next elements, increasing memory overhead compared to arrays.
- **Less Cache-friendly**: Due to non-contiguous memory allocation, linked lists may result in more cache misses, impacting performance in some scenarios.

## Common Operations

- **Initialization**: A linked list can be initialized by creating a head node with a reference to the first node. Each subsequent node contains a value and a reference to the next node.
- **Insert**: Elements can be inserted at the head, tail, or at a specific position in the linked list.
- **Delete**: Elements can be deleted from the linked list by updating the reference of the previous node to point to the next node, effectively removing the current node from the list.
- **Search**: Linked lists can be searched for a specific element by starting from the head node and following the references to the next nodes until the desired element is found.
- **Update**: Elements in a linked list can be updated by modifying the value of a specific node.
- **Traverse**: The elements in a linked list can be traversed by starting from the head node and following the references to the next nodes until the end of the list is reached.
- **Reverse**: The linked list can be reversed by updating the references of each node so that they point to the previous node instead of the next node.

## Time Complexity

| Operation | Average | Worst Case |
| --------- | ------- | ---------- |
| Access    | O(n)    | O(n)       |
| Search    | O(n)    | O(n)       |
| Insertion | O(1)    | O(1)       |
| Deletion  | O(1)    | O(1)       |

## Use Cases

- **Dynamic Memory Allocation**: Linked lists are suitable for implementing dynamic memory allocation schemes, such as memory pools and garbage collection.
- **Implementation of Other Data Structures**: Linked lists are used as building blocks for implementing other data structures, such as **stacks**, **queues**, and **hash tables**.
- **Applications with Frequent Insertions and Deletions**: Linked lists are preferred in scenarios where frequent insertion and deletion operations are required, such as managing real-time data streams.
- **Image Viewer**: Linked lists are used in image viewer. The previous and next images are linked, and hence can be accessed by the previous and next buttons.
- **Music Player**: In a music playlist, songs are linked to the previous and next songs.

## Considerations

- **Traversal Overhead**: Traversing a linked list to access or modify elements may result in performance overhead, especially for large lists.
- **Memory Overhead**: Linked lists incur additional memory overhead due to the pointers associated with each element, which may impact memory utilization in memory-constrained environments.
- **Tail Pointer**: Some linked list implementations include a tail pointer for efficient insertion at the end of the list, which should be considered for performance-sensitive applications.

Linked lists are versatile data structures used in various scenarios due to their dynamic size and efficient insertion and deletion operations. While they offer benefits such as flexibility and efficient memory utilization, developers should consider their limitations, such as lack of random access and potential traversal overhead, when choosing the appropriate data structure for a specific application.
