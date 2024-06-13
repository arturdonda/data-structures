import { ArrayProtocol } from './interfaces';
import { DynamicArray, StaticArray } from './classes';

// As a high level language, Javascript handles array relocation when necessary, exposing only dynamic arrays to its users.
// Therefore, I decided to simulate it by creating a "StaticArray" class.
// Then, I decided to implement a dynamic array, based on the static array class previously created.

// Here is a test function to simulate both static and dynamic arrays:
function testArray(array: ArrayProtocol<number>, size: number = 10) {
	for (let i = 0; i < size; i++) {
		try {
			const value = (i + 1) * 10;

			console.log(`Setting item ${i} = ${value}`);

			array.insert((i + 1) * 10);
		} catch (error: any) {
			console.log(`Error setting item ${i}:`, error?.message);
		}
	}

	console.log({ array, length: array.length });
}

console.log('----------------------------------------------------');
console.log('------------------- STATIC ARRAY -------------------');
console.log('----------------------------------------------------');
testArray(new StaticArray<number>(3));

console.log('----------------------------------------------------');
console.log('------------------ DYNAMIC ARRAY -------------------');
console.log('----------------------------------------------------');
testArray(new DynamicArray<number>());
