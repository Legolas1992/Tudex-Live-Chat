const fs = require('fs');
const content = fs.readFileSync('frontend/src/App.jsx', 'utf8');
const lines = content.split('\n');

// Find tab buttons
let targets = [2095, 2112, 2223, 2251, 2330, 2357, 4320, 4151];
targets.forEach(t => {
  console.log(`--- Line ${t} ---`);
  console.log(lines.slice(t - 3, t + 3).join('\n'));
});
