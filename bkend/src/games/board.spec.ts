import { TestBoard } from "./test/test-board"
import { TestMove } from "./test/test-move"

describe('Abstract Class Board', () => {
	it('should not move when args are wrong', () => {
		const board = new TestBoard()
		board.move(TestMove.WrongMove)

		expect(board.calledMethods)
			.toEqual(['canMove'])
	})

	it('should move, emit OnMove-event and check end of game when args are correct', () => {
		const board = new TestBoard
		board.move(TestMove.CorrectMove)

		expect(board.calledMethods)
			.toEqual(['canMove', '_move', 'onMove', '_checkIsGameOver'])
	})

	it('should call onGameOver event when game is over', () => {
		const board = new TestBoard()
		board.move(TestMove.EndGame)

		expect(board.calledMethods)
			.toEqual(['canMove', '_move', 'onMove', '_checkIsGameOver', 'onGameOver'])
	})

	it('should throw an Error when moving after an end of game without calling any methods', () => {
		const board = new TestBoard()
		board.move(TestMove.EndGame)
		board.clearCalledMethodsOrder()
	
		expect(() => {
			board.move(TestMove.CorrectMove)
		}).toThrowError("Moving after the game is over")
		expect(board.calledMethods)
			.toEqual([])
	})
})
