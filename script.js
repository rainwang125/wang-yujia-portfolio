const tabs = document.querySelectorAll('[data-tab-link]');
const panels = document.querySelectorAll('[data-panel]');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.tabs');
const transitionLayer = document.createElement('div');
transitionLayer.className = 'page-transition';
transitionLayer.setAttribute('aria-hidden', 'true');
transitionLayer.innerHTML = '<span><i>✦</i> NOW SHOWING <i>✦</i></span>';
document.body.append(transitionLayer);
let panelSwitching = false;
const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

function showPanel(id, behavior = 'smooth') {
  const target = document.getElementById(id);
  if (!target || !target.matches('[data-panel]')) return;
  loadPanelImages(id);
  panels.forEach(panel => {
    const isActive = panel === target;
    panel.classList.toggle('active', isActive);
    panel.hidden = !isActive;
    panel.setAttribute('aria-hidden', String(!isActive));
  });
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tabLink === id));
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
  target.scrollIntoView({ behavior, block: 'start' });
}
async function switchPanel(id) {
  const target = document.getElementById(id);
  if (!target?.matches('[data-panel]') || panelSwitching) return;
  if (target.classList.contains('active')) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showPanel(id, 'auto');
    return;
  }
  panelSwitching = true;
  transitionLayer.classList.add('is-active');
  await wait(480);
  showPanel(id, 'auto');
  await wait(80);
  transitionLayer.classList.remove('is-active');
  await wait(650);
  panelSwitching = false;
}
tabs.forEach(tab => tab.addEventListener('click', event => {
  event.preventDefault();
  const id = tab.dataset.tabLink;
  if (panelSwitching) return;
  if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
  switchPanel(id);
}));
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });

function renderWorks() {
  Object.entries(portfolioWorks).forEach(([category, works]) => {
    const grid = document.getElementById(`${category}-grid`);
    if (category === 'directing') {
      grid.classList.add('cinema-reel', 'virtual-cinema-host');
      grid.innerHTML = `
        <div class="cinema-marquee" aria-hidden="true"><span>★　WANG YUJIA'S CINEMA　★　NOW SHOWING　★</span></div>
        <div class="virtual-cinema" data-virtual-cinema>
          <div class="cinema-instructions"><span>DRAG TO LOOK AROUND</span><b>✦ 虚拟放映厅</b><span>点击银幕播放</span></div>
          <div class="cinema-viewport">
            <div class="cinema-room" data-cinema-room>
              <i class="cinema-ceiling" aria-hidden="true"></i><i class="cinema-floor" aria-hidden="true"></i>
              ${works.map((work, index) => `
                <a class="virtual-screen virtual-screen--${index + 1}" href="${work.link || '#'}" ${work.link && work.link !== '#' ? 'target="_blank" rel="noreferrer"' : ''}>
                  <div class="virtual-screen-image" ${work.image ? `data-image="${work.image}"` : ''}>${work.video ? `<video src="${work.video}#t=0.1" muted playsinline preload="metadata" aria-label="${work.title}视频预览"></video>` : ''}<span>0${index + 1}</span><b>▶</b></div>
                  <small>${work.type}</small><h2>${work.title}</h2>
                </a>`).join('')}
            </div>
          </div>
        </div>`;
      return;
    }
    grid.classList.add('editorial-grid', `editorial-${category}`);
    if (category === 'screenplays') {
      grid.classList.add('ticket-picker', 'ticket-book', 'ring-book');
      const albumHeading = '<div class="ticket-album-heading"><div><small>YU JIA · STORY COLLECTION</small><h2>故事票根收集册</h2></div><span>VOL. 01</span></div>';
      const contents = `<section class="archive-page book-left album-contents" data-book-page="0"><small>CONTENTS / 目录</small><h3>从一张票根<br>走进一个故事</h3><ol>${works.map((work, index) => `<li><button type="button" data-book-jump="${Math.floor((index + 1) / 2)}"><span>${work.number}</span><b>${work.title}</b><small>↗</small></button></li>`).join('')}</ol><span class="album-page-number">目录 · INDEX</span></section>`;
      grid.innerHTML = `<div class="ticket-picker-toolbar"><span>右页向左翻 · 点击票根阅读</span><div><button type="button" class="book-index-button" data-book-index>目录</button><button type="button" data-ticket-prev aria-label="上一组书页">←</button><span data-ticket-position role="status" aria-live="polite"></span><button type="button" data-ticket-next aria-label="下一组书页">→</button></div></div><div class="ticket-picker-window" tabindex="0" role="region" aria-label="剧本票根收集册，使用左右方向键翻页"><div class="ticket-picker-track">` + contents + works.map((work, index) => `
        <section class="archive-page ${index % 2 ? 'book-left' : 'book-right'}" data-book-page="${index + 1}" ${index ? 'hidden' : ''}>
        <a class="script-ticket" href="${work.link}" target="_blank" rel="noreferrer">
          <div class="ticket-body"><small>YU JIA PICTURE HOUSE · 剧本放映票</small>
            <h2>${work.title}</h2><span class="ticket-genre">${work.type}</span>
            <p>${work.description}</p><span class="ticket-read">阅读完整剧本 ↗</span>
          </div>
          <div class="ticket-stub"><small>ADMIT ONE</small><b>${work.number}</b><span>${work.tag}</span><i aria-hidden="true"></i></div>
        </a><span class="album-page-number">${String(index + 1).padStart(2, '0')} / STORY COLLECTION</span></section>`).join('') + '</div><div class="album-binding" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div></div>';
      grid.insertAdjacentHTML('afterbegin', albumHeading);
      return;
    }
    if (category === 'copywriting') {
      grid.classList.add('copy-film');
      grid.innerHTML = `<div class="copy-film-heading"><span>35 MM / WORDS IN MOTION</span><span>向右滑动浏览 →</span></div>
        <div class="copy-film-track" tabindex="0" aria-label="文案作品胶片，可横向滚动">${works.map(work => `
          <a class="copy-film-frame" href="${work.link}" target="_blank" rel="noreferrer">
            <small class="copy-film-number">FRAME ${work.number} ▸</small>
            <div class="copy-film-image"><img src="${work.image}" alt="${work.title}封面" loading="lazy" decoding="async" /></div>
            <div class="copy-film-caption"><small>${work.type}</small><h2>${work.title}</h2><p>${work.description}</p><span>展开完整作品 ↗</span></div>
          </a>`).join('')}</div>`;
      return;
    }
    if (category === 'planning') {
      grid.classList.add('ticket-machines');
      grid.innerHTML = works.map(work => `
        <a class="ticket-machine" href="${work.link}" target="_blank" rel="noreferrer">
          <div class="machine-sign"><span>✦ 自助取票</span><small>NO. ${work.number}</small></div>
          <div class="machine-monitor"><img src="${work.image}" alt="${work.title}封面" loading="lazy" decoding="async" /></div>
          <div class="machine-details"><small>${work.type}</small><h2>${work.title}</h2><p>${work.description}</p></div>
          <div class="machine-controls"><span class="machine-button">领取策划票 ↗</span><span class="machine-speaker" aria-hidden="true"></span></div>
          <div class="machine-slot"><span>查看完整策划 · 两页展示</span></div>
          <div class="machine-foot" aria-hidden="true">YU JIA · TICKET SERVICE</div>
        </a>`).join('');
      return;
    }
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
setupTicketBook();
setupVirtualCinema();
function setupTicketBook() {
  const picker = document.querySelector('.ring-book');
  if (!picker) return;
  const viewport = picker.querySelector('.ticket-picker-window');
  const track = picker.querySelector('.ticket-picker-track');
  const pages = [...track.querySelectorAll('[data-book-page]')];
  const previous = picker.querySelector('[data-ticket-prev]');
  const next = picker.querySelector('[data-ticket-next]');
  const position = picker.querySelector('[data-ticket-position]');
  const indexButton = picker.querySelector('[data-book-index]');
  if (!pages.length) return;
  if (pages.length % 2) {
    const blank = document.createElement('section');
    blank.className = 'archive-page book-right';
    blank.innerHTML = '<div class="ticket-book-endnote"><b>故事仍在继续</b></div>';
    track.append(blank); pages.push(blank);
  }
  const spreadCount = pages.length / 2;
  let spread = 0, turning = false;
  const display = (left, right) => pages.forEach((page, index) => { page.hidden = index !== left && index !== right; });
  const update = () => {
    display(spread * 2, spread * 2 + 1);
    position.textContent = `${spread + 1} / ${spreadCount}`;
    previous.disabled = spread === 0;
    next.disabled = spread === spreadCount - 1;
    indexButton.disabled = spread === 0;
    viewport.setAttribute('aria-label', `票根收集册，第 ${spread + 1} 组书页，共 ${spreadCount} 组，左右方向键翻页`);
  };
  const goTo = async destination => {
    destination = Math.max(0, Math.min(spreadCount - 1, destination));
    if (turning || destination === spread) return;
    const direction = destination > spread ? 1 : -1;
    turning = true;
    picker.classList.add('is-turning');
    viewport.setAttribute('aria-busy', 'true');
    const focusedPage = document.activeElement?.closest('[data-book-page]');
    let leaf;
    try {
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches && typeof track.animate === 'function') {
        leaf = document.createElement('div');
        leaf.className = 'album-turning-leaf ' + (direction > 0 ? 'turn-forward' : 'turn-backward');
        leaf.setAttribute('aria-hidden', 'true'); leaf.inert = true;
        const front = pages[spread * 2 + (direction > 0 ? 1 : 0)].cloneNode(true);
        const back = pages[destination * 2 + (direction > 0 ? 0 : 1)].cloneNode(true);
        front.hidden = false; back.hidden = false;
        front.classList.add('leaf-front'); back.classList.add('leaf-back');
        leaf.append(front, back); track.append(leaf);
        // Reveal only the page beneath the moving leaf; the opposite page stays in place.
        display(direction > 0 ? spread * 2 : destination * 2, direction > 0 ? destination * 2 + 1 : spread * 2 + 1);
        await leaf.animate([
          { transform: 'rotateY(0deg)' },
          { transform: `rotateY(${direction > 0 ? -180 : 180}deg)` }
        ], { duration: 720, easing: 'cubic-bezier(.35,.05,.2,1)', fill: 'forwards' }).finished;
      }
    } catch (error) {
      // A cancelled animation still completes the requested page change.
      if (error.name !== 'AbortError') console.warn('Book animation unavailable:', error);
    } finally {
      spread = destination;
      update();
      leaf?.remove();
      turning = false;
      picker.classList.remove('is-turning');
      viewport.setAttribute('aria-busy', 'false');
      if (focusedPage?.hidden) viewport.focus({ preventScroll: true });
    }
  };
  previous.addEventListener('click', () => goTo(spread - 1));
  next.addEventListener('click', () => goTo(spread + 1));
  indexButton.addEventListener('click', () => goTo(0));
  picker.addEventListener('click', event => {
    const button = event.target.closest('[data-book-jump]');
    if (button) goTo(Number(button.dataset.bookJump));
  });
  picker.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault(); goTo(spread + (event.key === 'ArrowRight' ? 1 : -1));
  });
  update();
}
function loadPanelImages(id) {
  document.querySelectorAll(`#${id} .work-cover[data-image], #${id} .cinema-screen[data-image], #${id} .virtual-screen-image[data-image]`).forEach(cover => {
    if (!cover.style.backgroundImage) cover.style.backgroundImage = `url('${cover.dataset.image}')`;
  });
}
document.querySelectorAll('.work-card[href="#"]').forEach(card => card.addEventListener('click', event => event.preventDefault()));
const initialTab = location.hash.slice(1);
showPanel(document.getElementById(initialTab)?.matches('[data-panel]') ? initialTab : 'home', 'auto');
window.addEventListener('popstate', () => {
  const id = location.hash.slice(1);
  switchPanel(document.getElementById(id)?.matches('[data-panel]') ? id : 'home');
});

function setupVirtualCinema() {
  document.querySelectorAll('[data-virtual-cinema]').forEach(cinema => {
    const room = cinema.querySelector('[data-cinema-room]');
    let active = false, moved = false, startX = 0, startY = 0, originX = 0, originY = 0, yaw = 0, pitch = 0;
    const render = () => room.style.setProperty('--room-rotation', `rotateX(${pitch}deg) rotateY(${yaw}deg)`);
    cinema.addEventListener('pointerdown', event => {
      if (event.button !== 0 || !event.isPrimary) return;
      active = true; moved = false; startX = event.clientX; startY = event.clientY;
      originX = startX; originY = startY;
    });
    cinema.addEventListener('pointermove', event => {
      if (!active) return;
      const dx = event.clientX - startX, dy = event.clientY - startY;
      if (!moved && Math.hypot(event.clientX - originX, event.clientY - originY) > 7) {
        moved = true;
        cinema.setPointerCapture(event.pointerId);
        cinema.classList.add('is-dragging');
      }
      if (!moved) return;
      yaw = Math.max(-17, Math.min(17, yaw + dx * .08));
      pitch = Math.max(-10, Math.min(10, pitch - dy * .055));
      startX = event.clientX; startY = event.clientY; render();
    });
    const end = event => { if (!active) return; active = false; cinema.classList.remove('is-dragging'); if (cinema.hasPointerCapture(event.pointerId)) cinema.releasePointerCapture(event.pointerId); };
    cinema.addEventListener('pointerup', end); cinema.addEventListener('pointercancel', end);
    cinema.addEventListener('click', event => { if (moved && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); moved = false; } }, true);
    cinema.addEventListener('dragstart', event => event.preventDefault());
    render();
  });
}
