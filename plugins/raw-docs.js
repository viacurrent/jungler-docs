const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else if (/\.(md|mdx)$/.test(entry.name)) {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

module.exports = function rawDocsPlugin() {
    const docsDir = path.join(__dirname, '..', 'docs');
    const staticRawDir = path.join(__dirname, '..', 'static', 'raw');

    // Copy docs to static/raw on startup so dev server serves them
    copyDir(docsDir, staticRawDir);

    return {
        name: 'raw-docs',
        async postBuild({ outDir }) {
            copyDir(docsDir, path.join(outDir, 'raw'));
        },
    };
};
