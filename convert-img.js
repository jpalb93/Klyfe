const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imgDir = path.join(__dirname, 'public', 'img');

/**
 * Percorre diretórios recursivamente para encontrar imagens
 */
function walkSync(dir, filelist = []) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            filelist = walkSync(filePath, filelist);
        } else {
            if (/\.(png|jpe?g)$/i.test(file)) {
                filelist.push(filePath);
            }
        }
    });
    return filelist;
}

async function convertAll() {
    console.log('🚀 Iniciando Otimização de Imagens para Próxima Geração (WebP)...');
    
    const files = walkSync(imgDir);
    let count = 0;

    for (const file of files) {
        const output = file.replace(/\.(png|jpe?g)$/i, '.webp');

        // Pula se o WebP já existe
        if (fs.existsSync(output)) continue;

        try {
            await sharp(file)
                .webp({ quality: 85, effort: 6 }) // Alta qualidade e compressão eficiente
                .toFile(output);
            
            console.log(`✅ Convertida: ${path.relative(imgDir, output)}`);
            count++;
        } catch (err) {
            console.error(`❌ Erro em ${path.relative(imgDir, file)}:`, err.message);
        }
    }

    console.log(`\n🎉 Otimização concluída! ${count} novas imagens convertidas para WebP.`);
    console.log('📌 Nota: Lembre-se de atualizar os templates .ejs para apontarem para as novas extensões .webp.');
}

convertAll();
