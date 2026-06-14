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

            try {
                const res = await fetch('/contato', { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify(data) 
                });
                
                if (!res.ok) throw new Error('Falha no servidor');
                
                const json = await res.json();
                if (json.success) { 
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
});
