import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class BaldaWords1642337008589 implements MigrationInterface {
	name = 'BaldaWords1642337008589'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'balda_word',
			columns: [
				{
					name: 'word',
					type: 'varchar',
					length: '40',
					isPrimary: true
				},
				{
					name: 'lang',
					type: 'enum',
					enum: ['ru', 'en'],
					isPrimary: true
				},
				{
					name: 'length',
					type: 'int',
					unsigned: true
				}
			],
			
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('balda_word')
	}
}
