const { defineConfig } = require('cypress')
const fs = require('fs')

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:8080',
		chromeWebSecurity: false,
		video: false,
		specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
		env: {
			GotoLink: 'https://gotoinc.co',
		},
		setupNodeEvents(on, config) {
			on('task', {
				readFile(fileToRead) {
					return fs.readFileSync(fileToRead, 'utf8')
				},
			})
		},
	},
})
