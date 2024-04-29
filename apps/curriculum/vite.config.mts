import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import inject from '@rollup/plugin-inject'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
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

	plugins: [
		nxViteTsPaths(),
		react(),

		// For Web3 logic
		inject({
			Buffer: ['buffer', 'Buffer'],
			process: 'process/browser',
		}),

		// Check the size of all dependencies
		visualizer({
			open: true,
			brotliSize: true,
			title: 'Bundle Stats',
			filename: './dist/bundle_size.html',
		}),
	],

	resolve: {
		alias: {
			buffer: 'buffer/',
			util: 'util/',
		},
	},

	build: {
		outDir: '../../dist/apps/curriculum',
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
	optimizeDeps: {
		include: ['buffer', 'util'],
		esbuildOptions: {
			define: {
				// Enable NodeJS global to browser `globalThis` for Web3 authentication services
				global: 'globalThis',
			},
		},
	},
})
