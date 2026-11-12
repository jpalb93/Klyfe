'use strict';

// Uses the site's own logo, typefaces and illustration for the WhatsApp card.
// Run from the project root: node scripts/generate-solar-card-share.js
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.join(__dirname, '..');

async function textImage(text, fontSize, color, fontFile, fontName, width) {
    return sharp({ text: {
        text: '<span foreground="' + color + '">' + text + '</span>',
        font: fontName + ' ' + fontSize,
        fontfile: path.join(root, 'public', 'fonts', fontFile),
        width, rgba: true, dpi: 72, spacing: 0
    } }).png().toBuffer();
}

async function main() {
    const logoSource = fs.readFileSync(path.join(root, 'views', 'partials', 'logo.ejs'), 'utf8')
        .replaceAll('var(--text-main)', '#242b27').replaceAll('var(--accent-primary)', '#db9b05');
    const logo = await sharp(Buffer.from(logoSource)).resize({ width: 250 }).png().toBuffer();
    const photo = await sharp(path.join(root, 'public', 'img', 'lp', 'solar-residencial-hero.webp'))
        .resize(1080, 500, { fit: 'cover', position: 'center' }).toBuffer();
    const headline1 = await textImage('MAIS SOL.', 155, '#242b27', 'bebas-neue-400.ttf', 'Bebas Neue', 930);
    const headline2 = await textImage('MENOS CONTA.', 155, '#c84616', 'bebas-neue-400.ttf', 'Bebas Neue', 950);
    const subline = await textImage('Descubra o potencial da energia solar\npara sua casa ou empresa.', 31, '#65685f', 'ibm-plex-sans-400-700.ttf', 'IBM Plex Sans', 880);
    const cta = await textImage('EXPLORE SUA ECONOMIA', 30, '#ffffff', 'ibm-plex-sans-400-700.ttf', 'IBM Plex Sans SemiBold', 800);
    const footer = await textImage('Acesse o link na mensagem e faça sua simulação.', 23, '#ffffff', 'ibm-plex-sans-400-700.ttf', 'IBM Plex Sans', 950);
    const graphics = Buffer.from('<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="shade" x2="0" y2="1"><stop offset="0" stop-color="#172a1a" stop-opacity="0"/><stop offset="1" stop-color="#172a1a" stop-opacity=".9"/></linearGradient></defs><path d="M64 166h952" stroke="#e9e5dc"/><rect x="0" y="840" width="1080" height="240" fill="url(#shade)"/><rect x="64" y="899" width="952" height="85" rx="10" fill="#c84616"/><path d="M935 941h30m-12-12 12 12-12 12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    const output = path.join(root, 'public', 'img', 'solar-card-share.jpg');
    await sharp({ create: { width: 1080, height: 1080, channels: 3, background: '#fffaf5' } })
        .composite([
            { input: photo, top: 580, left: 0 },
            { input: graphics, top: 0, left: 0 },
            { input: logo, top: 55, left: 64 },
            { input: headline1, top: 205, left: 59 },
            { input: headline2, top: 345, left: 59 },
            { input: subline, top: 479, left: 64 },
            { input: cta, top: 925, left: 94 },
            { input: footer, top: 1011, left: 64 }
        ]).jpeg({ quality: 90, mozjpeg: true }).toFile(output);
    console.log('Cartão WhatsApp gerado: public/img/solar-card-share.jpg (1080 × 1080)');
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
