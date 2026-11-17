(function () {
    'use strict';
    const triggers = Array.from(document.querySelectorAll('[data-solar-triage-trigger], #hero-wa-triage-trigger'));
    const modal = document.getElementById('solar-wa-triage-modal');
    const model = window.KlyfeSolarPreview;
    if (!triggers.length || !modal || !model || typeof modal.showModal !== 'function') return;

    const closeBtn = document.getElementById('solar-triage-close');
    const stepBadge = document.getElementById('solar-triage-step-badge');
    const step1 = document.getElementById('solar-triage-step-1');
    const step2 = document.getElementById('solar-triage-step-2');
    const billInput = document.getElementById('solar-triage-bill');
    const errorEl = document.getElementById('solar-triage-error');
    const nextBtn = document.getElementById('solar-triage-next');
    const backBtn = document.getElementById('solar-triage-back');
    const editBtn = document.getElementById('solar-triage-edit');
    const skipLink = document.getElementById('solar-triage-skip');
    const optionalTag = document.getElementById('solar-triage-optional-tag');
    const noneChoice = document.getElementById('solar-triage-none-choice');
    const reviewHint = document.getElementById('solar-triage-review-hint');
    const submitLink = document.getElementById('solar-triage-submit');
    const otherPanel = document.getElementById('solar-triage-other-panel');
    const otherInput = document.getElementById('solar-triage-other-input');
    const otherDoneBtn = document.getElementById('solar-triage-other-done');
    const otherCancelBtn = document.getElementById('solar-triage-other-cancel');
    const otherBadge = document.getElementById('solar-triage-other-badge');
    const otherBadgeText = document.getElementById('solar-triage-other-badge-text');
    const otherHint = document.getElementById('solar-triage-other-hint');
    const step3 = document.getElementById('solar-triage-step-3');
    const contactForm = document.getElementById('solar-triage-contact-form');
    const nameInput = document.getElementById('solar-triage-name');
    const phoneInput = document.getElementById('solar-triage-phone');
    const citySelect = document.getElementById('solar-triage-city');
    const cityOtherWrap = document.getElementById('solar-triage-city-other-wrap');
    const cityOtherInput = document.getElementById('solar-triage-city-other');
    const choiceHint = document.getElementById('solar-triage-choice-hint');
    const contactError = document.getElementById('solar-triage-contact-error');
    const contactFallback = document.getElementById('solar-triage-contact-fallback');
    const contactSubmit = document.getElementById('solar-triage-contact-submit');
    const contactSubmitLabel = contactSubmit ? contactSubmit.querySelector('[data-label]') : null;
    const LEAD_SOURCE = 'site-solar-triage';
    const presetButtons = Array.from(modal.querySelectorAll('[data-triage-value]'));
    const resultFields = Array.from(modal.querySelectorAll('[data-triage-result]'));
    const growthOptions = Array.from(modal.querySelectorAll('input[name="solar-triage-growth"]'));
    const quantityFields = new Map(
        Array.from(modal.querySelectorAll('[data-triage-quantity]'), field => {
            const type = field.dataset.triageQuantity;
            const editButton = modal.querySelector(`[data-triage-qty-edit="${type}"]`);
            const badgeText = editButton ? editButton.querySelector('[data-triage-qty-value]') : null;
            return [
                type,
                {
                    field,
                    radios: Array.from(field.querySelectorAll('input[type="radio"]')),
                    editButton,
                    badgeText
                }
            ];
        })
    );
    const confirmedQuantities = new Set();
    let otherConfirmed = false;
    let editingOther = false;
    let previousOtherValue = '';

    const baseUrl = new URL(
        submitLink.dataset.whatsappUrl || triggers.find(t => t.dataset.whatsappUrl)?.dataset.whatsappUrl,
        window.location.href
    );
    const stepBodies = Array.from(modal.querySelectorAll('.solar-triage-body'));
    const isTouchPrimary = () => window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    let currentResult = { error: 'empty' };
    let lastValidBill = null;
    let currentStep = 1;
    let pendingWaMessage = '';
    let pendingAnswer = null;
    let submitting = false;
    let manualTimer;
    let manualPending = false;
    let manualReported = false;
    let resultReported = false;
    const selectedReported = new Set();

    function emit(name) {
        return !!(window.KlyfeTracking && window.KlyfeTracking.trackCalculatorEvent && window.KlyfeTracking.trackCalculatorEvent(name));
    }

    function reportManual() {
        clearTimeout(manualTimer);
        if (manualPending && currentResult && !currentResult.error && !manualReported) {
            manualReported = emit('calculator_value_entered');
        }
        manualPending = false;
    }

    function reportResultViewed() {
        if (document.visibilityState === 'hidden' || currentStep !== 2) return;
        if (currentResult && !currentResult.error && !resultReported) {
            resultReported = emit('calculator_result_viewed');
        }
    }

    function syncViewportHeight() {
        if (!modal.open || !window.visualViewport) return;
        const height = Math.round(window.visualViewport.height);
        modal.style.setProperty('--triage-vh', `${height}px`);
        modal.setAttribute('data-compact', String(height < 560));
    }

    function syncPanelVisibility() {
        const showOther = currentStep === 2 && editingOther && Boolean(otherPanel);
        step1.hidden = currentStep !== 1;
        step2.hidden = currentStep !== 2 || showOther;
        if (step3) step3.hidden = currentStep !== 3;
        if (otherPanel) otherPanel.hidden = !showOther;
    }

    function goToStep(step, focusInput) {
        currentStep = step;
        if (step === 1) editingOther = false;
        modal.setAttribute('data-step', String(step));
        syncPanelVisibility();
        stepBadge.textContent = stepLabel();
        stepBodies.forEach(body => { body.scrollTop = 0; });

        if (step === 1) {
            if (focusInput) {
                setTimeout(() => {
                    billInput.focus({ preventScroll: true });
                }, 40);
            }
        } else if (step === 2) {
            if (document.activeElement === billInput) billInput.blur();
            updateContact();
            reportResultViewed();
        } else if (step === 3 && nameInput && !isTouchPrimary()) {
            setTimeout(() => {
                nameInput.focus({ preventScroll: true });
            }, 40);
        }
    }

    function stepLabel() {
        if (currentStep === 1) return 'Etapa 1 de 3 · Leva menos de 1 minuto';
        if (currentStep === 3) return 'Etapa 3 de 3 · Último passo';
        return editingOther
            ? 'Etapa 2 de 3 · Especificar equipamento'
            : 'Etapa 2 de 3 · Seu consumo';
    }

    function clearOtherDetail() {
        otherConfirmed = false;
        editingOther = false;
        previousOtherValue = '';
        if (otherInput) {
            otherInput.value = '';
            otherInput.disabled = true;
        }
        if (otherPanel) otherPanel.hidden = true;
        if (otherBadge) otherBadge.hidden = true;
        if (otherHint) otherHint.hidden = true;
    }

    function collapseOpenDrawers(exceptType) {
        for (const [type] of quantityFields) {
            if (type === exceptType) continue;
            const cb = growthOptions.find(opt => opt.value === type);
            if (cb && cb.checked) confirmedQuantities.add(type);
        }
        if (exceptType !== 'other') {
            const otherCb = growthOptions.find(opt => opt.value === 'other');
            if (otherCb && otherCb.checked && otherInput && otherInput.value.trim()) {
                otherConfirmed = true;
            }
        }
    }

    function resetGrowthIfBillChanged(nextBill) {
        if (nextBill === lastValidBill) return;
        lastValidBill = nextBill;
        confirmedQuantities.clear();
        clearOtherDetail();
        growthOptions.forEach(option => { option.checked = false; });
        for (const { radios } of quantityFields.values()) {
            radios.forEach(radio => { radio.checked = radio.value === '1'; });
        }
    }

    function syncAmount(showEmptyPrompt) {
        const raw = billInput.value.trim();
        currentResult = model.calculate(billInput.value);
        const isEmpty = raw === '';
        const isValid = !currentResult.error;

        if (isValid) {
            resetGrowthIfBillChanged(currentResult.bill);
            errorEl.textContent = '';
            billInput.setAttribute('aria-invalid', 'false');
        } else if (isEmpty) {
            errorEl.textContent = showEmptyPrompt
                ? 'Digite o valor mais próximo da sua conta ou toque em uma referência abaixo.'
                : '';
            billInput.setAttribute('aria-invalid', String(Boolean(showEmptyPrompt)));
        } else {
            errorEl.textContent = currentResult.error;
            billInput.setAttribute('aria-invalid', 'true');
        }

        resultFields.forEach(el => {
            el.textContent = isValid ? model.currency(currentResult[el.dataset.triageResult]) : '—';
        });

        presetButtons.forEach(btn => {
            const matches = isValid && Number(btn.dataset.triageValue) === currentResult.bill;
            btn.setAttribute('aria-pressed', String(matches));
        });

        nextBtn.dataset.ready = String(isValid);
        return isValid;
    }

    function updateContact() {
        if (!currentResult || currentResult.error) return;
        const qualification = model.qualification(currentResult);
        const isPriority = qualification === 'priority';

        optionalTag.hidden = true;
        noneChoice.hidden = !isPriority;
        if (!isPriority) {
            const noneInput = noneChoice.querySelector('input');
            if (noneInput) noneInput.checked = false;
        }

        const otherText = otherInput ? otherInput.value.replace(/\s+/g, ' ').trim() : '';
        const checked = growthOptions.filter(opt => opt.checked);
        const growth = checked
            .filter(opt => opt.value !== 'none')
            .map(opt => {
                if (opt.value === 'other') return { type: 'other', detail: otherText };
                return {
                    type: opt.value,
                    quantity: Number(quantityFields.get(opt.value)?.radios.find(r => r.checked)?.value ?? 1)
                };
            });

        for (const [type, { field, editButton, badgeText, radios }] of quantityFields) {
            const selected = growth.some(item => item.type === type);
            const confirmed = selected && confirmedQuantities.has(type);
            const amount = Number(radios.find(r => r.checked)?.value ?? 1);

            field.hidden = !selected || confirmed;
            field.disabled = !selected || confirmed;

            if (editButton) {
                editButton.hidden = !confirmed;
                if (badgeText) badgeText.textContent = `${amount} unid.`;
            }
        }

        const otherSelected = growth.some(item => item.type === 'other');
        const showOtherBadge = otherSelected && otherConfirmed && Boolean(otherText);
        if (otherInput) {
            otherInput.disabled = !(otherSelected && editingOther);
        }
        syncPanelVisibility();
        if (currentStep === 2) stepBadge.textContent = stepLabel();
        if (otherBadge) {
            otherBadge.hidden = !showOtherBadge;
            if (otherBadgeText) otherBadgeText.textContent = otherText;
        }
        if (!otherSelected && otherHint) {
            otherHint.hidden = true;
        }

        // Uma resposta explícita (inclusive "Não, por enquanto") evita que a
        // recepção do WhatsApp pergunte de novo sobre novos aparelhos.
        const eligible = isPriority ? checked.length > 0 : growth.length > 0;
        reviewHint.hidden = isPriority || growth.length > 0;
        if (choiceHint && checked.length > 0) choiceHint.hidden = true;

        if (!eligible) {
            pendingWaMessage = '';
            pendingAnswer = null;
            submitLink.setAttribute('aria-disabled', 'true');
            return;
        }

        pendingAnswer = {
            growth: isPriority && checked.some(opt => opt.value === 'none') ? 'none' : growth,
            review: !isPriority
        };
        pendingWaMessage = model.siteLeadMessage({ result: currentResult, ...pendingAnswer });
        submitLink.removeAttribute('aria-disabled');
    }

    function buildWaUrl(message) {
        const waUrl = new URL(baseUrl.toString());
        waUrl.searchParams.set('text', message);
        return waUrl.toString();
    }

    function setOriginAttribution(sourceKey) {
        const origin = sourceKey || 'solar-hero-wa';
        submitLink.dataset.origin = origin;
        if (skipLink) skipLink.setAttribute('data-content-name', `${origin}-skip`);
    }

    function openTriage(event) {
        const sourceBtn = event && event.currentTarget ? event.currentTarget : triggers[0];
        setOriginAttribution(sourceBtn && sourceBtn.dataset.solarTriageTrigger);

        const calcBill = document.getElementById('solar-bill');
        if (!billInput.value && calcBill && calcBill.value.trim()) {
            billInput.value = calcBill.value.trim();
        }
        syncAmount(false);
        goToStep(1, !isTouchPrimary());
        if (!modal.open) modal.showModal();
        syncViewportHeight();
    }

    function advanceFromStep1() {
        if (!syncAmount(true)) {
            billInput.focus();
            return;
        }
        reportManual();
        billInput.value = currentResult.bill.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        goToStep(2, false);
    }

    triggers.forEach(btn => btn.addEventListener('click', openTriage));
    closeBtn.addEventListener('click', () => modal.close());

    modal.addEventListener('click', event => {
        if (event.target === modal) modal.close();
    });

    modal.addEventListener('close', () => {
        modal.style.removeProperty('--triage-vh');
        modal.removeAttribute('data-compact');
    });

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', syncViewportHeight);
        window.visualViewport.addEventListener('scroll', syncViewportHeight);
    }

    billInput.addEventListener('input', () => {
        billInput.value = billInput.value.replace(/^\s*R\$\s*/, '');
        manualPending = true;
        syncAmount(false);
        clearTimeout(manualTimer);
        manualTimer = setTimeout(reportManual, 700);
    });

    billInput.addEventListener('blur', () => {
        if (syncAmount(false)) {
            billInput.value = currentResult.bill.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
        reportManual();
    });

    billInput.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.isComposing) {
            event.preventDefault();
            advanceFromStep1();
        }
    });

    presetButtons.forEach(btn => btn.addEventListener('click', () => {
        clearTimeout(manualTimer);
        manualPending = false;
        billInput.value = Number(btn.dataset.triageValue).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        syncAmount(false);
        if (!selectedReported.has(btn.dataset.triageValue) && emit('calculator_value_selected')) {
            selectedReported.add(btn.dataset.triageValue);
        }
        if (document.activeElement === billInput) billInput.blur();
        nextBtn.focus({ preventScroll: true });
    }));

    nextBtn.addEventListener('click', advanceFromStep1);
    if (backBtn) backBtn.addEventListener('click', () => goToStep(1, false));

    editBtn.addEventListener('click', () => {
        goToStep(1, true);
        setTimeout(() => {
            billInput.select();
        }, 50);
    });

    function openOtherPanel() {
        if (!otherPanel || !otherInput) return;
        previousOtherValue = otherInput.value.replace(/\s+/g, ' ').trim();
        editingOther = true;
        otherConfirmed = false;
        if (otherHint) otherHint.hidden = true;
        updateContact();
        stepBodies.forEach(body => { body.scrollTop = 0; });
        otherInput.focus();
    }

    function cancelOtherPanel() {
        editingOther = false;
        if (document.activeElement === otherInput) otherInput.blur();
        const otherOption = growthOptions.find(opt => opt.value === 'other');
        if (previousOtherValue) {
            if (otherInput) otherInput.value = previousOtherValue;
            otherConfirmed = true;
            if (otherHint) otherHint.hidden = true;
        } else {
            if (otherOption) otherOption.checked = false;
            clearOtherDetail();
        }
        updateContact();
    }

    function confirmOtherInput() {
        if (!otherInput) return;
        const text = otherInput.value.replace(/\s+/g, ' ').trim();
        if (!text) {
            if (otherHint) otherHint.hidden = false;
            otherInput.focus();
            return;
        }
        otherInput.value = text;
        previousOtherValue = text;
        if (otherHint) otherHint.hidden = true;
        otherConfirmed = true;
        editingOther = false;
        if (document.activeElement === otherInput) otherInput.blur();
        updateContact();
    }

    growthOptions.forEach(option => option.addEventListener('change', () => {
        if (option.checked) {
            growthOptions.forEach(other => {
                if ((other.value === 'none') !== (option.value === 'none')) {
                    other.checked = false;
                    confirmedQuantities.delete(other.value);
                    if (other.value === 'other') clearOtherDetail();
                }
            });
            collapseOpenDrawers(option.value);
            if (option.value === 'other') {
                openOtherPanel();
                return;
            }
            confirmedQuantities.delete(option.value);
        } else {
            confirmedQuantities.delete(option.value);
            if (option.value === 'other') clearOtherDetail();
            const entry = quantityFields.get(option.value);
            if (entry) {
                entry.radios.forEach(radio => { radio.checked = radio.value === '1'; });
            }
        }
        updateContact();
    }));

    for (const [type, { field, editButton }] of quantityFields) {
        field.addEventListener('change', updateContact);
        field.addEventListener('click', event => {
            const target = event.target;
            if (!target || !target.matches('input[type="radio"]')) return;
            confirmedQuantities.add(type);
            updateContact();
        });
        field.addEventListener('keydown', event => {
            if (event.key !== 'Enter') return;
            const target = event.target;
            if (!target || !target.matches('input[type="radio"]')) return;
            event.preventDefault();
            confirmedQuantities.add(type);
            updateContact();
        });
        if (editButton) {
            editButton.addEventListener('click', () => {
                collapseOpenDrawers(type);
                confirmedQuantities.delete(type);
                updateContact();
                const checkedRadio = field.querySelector('input[type="radio"]:checked') || field.querySelector('input[type="radio"]');
                if (checkedRadio) checkedRadio.focus({ preventScroll: true });
            });
        }
    }

    if (otherInput) {
        otherInput.addEventListener('input', () => {
            if (otherHint) otherHint.hidden = true;
            updateContact();
        });
        otherInput.addEventListener('keydown', event => {
            if (event.key === 'Enter' && !event.isComposing) {
                event.preventDefault();
                confirmOtherInput();
            }
        });
    }
    if (otherDoneBtn) otherDoneBtn.addEventListener('click', confirmOtherInput);
    if (otherCancelBtn) otherCancelBtn.addEventListener('click', cancelOtherPanel);
    if (otherBadge && otherInput) {
        otherBadge.addEventListener('click', () => {
            collapseOpenDrawers('other');
            openOtherPanel();
        });
    }

    submitLink.addEventListener('click', event => {
        if (submitLink.getAttribute('aria-disabled') === 'true') {
            event.preventDefault();
            const hint = model.qualification(currentResult) === 'priority' && choiceHint ? choiceHint : reviewHint;
            hint.hidden = false;
            hint.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }
        reportManual();
        if (model.qualification(currentResult) === 'priority') {
            emit('calculator_whatsapp_click');
        }
        goToStep(3, true);
    });

    function formatPhone(value) {
        const digits = String(value || '').replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '').slice(0, 11);
        if (digits.length <= 2) return digits ? `(${digits}` : '';
        const ddd = digits.slice(0, 2);
        const rest = digits.slice(2);
        if (rest.length <= 4) return `(${ddd}) ${rest}`;
        const split = rest.length === 9 ? 5 : 4;
        return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`;
    }

    function setContactError(message, field) {
        contactError.textContent = message || '';
        [nameInput, phoneInput, citySelect, cityOtherInput].filter(Boolean).forEach(el => {
            el.setAttribute('aria-invalid', String(el === field));
        });
        if (field) field.focus();
    }

    function setSubmitting(state) {
        submitting = state;
        contactSubmit.disabled = state;
        contactSubmit.setAttribute('aria-busy', String(state));
        if (contactSubmitLabel) {
            contactSubmitLabel.textContent = state ? 'Enviando...' : 'Receber análise no WhatsApp';
        }
    }

    // Mensagem em linhas com rótulo (Nome, Cidade da instalação, Conta de luz, Novos aparelhos):
    // é o que a recepção do WhatsApp (Agentes-Klyfe) reconhece, então ela não pergunta de novo.
    // O nome vai completo para a Central não encurtar o nome do formulário.
    function contactMessage(nome, cidade) {
        return model.siteLeadMessage({ result: currentResult, ...(pendingAnswer || {}), name: nome, city: cidade });
    }

    function selectedCity() {
        if (citySelect.value !== '__other') return citySelect.value;
        return cityOtherInput ? cityOtherInput.value.replace(/\s+/g, ' ').replace(/[.!?;]+$/, '').trim() : '';
    }

    if (contactForm && nameInput && phoneInput && citySelect && contactSubmit) {
        phoneInput.addEventListener('input', () => {
            phoneInput.value = formatPhone(phoneInput.value);
        });

        // O aviso de campo inválido some assim que o cliente corrige, sem esperar novo envio.
        [nameInput, phoneInput, citySelect, cityOtherInput].filter(Boolean).forEach(field => {
            field.addEventListener(field === citySelect ? 'change' : 'input', () => {
                if (field.getAttribute('aria-invalid') === 'true') setContactError('');
            });
        });

        citySelect.addEventListener('change', () => {
            const other = citySelect.value === '__other';
            if (cityOtherWrap) cityOtherWrap.hidden = !other;
            if (cityOtherInput) {
                cityOtherInput.disabled = !other;
                if (other) cityOtherInput.focus();
            }
        });

        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            if (submitting) return;
            if (contactForm.elements.website_url && contactForm.elements.website_url.value) return;

            const nome = nameInput.value.replace(/\s+/g, ' ').trim();
            const telefone = phoneInput.value.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '');
            const cidade = selectedCity();

            if (nome.length < 2) return setContactError('Informe seu nome.', nameInput);
            if (!/^\d{10,11}$/.test(telefone)) return setContactError('Informe um WhatsApp com DDD. Ex.: (83) 99999-9999', phoneInput);
            if (!citySelect.value) return setContactError('Selecione a cidade do imóvel.', citySelect);
            if (cidade.length < 2) return setContactError('Digite o nome da cidade.', cityOtherInput);
            if (!pendingWaMessage) {
                goToStep(2, false);
                return;
            }
            setContactError('');
            if (contactFallback) contactFallback.hidden = true;

            const waUrl = buildWaUrl(contactMessage(nome, cidade));
            const tracking = window.KlyfeTracking;
            if (!tracking || typeof tracking.submitLpLead !== 'function') {
                window.location.href = waUrl;
                return;
            }

            setSubmitting(true);
            tracking.submitLpLead({
                nome,
                telefone,
                cidade,
                faixa_conta: `${model.currency(currentResult.bill)}/mês`,
                mensagem: contactMessage(nome, cidade),
                source: LEAD_SOURCE,
                content_name: LEAD_SOURCE,
                cta_origin: submitLink.dataset.origin || 'solar-hero-wa',
                servico: 'Energia Solar Fotovoltaica',
                redirect: false
            }).then(() => {
                setSubmitting(false);
                window.location.href = waUrl;
            }).catch(() => {
                // Nunca travar o cliente: sem registro no site, a conversa segue pelo WhatsApp
                // com os mesmos dados, e a recepção da Central atende por lá.
                if (contactSubmitLabel) contactSubmitLabel.textContent = 'Abrindo o WhatsApp...';
                if (contactFallback) {
                    contactFallback.href = waUrl;
                    contactFallback.hidden = false;
                }
                window.location.href = waUrl;
            });
        });
    }

    window.addEventListener('klyfe:consent', reportResultViewed);
    document.addEventListener('visibilitychange', reportResultViewed);
}());
