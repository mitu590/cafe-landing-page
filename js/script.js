/* ===================================================
   1. ハンバーガーメニューの開閉
   =================================================== */
const hamburger = document.getElementById('js-hamburger');
const nav = document.getElementById('js-nav');
const navLinks = nav.querySelectorAll('a');

function closeMenu() {
  nav.classList.remove('is-open');
  hamburger.classList.remove('is-active');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'メニューを開く');
}

function toggleMenu() {
  const isOpen = nav.classList.toggle('is-open');
  hamburger.classList.toggle('is-active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
}

hamburger.addEventListener('click', toggleMenu);

/* メニュー内のリンクをタップしたら閉じる */
navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

/* 画面幅が広がったらメニュー状態をリセット */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
});

/* Escapeキーでも閉じる */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
});

/* ===================================================
   2. お問い合わせフォーム（デモ送信）
   =================================================== */
const form = document.getElementById('js-contact-form');
const formMsg = document.getElementById('js-form-msg');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // 実際の送信をキャンセル（デモ用）

    const name = form.elements['name'].value.trim();
    formMsg.textContent = `${name} 様、お問い合わせありがとうございます。（デモ送信）`;
    form.reset();

    setTimeout(() => {
      formMsg.textContent = '';
    }, 6000);
  });
}
/* ===================================================
   3. メニューを menu.json から読み込んで描画
   =================================================== */
async function loadMenu() {
  const statusEl  = document.getElementById('menu-status');
  const gridEl    = document.getElementById('menu-grid');
  const noteEl    = document.getElementById('menu-note');
  const updatedEl = document.getElementById('menu-updated');

  if (!gridEl) return; // メニューセクションが無いページでは何もしない

  try {
    // 常に最新を取りに行く（CDNキャッシュを避ける）
    const res = await fetch('./menu.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    // カテゴリを描画
    gridEl.innerHTML = data.categories.map((cat) => `
      <div class="menu-category">
        <h3>${escapeHtml(cat.name)}</h3>
        <ul>
          ${cat.items.map((item) => `
            <li>
              <span class="item-name">
                ${escapeHtml(item.name)}
                ${item.description ? `<small class="item-desc">${escapeHtml(item.description)}</small>` : ''}
              </span>
              <span class="price">${Number(item.price).toLocaleString()}${escapeHtml(data.currency || '円')}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');

    noteEl.textContent = data.note || '';
    updatedEl.textContent = data.updatedAt ? `最終更新：${data.updatedAt}` : '';

    // 読み込み成功 → ステータス非表示
    statusEl.textContent = '';
    statusEl.hidden = true;

  } catch (err) {
    console.error('メニュー読み込み失敗:', err);
    statusEl.textContent = 'メニューの読み込みに失敗しました。時間をおいて再度お試しください。';
    statusEl.classList.add('is-error');
  }
}

/* XSS対策の最小エスケープ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* 実行 */
loadMenu();
