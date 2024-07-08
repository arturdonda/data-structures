export class TrieTreeNode {
	readonly char: string;
	children: Record<string, TrieTreeNode | undefined>;
	isEndOfWord: boolean;

	constructor(char: string) {
		if (char.length !== 1) throw new Error('Invalid params: must be 1 character long');

		this.char = char;
		this.children = {};
		this.isEndOfWord = false;
	}

	private parseWord(word: string): string {
		return word
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase();
	}

	private search(word: string): TrieTreeNode | null {
		let current: TrieTreeNode = this;

		for (let letter of this.parseWord(word)) {
			if (current.children[letter] === undefined) return null;

			current = current.children[letter]!;
		}

		return current;
	}

	insert(word: string): void {
		let current: TrieTreeNode = this;

		for (let letter of this.parseWord(word)) {
			if (current.children[letter] === undefined) current.children[letter] = new TrieTreeNode(letter);

			current = current.children[letter]!;
		}

		current.isEndOfWord = true;
	}

	containsWord(word: string): boolean {
		const node = this.search(word);

		return node !== null && node.isEndOfWord;
	}

	containsPrefix(prefix: string): boolean {
		const node = this.search(prefix);

		return node !== null;
	}

	getWordsWithPrefix(prefix: string): string[] {
		const words: string[] = [];
		const node = this.search(prefix);

		if (node === null) return words;

		function addWords(node: TrieTreeNode, prefix: string, wordList: string[]): void {
			if (node.isEndOfWord) wordList.push(prefix);

			for (let child of Object.values(node.children) as TrieTreeNode[]) {
				addWords(child, prefix + child.char, wordList);
			}
		}

		addWords(node, this.parseWord(prefix), words);

		return words;
	}

	delete(word: string): void {
		const nodeList: TrieTreeNode[] = [];

		let current: TrieTreeNode = this;

		for (let letter of this.parseWord(word)) {
			if (current.children[letter] === undefined) break;

			current = current.children[letter]!;
			nodeList.push(current);
		}

		if (nodeList.length === this.parseWord(word).length) {
			nodeList[nodeList.length - 1].isEndOfWord = false; // remove endOfWord marker from word's last node

			// Iterate over nodeList backwads
			for (let i = nodeList.length - 1; i > 0; i--) {
				let current = nodeList[i];
				if (current.isEndOfWord) break; // do not remove node if it is another word!

				if (Object.values(current.children).length > 0) break; // do not remove node if it has children!

				delete nodeList[i - 1].children[current.char];
			}
		}
	}

	//#region Print
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return { char: this.char, isEndOfWord: this.isEndOfWord, children: Object.values(this.children) };
	}
	//#endregion Print
}
