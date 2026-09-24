(function () {
    'use strict';

    const modals = document.querySelectorAll('[data-glossary-modal]');
    if (!modals.length) return;

    modals.forEach((modal) => {
        const scope = modal.closest('.service-glossary-bridge');
        const dialog = modal.querySelector('.service-glossary-modal__dialog');
        const content = modal.querySelector('[data-glossary-modal-content]');
        const triggers = scope ? scope.querySelectorAll('[data-glossary-trigger]') : [];
        let lastTrigger = null;

        if (!scope || !dialog || !content || !triggers.length) return;

        const getFocusable = () => dialog.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        const closeModal = () => {
            modal.hidden = true;
            content.replaceChildren();
            document.body.classList.remove('glossary-modal-open');
            if (lastTrigger) {
                lastTrigger.setAttribute('aria-expanded', 'false');
                lastTrigger.focus();
            }
            lastTrigger = null;
        };

        const openModal = (trigger) => {
            const templateId = trigger.getAttribute('data-glossary-template');
            const template = templateId ? scope.querySelector(`#${templateId}`) : null;
            if (!template) return false;

            content.replaceChildren(template.content.cloneNode(true));
            modal.hidden = false;
            document.body.classList.add('glossary-modal-open');
            lastTrigger = trigger;
            trigger.setAttribute('aria-expanded', 'true');

            window.requestAnimationFrame(() => {
                const firstFocusable = getFocusable()[0];
                (firstFocusable || dialog).focus();
            });
            return true;
        };

        triggers.forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                if (openModal(trigger)) event.preventDefault();
            });
        });

        modal.addEventListener('click', (event) => {
            if (event.target.closest('[data-glossary-close]')) closeModal();
        });

        modal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeModal();
                return;
            }

            if (event.key !== 'Tab') return;
            const focusable = getFocusable();
            if (!focusable.length) {
                event.preventDefault();
                dialog.focus();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    });
}());
