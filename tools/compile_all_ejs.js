const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, '..', 'views');
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.ejs'));

let failed = false;

files.forEach(file => {
  const full = path.join(viewsDir, file);
  try {
    ejs.compile(fs.readFileSync(full, 'utf8'), {filename: full});
    console.log(`OK: ${file}`);
  } catch (err) {
    failed = true;
    console.error(`ERROR: ${file}`);
    console.error(err);
  }
});

if (failed) process.exit(1);
process.exit(0);
