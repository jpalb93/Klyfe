const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../content/posts/published');

// Importar os 5 clusters de conteúdo
const cluster1 = require('./content/cluster-1.js');
const cluster2 = require('./content/cluster-2.js');
const cluster3 = require('./content/cluster-3.js');
const cluster4 = require('./content/cluster-4.js');
const cluster5 = require('./content/cluster-5.js');

// Concatenar todos os posts
const posts = [
  ...cluster1,
  ...cluster2,
  ...cluster3,
  ...cluster4,
  ...cluster5
];

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

let generatedCount = 0;

posts.forEach(post => {
  const filename = `${post.publishAt}-${post.slug}.json`;
  const filepath = path.join(postsDir, filename);

  const jsonContent = JSON.stringify({ status: 'published', ...post }, null, 2);

  fs.writeFileSync(filepath, jsonContent, 'utf-8');
  console.log(`Generated: ${filepath}`);
  generatedCount++;
});

console.log(`\nSuccessfully generated ${generatedCount} cluster blog posts!`);
