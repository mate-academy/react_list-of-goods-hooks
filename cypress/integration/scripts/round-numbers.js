const fs = require('fs');
const path = require('path');

const exts = ['.js', '.ts', '.tsx', '.jsx'];
const root = process.cwd();

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && name !== 'node_modules' && name !== '.git') walk(full);
    if (stat.isFile() && exts.includes(path.extname(full))) processFile(full);
  }
}

function processFile(file) {
  let s = fs.readFileSync(file, 'utf8');
  const regex = /(?<![\w$.])(-?\d+\.\d{3,})(?![\w])/g;
  let changed = false;
  s = s.replace(regex, m => {
    const n = Number(m);
    if (!Number.isFinite(n)) return m;
    const rounded = n.toFixed(2);
    changed = changed || rounded !== m;
    return rounded;
  });
  if (changed) {
    fs.writeFileSync(file, s, 'utf8');
    console.log('Updated', file);
  }
}

walk(root);
