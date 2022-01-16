import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"
// import { SqljsConnectionOptions } from "typeorm/driver/sqljs/SqljsConnectionOptions"

// You can use another type of options for SqlLite, PostgreSQL, MsSql and so on 
const config: MysqlConnectionOptions = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'password',
	database: 'db_kurnik',
	entities: ['dist/src/**/*.entity.js'],
	synchronize: false,
	migrations: [
		'dist/src/db/migrations/*.js'
	],
	cli: {
		migrationsDir: 'src/db/migrations'
	}
}

export default config