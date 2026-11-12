document.addEventListener('DOMContentLoaded', () => {
  const tabs = [...document.querySelectorAll('.catalog-tab-btn')];
  const panels = [...document.querySelectorAll('.catalog-panel')];
  const tabList = tabs[0]?.parentElement;
  if (tabList) { tabList.setAttribute('role', 'tablist'); tabList.setAttribute('aria-label', 'Categorias de serviços'); }
  function selectTab(tab) {
    tabs.forEach(button => {
      const selected = button === tab;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => {
      const selected = panel.id === `tab-${tab.dataset.tab}`;
      panel.classList.toggle('active', selected);
      panel.hidden = !selected;
    });
  }
  tabs.forEach((tab, index) => {
    tab.id = `partners-category-${tab.dataset.tab}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `tab-${tab.dataset.tab}`);
    const panel = document.getElementById(`tab-${tab.dataset.tab}`);
    panel?.setAttribute('role', 'tabpanel');
    panel?.setAttribute('aria-labelledby', tab.id);
    if (panel) panel.tabIndex = 0;
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      selectTab(tabs[next]); tabs[next].focus();
    });
  });
  if (tabs.length) selectTab(tabs.find(tab => tab.classList.contains('active')) || tabs[0]);
  const items = [...document.querySelectorAll('.kp-faq-item')];
  function expand(item, open) {
    item.classList.toggle('active', open);
    item.querySelector('.kp-faq-question')?.setAttribute('aria-expanded', String(open));
    const answer = item.querySelector('.kp-faq-answer');
    if (answer) answer.hidden = !open;
  }
  items.forEach((item, index) => {
    const button = item.querySelector('.kp-faq-question'), answer = item.querySelector('.kp-faq-answer');
    if (!button || !answer) return;
    button.id = `partners-faq-question-${index}`; answer.id = `partners-faq-answer-${index}`;
    button.setAttribute('aria-controls', answer.id);
    answer.setAttribute('role', 'region'); answer.setAttribute('aria-labelledby', button.id);
    expand(item, item.classList.contains('active'));
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      items.forEach(other => expand(other, other === item && open));
    });
  });
  document.body.classList.add('kp-interactive');
});
