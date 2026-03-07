const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'framess');
const destDir = path.join(__dirname, 'public', 'images', 'portfolio');

if (!fs.existsSync(srcDir)) {
    console.error("framess directory not found");
    process.exit(1);
}

// Ensure clean directory
if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir)
    .filter(f => f.endsWith('.jpg') || f.endsWith('.webp'))
    .sort((a, b) => {
        // Basic natural sort to ensure frame-1, frame-2, ... frame-10 works
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

let copied = 0;
files.forEach((file, index) => {
    const srcFile = path.join(srcDir, file);
    // 1-indexed naming: 1.jpg, 2.jpg...
    const ext = path.extname(file);
    const destFile = path.join(destDir, `${index + 1}${ext}`);

    try {
        fs.copyFileSync(srcFile, destFile);
        copied++;
    } catch (e) {
        console.error(`Failed to copy ${file}:`, e);
    }
});

console.log(`Copied ${copied} frames to portfolio directory.`);
