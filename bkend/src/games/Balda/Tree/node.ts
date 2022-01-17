
export class Node {
	private _next: Record<string, Node> = {}
	readonly parent: Node|null = null
	// TODO: Find a better name for the property
	isWord: boolean = false

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

	// TODO: Find a better name for the function
	public isItWord (str: string): boolean {
		if (str.length == 0) {
			return this.isWord
		}

		const char = str.slice(0, 1)
		if (this._next[char]) {
			const rest = str.replace(char, '')
			return this._next[char].isItWord(rest)
		}

		return false
	}

	public deleteWord (word: string): Node|null {
		if (word.length == 0) {
			this.isWord = false
			return this
		}

		const char = word.slice(0, 1)
		if (this._next[char]) {
			const rest = word.replace(char, '')
			const endNode = this._next[char].deleteWord(rest)
			if (this._next[char].isEmpty) {
				delete this._next[char]
			}
			return endNode
		}

		return null
	}

	public get isEmpty (): boolean {
		return !this.isWord && Object.keys(this._next).length == 0
	}
}
