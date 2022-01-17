import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { BaldaWord } from "./word.entity"

@Injectable()
export class BaldaService {
	constructor (
		@InjectRepository(BaldaWord) private _wordRepository: Repository<BaldaWord>
	) {}

	public async addWord (word: string, lang: string): Promise<void> {
		await this._wordRepository.insert({
			word: word.toUpperCase(),
			lang: lang.toLowerCase(),
			length: word.length
		})
	}

	public async deleteWord (word: string, lang: string): Promise<void> {
		await this._wordRepository.delete({
			word: word.toUpperCase(),
			lang: lang.toLowerCase()
		})
	}
}
