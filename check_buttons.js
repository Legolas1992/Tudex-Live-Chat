const fs = require('fs');
const content = fs.readFileSync('frontend/src/App.jsx', 'utf8');

const buttonRegex = /<button[\s\S]*?<\/button>/g;
let match;
while ((match = buttonRegex.exec(content)) !== null) {
  const btn = match[0];
  if (!btn.includes('aria-label') && !btn.includes('aria-labelledby') && btn.includes('Icon')) {
    console.log('--- MIGHT BE ICON ONLY ---');
    console.log(btn.substring(0, 200));
  }
}
