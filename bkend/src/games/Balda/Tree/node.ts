
export class Node {
	private _next: Record<string, Node> = {}
	readonly parent: Node|null
	isWord: boolean

	constructor (parent: Node|null) {
		this.parent = parent
	}

	public addWord (word: string): Node {
		if (word.length == 0) {
			this.isWord = true
			return this
		}

		const char = word.slice(0, 1)
		const rest = word.replace(char, '')
		const node = new Node(this)
		this._next[char] = node
		return node.addWord(rest)
	}
}
