const manifest = require('../content/page-manifest.json');
const { validateContentRecord } = require('./content-governance');

function getContentManifest() {
    return manifest.pages.map(page => ({ ...page }));
}

function validateContentManifest() {
    const errors = [];
    const ids = new Set();
    getContentManifest().forEach((page, index) => {
        if (ids.has(page.id)) errors.push(`pages[${index}].id is duplicated`);
        ids.add(page.id);
        const result = validateContentRecord(page);
        if (!result.valid) result.errors.forEach(error => errors.push(`pages[${index}]: ${error}`));
    });
    return { valid: errors.length === 0, errors };
}

module.exports = { getContentManifest, validateContentManifest };
