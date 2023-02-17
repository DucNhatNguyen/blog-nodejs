module.exports = {
	HOST: 'ep-shrill-snow-006772.ap-southeast-1.aws.neon.tech',
	USER: 'nguyw461',
	PASSWORD: 't3zwPD1gNhEC',
	DB: 'neondb',
	port: 5432,
	dialect: 'postgres',
	sslmode: 'no-verify',
	pool: {
		max: 64,
		min: 2,
		acquire: 300000,
		idle: 300000,
	},
	idle_timeout: 6000,
	keepAlive: true,
	secret: 'crypto',
}

// module.exports = {
// 	HOST: 'dpg-cem6bmun6mpkfa6e3k2g-a.singapore-postgres.render.com',
// 	USER: 'nguyw461',
// 	PASSWORD: 'Cc72eE8OyQT5TC4kby4LEV52bVWkzhkT',
// 	DB: 'neondb',
// 	port: 5432,
// 	dialect: 'postgres',
// 	sslmode: 'no-verify',
// 	pool: {
// 		max: 64,
// 		min: 2,
// 		acquire: 300000,
// 		idle: 300000,
// 	},
// 	idle_timeout: 6000,
// 	keepAlive: true,
// 	secret: 'crypto',
// }
