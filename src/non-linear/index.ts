import { HashMap as HashMapClass } from './hash-table/classes';
import { Heap as HeapClass, MaxHeap as MaxHeapClass, MinHeap as MinHeapClass } from './heap/classes';
import { BinaryTreeNode as BinaryTreeNodeClass } from './tree/binary-tree/classes';
import { BinarySearchTree as BinarySearchTreeClass } from './tree/binary-search-tree/classes';
import { AvlTree as AvlTreeClass } from './tree/avl-tree/classes';
import { TrieTree as TrieTreeClass } from './tree/prefix-tree/classes';

export namespace NonLinearDataStructures {
	export const HashMap = HashMapClass;
	export const Heap = HeapClass;
	export const MaxHeap = MaxHeapClass;
	export const MinHeap = MinHeapClass;
	export const BinaryTreeNode = BinaryTreeNodeClass;
	export const BinarySearchTree = BinarySearchTreeClass;
	export const AvlTree = AvlTreeClass;
	export const TrieTree = TrieTreeClass;
}
