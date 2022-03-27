import { Point } from "../common/point"

export class BaldaMove {
	public readonly char: string|null
	public readonly point: Point|null
	public readonly chain: Point[]|null
	public readonly skip: boolean

	private constructor (char: string|null, point: Point|null, chain: Point[]|null, skip: boolean) {
		this.char = char
		this.point = point
		this.chain = chain
		this.skip = skip
	}

	public static skippingMove (): BaldaMove {
		return new BaldaMove(null, null, null, true)
	}

	public static build (char: string, point: Point, chain: Point[]) {
		return new BaldaMove(char.toUpperCase(), point, chain, false)
	}
}
