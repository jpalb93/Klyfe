(function () {
    'use strict';
    const model = window.KlyfeSolarCard;
    const form = document.getElementById('sc-form');
    if (!model || !form) return;

    const billInput = document.getElementById('sc-bill');
    const range = document.getElementById('sc-bill-range');
    const error = document.getElementById('sc-bill-error');
    const formView = document.getElementById('sc-form-view');
    const resultView = document.getElementById('sc-result-view');
    const simulator = document.getElementById('simulacao');
    const study = document.getElementById('sc-study');
    const profileStep = document.getElementById('sc-profile-step');
    const billStep = document.getElementById('sc-bill-step');
    const next = document.getElementById('sc-continue');
    const previous = document.getElementById('sc-previous');
    const title = document.getElementById('sc-simulation-title');
    const description = document.getElementById('sc-step-description');
    const actionHint = document.getElementById('sc-action-hint');
    const presets = Array.from(document.querySelectorAll('[data-bill]'));
    const images = {
        residencial: { src: '/img/lp/solar-residencial-hero-640.webp', alt: 'Casa com painéis solares no telhado' },
        comercial: { src: '/img/lp/solar-comercial-hero-640.webp', alt: 'Imóvel comercial com sistema de energia solar' },
        rural: { src: '/img/lp/solar-fazendas-hero-640.webp', alt: 'Energia solar em propriedade rural' }
    };
    let step = 1;
    let toastTimeout;

    function billIsValid(amount) {
        return Number.isFinite(amount) && amount >= model.limits.min && amount <= model.limits.max;
    }

    function syncBill(amount, updateInput) {
        if (updateInput) billInput.value = amount.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
        const valid = billIsValid(amount);
        billInput.setAttribute('aria-invalid', valid ? 'false' : 'true');
        error.hidden = valid;
        presets.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.bill) === amount)));
        if (!valid) return;
        range.max = String(Math.max(5000, Math.ceil(amount / 1000) * 1000));
        range.value = String(amount);
        range.setAttribute('aria-valuetext', model.currency(amount) + ' por mês');
        const fill = (amount - Number(range.min)) / (Number(range.max) - Number(range.min)) * 100;
        range.style.setProperty('--sc-fill', fill + '%');
        document.getElementById('sc-range-max').textContent = model.currency(Number(range.max)).replace(',00', '');
    }

    function updateResults() {
        const profile = form.querySelector('input[name="profile"]:checked').value;
        const result = model.summarizeBill(billInput.value);
        if (!result) return false;
        document.getElementById('sc-result-summary').textContent = model.profiles[profile] + ' · conta de ' + model.currency(result.bill) + '/mês';
        document.getElementById('sc-yearly-cost').textContent = model.currency(result.yearlyCost);
        const places = { residencial: 'sua casa', comercial: 'sua empresa', rural: 'sua propriedade' };
        document.getElementById('sc-result-invitation').textContent = 'Que tal transformar parte desse gasto em energia para ' + places[profile] + '?';
        const message = model.whatsappMessage(profile, result);
        study.href = 'https://wa.me/' + simulator.dataset.solarPhone + '?text=' + encodeURIComponent(message);
        return true;
    }

    billInput.addEventListener('input', () => syncBill(model.parseBill(billInput.value), false));
    billInput.addEventListener('blur', () => {
        const amount = model.parseBill(billInput.value);
        if (billIsValid(amount)) syncBill(amount, true);
    });
    range.addEventListener('input', () => syncBill(Number(range.value), true));
    presets.forEach(button => button.addEventListener('click', () => syncBill(Number(button.dataset.bill), true)));
    form.querySelectorAll('input[name="profile"]').forEach(input => input.addEventListener('change', () => {
        const image = document.getElementById('sc-profile-image');
        image.src = images[input.value].src;
        image.alt = images[input.value].alt;
    }));

    function showStep(value, moveFocus) {
        step = value;
        formView.hidden = step === 3;
        resultView.hidden = step !== 3;
        profileStep.hidden = step !== 1;
        billStep.hidden = step !== 2;
        next.hidden = step === 3;
        study.hidden = step !== 3;
        previous.hidden = step === 1;
        previous.setAttribute('aria-label', step === 3 ? 'Voltar para a conta de energia' : 'Voltar para o imóvel');
        title.textContent = step === 1 ? 'Onde você quer gerar energia?' : 'Quanto você paga de energia?';
        description.textContent = step === 1 ? 'Escolha o perfil do seu imóvel para começar.' : 'Informe uma média mensal da sua conta de luz.';
        next.firstChild.textContent = step === 1 ? 'Continuar ' : 'Ver meu resultado ';
        actionHint.textContent = step === 3 ? 'Converse com a Klyfe pelo WhatsApp.' : 'Você vê o resultado antes de falar com a equipe.';
        document.querySelectorAll('[data-solar-step]').forEach(item => {
            const current = Number(item.dataset.solarStep);
            if (current === step) item.setAttribute('aria-current', 'step');
            else item.removeAttribute('aria-current');
            item.classList.toggle('is-complete', current < step);
        });
        simulator.setAttribute('aria-labelledby', step === 3 ? 'sc-result-title' : 'sc-simulation-title');
        if (moveFocus) {
            (step === 3 ? document.getElementById('sc-result-title') : title).focus({ preventScroll: true });
            simulator.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (step === 1) {
            showStep(2, true);
            return;
        }
        if (!updateResults()) {
            syncBill(model.parseBill(billInput.value), false);
            billInput.focus();
            return;
        }
        billInput.blur();
        showStep(3, true);
    });
    previous.addEventListener('click', () => showStep(Math.max(1, step - 1), true));

    // Keep the action above the on-screen keyboard when the visual viewport shrinks.
    function updateKeyboardInset() {
        const viewport = window.visualViewport;
        const inset = viewport && document.activeElement === billInput
            ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop) : 0;
        document.documentElement.style.setProperty('--sc-keyboard-inset', (inset > 100 ? inset : 0) + 'px');
    }
    billInput.addEventListener('focus', updateKeyboardInset);
    billInput.addEventListener('blur', updateKeyboardInset);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', updateKeyboardInset);

    function toast(message) {
        const status = document.getElementById('sc-share-status');
        clearTimeout(toastTimeout);
        status.textContent = message;
        status.hidden = false;
        toastTimeout = setTimeout(() => { status.hidden = true; }, 4500);
    }

    document.querySelectorAll('[data-share]').forEach(button => button.addEventListener('click', async () => {
        // Share only the card's address, never campaign parameters or a visitor's bill.
        const url = new URL(window.location.pathname, window.location.origin).href;
        try {
            if (navigator.share) {
                await navigator.share({ title: 'Klyfe | Mais sol. Menos conta.', text: 'Descubra as possibilidades da energia solar para seu imóvel.', url });
            } else if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(url);
                toast('Link do cartão copiado. Pronto para compartilhar!');
            } else toast('Copie o endereço desta página para compartilhar o cartão.');
        } catch (err) {
            if (err.name !== 'AbortError') toast('Você pode copiar o endereço desta página para compartilhar.');
        }
    }));

    syncBill(model.parseBill(billInput.value), false);
    showStep(1, false);
}());
