import { Score } from "../common/score"

export const COUNT_LIMIT = 65536

export class ScoreCounter {
	public static get empty () {
		return new ScoreCounter()
	}

	private _wins: number = 0
	private _loses: number = 0
	private _draws: number = 0

	public get wins (): number {
		return this._wins
	}

	public get loses (): number {
		return this._loses
	}

	public get draws (): number {
		return this._draws
	}

	public incWins (): ScoreCounter {
		if (++this._wins >= COUNT_LIMIT) {
			this._proportionalCut()
		}
		return this
	}

	public incLoses (): ScoreCounter {
		if (++this._loses >= COUNT_LIMIT) {
			this._proportionalCut()
		}
		return this
	}

	public incDraws (): ScoreCounter {
		if (++this._draws >= COUNT_LIMIT) {
			this._proportionalCut()
		}
		return this
	}

	public incByScore (score: Score): ScoreCounter {
		switch (score) {
			case Score.Winner:
				this.incWins()
				break
			case Score.Looser:
				this.incLoses()
				break
			case Score.Draw:
				this.incDraws()
				break
			default:
				throw new Error(`Invalid score type (${score})`)
		}
		return this
	}

	public static forFirstWin () {
		return new ScoreCounter().incWins()
	}

	public static forFirstLose () {
		return new ScoreCounter().incLoses()
	}

	public static forFirstDraw () {
		return new ScoreCounter().incDraws()
	}

	public static forFirstScore (score: Score) {
		return new ScoreCounter().incByScore(score)
	}

	private _proportionalCut () {
		this._wins = Math.trunc(this._wins / 2)
		this._draws = Math.trunc(this._draws / 2)
		this._loses = Math.trunc(this._loses / 2)
	}

	public getPartOfWins () {
		const sum = this._wins + this.draws + this._loses
		return sum == 0
			? 1.0 / 3.0
			: this._wins / sum
	}

	public getPartOfDraws () {
		const sum = this._wins + this.draws + this._loses
		return sum == 0
			? 1.0 / 3.0
			: this._draws / sum
	}

	public isMoreThan (otherCounter: ScoreCounter): boolean {
		const thisPartOfWins = this.getPartOfWins()
		const otherPartOfWins = otherCounter.getPartOfWins()
		if (thisPartOfWins != otherPartOfWins) {
			return thisPartOfWins > otherPartOfWins
		}
		
		return this.getPartOfDraws() > otherCounter.getPartOfDraws()
	}
}