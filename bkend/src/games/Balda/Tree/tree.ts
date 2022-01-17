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
}
