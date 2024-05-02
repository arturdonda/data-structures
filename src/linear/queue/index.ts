import { Queue } from './classes';

const messageQueue = new Queue<string>();

messageQueue.enqueue('Hello World!');
messageQueue.enqueue('Second message!');
messageQueue.enqueue('Last message!');

while (messageQueue.isEmpty() === false) {
	console.log('size: ', messageQueue.size);

	const message = messageQueue.dequeue();

	console.log('message: ', message);
}

console.log('-----------------------------------');
