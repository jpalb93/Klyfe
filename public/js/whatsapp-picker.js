(() => {
    const picker = document.querySelector('.whatsapp-picker');
    if (!picker) return;
    const trigger = picker.querySelector('summary');

    document.addEventListener('click', (event) => {
        if (picker.open && !picker.contains(event.target)) picker.open = false;
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && picker.open) {
            picker.open = false;
            trigger.focus();
        }
    });
    picker.addEventListener('focusout', (event) => {
        if (!picker.contains(event.relatedTarget)) picker.open = false;
    });
    picker.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            picker.open = false;
            trigger.focus();
        });
    });
})();
