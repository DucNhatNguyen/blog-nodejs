module.exports = {
	HOST: 'dpg-cem6bmun6mpkfa6e3k2g-a.singapore-postgres.render.com',
	USER: 'nguyw461',
	PASSWORD: 'Cc72eE8OyQT5TC4kby4LEV52bVWkzhkT',
	DB: 'neondb',
	dialect: 'postgres',
	sslmode: 'no-verify',
	pool: {
		max: 64,
		min: 2,
		acquire: 300000,
		idle: 300000,
	},
}
