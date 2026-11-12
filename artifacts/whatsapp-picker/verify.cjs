const { chromium } = require('C:/projetos-eximus/Flats-Integracao/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({headless:true, channel: 'msedge'});
  for (const viewport of [{width:1440,height:900},{width:390,height:844},{width:320,height:568}]) {
    const page = await browser.newPage({viewport});
    await page.goto('http://localhost:3107/', {waitUntil:'networkidle'});
    const reject = page.getByRole('button', {name:'Recusar', exact:true}); if (await reject.isVisible()) await reject.click(); const picker = page.locator('.whatsapp-picker');
    const trigger = picker.locator('summary');
    await trigger.click();
    assert.equal(await picker.getAttribute('open'), '');
    const links = picker.locator('a');
    assert.equal(await links.count(), 4);
    const expected = ['5583991430929','5583991330972','5583991330972','5583991330972'];
    for (let i=0; i<4; i++) {
      const href = new URL(await links.nth(i).getAttribute('href'));
      assert.equal(href.pathname, '/' + expected[i]);
      assert.ok(href.searchParams.get('text').includes('página inicial'));
    }
    const box = await picker.locator('.whatsapp-picker__panel').boundingBox();
    assert.ok(box.x >= 0 && box.y >= 0 && box.x + box.width <= viewport.width);
    await page.screenshot({path:'artifacts/whatsapp-picker/home-' + viewport.width + '.png'});
    await page.keyboard.press('Escape');
    assert.equal(await picker.getAttribute('open'), null);
    assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Enter');
    assert.equal(await picker.getAttribute('open'), '');
    await page.mouse.click(5,100);
    assert.equal(await picker.getAttribute('open'), null);
    await trigger.focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    assert.equal(await links.first().evaluate(el => el === document.activeElement),true);
    await page.close();
  }
  const page = await browser.newPage();
  for (const route of ['/campina-grande','/joao-pessoa']) {
    await page.goto('http://localhost:3107'+route);
    assert.equal(await page.locator('.whatsapp-picker a').count(),4);
    console.log(route, new URL(await page.locator('.whatsapp-picker a').first().getAttribute('href')).searchParams.get('text'));
  }
  for (const [route, phone] of [['/energia-solar','5583991430929'],['/solucoes/eletrica','5583991330972']]) {
    await page.goto('http://localhost:3107'+route);
    assert.equal(await page.locator('.whatsapp-picker').count(),0);
    assert.ok((await page.locator('a.whatsapp-float').getAttribute('href')).includes(phone));
  }
  await browser.close();
  console.log('PASS: desktop/mobile, quatro destinos, teclado, Escape, clique fora e páginas internas.');
})().catch(err => { console.error(err); process.exitCode=1; });
