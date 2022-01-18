import { Node } from './node'

export class Tree {
	private readonly _root: Node = new Node(null)
	private readonly _lengths: Node[][] = []

	public addWord (word: string) {
		const length = word.length
		const endNode: Node = this._root.addWord(word)
		if (!this._lengths[length]) {
			this._lengths[length] = []
		}
		this._lengths[length].push(endNode)
	}

	public isWord (str: string): boolean {
		return this._root.isItWord(str)
	}

	public getRandomWord (length: number): string {
		const words = this._lengths[length]
		if (!words) {
			throw new Error('There is no words by length equal ' + length)
		}

		let index = Math.round(Math.random() * words.length)
		if (index >= words.length) {
			index = 0
		}

		return words[index].getWord()
	}

	public deleteWord (word: string) {
		const length = word.length
		const endNode: Node|null = this._root.deleteWord(word)
		if (endNode) {
			const nodes: Node[] = this._lengths[length]
			for (let i = 0; i < nodes.length; i++) {
				if (nodes[i] == endNode) {
					nodes.splice(i, 1)
					return
				}
			}
		}
	}
}
