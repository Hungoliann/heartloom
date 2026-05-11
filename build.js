const fs = require('fs');
const path = require('path');

const src = 'artifacts/heartloom/dist/public';
const dest = 'public';

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true });
}

fs.cpSync(src, dest, { recursive: true });
console.log('Built output copied to public/');
