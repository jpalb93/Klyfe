document.addEventListener('DOMContentLoaded', () => {
    console.log('Klyfe Main JS Loaded');
    // ═══ Intersection Observer (Fade-in) ═══
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ═══ Scroll Spy Nav ═══
    const scrollNav = document.querySelector('.scroll-nav');
    if (scrollNav) {
        const dots = scrollNav.querySelectorAll('.dot');
        const sections = [];
        dots.forEach(dot => {
            const target = document.querySelector(dot.dataset.target);
            if (target) sections.push({ dot, target });
            dot.addEventListener('click', () => {
                const t = document.querySelector(dot.dataset.target);
                if (t) t.scrollIntoView({ behavior: 'smooth' });
            });
        });
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    dots.forEach(d => d.classList.remove('active'));
                    const match = sections.find(s => s.target === entry.target);
                    if (match) match.dot.classList.add('active');
                }
            });
        }, { threshold: 0.3 });
        sections.forEach(s => spyObserver.observe(s.target));
    }

    // ═══ Mobile Nav ═══
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const closeBtn = document.querySelector('.mobile-nav .close-btn');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.add('open');
            mobileOverlay.classList.add('open');
        });
    }
    [closeBtn, mobileOverlay].forEach(el => {
        if (el) el.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            mobileOverlay.classList.remove('open');
        });
    });

    // ═══ Solutions Accordion (Home) ═══
    document.querySelectorAll('.accordion-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');
                const list = item.closest('.accordion-list');
                if (list) {
                    list.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
                }
                if (!wasActive) item.classList.add('active');
            });
        }
    });

    // ═══ FAQ Accordion ═══
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Fecha todos os outros
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) otherAnswer.style.maxHeight = null;
                    }
                });

                // Toggle atual
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = null;
                }
            });
        }
    });

    // ═══ Solar Calculator (Slider) ═══
    const billRange = document.getElementById('bill-range');
    const billValue = document.getElementById('bill-value');
    if (billRange) {
        billRange.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            billValue.textContent = `R$ ${val.toLocaleString('pt-BR')}`;
            
            const econMensal = val * 0.95;
            const econAnual = econMensal * 12;
            const numPanels = Math.ceil(val / 85);
            const roi = (3.2 - (val / 10000)).toFixed(1);

            document.getElementById('result-monthly').textContent = `R$ ${econMensal.toFixed(0)}`;
            document.getElementById('result-yearly').textContent = `R$ ${econAnual.toFixed(0)}`;
            document.getElementById('result-panels').textContent = numPanels;
            document.getElementById('result-roi').textContent = roi;
        });
    }

    // ═══ Contact Form ═══
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Honeypot check: Se o campo 'website_url' estiver preenchido, é um bot.
            const formData = new FormData(contactForm);
            const honeypot = formData.get('website_url');
            
            if (honeypot) {
                console.warn('Bot detectado via Honeypot.');
                return; // Descarta silenciosamente para não dar pistas ao bot
            }

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...'; 
            btn.disabled = true;
            
            const data = Object.fromEntries(formData.entries());
            // Remove o campo honeypot antes de enviar para o servidor
            delete data.website_url;

            const servico = data.servico || '';
            const categoryMap = {
                'Energia Solar Fotovoltaica': 'solar',
                'Engenharia e Projetos': 'engenharia',
                'Manutenção de Subestações': 'engenharia',
                'Instalações Industriais': 'eletrica',
                'Laudos e Termografia': 'engenharia',
                'Automação Predial/Industrial': 'automacao',
                Outro: 'geral'
            };
            const contentCategory = categoryMap[servico] || 'geral';
            const isSolarLead = contentCategory === 'solar';
            const eventId = (window.KlyfeTracking && window.KlyfeTracking.newEventId)
                ? window.KlyfeTracking.newEventId('lead')
                : ('lead_' + Date.now());
            data.event_id = eventId;
            data.event_source_url = window.location.href;
            if (window.KlyfeTracking && window.KlyfeTracking.getMetaCookies) {
                Object.assign(data, window.KlyfeTracking.getMetaCookies());
            }

            try {
                const res = await fetch('/contato', { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify(data) 
                });
                
                if (!res.ok) throw new Error('Falha no servidor');
                
                const json = await res.json();
                if (json.success) {
                    // Lead padrão Meta somente no funil Solar (otimização de campanhas)
                    if (isSolarLead && typeof window.fbq === 'function') {
                        window.fbq('track', 'Lead', {
                            content_name: 'contato',
                            content_category: 'solar',
                            content_category_label: servico
                        }, { eventID: json.event_id || eventId });
                    }
                    if (window.dataLayer) {
                        window.dataLayer.push({
                            event: isSolarLead ? 'generate_lead' : 'generate_lead_other',
                            lead_source: 'contato',
                            content_category: contentCategory,
                            servico: servico,
                            event_id: json.event_id || eventId
                        });
                    }
                    alert('✓ ' + json.message);
                    contactForm.reset();
                }
            } catch (err) { 
                alert('⚠️ Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato via WhatsApp.'); 
                console.error('Erro no envio do form:', err);
            }
            finally { 
                btn.innerHTML = originalText; 
                btn.disabled = false; 
            }
        });
    }

    // ═══ Hero Power Out Control ═══
    const hero = document.getElementById('hero');
    if (hero) {
        let shuttingDown = false;
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            
            if (scrollPos > 50) {
                if (!shuttingDown) {
                    hero.classList.add('shutting-down');
                    shuttingDown = true;
                    // Após a animação de 1.2s, podemos fixar o estado de power-off se o scroll continuar baixo
                    setTimeout(() => {
                        if (window.scrollY > 50) hero.classList.add('power-off');
                    }, 1200);
                }
            } else {
                hero.classList.remove('shutting-down');
                hero.classList.remove('power-off');
                shuttingDown = false;
            }
        });
    }

    // ═══ LP Solar Empresas: UTM capture ═══
    const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'gclid', 'fbclid'];
    const lpForm = document.getElementById('lp-solar-form');
    const lpPhone = document.getElementById('telefone');

    function maskBRWhatsApp(value) {
        const d = String(value || '').replace(/\D/g, '').slice(0, 11);
        if (d.length === 0) return '';
        if (d.length <= 2) return `(${d}`;
        if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
        return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    }

    if (lpPhone && lpForm) {
        lpPhone.addEventListener('input', () => {
            lpPhone.value = maskBRWhatsApp(lpPhone.value);
        });
        lpPhone.addEventListener('blur', () => {
            lpPhone.value = maskBRWhatsApp(lpPhone.value);
        });
    }

    if (lpForm) {
        const params = new URLSearchParams(window.location.search);
        const stored = {};
        try {
            Object.assign(stored, JSON.parse(sessionStorage.getItem('lp_solar_utm') || '{}'));
        } catch (_) { /* ignore */ }

        UTM_KEYS.forEach((key) => {
            const fromQuery = params.get(key);
            if (fromQuery) stored[key] = fromQuery;
            const input = document.getElementById(key);
            if (input && stored[key]) input.value = stored[key];
        });

        try {
            sessionStorage.setItem('lp_solar_utm', JSON.stringify(stored));
        } catch (_) { /* ignore */ }

        lpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(lpForm);
            if (formData.get('website_url')) return;

            const phoneDigits = String(formData.get('telefone') || '').replace(/\D/g, '');
            if (phoneDigits.length < 10 || phoneDigits.length > 11) {
                alert('Informe um WhatsApp válido com DDD (10 ou 11 dígitos).');
                if (lpPhone) lpPhone.focus();
                return;
            }

            const btn = lpForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
            btn.disabled = true;

            const data = Object.fromEntries(formData.entries());
            delete data.website_url;
            data.telefone = phoneDigits;

            const eventId = (window.KlyfeTracking && window.KlyfeTracking.newEventId)
                ? window.KlyfeTracking.newEventId('lead')
                : ('lead_' + Date.now());
            data.event_id = eventId;
            data.event_source_url = window.location.href;
            if (window.KlyfeTracking && window.KlyfeTracking.getMetaCookies) {
                Object.assign(data, window.KlyfeTracking.getMetaCookies());
            }

            try {
                const res = await fetch('/contato', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                if (!res.ok) throw new Error('Falha no servidor');
                const json = await res.json();
                if (json.success) {
                    const finalEventId = json.event_id || eventId;
                    // Lead Pixel + dataLayer só na /obrigado (uma vez), com o mesmo event_id da CAPI
                    if (window.KlyfeTracking && window.KlyfeTracking.markLpLeadPending) {
                        window.KlyfeTracking.markLpLeadPending(finalEventId);
                    } else {
                        try {
                            sessionStorage.setItem('klyfe_lp_solar_lead', JSON.stringify({
                                event_id: finalEventId,
                                browser_fired: false,
                                ts: Date.now()
                            }));
                        } catch (_) { /* ignore */ }
                    }
                    window.location.href = '/lp/energia-solar-empresas/obrigado';
                    return;
                }
                throw new Error('Resposta inválida');
            } catch (err) {
                alert('⚠️ Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.');
                console.error('Erro LP solar form:', err);
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }

    // ═══ LP Solar Empresas: commercial calculator ═══
    const lpBillRange = document.getElementById('lp-bill-range');
    const lpBillValue = document.getElementById('lp-bill-value');
    function lpBillToContaMedia(val) {
        if (val < 5000) return 'R$ 2.000 – R$ 5.000';
        if (val < 10000) return 'R$ 5.000 – R$ 10.000';
        if (val < 20000) return 'R$ 10.000 – R$ 20.000';
        if (val <= 50000) return 'R$ 20.000 – R$ 50.000';
        return 'Acima de R$ 50.000';
    }
    function updateLpSolarCalc(val) {
        if (lpBillValue) lpBillValue.textContent = `R$ ${val.toLocaleString('pt-BR')}`;
        const econMensal = val * 0.90;
        const econAnual = econMensal * 12;
        const kwp = Math.max(10, Math.round(val / 140));
        const roi = Math.max(2.2, (4.2 - val / 40000)).toFixed(1).replace('.', ',');
        const monthly = document.getElementById('lp-result-monthly');
        const yearly = document.getElementById('lp-result-yearly');
        const kwpEl = document.getElementById('lp-result-kwp');
        const roiEl = document.getElementById('lp-result-roi');
        if (monthly) monthly.textContent = `R$ ${Math.round(econMensal).toLocaleString('pt-BR')}`;
        if (yearly) yearly.textContent = `R$ ${Math.round(econAnual).toLocaleString('pt-BR')}`;
        if (kwpEl) kwpEl.textContent = `${kwp} kWp`;
        if (roiEl) roiEl.textContent = `${roi} anos`;
    }
    if (lpBillRange) {
        updateLpSolarCalc(parseInt(lpBillRange.value, 10));
        lpBillRange.addEventListener('input', (e) => {
            updateLpSolarCalc(parseInt(e.target.value, 10));
        });
        const lpCalcCta = document.getElementById('lp-calc-cta');
        if (lpCalcCta) {
            lpCalcCta.addEventListener('click', () => {
                const contaSelect = document.getElementById('conta_media');
                if (contaSelect) {
                    contaSelect.value = lpBillToContaMedia(parseInt(lpBillRange.value, 10));
                }
            });
        }
    }
});
