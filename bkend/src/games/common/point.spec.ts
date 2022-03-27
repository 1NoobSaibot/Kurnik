import { Point } from './point'

describe('Point', () => {
	it('should construct new Point', () => {
		let point = new Point(2, 3)

		expect(point).toEqual({ x: 2, y: 3 })
	})

	it('should add two Points and keep arguments safe', () => {
		let pointA = new Point(2, 3)
		let pointB = new Point(6, 9)
		let pointC = pointA.add(pointB)

		expect(pointA).toEqual({ x: 2, y: 3 })
		expect(pointB).toEqual({ x: 6, y: 9 })
		expect(pointC).toEqual({ x: 8, y: 12 })
	})

	it('should sub two Points and keep arguments safe', () => {
		let pointA = new Point(2, 3)
		let pointB = new Point(6, 9)
		let pointC = pointA.sub(pointB)

		expect(pointA).toEqual({ x: 2, y: 3 })
		expect(pointB).toEqual({ x: 6, y: 9 })
		expect(pointC).toEqual({ x: -4, y: -6 })
	})

	it('should compare two Points and return true if X and Y props are equal', () => {
		const pointA = new Point(7, 9)
		const pointB = new Point(7, 9)
		const pointC = new Point(9, 7)

		expect(pointA.isEqualTo(pointB)).toBeTruthy()
		expect(pointA.isEqualTo(pointC)).toBeFalsy()
	})
})
