import { HashMap } from './classes';

class User {
	private readonly _id: number;
	private readonly _name: string;

	constructor(params: { id: number; name: string }) {
		this._id = params.id;
		this._name = params.name;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.toJSON();
	}

	toJSON() {
		return { id: this.id, name: this.name };
	}

	toString() {
		return JSON.stringify(this.toJSON());
	}
	//#endregion Print
}

//#region Helper functions
function insert(user: User, hashMap: HashMap<number, User>) {
	console.log(`Inserting user ${user.name} (${user.id})...`);

	hashMap.insert(user.id, user);

	console.log(`User ${user.name} (${user.id}) inserted. Hashmap size is ${hashMap.size}`);
}

function print(hashMap: HashMap<number, User>) {
	console.log(`HashMap:`, JSON.stringify(hashMap, null, 2));
}

function getUser(id: User['id']) {
	console.log(`Get user ${id}: `, hashMap.get(id));
}

function containsUser(id: User['id']) {
	console.log(`Contains user ${id}: `, hashMap.contains(id));
}

function deleteUser(id: User['id']) {
	hashMap.delete(id);

	console.log(`User ${id} deleted`);
}
//#endregion Helper functions

const hashMap = new HashMap<number, User>();

console.log('Hashmap is empty:', hashMap.isEmpty);

insert(new User({ id: 0, name: 'User 0' }), hashMap);
insert(new User({ id: 1, name: 'User 1' }), hashMap);
insert(new User({ id: 2, name: 'User 02' }), hashMap);
insert(new User({ id: 10, name: 'User 10' }), hashMap);

print(hashMap);

insert(new User({ id: 2, name: 'User 2' }), hashMap);

print(hashMap);

console.log('Hashmap is empty:', hashMap.isEmpty);

getUser(10);
getUser(11);

containsUser(0);
containsUser(3);

deleteUser(0);

containsUser(0);

print(hashMap);
