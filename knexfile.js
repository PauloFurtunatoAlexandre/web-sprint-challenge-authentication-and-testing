module.exports = {
	development: {
		client: 'sqlite3',
		connection: { filename: './database/auth.db3' },
		useNullAsDefault: true,
		migrations: {
			directory: './database/migrations',
			tableName: 'dbmigrations',
		},
		seeds: { directory: './database/seeds' },
	},

	testing: {
		client: 'sqlite3',
		connection: {
			filename: './database/testing/test.db3',
		},
		useNullAsDefault: true,
		migrations: {
			directory: './database/testing/migrations',
		},
		seeds: {
			directory: './database/testing/seeds',
		},
	},
};
