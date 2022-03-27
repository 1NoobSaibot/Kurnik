import { Score } from '../common/score'
import { ScoreCounter, COUNT_LIMIT } from './ScoreCounter'

describe('ScoreCounter', () => {
	it('should create counters with expected state', () => {
		let counterNew = new ScoreCounter()
		let counterFirstWin = ScoreCounter.forFirstWin()
		let counterFirstLose = ScoreCounter.forFirstLose()
		let counterFirstDraw = ScoreCounter.forFirstDraw()
		let counterScoreWin = ScoreCounter.forFirstScore(Score.Winner)
		let counterScoreLose = ScoreCounter.forFirstScore(Score.Looser)
		let counterScoreDraw = ScoreCounter.forFirstScore(Score.Draw)

		expect(counterNew).toEqual({ _wins: 0, _loses: 0, _draws: 0 })
		expect(counterFirstWin).toEqual({ _wins: 1, _loses: 0, _draws: 0 })
		expect(counterFirstLose).toEqual({ _wins: 0, _loses: 1, _draws: 0 })
		expect(counterFirstDraw).toEqual({ _wins: 0, _loses: 0, _draws: 1 })
		expect(counterScoreWin).toEqual({ _wins: 1, _loses: 0, _draws: 0 })
		expect(counterScoreLose).toEqual({ _wins: 0, _loses: 1, _draws: 0 })
		expect(counterScoreDraw).toEqual({ _wins: 0, _loses: 0, _draws: 1 })
	})

	it('should change state correctly', () => {
		let counter = new ScoreCounter()
		counter.incWins()
		expect(counter).toEqual({ _wins: 1, _loses: 0, _draws: 0 })

		counter.incLoses()
		expect(counter).toEqual({ _wins: 1, _loses: 1, _draws: 0 })

		counter.incDraws()
		expect(counter).toEqual({ _wins: 1, _loses: 1, _draws: 1 })

		counter.incByScore(Score.Winner)
		expect(counter).toEqual({ _wins: 2, _loses: 1, _draws: 1 })

		counter.incByScore(Score.Looser)
		expect(counter).toEqual({ _wins: 2, _loses: 2, _draws: 1 })

		counter.incByScore(Score.Draw)
		expect(counter).toEqual({ _wins: 2, _loses: 2, _draws: 2 })
	})

	it('should return its counters over getters', () => {
		const counter = new ScoreCounter()
		counter
			.incWins() // One victory
			.incLoses()
			.incLoses() // Two loses
			.incDraws()
			.incDraws()
			.incDraws() // Three draws

			expect(counter.wins).toBe(1)
			expect(counter.loses).toBe(2)
			expect(counter.draws).toBe(3)
	})

	it('should cut counts when limit is reached', () => {
		const counter = new ScoreCounter()
		for (let i = 0; i < 8; i++) {
			counter.incLoses()
		}
		for (let i = 0; i < 8; i++) {
			counter.incDraws()
		}

		for (let i = 0; i < COUNT_LIMIT; i++) {
			counter.incWins()
		}

		expect(counter.draws).toBe(4)
		expect(counter.loses).toBe(4)
		expect(counter.wins).toBe(COUNT_LIMIT / 2)
	})
})
