import { defineConfig } from 'tsup';
export default defineConfig({
    entry: ['src/server.ts'],
    format: ['esm'],
    platform: 'node',
    target: 'node20',
    clean: true,
    outDir: 'dist',
    splitting: false,
    bundle: true,
    skipNodeModulesBundle: true, // IMPORTANT: Keeps Prisma external
    shims: true,
    outExtension() {
        return { js: `.mjs` };
    }
});