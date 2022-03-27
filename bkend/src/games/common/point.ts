import { IComparable } from "./IComparable"

export class Point implements IComparable {
	public readonly x: number
	public readonly y: number

	constructor (x: number, y: number) {
		this.x = x
		this.y = y
	}

	public add (point: Point): Point {
		return new Point(this.x + point.x, this.y + point.y)
	}

	public sub (point: Point): Point {
		return new Point(this.x - point.x, this.y - point.y)
	}

	public isEqualTo (other: Point): boolean {
		return this.x == other.x && this.y == other.y
	}
}