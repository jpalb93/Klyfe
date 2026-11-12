(function () {
    'use strict';
    const root = document.getElementById('solar-preview');
    const model = window.KlyfeSolarPreview;
    if (!root || !model) return;
    const bill = document.getElementById('solar-bill');
    const error = document.getElementById('solar-calc-error');
    const yearly = document.getElementById('result-yearly');
    const help = document.getElementById('solar-result-help');
    const summary = document.getElementById('solar-preview-summary');
    const nextStep = document.getElementById('solar-preview-next');
    const openButton = document.getElementById('solar-preview-open');
    const editButton = document.getElementById('solar-preview-edit');
    const noGrowthButton = document.getElementById('solar-preview-no-growth');
    const noGrowthChoice = document.getElementById('solar-preview-no-growth-choice');
    const cta = document.getElementById('btn-calc-pdf');
    const review = document.getElementById('solar-preview-review');
    const growthOptions = Array.from(review.querySelectorAll('input[name="solar-growth"]'));
    const quantityFields = new Map(Array.from(review.querySelectorAll('[data-solar-quantity]'), field => [
        field.dataset.solarQuantity, { field, options: Array.from(field.querySelectorAll('input[type="radio"]')) }
    ]));
    const presets = root.querySelectorAll('[data-value]');
    const financialValues = root.querySelectorAll('[data-result]');
    const comparison = document.getElementById('solar-cost-comparison');
    const contactUrl = new URL(cta.dataset.whatsappUrl, window.location.href);
    let result, manualTimer, manualPending = false, manualReported = false;
    let resultVisible = false, resultReported = false;
    const selectedReported = new Set();
    function emit(name) {
        return !!(window.KlyfeTracking && window.KlyfeTracking.trackCalculatorEvent && window.KlyfeTracking.trackCalculatorEvent(name));
    }
    function reportView() {
        if (document.visibilityState === 'hidden') return;
        if (result && !result.error && (resultVisible || summary.open) && !resultReported) {
            resultReported = emit('calculator_result_viewed');
        }
    }
    function reportManual() {
        clearTimeout(manualTimer);
        if (manualPending && result && !result.error && !manualReported) manualReported = emit('calculator_value_entered');
        manualPending = false;
    }
    function updateContact() {
        const qualification = model.qualification(result);
        const priority = qualification === 'priority';
        const selections = growthOptions.filter(option => option.checked);
        const growth = selections.filter(option => option.value !== 'none').map(option => ({
            type: option.value,
            quantity: Number(quantityFields.get(option.value)?.options.find(amount => amount.checked)?.value ?? 1)
        }));
        for (const [type, {field}] of quantityFields) {
            const selected = growth.some(item => item.type === type);
            field.hidden = !selected;
            field.disabled = !selected;
        }
        const eligibleForReview = qualification === 'review' && growth.length > 0;
        if (!priority && !eligibleForReview) {
            cta.removeAttribute('href');
            cta.setAttribute('aria-disabled', 'true');
            return;
        }

        const message = priority
            ? model.whatsappMessage(result, selections.some(option => option.value === 'none') ? 'none' : growth)
            : model.reviewMessage(result, growth);
        contactUrl.searchParams.set('text', message);
        cta.setAttribute('data-content-category', priority ? 'solar' : 'solar-review');
        cta.removeAttribute('aria-disabled');
        cta.href = contactUrl.toString();
    }
    function render() {
        const previousBill = result?.bill;
        result = model.calculate(bill.value);
        const empty = bill.value.trim() === '';
        const valid = !result.error;
        const qualification = model.qualification(result);
        bill.setAttribute('aria-invalid', String(!empty && !valid));
        error.textContent = empty ? '' : (result.error || '');
        financialValues.forEach(element => {
            element.textContent = valid ? model.currency(result[element.dataset.result]) : '—';
        });
        root.setAttribute('data-has-result', String(valid));
        root.setAttribute('data-qualification', qualification);
        nextStep.hidden = !valid;
        review.hidden = !valid;
        noGrowthButton.hidden = qualification !== 'review';
        noGrowthChoice.hidden = qualification !== 'priority';
        if (result.bill !== previousBill) {
            growthOptions.forEach(option => { option.checked = false; });
            for (const {options} of quantityFields.values()) {
                options.forEach(option => { option.checked = option.value === '1'; });
            }
        }
        comparison.hidden = !valid;
        help.textContent = valid ? 'Projeções baseadas na média mensal informada, sem reajustes de tarifa ou alterações de consumo.' : 'Informe sua média mensal para ver os gastos projetados.';
        presets.forEach(button => button.setAttribute('aria-pressed', String(valid && Number(button.dataset.value) === result.bill)));
        updateContact();
        reportView();
    }
    function openSummary() {
        if (!result || result.error || summary.open) return;
        openButton.focus({preventScroll:true});
        reportManual();
        summary.showModal();
        reportView();
    }
    bill.addEventListener('input', () => {
        // Accept pasted currency without repeating the fixed R$ prefix.
        bill.value = bill.value.replace(/^\s*R\$\s*/, '');
        manualPending = true;
        render();
        clearTimeout(manualTimer);
        manualTimer = setTimeout(reportManual, 700);
    });
    bill.addEventListener('blur', () => {
        if (result && !result.error) bill.value = result.bill.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
        render(); reportManual();
    });
    bill.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.isComposing) openSummary();
    });
    openButton.addEventListener('click', openSummary);
    editButton.addEventListener('click', () => {
        summary.close();
        bill.focus();
        bill.select();
    });
    noGrowthButton.addEventListener('click', () => {
        growthOptions.forEach(option => { option.checked = false; });
        updateContact();
        summary.close();
        yearly.focus();
    });
    growthOptions.forEach(option => option.addEventListener('change', () => {
        if (option.checked) {
            growthOptions.forEach(other => {
                if ((other.value === 'none') !== (option.value === 'none')) other.checked = false;
            });
        }
        updateContact();
    }));
    for (const {field} of quantityFields.values()) field.addEventListener('change', updateContact);
    presets.forEach(button => button.addEventListener('click', () => {
        clearTimeout(manualTimer); manualPending = false;
        bill.value = Number(button.dataset.value).toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
        render();
        if (!selectedReported.has(button.dataset.value) && emit('calculator_value_selected')) selectedReported.add(button.dataset.value);
    }));
    cta.addEventListener('click', event => {
        if (!summary.open || cta.getAttribute('aria-disabled') === 'true') {
            event.preventDefault();
            return;
        }
        reportManual();
        if (model.qualification(result) === 'priority') emit('calculator_whatsapp_click');
    });
    window.addEventListener('klyfe:consent', reportView);
    document.addEventListener('visibilitychange', reportView);
    if (window.IntersectionObserver) {
        const observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.target === yearly) {
                    resultVisible = entry.isIntersecting && entry.intersectionRatio >= .5;
                    reportView();
                }
                if (entry.target === root) document.body.classList.toggle('solar-preview-active', entry.isIntersecting);
            });
        }, {threshold:[0, .5]});
        observer.observe(yearly); observer.observe(root);
    } else {
        const isVisible = element => {
            const rect = element.getBoundingClientRect();
            return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
        };
        const updateVisibility = () => {
            resultVisible = isVisible(yearly);
            document.body.classList.toggle('solar-preview-active', isVisible(root));
            reportView();
        };
        window.addEventListener('scroll', updateVisibility, {passive:true});
        window.addEventListener('resize', updateVisibility);
        updateVisibility();
    }
    render();
}());
