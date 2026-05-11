const fs = require('fs');
const path = require('path');

const src = 'dist/public';
const dest = '../../public';

try {
  if (!fs.existsSync(src)) {
    console.error(`Error: Source directory not found: ${src}`);
    console.error(`Current directory: ${process.cwd()}`);
    console.error(`Contents of dist:`);
    if (fs.existsSync('dist')) {
      console.error(fs.readdirSync('dist'));
    } else {
      console.error('dist does not exist');
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
