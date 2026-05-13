const sharp = require('sharp');
const path = require('path');

const images = [
    { name: 'hero-klyfe', ext: 'png' },
    { name: 'Assinatura Completa - AmareloB - Klyfe', ext: 'png', outputName: 'logo-klyfe' }
];

async function convert() {
    for (const img of images) {
        const input = path.join(__dirname, 'public', 'img', `${img.name}.${img.ext}`);
        const output = path.join(__dirname, 'public', 'img', `${img.outputName || img.name}.webp`);
        
        try {
            await sharp(input).webp({ quality: 90 }).toFile(output);
            console.log(`✅ Convertida: ${img.outputName || img.name}.webp`);
        } catch (err) {
            console.error(`❌ Erro em ${img.name}:`, err.message);
        }
    }
}

convert();
