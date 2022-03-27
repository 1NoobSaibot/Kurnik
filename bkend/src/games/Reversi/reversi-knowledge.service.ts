import { Injectable } from '@nestjs/common';
import { FieldStatistic } from '../common/field-statistic';
import { Point } from '../common/point';

@Injectable()
export class ReversiKnowledgeService {
	private _counters: Record<string, FieldStatistic<Point>> = {}

	public getFieldStats (id: BigInt): FieldStatistic<Point> {
		const stats = this._counters[id.toString()]
		return stats || new FieldStatistic<Point>()
	}

	public getOrCreateFieldStats (id: BigInt): FieldStatistic<Point> {
		const stats = this._counters[id.toString()]
		return stats || this._createStats(id)
	}

	private _createStats (id: BigInt) {
		const stats = new FieldStatistic<Point>()
		this._counters[id.toString()] = stats
		return stats
	}
}

