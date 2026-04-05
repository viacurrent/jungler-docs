import { existsSync, rmSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { join } from 'path';

function syncDir(src, dest) {
    if (existsSync(dest)) rmSync(dest, { recursive: true });

    mkdirSync(dest, { recursive: true });
    for (const entry of readdirSync(src, { withFileTypes: true })) {
        const srcPath = join(src, entry.name);
        const destPath = join(dest, entry.name);
        if (entry.isDirectory()) {
            syncDir(srcPath, destPath);
        } else if (/\.md$/.test(entry.name)) {
            copyFileSync(srcPath, destPath);
        }
    }
}

export default function rawDocsPlugin() {
    const docsDir = join(__dirname, '..', 'docs');
    const staticRawDir = join(__dirname, '..', 'static', 'raw');

    // Copy docs to static/raw on startup so dev server serves them
    syncDir(docsDir, staticRawDir);

    return {
        name: 'raw-docs',
        async postBuild({ outDir }) {
            syncDir(docsDir, join(outDir, 'raw'));
        },
    };
};
