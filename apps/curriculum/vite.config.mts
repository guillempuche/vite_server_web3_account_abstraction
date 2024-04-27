import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/apps/curriculum',

	server: {
		host: 'localhost',
		port: 3000,
		open: false,
	},

	// preview: {
	//   port: 4300,
	//   host: 'localhost',
	// },

	plugins: [react(), nxViteTsPaths()],

	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },

	build: {
		outDir: '../../dist/apps/curriculum',
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},

	// test: {
	// 	globals: true,
	// 	cache: {
	// 		dir: '../../node_modules/.vitest',
	// 	},
	// 	environment: 'jsdom',
	// 	include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

	// 	reporters: ['default'],
	// 	coverage: {
	// 		reportsDirectory: '../../coverage/apps/curriculum',
	// 		provider: 'v8',
	// 	},
	// },
})
