export interface BaldaMove {
	char?: string
	point?: Point
	word?: Point[]
	skip?: boolean
}

export interface Point {
	x: number
	y: number
}