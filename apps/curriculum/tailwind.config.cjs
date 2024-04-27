const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('node:path')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		join(__dirname, '{src,public}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
		...createGlobPatternsForDependencies(__dirname),
	],
	theme: {
		// container: {
		// 	center: true,
		// 	padding: '2rem',
		// },
	},
	plugins: [],
	darkMode: 'media',
}
