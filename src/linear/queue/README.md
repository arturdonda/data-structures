# Queue

A queue is a linear data structure that follows the **First In, First Out (FIFO)** principle, where elements are inserted at the rear (enqueue) and removed from the front (dequeue).

## Characteristics

- **Ordered Collection**: Elements in a queue are ordered based on when they were added, with the oldest element positioned at the front and the newest at the rear.
- **Dynamic Size**: Queues can grow or shrink dynamically as elements are added or removed.
- **Restricted Access**: Queues typically support operations like enqueue (addition) and dequeue (removal) but do not allow random access to elements in the middle.

## Advantages

- **FIFO Behavior**: Queues enforce FIFO behavior, making them suitable for scenarios where the order of processing matters.
- **Dynamic Size**: Queues can grow or shrink dynamically, accommodating varying numbers of elements.
- **Synchronization**: In concurrent programming, queues can be used for inter-thread communication, ensuring thread safety.

## Disadvantages

- **Limited Access**: Queues do not support random access to elements; only the front element can be accessed or removed at any given time.
- **Overhead**: Implementing certain queue operations, like dequeueing from the front, may involve shifting elements, leading to performance overhead.
- **No Priority**: Queues do not prioritize elements based on any criteria; they strictly follow the FIFO principle.

## Operations

- **Enqueue**: Adds an element to the rear of the queue.
- **Dequeue**: Removes and returns the element at the front of the queue.
- **Peek**: Returns the element at the front of the queue without removing it.
- **isEmpty**: Checks if the queue is empty.
- **getSize**: Returns the number of elements in the queue.

## Time Complexity

| Operation | Average | Worst Case |
| --------- | ------- | ---------- |
| Access    | O(n)    | O(n)       |
| Search    | O(n)    | O(n)       |
| Insert    | O(1)    | O(1)       |
| Delete    | O(1)    | O(1)       |

## Use Cases

- **Task Scheduling**: Queues are commonly used for task scheduling in operating systems, where tasks are executed based on their arrival time.
- **Message Queues**: Queues are used in messaging systems to store and deliver messages between components or systems in a distributed environment.
- **Resource Management**: Queues can be used for managing resources in systems with limited capacity, ensuring fair allocation and preventing resource starvation.

## Considerations

- **Concurrency**: In concurrent environments, proper synchronization mechanisms should be implemented to ensure thread safety when accessing and modifying queues.
- **Performance**: Depending on the implementation, certain queue operations like enqueue and dequeue may have different performance characteristics, and developers should choose the appropriate implementation based on their requirements.
- **Overflow and Underflow**: Care should be taken to handle situations where the queue becomes full (overflow) or empty (underflow) to prevent application crashes or undefined behavior.

Queues are versatile data structures commonly used for task scheduling, message queuing, and resource management. While they offer benefits such as FIFO behavior and dynamic size, developers should consider their limitations, such as limited access and potential performance overhead, when designing systems that use queues.
