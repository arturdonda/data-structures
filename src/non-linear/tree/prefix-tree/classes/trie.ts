import { TrieTreeNode } from './trie-node';

export class TrieTree {
	private root: TrieTreeNode;

	constructor() {
		this.root = new TrieTreeNode(' ');
	}

	insert(word: string): TrieTree {
		this.root.insert(word);

		return this;
	}

	containsWord(word: string): boolean {
		return this.root.containsWord(word);
	}

	containsPrefix(prefix: string): boolean {
		return this.root.containsPrefix(prefix);
	}

	getWordsWithPrefix(prefix: string): string[] {
		return this.root.getWordsWithPrefix(prefix);
	}

	delete(word: string): void {
		return this.root.delete(word);
	}
}
