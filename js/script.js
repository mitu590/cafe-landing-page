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
