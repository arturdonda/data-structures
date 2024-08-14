// export * from './array/classes';
// export * from './linked-list/classes';
// export * from './queue/classes';
// export * from './stack/classes';

import { StaticArray as StaticArrayClass, DynamicArray as DynamicArrayClass } from './array/classes';
import { LinkedList as LinkedListClass } from './linked-list/classes';
import { Queue as QueueClass } from './queue/classes';
import { Stack as StackClass } from './stack/classes';

export namespace LinearDataStructures {
	export const StaticArray = StaticArrayClass;
	export const DynamicArray = DynamicArrayClass;
	export const LinkedList = LinkedListClass;
	export const Queue = QueueClass;
	export const Stack = StackClass;
}
