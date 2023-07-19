export const environment = {
	production: true,
	overrideLogging: true,
	cacheExpiry: 3600000,

	appEnvironment: 'http://localhost:4200/home',
	apiEnvironment: 'https://localhost:7176',
    apiVersion: '1',

	tokenRefreshTime: 15 * 60 * 1000, // 15min
};
