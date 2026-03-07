const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frames');
const projects = ['singularity', 'accretion', 'vision'];

if (!fs.existsSync(srcDir)) {
    console.error("frames directory not found");
    process.exit(1);
}

projects.forEach(project => {
    const destDir = path.join(__dirname, 'public', 'images', project);
    fs.mkdirSync(destDir, { recursive: true });

    let copied = 0;
    for (let i = 1; i <= 120; i++) {
        const padded = i.toString().padStart(3, '0');
        const srcFile = path.join(srcDir, `ezgif-frame-${padded}.jpg`);
        const destFile = path.join(destDir, `${i}.jpg`);
        try {
            if (fs.existsSync(srcFile)) {
                fs.copyFileSync(srcFile, destFile);
                copied++;
            }
        } catch (e) {
            console.error(e);
        }
    }
    console.log(`Copied ${copied} frames to ${project}`);
});
