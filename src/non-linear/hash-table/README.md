# Hash Table

A Hash Table (or Hash Map) is a data structure that implements an associative array, a structure that can map keys to values. It uses a **hash function** to compute an index into a fixed-size array, called **hash table**. Hash tables provide efficient insertion, deletion, and search operations.

## Characteristics

- **Key-Value Pair Storage**: Stores data in **key-value pairs** where each key is unique.
- **Hash Function**: Takes a key and returns an index into the hash table. The goal of a hash function is to distribute keys evenly across the hash table, minimizing collisions.
- **Collision Handling**: A hash collision occurs when two different keys map to the same index in a hash table. This can happen even with a good hash function, especially if the hash table is full or the keys are similar.

## Advantages

- **Fast Access**: Provides average-case constant time complexity for insertion, deletion, and lookup operations.
- **Efficient Use of Memory**: Can be more space-efficient than trees for large datasets.
- **Dynamic Size**: Can dynamically resize itself to maintain performance as the dataset grows.

## Disadvantages

- **Hash Collisions**: Collisions can degrade performance to O(n) in the worst case.
- **Memory Overhead**: Can use more memory than necessary due to the underlying array and potential empty slots.
- **Complexity of Hash Functions**: Requires a good hash function to ensure even distribution and minimize collisions.

## Common Operations

- **Insert**: Adds a key-value pair to the hash table.
- **Delete**: Removes a key-value pair from the hash table.
- **Get**: Retrieves the value associated with a given key.
- **Resize**: Dynamically resizes the hash table when the load factor reaches a certain threshold.
- **isEmpty**: Checks if the hash table is empty.
- **getSize**: Returns the number of key-value pairs in the hash table.

## Time Complexity

| Operation | Average | Worst Case |
| --------- | ------- | ---------- |
| Access    | O(1)    | O(n)       |
| Search    | O(1)    | O(n)       |
| Insertion | O(1)    | O(n)       |
| Deletion  | O(1)    | O(n)       |

## Use Cases

- **Database Indexing**: Used to index database tables, providing fast access to records.
- **Caches**: Employed in caching mechanisms to store and quickly retrieve frequently accessed data.
- **Symbol Tables**: Used in compilers and interpreters to manage variable and function symbol tables efficiently.
- **Associative Arrays**: Implemented in many programming languages to support associative array types (e.g., dictionaries in Python, objects in JavaScript).
- **Networking**: Used in routing and DNS resolution to map domain names to IP addresses.

## Considerations

- **Hash Function Quality**: The performance of a hash table heavily depends on the quality of the hash function. A poor hash function can lead to many collisions and degrade performance.
- **Load Factor**: Monitoring and maintaining an appropriate load factor (ratio of the number of elements to the number of buckets) is crucial to ensure performance. Typically, hash tables resize themselves when the load factor exceeds a certain threshold.
- **Memory Overhead**: While hash tables offer fast operations, they can also use more memory than other data structures due to the need to handle collisions and the overhead of storing keys.

Hash tables are highly efficient for key-value storage and retrieval, providing average-case constant time complexity for common operations. They are widely used in applications requiring fast access to data, such as database indexing, caching, and symbol table management. However, careful consideration must be given to the design of the hash function, collision handling strategy, and memory usage to fully leverage the benefits of hash tables.
