const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const model = require('../public/js/solar-preview-model');
test('acceptance values and centavos compute accumulated expenses at one, three and five years', () => {
    for (const [bill,annual,three,five] of [[300,3600,10800,18000],[500,6000,18000,30000],[1000,12000,36000,60000],[1500,18000,54000,90000],[3000,36000,108000,180000],[5000,60000,180000,300000],[850,10200,30600,51000],[1234.56,14814.72,44444.16,74073.60],[0.01,.12,.36,.60]]) assert.deepEqual(model.calculate(bill),{bill,yearlyCost:annual,threeYearCost:three,fiveYearCost:five});
    for (const value of ['',0,-1,'bad','-500',Infinity,NaN,1000001]) assert.ok(model.calculate(value).error);
    assert.equal(model.calculate(1000000).yearlyCost,12000000);
});
test('Brazilian currency formats preserve magnitude and reject malformed input', () => {
    for (const [value,expected] of [['1.500',1500],['1.234,56',1234.56],['R$ 850,00',850],['850.50',850.50],['1.000.000,00',1000000]]) assert.equal(model.parseAmount(value),expected);
    for (const value of ['1e3','1.2.3','850abc','NaN','R$']) assert.ok(Number.isNaN(model.parseAmount(value)));
});
test('WhatsApp includes monthly and annual amounts and has a generic fallback', () => {
    const text=model.whatsappMessage(model.calculate(1000));
    assert.match(text,/1\.000,00/);assert.match(text,/12\.000,00/);
    assert.doesNotMatch(text,/kWh|kWp|placas|Perfil|envie|fatura|95%|garantid/i);
    for (const result of [undefined,model.calculate(''),model.calculate(-1)]) {
        const generic=model.whatsappMessage(result);
        assert.match(generic,/reduzir minha conta/);assert.doesNotMatch(generic,/NaN|undefined|R\$/);
    }
});
function calculator() {
    const events=[],timers=new Map(),nodes={},observers=[],documentEvents={};let id=0;
    let focused;
    function node(key) {
        const listeners={},attrs={};
        return nodes[key]={value:'',textContent:'',href:'',dataset:{},focus(){focused=key;},select(){this.selected=true;},
            setAttribute:(k,v)=>attrs[k]=v,getAttribute:k=>attrs[k]??null,
            removeAttribute(k){if(k==='href')this.href='';else delete attrs[k];},
            addEventListener:(e,fn)=>(listeners[e]||=[]).push(fn),
            emit:(e,details={})=>(listeners[e]||[]).forEach(fn=>fn(details)),
            getBoundingClientRect:()=>({top:100,bottom:150,left:20,right:200})};
    }
    for (const key of ['solar-preview','solar-bill','solar-calc-error','result-yearly','result-three-years','result-five-years','compare-yearly','compare-three','compare-five','solar-cost-comparison','solar-result-help','btn-calc-pdf','solar-preview-review','solar-preview-next','solar-preview-open','solar-preview-edit','solar-preview-no-growth','solar-preview-no-growth-choice','solar-preview-summary','summary-bill','summary-year']) node(key);
    const summary=nodes['solar-preview-summary'];
    summary.open=false;
    summary.showModal=()=>{summary.open=true;};
    summary.close=()=>{summary.open=false;};
    nodes['btn-calc-pdf'].dataset.whatsappUrl='https://wa.me/5583991430929?text=original';
    const growthOptions = ['air-conditioning','electric-shower','electric-car','other','none'].map(key => {
        const option=node(key);
        option.value=key;
        return option;
    });
    const quantityFields = ['air-conditioning','electric-shower'].map(key => {
        const field=node('quantity-'+key);
        field.dataset.solarQuantity=key;
        const options=[1,2,3].map(amount=>{
            const option=node('quantity-'+key+'-'+amount);
            option.value=String(amount);
            option.checked=amount===1;
            return option;
        });
        field.querySelectorAll=()=>options;
        return field;
    });
    nodes['solar-preview-review'].querySelectorAll=selector=>selector==='[data-solar-quantity]'?quantityFields:growthOptions;
    const presets=[300,500,1000,1500,3000,5000].map(v=>{const n=node('preset-'+v);n.dataset.value=String(v);return n;});
    const fields=[['result-yearly','yearlyCost'],['result-three-years','threeYearCost'],['result-five-years','fiveYearCost'],['compare-yearly','yearlyCost'],['compare-three','threeYearCost'],['compare-five','fiveYearCost'],['summary-bill','bill'],['summary-year','yearlyCost']].map(([id,key])=>{nodes[id].dataset.result=key;return nodes[id];});
    nodes['solar-preview'].querySelectorAll=selector=>selector==='[data-value]'?presets:fields;
    const bodyClasses=new Set();
    const ctx={URL,Set,window:{KlyfeSolarPreview:model,innerHeight:800,location:{href:'https://www.klyfeelectric.com.br/energia-solar'},
        KlyfeTracking:{trackCalculatorEvent:name=>{events.push(name);return true;}},addEventListener(){},
        IntersectionObserver:class{constructor(cb){this.cb=cb;observers.push(this)}observe(){}}},
        document:{visibilityState:'visible',addEventListener:(name,fn)=>documentEvents[name]=fn,getElementById:k=>nodes[k],body:{classList:{toggle:(name,on)=>on?bodyClasses.add(name):bodyClasses.delete(name)}}},
        setTimeout:fn=>{timers.set(++id,fn);return id;},clearTimeout:i=>timers.delete(i)};
    vm.runInNewContext(fs.readFileSync(require.resolve('../public/js/solar-preview.js'),'utf8'),ctx);
    return {nodes,presets,events,bodyClasses,get focused(){return focused;},
        visibility(value){ctx.document.visibilityState=value;documentEvents.visibilitychange?.();},
        enter(value){nodes['solar-bill'].value=value;nodes['solar-bill'].emit('input');},
        chooseGrowth(key){growthOptions.forEach(option=>{option.checked=option.value===key;});nodes[key].emit('change');},
        addGrowth(key){nodes[key].checked=true;nodes[key].emit('change');},
        setQuantity(key,value){
            const field=nodes['quantity-'+key];
            field.querySelectorAll().forEach(option=>{option.checked=option.value===String(value);});
            field.emit('change');
        },
        tick(){const pending=[...timers.values()];timers.clear();pending.forEach(fn=>fn());},
        visible(key,on=true){observers[0].cb([{target:nodes[key],isIntersecting:on,intersectionRatio:on?1:0}]);}};
}
test('empty initial state, all presets, manual editing and invalid input update instantly', () => {
    const c=calculator();
    assert.equal(c.nodes['solar-bill'].value,'');assert.equal(c.nodes['result-yearly'].textContent,'—');assert.equal(c.events.length,0);
    assert.equal(c.nodes['btn-calc-pdf'].href,'');
    for (const p of c.presets) {
        p.emit('click');
        for(const [id,months] of [['result-yearly',12],['result-three-years',36],['result-five-years',60]]) assert.equal(c.nodes[id].textContent,model.currency(Number(p.dataset.value)*months));
        assert.equal(c.nodes['compare-five'].textContent,c.nodes['result-five-years'].textContent);
        assert.equal(c.nodes['solar-cost-comparison'].hidden,false);
    }
    c.enter('R$ 1.234,56');assert.equal(c.nodes['result-yearly'].textContent,model.currency(14814.72));assert.equal(c.nodes['solar-bill'].value,'1.234,56');
    c.nodes['solar-bill'].emit('blur');assert.equal(c.nodes['solar-bill'].value,'1.234,56');
    for (const value of ['',0,-1,'abc',1000001]) {
        c.enter(String(value));
        for(const id of ['result-yearly','result-three-years','result-five-years','compare-five']) assert.equal(c.nodes[id].textContent,'—');
        assert.equal(c.nodes['solar-cost-comparison'].hidden,true);
        assert.equal(c.nodes['btn-calc-pdf'].href,'');
    }
});

test('accounts below R$ 300 get a separate growth review without the calculator conversion', () => {
    const c=calculator();
    const primary=c.nodes['btn-calc-pdf'];
    assert.equal(c.nodes['solar-preview-review'].hidden,true);
    for(const amount of ['70','299,99']) {
        c.enter(amount);
        c.nodes['solar-preview-open'].emit('click');
        assert.equal(primary.href,'');
        assert.equal(c.nodes['solar-preview-review'].hidden,false);
        assert.equal(c.nodes['solar-preview-no-growth-choice'].hidden,true);
        let prevented=false;
        primary.emit('click',{preventDefault(){prevented=true;}});
        assert.equal(prevented,true);
        c.chooseGrowth('other');
        const url=new URL(primary.href);
        assert.equal(url.pathname,'/5583991430929');
        assert.match(url.searchParams.get('text'),/pretendo aumentar meu consumo/i);
        assert.ok(url.searchParams.get('text').includes(model.currency(model.parseAmount(amount))));
        assert.equal(primary.getAttribute('data-content-category'),'solar-review');
        primary.emit('click');
        assert.ok(!c.events.includes('calculator_whatsapp_click'));
        c.nodes['solar-preview-summary'].close();
    }
    c.enter('150');
    for(const [key,expected] of [
        ['air-conditioning',/Pretendo instalar 1 aparelho de ar-condicionado/],
        ['electric-shower',/Pretendo instalar 1 chuveiro elétrico/],
        ['electric-car',/Pretendo carregar 1 carro elétrico no imóvel/],
        ['other',/Pretendo aumentar meu consumo/]
    ]) {
        c.chooseGrowth(key);
        const message=new URL(primary.href).searchParams.get('text');
        assert.match(message,/R\$\s*150,00 por mês/);
        assert.match(message,expected);
    }
    c.enter('300');
    assert.equal(c.nodes['solar-preview-review'].hidden,false);
    assert.equal(c.nodes['solar-preview-no-growth-choice'].hidden,false);
    assert.equal(c.nodes['solar-preview-no-growth'].hidden,true);
    for(const key of ['air-conditioning','electric-shower','electric-car','other']) assert.equal(c.nodes[key].checked,false);
    assert.match(new URL(primary.href).searchParams.get('text'),/300,00/);
    assert.doesNotMatch(new URL(primary.href).searchParams.get('text'),/pretendo/i);
    c.addGrowth('air-conditioning');
    c.addGrowth('electric-shower');
    c.addGrowth('electric-car');
    c.setQuantity('air-conditioning',3);
    c.setQuantity('electric-shower',2);
    const combined=new URL(primary.href).searchParams.get('text');
    assert.match(combined,/Pretendo instalar 3 aparelhos de ar-condicionado/);
    assert.match(combined,/Pretendo instalar 2 chuveiros elétricos/);
    assert.match(combined,/Pretendo carregar 1 carro elétrico/);
    assert.equal(c.nodes['quantity-air-conditioning'].hidden,false);
    assert.equal(c.nodes['quantity-electric-shower'].hidden,false);
    assert.equal(c.nodes['quantity-electric-car'],undefined);
    c.addGrowth('none');
    assert.match(new URL(primary.href).searchParams.get('text'),/Não pretendo aumentar meu consumo/);
    assert.equal(c.nodes['air-conditioning'].checked,false);
    assert.equal(c.nodes['electric-car'].checked,false);
    assert.equal(c.nodes['quantity-air-conditioning'].disabled,true);
    assert.equal(c.nodes['quantity-electric-shower'].hidden,true);
    c.nodes['solar-preview-open'].emit('click');
    assert.equal(primary.getAttribute('data-content-category'),'solar');
    primary.emit('click');
    assert.equal(c.events.at(-1),'calculator_whatsapp_click');
    c.enter('70');
    assert.equal(primary.href,'');
});

test('a background tab cannot report result viewed until the visitor returns', () => {
    const c=calculator();c.visibility('hidden');c.enter('850');c.visible('result-yearly');
    assert.equal(c.events.includes('calculator_result_viewed'),false);
    c.visibility('visible');assert.equal(c.events.filter(e=>e==='calculator_result_viewed').length,1);
});
test('result view requires visibility; manual analytics never fire per key, repeated presets are bounded', () => {
    const c=calculator();c.enter('8');c.enter('85');c.enter('850');assert.equal(c.events.length,0);
    c.tick();assert.deepEqual(c.events,['calculator_value_entered']);
    c.visible('result-yearly');c.enter('900');c.tick();
    assert.equal(c.events.filter(e=>e==='calculator_result_viewed').length,1);
    assert.equal(c.events.filter(e=>e==='calculator_value_entered').length,1);
    c.presets[0].emit('click');c.presets[0].emit('click');
    assert.equal(c.events.filter(e=>e==='calculator_value_selected').length,1);
    c.nodes['solar-preview-open'].emit('click');
    c.nodes['btn-calc-pdf'].emit('click');assert.equal(c.events.at(-1),'calculator_whatsapp_click');
    c.visible('solar-preview');assert.ok(c.bodyClasses.has('solar-preview-active'));
    c.visible('solar-preview',false);assert.equal(c.bodyClasses.has('solar-preview-active'),false);
});

test('summary waits for the continue action and shows the right next step', () => {
    const c=calculator();
    const summary=c.nodes['solar-preview-summary'], open=c.nodes['solar-preview-open'], next=c.nodes['solar-preview-next'];
    assert.equal(next.hidden,true);
    c.enter('150');
    assert.equal(next.hidden,false);
    assert.equal(summary.open,false);
    c.nodes['solar-bill'].emit('keydown',{key:'Enter'});
    assert.equal(summary.open,true);
    assert.equal(c.nodes['summary-bill'].textContent,model.currency(150));
    assert.equal(c.nodes['summary-year'].textContent,model.currency(1800));
    assert.equal(c.nodes['solar-preview-review'].hidden,false);
    assert.equal(c.events.filter(event=>event==='calculator_result_viewed').length,1);
    assert.ok(!c.events.includes('calculator_whatsapp_click'));
    c.chooseGrowth('electric-car');
    c.nodes['solar-preview-no-growth'].emit('click');
    assert.equal(summary.open,false);
    assert.equal(c.focused,'result-yearly');
    assert.equal(c.nodes['btn-calc-pdf'].href,'');
    assert.equal(c.nodes['solar-bill'].value,'150');
    c.presets[1].emit('click');
    assert.equal(summary.open,false);
    assert.equal(c.nodes['summary-year'].textContent,model.currency(6000));
    assert.equal(c.nodes['solar-preview-review'].hidden,false);
    open.emit('click');
    assert.equal(summary.open,true);
    c.nodes['solar-preview-edit'].emit('click');
    assert.equal(summary.open,false);
    assert.equal(c.focused,'solar-bill');
    assert.equal(c.nodes['solar-bill'].selected,true);
    c.enter('-1');
    open.emit('click');
    assert.equal(summary.open,false);
    assert.equal(next.hidden,true);
});
