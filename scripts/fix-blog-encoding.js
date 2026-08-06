/**
 * Restaura blog.legacy.js com encoding UTF-8 correto a partir do git.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, '../config/blog.legacy.js');
const content = execSync('git show HEAD:config/blog.js', { encoding: 'utf8' });
fs.writeFileSync(out, content, 'utf8');
console.log('blog.legacy.js restaurado com UTF-8.');
