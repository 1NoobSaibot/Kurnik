import { Test, TestingModule } from '@nestjs/testing'
import { FieldStatistic } from '../common/field-statistic'
import { Point } from '../common/point'
import { ScoreCounter } from '../common/ScoreCounter'
import { ReversiKnowledgeService } from './reversi-knowledge.service'

describe('ReversiKnowledgeService', () => {
	let service: ReversiKnowledgeService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ReversiKnowledgeService]
		}).compile()

		service = module.get<ReversiKnowledgeService>(ReversiKnowledgeService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	// TODO: Really?? Can you try to avoid returning null?
	it('should return FOWLER if there is no record', () => {
		const stats = service.getFieldStats(0n)
		expect(stats).toBeInstanceOf(FieldStatistic)
	})

	// TODO: Learn how to control the order of tests and separate them
	it('should get or create new records', () => {
		let counter = service
			.getOrCreateFieldStats(0n)
			.getOrCreateCounter(new Point(1, 2))
			.incWins()
		expect(counter).toBeInstanceOf(ScoreCounter)
		expect(counter).toEqual({ _wins: 1, _loses: 0, _draws: 0 })
		
		counter = service
			.getFieldStats(0n)
			.getCounter(new Point(1, 2))
		expect(counter).toBeInstanceOf(ScoreCounter)
		expect(counter).toEqual({ _wins: 1, _loses: 0, _draws: 0 })
	})
})
