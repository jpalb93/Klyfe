const sharp = require('sharp');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'img', 'Assinatura Símbolo - Amarelo - Klyfe.svg');
const pngPath = path.join(__dirname, '..', 'public', 'img', 'Assinatura Símbolo - Amarelo - Klyfe.png');
const webpPath = path.join(__dirname, '..', 'public', 'img', 'Assinatura Símbolo - Amarelo - Klyfe.webp');
const icoPath = path.join(__dirname, '..', 'public', 'favicon.ico');

async function generate() {
  try {
    console.log('⏳ Convertendo Assinatura Símbolo SVG para PNG...');
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(pngPath);
    console.log('✅ PNG gerado com sucesso!');

    console.log('⏳ Convertendo Assinatura Símbolo SVG para WebP...');
    await sharp(svgPath)
      .resize(32, 32)
      .webp()
      .toFile(webpPath);
    console.log('✅ WebP gerado com sucesso!');

    console.log('⏳ Gerando fallback favicon.ico na raiz pública...');
    await sharp(svgPath)
      .resize(32, 32)
      .png() // PNG encapsulado como .ico é perfeitamente interpretado por navegadores modernos na rota /favicon.ico
      .toFile(icoPath);
    console.log('✅ favicon.ico gerado na raiz pública com sucesso!');

    console.log('🎉 Geração de ícones concluída com sucesso!');
  } catch (err) {
    console.error('❌ Erro na geração dos favicons:', err.message);
  }
}

generate();
