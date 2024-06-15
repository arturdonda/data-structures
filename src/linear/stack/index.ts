import { Stack } from './classes';

const messageStack = new Stack<string>();

messageStack.push('Hello World!');
messageStack.push('Second message!');
messageStack.push('Last message!');

while (messageStack.isEmpty() === false) {
	console.log('length: ', messageStack.length);

	const message = messageStack.pop();

	console.log('message: ', message);
}

console.log('-----------------------------------');
