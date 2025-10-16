'use strict';

const toggle = document.querySelector('.nav-toggle');
const header = document.querySelector('.site-header');
if (toggle && header) {
    toggle.addEventListener('click', () => {
        const open = header.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', String(open));
    });
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const FAV_KEY = 'sublipronto:favs';
const readFavs = () => JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
const writeFavs = (arr) => localStorage.setItem(FAV_KEY, JSON.stringify(arr));

function renderFavCount() {
    const el = document.getElementById('favCount');
    if (!el) return;
    const n = readFavs().length;
    el.textContent = n ? `(${n} favorites)` : '';
}

function setBtnState(btn, on) {
    btn.textContent = on ? '★ Saved' : '☆ Save';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
}

function toggleFav(name, btn) {
    let favs = readFavs();
    const i = favs.indexOf(name);
    if (i === -1) {
        favs.push(name);
        setBtnState(btn, true);
    } else {
        favs.splice(i, 1);
        setBtnState(btn, false);
    }
    writeFavs(favs);
    renderFavCount();
}

document.querySelectorAll('.fav-btn').forEach(btn => {
    const name = btn.dataset.product;
    const on = readFavs().includes(name);
    setBtnState(btn, on);
    btn.addEventListener('click', () => toggleFav(name, btn));
});
renderFavCount();

function $(sel, root = document) { return root.querySelector(sel); }

function orderPreview() {
    const product = $('#product')?.value || '(choose a product)';
    const qty = parseInt($('#qty')?.value || '0', 10) || 0;
    const dateVal = $('#deadline')?.value;
    const date = dateVal ? new Date(dateVal).toLocaleDateString() : '—';
    const notes = $('#notes')?.value?.trim();

    const many = qty >= 10 ? 'Bulk order' : qty >= 1 ? 'Small order' : 'Not set';
    const urgency = dateVal ? 'Requested date set' : 'No date chosen';

    const box = $('#preview');
    if (!box) return;
    box.innerHTML = `
    <strong>Summary:</strong>
    <div>Product: ${product}</div>
    <div>Qty: ${qty} <span class="small">(${many})</span></div>
    <div>Date: ${date} <span class="small">(${urgency})</span></div>
    ${notes ? `<div>Notes: ${notes}</div>` : ''}
  `;
}

['change', 'input'].forEach(evt => {
    ['#product', '#qty', '#deadline', '#notes'].forEach(id => {
        const el = $(id); if (el) el.addEventListener(evt, orderPreview);
    });
});
orderPreview();