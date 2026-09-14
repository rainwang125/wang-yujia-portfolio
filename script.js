const tabs = document.querySelectorAll('[data-tab-link]');
const panels = document.querySelectorAll('[data-panel]');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.tabs');

function showPanel(id) {
  panels.forEach(panel => panel.classList.toggle('active', panel.id === id));
  loadPanelImages(id);
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tabLink === id));
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
tabs.forEach(tab => tab.addEventListener('click', event => { event.preventDefault(); showPanel(tab.dataset.tabLink); history.replaceState(null, '', `#${tab.dataset.tabLink}`); }));
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });

function renderWorks() {
  Object.entries(portfolioWorks).forEach(([category, works]) => {
    const grid = document.getElementById(`${category}-grid`);
    grid.innerHTML = works.map(work => `
      <a class="work-card ${work.color}" href="${work.link || '#'}" ${work.link && work.link !== '#' ? 'target="_blank" rel="noreferrer"' : ''}>
        <div class="work-cover" ${work.image ? `data-image="${work.image}"` : ''}>
          ${work.coverLabel ? `<div class="film-overlay"><small>${work.coverLabel}</small><h3>${work.title}</h3><b>▶</b></div>` : work.image ? '' : `<span>${work.number}</span><b>${category === 'directing' ? '▶' : '✦'}</b>`}
        </div>
        <div class="work-info"><div><small>${work.type}</small><h2>${work.title}</h2></div><span class="arrow">↗</span></div>
        <p>${work.description}</p><em>${work.tag}</em>
      </a>`).join('');
  });
}
renderWorks();
function loadPanelImages(id) {
  document.querySelectorAll(`#${id} .work-cover[data-image]`).forEach(cover => {
    if (!cover.style.backgroundImage) cover.style.backgroundImage = `url('${cover.dataset.image}')`;
  });
}
loadPanelImages(document.querySelector('.panel.active')?.id || 'home');
document.querySelectorAll('.work-card[href="#"]').forEach(card => card.addEventListener('click', event => event.preventDefault()));
const initialTab = location.hash.slice(1);
if (document.getElementById(initialTab)) showPanel(initialTab);
