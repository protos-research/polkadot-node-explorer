module.exports = {
	globals: {
		'ts-jest': {
      tsConfig: {
        "noImplicitAny": false,
      }
		}
	},
	moduleFileExtensions: [
		'ts',
		'js'
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	testMatch: [
		'**/test/**/*.test.(ts|js)'
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__utils",
    "/dist/"
  ],
	testEnvironment: 'node'
};