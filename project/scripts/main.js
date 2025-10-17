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
    if (i === -1) { favs.push(name); setBtnState(btn, true); }
    else { favs.splice(i, 1); setBtnState(btn, false); }
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

const LAST_ORDER_KEY = 'sublipronto:lastOrder';

function serializeForm(form) {
    const data = new FormData(form);
    const obj = {};
    for (const [k, v] of data.entries()) obj[k] = String(v).trim();
    obj.timestamp = new Date().toISOString();
    return obj;
}

const orderForm = $('#orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const product = $('#product')?.value;
        const qty = parseInt($('#qty')?.value || '0', 10) || 0;
        if (!product) { alert('Please choose a product.'); return; }
        if (qty < 1) { alert('Quantity must be at least 1.'); return; }

        const orderObj = serializeForm(orderForm);
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(orderObj));

        window.location.href = 'confirm.html';
    });
}

function renderConfirmation() {
    const box = $('#order-confirm');
    if (!box) return;

    const raw = localStorage.getItem(LAST_ORDER_KEY);
    if (!raw) { box.textContent = 'No order found.'; return; }

    const o = JSON.parse(raw);

    const items = [
        { label: 'Product', value: o.product || '—' },
        { label: 'Quantity', value: o.qty || '—' },
        { label: 'Preferred Colors', value: o.color || '—' },
        { label: 'Desired Date', value: o.deadline || '—' },
        { label: 'Notes', value: o.notes || '—' },
        { label: 'Name', value: o.name || '—' },
        { label: 'Email', value: o.email || '—' },
        { label: 'Phone', value: o.phone || '—' }
    ];

    const list = items
        .map(it => `<li><strong>${it.label}:</strong> ${it.value}</li>`)
        .join('');

    const when = new Date(o.timestamp).toLocaleString();

    box.innerHTML = `
    <p><strong>Order ID:</strong> ${o.timestamp.replace(/\D/g, '').slice(0, 14)}</p>
    <p class="small">Submitted on ${when}</p>
    <ul style="margin-left:1rem">${list}</ul>
    <p class="center" style="margin-top:1rem;">
      <a class="btn" href="order.html">Submit another request</a>
    </p>
  `;
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('orderForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

        const builtInValid = form.checkValidity();

        const requiredFields = Array.from(form.querySelectorAll('[required]'));
        let firstInvalid = null;

        requiredFields.forEach((field) => {
            const val = (field.value ?? '').trim();
            const empty = val === '' || (field.tagName === 'SELECT' && field.selectedIndex === 0);
            if (!firstInvalid && (empty || !field.checkValidity())) {
                firstInvalid = field;
            }
            if (empty || !field.checkValidity()) {
                field.classList.add('invalid');
                field.setAttribute('aria-invalid', 'true');
            } else {
                field.removeAttribute('aria-invalid');
            }
        });

        if (!builtInValid || firstInvalid) {
            e.preventDefault();
            alert('Please fill out all required fields before submitting.');
            if (firstInvalid) firstInvalid.focus({ preventScroll: false });
        }
    });
});

renderConfirmation();