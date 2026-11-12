document.addEventListener('DOMContentLoaded', () => {
    console.log('Klyfe Main JS Loaded');

    // ═══ Navbar Pill on Scroll ═══
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let ticking = false;
        const updateNavbarPill = () => {
            if (window.scrollY > 30) {
                navbar.classList.add('navbar-pill');
            } else {
                navbar.classList.remove('navbar-pill');
            }
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateNavbarPill();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        updateNavbarPill();
    }

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

    // Fechar seletor rápido de cidade ao clicar fora
    document.addEventListener('click', (e) => {
        const selector = document.querySelector('.quick-city-selector');
        const tag = document.querySelector('.mobile-location-tag');
        if (selector && selector.classList.contains('open')) {
            if (!selector.contains(e.target) && (!tag || !tag.contains(e.target))) {
                selector.classList.remove('open');
            }
        }
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
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }

            question.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');
                
                // Fecha todos os outros
                const parentAccordion = item.closest('.home-faq-accordion-card') || document;
                parentAccordion.querySelectorAll('.faq-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });

                // Toggle atual
                if (!wasActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }
    });

    // ═══ Wallbox FAQ ═══
    document.querySelectorAll('.wallbox-faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.wallbox-faq-item');
            if (!item) return;
            const shouldOpen = !item.classList.contains('open');

            document.querySelectorAll('.wallbox-faq-item.open').forEach(openItem => {
                openItem.classList.remove('open');
                const openQuestion = openItem.querySelector('.wallbox-faq-question');
                if (openQuestion) openQuestion.setAttribute('aria-expanded', 'false');
            });

            item.classList.toggle('open', shouldOpen);
            question.setAttribute('aria-expanded', String(shouldOpen));
        });
    });

    // ═══ Solar Sectors Filter Pills ═══
    const solarFilterBtns = document.querySelectorAll('.solar-filter-btn');
    const solarCards = document.querySelectorAll('.solar-showcase-card');
    const solarTabPanel = document.getElementById('solar-showcase-panel') || document.getElementById('solar-page-showcase-panel');
    if (solarFilterBtns.length > 0 && solarCards.length > 0) {
        solarFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                solarFilterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                if (solarTabPanel && btn.id) {
                    solarTabPanel.setAttribute('aria-labelledby', btn.id);
                }

                solarCards.forEach(card => {
                    const category = card.dataset.category || '';
                    if (filter === 'all' || category.includes(filter)) {
                        card.classList.remove('is-hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(12px)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 20);
                    } else {
                        card.classList.add('is-hidden');
                    }
                });
            });
        });
    }

    // ═══ Home Blog Filter Pills ═══
    const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
    const blogFeaturedCard = document.querySelector('.home-blog-featured-card');
    const blogCards = document.querySelectorAll('.home-blog-card');
    if (blogFilterBtns.length > 0) {
        blogFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.category || 'all';
                blogFilterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                // Animação de filtro nos cards
                const allBlogItems = [...(blogFeaturedCard ? [blogFeaturedCard] : []), ...blogCards];
                allBlogItems.forEach(card => {
                    const cat = card.dataset.category || '';
                    if (filter === 'all' || cat.includes(filter) || (filter === 'solar' && (cat.includes('solar') || cat.includes('segmentos'))) || (filter === 'compra-confianca' && cat.includes('compra-confianca')) || (filter === 'documentacao' && (cat.includes('documentacao') || cat.includes('engenharia'))) || (filter === 'seguranca' && (cat.includes('seguranca') || cat.includes('eletrica')))) {
                        card.style.display = card.classList.contains('home-blog-featured-card') ? 'flex' : 'flex';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 20);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
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
                'Instalação de Wallbox': 'wallbox',
                'Automação Predial/Industrial': 'automacao',
                Outro: 'geral'
            };
            const contentCategory = categoryMap[servico] || 'geral';
            const isSolarLead = contentCategory === 'solar';
            // Mantém a mesma chave durante uma retentativa. Se a resposta do
            // CRM se perder depois da persistência, o retry não cria outro lead.
            const eventId = contactForm.dataset.eventId || ((window.KlyfeTracking && window.KlyfeTracking.newEventId)
                ? window.KlyfeTracking.newEventId('lead')
                : ('lead_' + Date.now()));
            contactForm.dataset.eventId = eventId;
            data.event_id = eventId;
            data.event_source_url = window.location.href;
            data.marketing_consent = window.KlyfeConsent ? window.KlyfeConsent.get() : 'unknown';
            if (window.KlyfeTracking && window.KlyfeTracking.getMetaCookies) {
                Object.assign(data, window.KlyfeTracking.getMetaCookies());
            }
            if (window.KlyfeTracking && window.KlyfeTracking.getCampaignParams) {
                const camp = window.KlyfeTracking.getCampaignParams();
                ['gclid', 'gbraid', 'wbraid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => {
                    if (camp[k] && !data[k]) data[k] = camp[k];
                });
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
                    document.dispatchEvent(new CustomEvent('klyfe:form-result', { detail: { status: 'success' } }));
                    const finalEventId = json.event_id || eventId;
                    const nameParts = String(data.nome || '').trim().split(/\s+/).filter(Boolean);
                    const userData = {
                        email: data.email || '',
                        phone: data.telefone || '',
                        firstName: nameParts[0] || '',
                        lastName: nameParts.slice(1).join(' ')
                    };
                    // Lead padrão Meta somente no funil Solar (otimização de campanhas)
                    if (isSolarLead && window.KlyfeTracking && typeof window.KlyfeTracking.trackLeadSolar === 'function') {
                        window.KlyfeTracking.trackLeadSolar({
                            content_name: 'contato',
                            content_category: 'solar',
                            content_category_label: servico
                        }, finalEventId, userData);
                    } else if (isSolarLead && typeof window.fbq === 'function') {
                        window.fbq('track', 'Lead', {
                            content_name: 'contato',
                            content_category: 'solar',
                            content_category_label: servico
                        }, { eventID: finalEventId });
                    }
                    if (!isSolarLead && window.dataLayer) {
                        const trackingCfg = window.__KLYFE_TRACKING__ || {};
                        window.dataLayer.push({
                            event: 'generate_lead_other',
                            lead_source: 'contato',
                            content_category: contentCategory,
                            content_vertical: trackingCfg.contentVertical || contentCategory,
                            service_key: trackingCfg.serviceKey || undefined,
                            location: trackingCfg.locationName || data.cidade || undefined,
                            servico: servico,
                            event_id: finalEventId
                        });
                        if (contentCategory === 'wallbox') {
                            window.dataLayer.push({
                                event: 'wallbox_qualified_lead',
                                content_category: 'wallbox',
                                content_name: 'contato',
                                location: trackingCfg.locationName || data.cidade || undefined,
                                event_id: finalEventId
                            });
                        }
                    }
                    alert('✓ ' + json.message);
                    contactForm.reset();
                    delete contactForm.dataset.eventId;
                } else {
                    throw new Error('Envio não confirmado');
                }
            } catch (err) { 
                document.dispatchEvent(new CustomEvent('klyfe:form-result', { detail: { status: 'error' } }));
                alert('⚠️ Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato via WhatsApp.'); 
                console.error('Erro no envio do form:', err);
            }
            finally { 
                btn.innerHTML = originalText; 
                btn.disabled = false; 
            }
        });
    }

    // ═══ Wallbox: briefing curto + registro do lead + WhatsApp ═══
    const wallboxBriefForm = document.getElementById('wallbox-brief-form');
    if (wallboxBriefForm) {
        wallboxBriefForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(wallboxBriefForm);
            const data = Object.fromEntries(formData.entries());
            const phone = wallboxBriefForm.dataset.phone || '5583991330972';
            const button = wallboxBriefForm.querySelector('button[type="submit"]');
            const originalText = button ? button.innerHTML : '';
            const eventId = (window.KlyfeTracking && window.KlyfeTracking.newEventId)
                ? window.KlyfeTracking.newEventId('lead')
                : ('lead_' + Date.now());
            const message = [
                'Olá! Vim pelo site da Klyfe e quero avaliar uma instalação de Wallbox.',
                `Nome: ${data.nome}`,
                `WhatsApp: ${data.telefone}`,
                `Cidade: ${data.cidade}`,
                `Perfil: ${data.perfil}`,
                data.veiculo ? `Veículo: ${data.veiculo}` : '',
                `Já possui carregador: ${data.possui_carregador}`,
                `Distância entre quadro e vaga: ${data.distancia_quadro_vaga}`
            ].filter(Boolean).join('\n');

            // Abre a aba antes do await para evitar bloqueio de pop-up no celular.
            const whatsappWindow = window.open('about:blank', '_blank');
            const payload = Object.assign({}, data, {
                form_type: 'wallbox_brief',
                servico: 'Instalação de Wallbox',
                service_key: 'carregador-veicular',
                source: 'wallbox-page',
                event_id: eventId,
                event_source_url: window.location.href,
                marketing_consent: (window.KlyfeConsent && window.KlyfeConsent.get)
                    ? (window.KlyfeConsent.get() || 'unknown')
                    : 'unknown'
            });
            if (window.KlyfeTracking && window.KlyfeTracking.getMetaCookies) {
                Object.assign(payload, window.KlyfeTracking.getMetaCookies());
            }
            if (window.KlyfeTracking && window.KlyfeTracking.getCampaignParams) {
                const camp = window.KlyfeTracking.getCampaignParams();
                ['gclid', 'gbraid', 'wbraid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
                    if (camp[key]) payload[key] = camp[key];
                });
            }

            if (button) {
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ORGANIZANDO...';
            }

            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'wallbox_brief_submit',
                    content_category: 'wallbox',
                    content_name: 'wallbox-brief-form',
                    location: data.cidade,
                    property_type: data.perfil,
                    vehicle: data.veiculo || '',
                    charger_status: data.possui_carregador || '',
                    distance_to_parking: data.distancia_quadro_vaga || '',
                    event_id: eventId
                });
            }

            let crmOk = false;
            try {
                const response = await fetch('/contato', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (response.ok) {
                    const json = await response.json().catch(() => ({}));
                    crmOk = !!json.success;
                }
            } catch (error) {
                console.warn('Não foi possível registrar o briefing de Wallbox:', error);
            }

            document.dispatchEvent(new CustomEvent('klyfe:form-result', { detail: { status: crmOk ? 'success' : 'error' } }));
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: crmOk ? 'wallbox_qualified_lead' : 'wallbox_lead_registration_failed',
                    content_category: 'wallbox',
                    content_name: 'wallbox-brief-form',
                    location: data.cidade,
                    property_type: data.perfil,
                    event_id: eventId
                });
            }

            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            if (whatsappWindow && !whatsappWindow.closed) {
                whatsappWindow.location.href = whatsappUrl;
            } else {
                window.open(whatsappUrl, '_blank', 'noopener');
            }
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'wallbox_whatsapp_click',
                    content_category: 'wallbox',
                    content_name: 'wallbox-brief-form',
                    location: data.cidade,
                    property_type: data.perfil,
                    event_id: eventId,
                    crm_registered: crmOk
                });
            }
            wallboxBriefForm.reset();
            if (button) {
                button.disabled = false;
                button.innerHTML = originalText;
            }
        });
    }

    // Cliques em pontos de destaque ajudam a separar descoberta, CTA e navegação.
    document.addEventListener('click', (e) => {
        const wallboxLink = e.target && e.target.closest ? e.target.closest('[data-wallbox-event]') : null;
        if (!wallboxLink || !window.dataLayer) return;
        window.dataLayer.push({
            event: 'wallbox_cta_click',
            wallbox_event: wallboxLink.dataset.wallboxEvent || 'unknown',
            content_category: 'wallbox',
            content_name: wallboxLink.dataset.contentName || wallboxLink.textContent.trim().slice(0, 80),
            location: (window.__KLYFE_TRACKING__ || {}).locationName || undefined,
            href: wallboxLink.href || ''
        });
    });

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
    const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid'];
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
        const stored = (window.KlyfeTracking && window.KlyfeTracking.getCampaignParams)
            ? Object.assign({}, window.KlyfeTracking.getCampaignParams())
            : {};
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
            data.content_name = 'lp-solar-empresas';
            data.source = data.source || 'lp-solar-empresas';

            try {
                if (window.KlyfeTracking && typeof window.KlyfeTracking.submitLpLead === 'function') {
                    await window.KlyfeTracking.submitLpLead(data);
                    return;
                }
                throw new Error('Tracking indisponível');
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
        const econMensal = Math.round(val * 0.90);
        const econAnual = Math.round(econMensal * 12);
        const kwp = Math.max(10, Math.round(val / 140));
        const roi = Math.max(2.2, (4.2 - val / 40000)).toFixed(1).replace('.', ',');
        const monthly = document.getElementById('lp-result-monthly');
        const yearly = document.getElementById('lp-result-yearly');
        const kwpEl = document.getElementById('lp-result-kwp');
        const roiEl = document.getElementById('lp-result-roi');
        if (monthly) monthly.textContent = `R$ ${econMensal.toLocaleString('pt-BR')}`;
        if (yearly) yearly.textContent = `R$ ${econAnual.toLocaleString('pt-BR')}`;
        if (kwpEl) kwpEl.textContent = `${kwp} kWp`;
        if (roiEl) roiEl.textContent = `${roi} anos`;

        const lpCalcCta = document.getElementById('lp-calc-cta');
        const calcWaBtn = document.getElementById('calc-wa-btn');
        if (lpCalcCta) {
            lpCalcCta.innerHTML = `<i class="fas fa-calculator"></i> Garantir Economia de R$ ${econMensal.toLocaleString('pt-BR')}/mês`;
        }
        if (calcWaBtn) {
            const msg = `Olá! Simulei uma conta empresarial de R$ ${val.toLocaleString('pt-BR')}/mês no site da Klyfe e gostaria de receber a proposta de economia de R$ ${econMensal.toLocaleString('pt-BR')}/mês!`;
            calcWaBtn.href = `https://wa.me/5583991430929?text=${encodeURIComponent(msg)}`;
            calcWaBtn.innerHTML = `<i class="fab fa-whatsapp"></i> Receber Proposta de R$ ${econMensal.toLocaleString('pt-BR')}/mês no WhatsApp`;
        }
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

    // ═══ Botão Copiar Endereço da Sede ═══
    const btnCopyAddr = document.getElementById('btn-copy-sede-addr');
    if (btnCopyAddr) {
        btnCopyAddr.addEventListener('click', () => {
            const addr = btnCopyAddr.getAttribute('data-address');
            if (!addr) return;
            const setSuccessState = () => {
                btnCopyAddr.classList.add('copied');
                const tooltip = btnCopyAddr.querySelector('.copy-tooltip');
                const icon = btnCopyAddr.querySelector('i');
                if (tooltip) tooltip.textContent = 'Copiado!';
                if (icon) {
                    icon.classList.remove('far', 'fa-copy');
                    icon.classList.add('fas', 'fa-check');
                }
                setTimeout(() => {
                    btnCopyAddr.classList.remove('copied');
                    if (tooltip) tooltip.textContent = 'Copiar';
                    if (icon) {
                        icon.classList.remove('fas', 'fa-check');
                        icon.classList.add('far', 'fa-copy');
                    }
                }, 2500);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(addr).then(setSuccessState).catch(() => {
                    fallbackCopy(addr, setSuccessState);
                });
            } else {
                fallbackCopy(addr, setSuccessState);
            }
        });

        function fallbackCopy(text, cb) {
            const temp = document.createElement('textarea');
            temp.value = text;
            temp.style.position = 'fixed';
            temp.style.opacity = '0';
            document.body.appendChild(temp);
            temp.select();
            try {
                document.execCommand('copy');
                if (cb) cb();
            } catch (err) {
                console.warn('Erro ao copiar endereço:', err);
            }
            document.body.removeChild(temp);
        }
    }
});
