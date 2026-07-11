const fs = require('fs');
const content = fs.readFileSync('frontend/src/App.jsx', 'utf8');
const lines = content.split('\n');

// Find tab buttons
let targets = [3520, 3532, 4592, 4602, 3694];
targets.forEach(t => {
  console.log(`--- Line ${t} ---`);
  console.log(lines.slice(t - 3, t + 3).join('\n'));
});
