import { IComparable } from "./IComparable"
import { ScoreCounter } from "./ScoreCounter"

export class FieldStatistic<MoveArgs extends IComparable> {
	private readonly _pairs: Pair<MoveArgs>[] = []

	public getCounter (move: MoveArgs): ScoreCounter {
		return this.getPair(move).counter
	}

	public getPair (move: MoveArgs): Pair<MoveArgs> {
		const pair = this._findPairIfExists(move)
		return pair ?? new Pair<MoveArgs>(move)
	}

	public getOrCreateCounter (move: MoveArgs): ScoreCounter {
		let pair = this._findPairIfExists(move)
		if (pair) {
			return pair.counter
		}
		return this._createCounter(move)
	}

	private _createCounter (move: MoveArgs): ScoreCounter {
		const pair = new Pair(move)
		this._pairs.push(pair)
		return pair.counter
	}

	private _findPairIfExists (args: MoveArgs): Pair<MoveArgs>|null {
		for (let i = 0; i < this._pairs.length; i++) {
			if (args.isEqualTo(this._pairs[i].move)) {
				return this._pairs[i]
			}
		}
		return null
	}
}

export class Pair<MoveArgs> {
	public readonly move: MoveArgs
	public readonly counter: ScoreCounter

	constructor (move: MoveArgs) {
		this.counter = new ScoreCounter()
		this.move = move
	}
}
