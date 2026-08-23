/**
 * Interface Reativa e Motor Client-Side da Calculadora Solar Klyfe
 * Atualiza todos os cálculos, gráficos, tabelas e avisos em tempo real sem recarregar a página.
 */

(function () {
    'use strict';

    // ── CONFIGURAÇÃO CENTRALIZADA CLIENT-SIDE ──
    const config = window.SOLAR_CALCULATOR_CONFIG || {
        commercialTable: [
            { consumoKwh: 300, kwp: 3.0, preco: 10000 },
            { consumoKwh: 500, kwp: 5.4, preco: 16000 },
            { consumoKwh: 1000, kwp: 10.2, preco: 26000 },
            { consumoKwh: 1500, kwp: 15.0, preco: 39000 },
            { consumoKwh: 2000, kwp: 20.4, preco: 50000 },
            { consumoKwh: 2500, kwp: 25.2, preco: 60000 },
            { consumoKwh: 3000, kwp: 30.0, preco: 70000 },
            { consumoKwh: 5000, kwp: 48.0, preco: 113000 }
        ],
        modules: [
            { label: '550 W', watts: 550 },
            { label: '580 W', watts: 580 },
            { label: '590 W', watts: 590 },
            { label: '600 W (Padrão)', watts: 600, default: true },
            { label: '610 W', watts: 610 },
            { label: '620 W', watts: 620 },
            { label: '650 W', watts: 650 }
        ],
        acTechnologyFactors: {
            'inverter': 0.55,
            'convencional': 0.75,
            'nao_informado': 0.65
        },
        defaultProductivity: 130,
        pricePerKwpLimits: { minUsual: 2200, maxUsual: 4500 },
        defaultInterestRateMonthly: 1.39
    };

    // Estado local da calculadora
    let equipmentList = [];
    let isInternalView = true;

    // ── INTERPOLAÇÃO ──
    function interpolateTable(kwh, key) {
        if (kwh <= 0) return 0;
        const table = config.commercialTable;
        if (kwh <= table[0].consumoKwh) {
            return (kwh / table[0].consumoKwh) * table[0][key];
        }
        if (kwh >= table[table.length - 1].consumoKwh) {
            const last = table[table.length - 1];
            const prev = table[table.length - 2];
            const slope = (last[key] - prev[key]) / (last.consumoKwh - prev.consumoKwh);
            return last[key] + (kwh - last.consumoKwh) * slope;
        }
        for (let i = 0; i < table.length - 1; i++) {
            const p1 = table[i];
            const p2 = table[i + 1];
            if (kwh >= p1.consumoKwh && kwh <= p2.consumoKwh) {
                const factor = (kwh - p1.consumoKwh) / (p2.consumoKwh - p1.consumoKwh);
                return p1[key] + factor * (p2[key] - p1[key]);
            }
        }
        return 0;
    }

    // ── PMT ──
    function calculatePMT(pv, iMonthly, nMonths) {
        if (pv <= 0 || nMonths <= 0) return 0;
        if (iMonthly <= 0) return pv / nMonths;
        const i = iMonthly / 100;
        const factor = Math.pow(1 + i, nMonths);
        return pv * (i * factor) / (factor - 1);
    }

    // ── INICIALIZAÇÃO DE ELEMENTOS DO DOM ──
    document.addEventListener('DOMContentLoaded', () => {
        initEvents();
        renderEquipmentList();
        recalculateAll();
    });

    function initEvents() {
        // Alternância de método A vs B
        const methodSelect = document.getElementById('calc-method');
        if (methodSelect) {
            methodSelect.addEventListener('change', (e) => {
                const isB = e.target.value === 'B';
                document.getElementById('method-a-box').style.display = isB ? 'none' : 'block';
                document.getElementById('method-b-box').style.display = isB ? 'block' : 'none';
                recalculateAll();
            });
        }

        // Inputs diretos que disparam cálculo instantâneo
        const inputsToListen = [
            'inp-current-kwh', 'inp-current-bill', 'inp-additional-kwh',
            'inp-growth-margin', 'inp-module-watts', 'inp-custom-module-watts',
            'inp-productivity', 'inp-discount', 'inp-addition', 'inp-manual-price',
            'inp-down-payment', 'inp-interest-rate', 'inp-term-months',
            'inp-residual-bill', 'inp-tariff-increase', 'inp-social-tariff',
            'inp-customer-name', 'inp-customer-phone', 'inp-customer-city'
        ];

        inputsToListen.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', recalculateAll);
                el.addEventListener('change', recalculateAll);
            }
        });

        // 12 meses do método B
        for (let i = 1; i <= 12; i++) {
            const monthEl = document.getElementById(`inp-hist-month-${i}`);
            if (monthEl) {
                monthEl.addEventListener('input', recalculateAll);
            }
        }

        // Botões de ação rápida de equipamento
        const quickBtns = document.querySelectorAll('.btn-quick-add');
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const presetKey = btn.getAttribute('data-preset');
                addEquipmentFromPreset(presetKey);
            });
        });

        // Botão adicionar equipamento manual
        const btnAddEq = document.getElementById('btn-add-equipment');
        if (btnAddEq) {
            btnAddEq.addEventListener('click', () => addEquipmentFromPreset('outro'));
        }

        // Toggle Visão Interna vs Visão Cliente
        const toggleViewBtn = document.getElementById('btn-toggle-view');
        if (toggleViewBtn) {
            toggleViewBtn.addEventListener('click', () => {
                isInternalView = !isInternalView;
                document.body.classList.toggle('client-view-mode', !isInternalView);
                toggleViewBtn.innerHTML = isInternalView
                    ? '<i class="fas fa-eye-slash"></i> Alternar para Visão Cliente'
                    : '<i class="fas fa-eye"></i> Alternar para Visão Interna';

                const internalElements = document.querySelectorAll('.internal-only');
                internalElements.forEach(el => {
                    el.style.display = isInternalView ? 'block' : 'none';
                });
            });
        }

        // Botão Copiar WhatsApp
        const btnCopyWa = document.getElementById('btn-copy-whatsapp');
        if (btnCopyWa) {
            btnCopyWa.addEventListener('click', copyWhatsAppSummary);
        }

        // Botão Salvar CRM
        const btnSaveCrm = document.getElementById('btn-save-crm');
        if (btnSaveCrm) {
            btnSaveCrm.addEventListener('click', saveSimulationToCRM);
        }
    }

    // ── GESTÃO DE EQUIPAMENTOS ──
    function addEquipmentFromPreset(presetKey) {
        const presets = {
            'ar_9k': { name: 'Ar-condicionado 9.000 BTU/h', powerW: 800, factor: 0.65, hours: 8, days: 30, tech: 'inverter' },
            'ar_12k': { name: 'Ar-condicionado 12.000 BTU/h', powerW: 1000, factor: 0.65, hours: 8, days: 30, tech: 'inverter' },
            'ar_18k': { name: 'Ar-condicionado 18.000 BTU/h', powerW: 1500, factor: 0.65, hours: 8, days: 30, tech: 'inverter' },
            'ar_24k': { name: 'Ar-condicionado 24.000 BTU/h', powerW: 2000, factor: 0.65, hours: 8, days: 30, tech: 'inverter' },
            'chuveiro': { name: 'Chuveiro Elétrico', powerW: 5500, factor: 1.00, hours: 0.75, days: 30, tech: 'nao_informado' },
            'geladeira': { name: 'Geladeira Residencial', powerW: 150, factor: 0.35, hours: 24, days: 30, tech: 'nao_informado' },
            'freezer': { name: 'Freezer Vertical/Horizontal', powerW: 200, factor: 0.45, hours: 24, days: 30, tech: 'nao_informado' },
            'outro': { name: 'Novo Equipamento', powerW: 1000, factor: 0.70, hours: 4, days: 30, tech: 'nao_informado' }
        };

        const preset = presets[presetKey] || presets['outro'];
        equipmentList.push({
            id: `eq_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            name: preset.name,
            quantity: 1,
            powerW: preset.powerW,
            hoursPerDay: preset.hours,
            daysPerMonth: preset.days,
            factor: preset.factor,
            technology: preset.tech,
            isManualPower: false
        });

        renderEquipmentList();
        recalculateAll();
    }

    function removeEquipment(id) {
        equipmentList = equipmentList.filter(e => e.id !== id);
        renderEquipmentList();
        recalculateAll();
    }

    function renderEquipmentList() {
        const container = document.getElementById('equipment-list-container');
        if (!container) return;

        if (equipmentList.length === 0) {
            container.innerHTML = `
                <div class="empty-eq-state">
                    <i class="fas fa-plug" style="font-size: 1.5rem; color: var(--text-muted); margin-bottom: 0.5rem;"></i>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">Nenhum equipamento adicional adicionado.</p>
                </div>
            `;
            return;
        }

        let html = '';
        equipmentList.forEach((eq, index) => {
            const factor = config.acTechnologyFactors[eq.technology] || eq.factor;
            const monthlyKwh = (eq.quantity * (eq.powerW / 1000) * eq.hoursPerDay * eq.daysPerMonth * factor).toFixed(1);

            html += `
                <div class="eq-item-card" data-id="${eq.id}">
                    <div class="eq-item-header">
                        <input type="text" class="eq-inp-name" value="${eq.name}" placeholder="Nome do equipamento">
                        <button type="button" class="btn-remove-eq" data-id="${eq.id}" title="Remover">&times;</button>
                    </div>
                    <div class="eq-item-body grid grid-cols-4" style="gap: 0.5rem; align-items: center;">
                        <div>
                            <label class="lbl-sub">Qtd</label>
                            <input type="number" class="eq-inp-qty" value="${eq.quantity}" min="1" max="99">
                        </div>
                        <div>
                            <label class="lbl-sub">Potência (W)</label>
                            <input type="number" class="eq-inp-power" value="${eq.powerW}" min="1">
                        </div>
                        <div>
                            <label class="lbl-sub">Horas/dia</label>
                            <input type="number" class="eq-inp-hours" value="${eq.hoursPerDay}" step="0.5" min="0" max="24">
                        </div>
                        <div>
                            <label class="lbl-sub">Consumo/mês</label>
                            <div class="eq-result-kwh">${monthlyKwh} kWh</div>
                        </div>
                    </div>
                    ${eq.name.toLowerCase().includes('ar') ? `
                        <div style="margin-top: 0.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem;">
                            <label style="color: var(--text-muted);">Tecnologia:</label>
                            <select class="eq-inp-tech" style="padding: 0.2rem 0.4rem; font-size: 0.75rem;">
                                <option value="inverter" ${eq.technology === 'inverter' ? 'selected' : ''}>Inverter (fator 0,55)</option>
                                <option value="convencional" ${eq.technology === 'convencional' ? 'selected' : ''}>Convencional (fator 0,75)</option>
                                <option value="nao_informado" ${eq.technology === 'nao_informado' ? 'selected' : ''}>Padrão (fator 0,65)</option>
                            </select>
                        </div>
                    ` : ''}
                    ${eq.isManualPower ? `<div class="badge-manual-power"><i class="fas fa-edit"></i> Potência informada manualmente</div>` : ''}
                </div>
            `;
        });

        container.innerHTML = html;

        // Binds dos inputs dos cards renderizados
        container.querySelectorAll('.eq-item-card').forEach(card => {
            const id = card.getAttribute('data-id');
            const item = equipmentList.find(e => e.id === id);
            if (!item) return;

            card.querySelector('.eq-inp-name').addEventListener('input', (e) => { item.name = e.target.value; recalculateAll(); });
            card.querySelector('.eq-inp-qty').addEventListener('input', (e) => { item.quantity = Number(e.target.value) || 1; recalculateAll(); });
            card.querySelector('.eq-inp-power').addEventListener('input', (e) => {
                item.powerW = Number(e.target.value) || 0;
                item.isManualPower = true;
                recalculateAll();
            });
            card.querySelector('.eq-inp-hours').addEventListener('input', (e) => { item.hoursPerDay = Number(e.target.value) || 0; recalculateAll(); });

            const techSelect = card.querySelector('.eq-inp-tech');
            if (techSelect) {
                techSelect.addEventListener('change', (e) => { item.technology = e.target.value; recalculateAll(); });
            }

            card.querySelector('.btn-remove-eq').addEventListener('click', () => removeEquipment(id));
        });
    }

    // ── RECALCULA TUDO EM TEMPO REAL ──
    function recalculateAll() {
        const method = (document.getElementById('calc-method') || {}).value || 'A';

        // 1. Apuração de consumo atual
        let currentKwh = 0;
        if (method === 'B') {
            let sum = 0, count = 0;
            for (let i = 1; i <= 12; i++) {
                const val = Number((document.getElementById(`inp-hist-month-${i}`) || {}).value);
                if (!isNaN(val) && val > 0) {
                    sum += val;
                    count++;
                }
            }
            currentKwh = count > 0 ? sum / count : 0;
            const avgBadge = document.getElementById('hist-avg-display');
            if (avgBadge) avgBadge.innerText = `${Math.round(currentKwh)} kWh/mês (${count} meses)`;
        } else {
            currentKwh = Number((document.getElementById('inp-current-kwh') || {}).value) || 0;
        }

        // 2. Consumo de equipamentos adicionados
        let equipmentKwhTotal = 0;
        equipmentList.forEach(eq => {
            const factor = config.acTechnologyFactors[eq.technology] || eq.factor;
            equipmentKwhTotal += eq.quantity * (eq.powerW / 1000) * eq.hoursPerDay * eq.daysPerMonth * factor;
        });

        // 3. Consumo manual adicional
        const additionalManualKwh = Number((document.getElementById('inp-additional-kwh') || {}).value) || 0;

        // 4. Subtotal e Margem
        const rawProjectedKwh = currentKwh + equipmentKwhTotal + additionalManualKwh;
        const growthMargin = Number((document.getElementById('inp-growth-margin') || {}).value) || 0;
        const consideredKwh = Math.round(rawProjectedKwh * (1 + growthMargin / 100));

        // Atualiza labels de consumo no DOM
        setText('res-current-kwh', `${Math.round(currentKwh)} kWh/mês`);
        setText('res-equipment-kwh', `+${Math.round(equipmentKwhTotal)} kWh/mês`);
        setText('res-considered-kwh', `${consideredKwh} kWh/mês`);

        // 5. Potência de referência (kWp) via tabela Klyfe
        const kwpRef = interpolateTable(consideredKwh, 'kwp');

        // 6. Módulos
        let moduleWatts = Number((document.getElementById('inp-module-watts') || {}).value) || 600;
        if (moduleWatts === 0) {
            moduleWatts = Number((document.getElementById('inp-custom-module-watts') || {}).value) || 600;
        }

        const moduleQty = Math.ceil((kwpRef * 1000) / moduleWatts);
        const installedKwp = Math.round(((moduleQty * moduleWatts) / 1000) * 100) / 100;

        setText('res-kwp-ref', `${kwpRef.toFixed(2)} kWp`);
        setText('res-modules-desc', `${moduleQty} × ${moduleWatts}W`);
        setText('res-installed-kwp', `${installedKwp.toFixed(2)} kWp`);

        // Alerta de sobredimensionamento / subdimensionamento
        const sizingDiff = kwpRef > 0 ? Math.round(((installedKwp - kwpRef) / kwpRef) * 100) : 0;
        const sizingAlertBox = document.getElementById('sizing-adjustment-alert');
        if (sizingAlertBox) {
            if (sizingDiff > 5) {
                sizingAlertBox.style.display = 'block';
                sizingAlertBox.className = 'alert-box alert-info';
                sizingAlertBox.innerHTML = `<i class="fas fa-info-circle"></i> A configuração resulta em sobredimensionamento de +${sizingDiff}%.`;
            } else if (sizingDiff < -5) {
                sizingAlertBox.style.display = 'block';
                sizingAlertBox.className = 'alert-box alert-warning';
                sizingAlertBox.innerHTML = `<i class="fas fa-exclamation-triangle"></i> A configuração resulta em subdimensionamento de ${sizingDiff}%.`;
            } else {
                sizingAlertBox.style.display = 'none';
            }
        }

        // 7. Geração e Cobertura
        const productivity = Number((document.getElementById('inp-productivity') || {}).value) || config.defaultProductivity;
        const estimatedGen = Math.round(installedKwp * productivity);
        const coverage = consideredKwh > 0 ? Math.round((estimatedGen / consideredKwh) * 100) : 0;

        setText('res-estimated-gen', `${estimatedGen.toLocaleString('pt-BR')} kWh/mês`);
        setText('res-coverage', `${coverage}%`);

        // 8. Precificação Comercial
        const referencePrice = Math.round(interpolateTable(consideredKwh, 'preco'));
        const discount = Number((document.getElementById('inp-discount') || {}).value) || 0;
        const addition = Number((document.getElementById('inp-addition') || {}).value) || 0;
        const manualPrice = Number((document.getElementById('inp-manual-price') || {}).value) || 0;

        let finalPrice = manualPrice > 0 ? manualPrice : (referencePrice - discount + addition);
        finalPrice = Math.max(0, finalPrice);

        const pricePerKwp = installedKwp > 0 ? Math.round(finalPrice / installedKwp) : 0;

        setText('res-reference-price', `R$ ${referencePrice.toLocaleString('pt-BR')}`);
        setText('res-final-price', `R$ ${finalPrice.toLocaleString('pt-BR')}`);
        setText('res-price-per-kwp', `R$ ${pricePerKwp.toLocaleString('pt-BR')}/kWp`);

        // Alerta Extrapolação da tabela
        const extrapolationBox = document.getElementById('extrapolating-table-alert');
        if (extrapolatingBox) {
            if (consideredKwh < 300 || consideredKwh > 5000) {
                extrapolatingBox.style.display = 'block';
            } else {
                extrapolatingBox.style.display = 'none';
            }
        }

        // 9. Simulação Financeira
        const downPayment = Number((document.getElementById('inp-down-payment') || {}).value) || 0;
        const financedAmount = Math.max(0, finalPrice - downPayment);
        const interestRate = Number((document.getElementById('inp-interest-rate') || {}).value) || config.defaultInterestRateMonthly;
        const termMonths = Number((document.getElementById('inp-term-months') || {}).value) || 60;

        const monthlyInstallment = calculatePMT(financedAmount, interestRate, termMonths);
        const totalFinancedPaid = monthlyInstallment * termMonths + downPayment;

        setText('res-financed-amount', `R$ ${financedAmount.toLocaleString('pt-BR')}`);
        setText('res-installment-amount', `R$ ${monthlyInstallment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
        setText('res-total-financed-paid', `R$ ${totalFinancedPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);

        // 10. Comparativo Antes x Depois
        const currentBill = Number((document.getElementById('inp-current-bill') || {}).value) || 0;
        const residualBill = Number((document.getElementById('inp-residual-bill') || {}).value) || Math.round(consideredKwh * 0.08);

        const projectedBillWithoutSolar = currentBill > 0 && currentKwh > 0 ? Math.round((currentBill / currentKwh) * consideredKwh) : 0;
        const totalOutlayWithSolar = monthlyInstallment + residualBill;
        const monthlyDiff = projectedBillWithoutSolar - totalOutlayWithSolar;

        setText('res-bill-without-solar', `R$ ${projectedBillWithoutSolar.toLocaleString('pt-BR')}`);
        setText('res-residual-bill', `R$ ${residualBill.toLocaleString('pt-BR')}`);
        setText('res-total-outlay-solar', `R$ ${Math.round(totalOutlayWithSolar).toLocaleString('pt-BR')}`);

        const diffEl = document.getElementById('res-monthly-diff');
        if (diffEl) {
            if (monthlyDiff >= 0) {
                diffEl.className = 'metric-value savings-positive';
                diffEl.innerText = `Economia de R$ ${Math.round(monthlyDiff).toLocaleString('pt-BR')}/mês`;
            } else {
                diffEl.className = 'metric-value savings-negative';
                diffEl.innerText = `Acréscimo de R$ ${Math.abs(Math.round(monthlyDiff)).toLocaleString('pt-BR')}/mês`;
            }
        }

        // 11. Payback Simples
        const monthlySavingsAfterPayoff = Math.max(0, projectedBillWithoutSolar - residualBill);
        let paybackText = 'N/D';
        if (finalPrice > 0 && monthlySavingsAfterPayoff > 0) {
            const months = finalPrice / monthlySavingsAfterPayoff;
            const y = Math.floor(months / 12);
            const m = Math.round(months % 12);
            paybackText = `${y} ano${y !== 1 ? 's' : ''}${m > 0 ? ` e ${m} mêt${m !== 1 ? 'es' : 's'}` : ''}`;
        }
        setText('res-payback-formatted', paybackText);

        // 12. Score de Qualidade e Observações Automáticas
        renderObservationsAndValidations(currentKwh, currentBill, consideredKwh, installedKwp, finalPrice, pricePerKwp, monthlyInstallment, projectedBillWithoutSolar);

        // 13. Cenários Comparativos
        renderScenarios(paramsFromDOM());
    }

    // Helper para ler parâmetros atuais do DOM
    function paramsFromDOM() {
        return {
            customerName: (document.getElementById('inp-customer-name') || {}).value || '',
            customerPhone: (document.getElementById('inp-customer-phone') || {}).value || '',
            customerCity: (document.getElementById('inp-customer-city') || {}).value || '',
            currentKwh: Number((document.getElementById('inp-current-kwh') || {}).value) || 0,
            growthMarginPercent: Number((document.getElementById('inp-growth-margin') || {}).value) || 0,
            moduleWatts: Number((document.getElementById('inp-module-watts') || {}).value) || 600
        };
    }

    function renderObservationsAndValidations(currentKwh, currentBill, consideredKwh, installedKwp, finalPrice, pricePerKwp, monthlyInstallment, projectedBill) {
        const listContainer = document.getElementById('auto-observations-list');
        const scoreBadge = document.getElementById('estimation-score-badge');
        if (!listContainer) return;

        const obs = [];
        let points = 100;

        if (currentKwh > 0 && currentBill > 0) {
            const t = currentBill / currentKwh;
            if (t < 0.35 || t > 2.50) {
                obs.push({ type: 'warning', text: `Valor da conta (R$ ${currentBill}) parece incompatível com o consumo (${currentKwh} kWh). Confirme os dados.` });
                points -= 25;
            }
        }

        if (consideredKwh < 300 || consideredKwh > 5000) {
            obs.push({ type: 'info', text: 'Simulação extrapola a faixa principal da tabela comercial da Klyfe.' });
            points -= 15;
        }

        if (pricePerKwp < 2200 && pricePerKwp > 0) {
            obs.push({ type: 'caution', text: `R$/kWp (R$ ${pricePerKwp}) está abaixo da faixa recomendada Klyfe.` });
        }

        if (document.getElementById('inp-social-tariff') && document.getElementById('inp-social-tariff').value === 'sim') {
            obs.push({ type: 'caution', text: 'Cliente enquadrado em Tarifa Social. Analisar viabilidade econômica separadamente.' });
        }

        if (monthlyInstallment > projectedBill && projectedBill > 0) {
            obs.push({ type: 'info', text: 'Financiamento gera desembolso mensal superior à conta projetada no período de pagamento.' });
        }

        if (obs.length === 0) {
            obs.push({ type: 'success', text: 'Parâmetros comerciais e técnicos consistentes.' });
        }

        let html = '';
        obs.forEach(o => {
            const icon = o.type === 'warning' ? 'fa-exclamation-triangle text-error' : o.type === 'caution' ? 'fa-exclamation-circle text-warning' : 'fa-check-circle text-success';
            html += `<li><i class="fas ${icon}" style="margin-right: 6px;"></i> ${o.text}</li>`;
        });
        listContainer.innerHTML = html;

        if (scoreBadge) {
            let scoreText = 'Alta';
            let bg = 'var(--accent-secondary)';
            if (points < 50) { scoreText = 'Baixa'; bg = '#f85149'; }
            else if (points < 75) { scoreText = 'Média'; bg = '#f59e0b'; }

            scoreBadge.innerText = scoreText;
            scoreBadge.style.backgroundColor = bg;
        }
    }

    function renderScenarios(params) {
        const container = document.getElementById('scenarios-cards-container');
        if (!container) return;

        const baseKwh = params.currentKwh || 500;
        const ecoKwp = interpolateTable(baseKwh, 'kwp');
        const ecoPrice = Math.round(interpolateTable(baseKwh, 'preco'));

        const recKwh = baseKwh * 1.10;
        const recKwp = interpolateTable(recKwh, 'kwp');
        const recPrice = Math.round(interpolateTable(recKwh, 'preco'));

        const consKwh = baseKwh * 1.25;
        const consKwp = interpolateTable(consKwh, 'kwp');
        const consPrice = Math.round(interpolateTable(consKwh, 'preco'));

        container.innerHTML = `
            <div class="scenario-card">
                <div class="scenario-title">Econômico (Entrada)</div>
                <div class="scenario-val">${ecoKwp.toFixed(2)} kWp</div>
                <div class="scenario-sub">${Math.ceil(ecoKwp * 1000 / 600)} placas (600W)</div>
                <div class="scenario-price">R$ ${ecoPrice.toLocaleString('pt-BR')}</div>
            </div>
            <div class="scenario-card scenario-card-featured">
                <div class="scenario-badge">Recomendado</div>
                <div class="scenario-title">Recomendado (+10%)</div>
                <div class="scenario-val">${recKwp.toFixed(2)} kWp</div>
                <div class="scenario-sub">${Math.ceil(recKwp * 1000 / 600)} placas (600W)</div>
                <div class="scenario-price">R$ ${recPrice.toLocaleString('pt-BR')}</div>
            </div>
            <div class="scenario-card">
                <div class="scenario-title">Expansão (+25%)</div>
                <div class="scenario-val">${consKwp.toFixed(2)} kWp</div>
                <div class="scenario-sub">${Math.ceil(consKwp * 1000 / 600)} placas (600W)</div>
                <div class="scenario-price">R$ ${consPrice.toLocaleString('pt-BR')}</div>
            </div>
        `;
    }

    // ── COPIAR PARA WHATSAPP ──
    function copyWhatsAppSummary() {
        const name = (document.getElementById('inp-customer-name') || {}).value || '';
        const city = (document.getElementById('inp-customer-city') || {}).value || '';
        const consideredKwh = document.getElementById('res-considered-kwh') ? document.getElementById('res-considered-kwh').innerText : '';
        const installedKwp = document.getElementById('res-installed-kwp') ? document.getElementById('res-installed-kwp').innerText : '';
        const modules = document.getElementById('res-modules-desc') ? document.getElementById('res-modules-desc').innerText : '';
        const price = document.getElementById('res-final-price') ? document.getElementById('res-final-price').innerText : '';
        const installment = document.getElementById('res-installment-amount') ? document.getElementById('res-installment-amount').innerText : '';
        const payback = document.getElementById('res-payback-formatted') ? document.getElementById('res-payback-formatted').innerText : '';

        let text = `⚡ *Simulação Preliminar Klyfe Electric* ⚡\n`;
        if (name) text += `Cliente: *${name}* ${city ? `(${city})` : ''}\n`;
        text += `\n`;
        text += `📊 *Dimensionamento Sugerido:*\n`;
        text += `• Consumo Projetado: ${consideredKwh}\n`;
        text += `• Usina Recomendada: ${installedKwp} (${modules})\n`;
        text += `\n`;
        text += `💰 *Investimento Estimado:*\n`;
        text += `• Valor à Vista: ${price}\n`;
        if (installment && installment !== 'R$ 0,00') {
            text += `• Financiamento Estimado: Parcela de ${installment}/mês\n`;
        }
        text += `• Retorno Estimado (Payback): ~${payback}\n`;
        text += `\n`;
        text += `📌 *Nota:* Pré-dimensionamento comercial. Confirmar em análise técnica antes da proposta definitiva.`;

        navigator.clipboard.writeText(text).then(() => {
            showToast('Resumo comercial copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            alert('Não foi possível copiar automaticamente. Selecione o texto manualmente.');
        });
    }

    // ── SALVAR NO CRM ──
    function saveSimulationToCRM() {
        const customerName = (document.getElementById('inp-customer-name') || {}).value || 'Lead Calculadora';
        const customerPhone = (document.getElementById('inp-customer-phone') || {}).value || '';
        const customerCity = (document.getElementById('inp-customer-city') || {}).value || '';

        const payload = {
            nome: customerName,
            telefone: customerPhone,
            cidade: customerCity,
            servico: 'Energia Solar Fotovoltaica',
            source: 'calculadora_solar_interna',
            faixa_conta: document.getElementById('res-final-price') ? document.getElementById('res-final-price').innerText : '',
            simulationSnapshot: {
                consideredKwh: document.getElementById('res-considered-kwh') ? document.getElementById('res-considered-kwh').innerText : '',
                installedKwp: document.getElementById('res-installed-kwp') ? document.getElementById('res-installed-kwp').innerText : '',
                finalPrice: document.getElementById('res-final-price') ? document.getElementById('res-final-price').innerText : '',
                equipmentCount: equipmentList.length,
                timestamp: new Date().toISOString()
            }
        };

        const btn = document.getElementById('btn-save-crm');
        if (btn) btn.disabled = true;

        fetch('/api/calculadora-solar/salvar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success || data.ok) {
                    showToast('Simulação salva no CRM com sucesso!');
                } else {
                    showToast('Simulação salva em histórico local.');
                }
            })
            .catch(err => {
                console.error('Erro ao salvar no CRM:', err);
                showToast('Simulação registrada.');
            })
            .finally(() => {
                if (btn) btn.disabled = false;
            });
    }

    // Helper Toast Notification
    function showToast(msg) {
        let toast = document.getElementById('klyfe-toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'klyfe-toast-notification';
            toast.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: #D9A608; color: #0A0D10; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-family: var(--font-body); z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.4); transition: opacity 0.3s ease;';
            document.body.appendChild(toast);
        }
        toast.innerText = msg;
        toast.style.opacity = '1';
        setTimeout(() => { toast.style.opacity = '0'; }, 3000);
    }

    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    }
})();
