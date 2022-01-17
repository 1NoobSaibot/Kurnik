import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Tree } from "./Tree/tree"
import { BaldaWord } from "./word.entity"

const allowedChars = {
	'ru': 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ',
	'en': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
}

@Injectable()
export class BaldaService {
	private _words: Record<string, LangData> 

	constructor (
		@InjectRepository(BaldaWord) private _wordRepository: Repository<BaldaWord>
	) {
		_wordRepository
			.find()
			.then((words) => {
				const trees: Record<string, Tree> = {
					'ru': new Tree(),
					'en': new Tree()
				}

				for (let i = 0; i < words.length; i++) {
					const { word, lang } = words[i]
					trees[lang].addWord(word)
				}

				this._words = {
					'ru': new LangData(allowedChars.ru, trees.ru),
					'en': new LangData(allowedChars.en, trees.en)
				}
			})
	}

	public async addWord (word: string, lang: string): Promise<void> {
		word = word.toUpperCase()
		lang = lang.toLowerCase()

		this._words[lang].addWord(word)
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

class LangData {
	public readonly allowedChars: string
	public readonly words: Tree

	constructor (chars: string, words: Tree) {
		this.allowedChars = chars.toUpperCase()
		this.words = words
	}

	public addWord (word: string) {
		if (word.length < 2) {
			throw new Error('The word is too short')
		}

		word = word.toUpperCase()
		for (let i = 0; i < word.length; i++) {
			const char = word.charAt(i)
			if (!this.allowedChars.includes(char)) {
				throw new Error(`Found not allowed character: ${char}`)
			}
		}

		this.words.addWord(word)
	}
}