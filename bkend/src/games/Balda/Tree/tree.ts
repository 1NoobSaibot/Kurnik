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
