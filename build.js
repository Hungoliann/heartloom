const fs = require('fs');
const path = require('path');

const src = 'artifacts/heartloom/dist/public';
const dest = 'public';

try {
  if (!fs.existsSync(src)) {
    console.error(`Error: Source directory not found: ${src}`);
    console.error(`Current directory: ${process.cwd()}`);
    console.error(`Contents of artifacts/heartloom/dist:`);
    const distDir = 'artifacts/heartloom/dist';
    if (fs.existsSync(distDir)) {
      console.error(fs.readdirSync(distDir));
    } else {
      console.error('artifacts/heartloom/dist does not exist');
    }
    process.exit(1);
  }

  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true });
  }

  fs.cpSync(src, dest, { recursive: true });
  console.log(`✓ Built output copied from ${src} to ${dest}/`);
} catch (err) {
  console.error('Error during build output copy:', err.message);
  process.exit(1);
}

