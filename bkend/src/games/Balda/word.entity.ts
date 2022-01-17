import { Entity, Column, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'balda_word' })
@Index(['word', 'lang'], { unique: true })
export class BaldaWord {
  @PrimaryColumn({ length: 40 })
  word: string

  @PrimaryColumn({ enum: ['ru', 'en']})
  lang: string

  @Column({ type: 'integer' })
  length: number
}