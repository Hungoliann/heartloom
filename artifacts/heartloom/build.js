import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, 'dist/public');
const dest = path.join(__dirname, '..', '..', 'public');

try {
  if (!fs.existsSync(src)) {
    console.error(`Error: Source directory not found: ${src}`);
    console.error(`Current directory: ${process.cwd()}`);
    console.error(`Contents of dist:`);
    const distDir = path.join(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      console.error(fs.readdirSync(distDir));
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
