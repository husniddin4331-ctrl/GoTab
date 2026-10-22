/* ============================================================
   TableGo — система электронного меню для ресторанов
   Учебный прототип. Хранение: localStorage.
   ============================================================ */

/* ---------- КЛЮЧИ ХРАНИЛИЩА ---------- */
const LS = {
  menu: 'tg_menu',
  cart: 'tg_cart',
  orders: 'tg_orders',
  history: 'tg_history',
  table: 'tg_table',
  lang: 'tg_lang',
  session: 'tg_session'
};

/* ---------- НАЧАЛЬНОЕ МЕНЮ ---------- */
const DEFAULT_MENU = [
  { id: 1, name: 'Салат «Цезарь»', category: 'Салаты', price: 490, desc: 'Курица гриль, романо, пармезан, соус цезарь, гренки', img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 2, name: 'Греческий салат', category: 'Салаты', price: 420, desc: 'Фета, огурец, томаты, маслины, красный лук, орегано', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 3, name: 'Плов узбекский', category: 'Горячее', price: 690, desc: 'Баранина, рис девзира, морковь, специи, чеснок', img: 'https://images.unsplash.com/photo-1633945274309-2c16c9682a8c?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 4, name: 'Стейк рибай', category: 'Горячее', price: 1890, desc: 'Мраморная говядина 300 г, розмарин, масло трав', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 5, name: 'Паста карбонара', category: 'Горячее', price: 640, desc: 'Спагетти, гуанчале, яйцо, пекорино, чёрный перец', img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 6, name: 'Том Ям', category: 'Супы', price: 720, desc: 'Креветки, кокосовое молоко, лемонграсс, грибы', img: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 7, name: 'Крем-суп из грибов', category: 'Супы', price: 480, desc: 'Шампиньоны, сливки, трюфельное масло, сухарики', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 8, name: 'Пицца Маргарита', category: 'Пицца', price: 720, desc: 'Томатный соус, моцарелла, базилик, оливковое масло', img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 9, name: 'Пицца Пепперони', category: 'Пицца', price: 790, desc: 'Пепперони, моцарелла, томатный соус, орегано', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 10, name: 'Бургер «Классик»', category: 'Бургеры', price: 590, desc: 'Говяжья котлета, чеддер, томат, салат, соус', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 11, name: 'Картофель фри', category: 'Закуски', price: 250, desc: 'Хрустящий картофель с морской солью', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 12, name: 'Наггетсы куриные', category: 'Закуски', price: 320, desc: '8 шт., панировка, соус на выбор', img: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 13, name: 'Лимонад домашний', category: 'Напитки', price: 290, desc: 'Лимон, мята, тростниковый сахар, газировка', img: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80', stopped: false },
  { id: 14, name: 'Кофе латте', category: 'Напитки', price: 240, desc: 'Эспрессо, молоко, лёгкая пенка', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80', stopped: false }
];

const TABLES = Array.from({ length: 12 }, (_, i) => i + 1);

/* ---------- ПЕРЕВОДЫ ---------- */
const I18N = {
  ru: {
    'nav.menu': 'Меню', 'nav.cart': 'Заказ', 'nav.kitchen': 'Кухня', 'nav.reports': 'Отчёты', 'nav.admin': 'Админка',
    'header.newClient': '🆕 Новый чек',
    'hero.tag': 'Электронное меню · планшет за столом',
    'hero.title': 'Заказывайте прямо<br><span>со своего стола</span>',
    'hero.text': 'Откройте меню на планшете, выберите любимые блюда и отправьте заказ на кухню одним касанием.',
    'hero.cta1': 'Выбрать блюда', 'hero.cta2': 'Мой заказ',
    'hero.stat1': 'блюд в меню', 'hero.stat2': 'на оформление', 'hero.stat3': 'ожидания официанта',
    'menu.title': 'Меню ресторана', 'menu.subtitle': 'Выберите блюда — они сразу попадут в ваш заказ',
    'cart.title': 'Ваш заказ', 'cart.subtitle': 'Проверьте состав и отправьте заказ на кухню',
    'cart.table': 'Номер стола', 'cart.comment': 'Комментарий к заказу', 'cart.commentPh': 'Без лука, острее...',
    'cart.positions': 'Позиций', 'cart.count': 'Блюд всего', 'cart.total': 'Итого',
    'cart.submit': 'Отправить заказ на кухню', 'cart.clear': 'Очистить заказ',
    'kitchen.title': 'Экран кухни / администратора', 'kitchen.subtitle': 'Новые заказы появляются здесь автоматически',
    'reports.title': 'Отчёт по продажам', 'reports.subtitle': 'История заказов и аналитика в реальном времени',
    'reports.top': 'Топ блюд', 'reports.history': 'История заказов',
    'reports.seed': 'Добавить демо-данные', 'reports.clear': 'Очистить историю',
    'admin.title': 'Админка — управление меню', 'admin.subtitle': 'Добавляйте, редактируйте, удаляйте блюда и ставьте стоп-лист',
    'admin.formAdd': 'Добавить / изменить блюдо', 'admin.name': 'Название', 'admin.category': 'Категория',
    'admin.price': 'Цена (₽)', 'admin.desc': 'Описание', 'admin.img': 'URL фото',
    'admin.save': 'Сохранить', 'admin.reset': 'Сбросить', 'admin.list': 'Блюда в меню',
    'footer.local': 'Данные хранятся локально (localStorage)',
    'receipt.title': 'Чек', 'receipt.print': '🖨 Печать', 'receipt.pay': 'Оплачено'
  },
  en: {
    'nav.menu': 'Menu', 'nav.cart': 'Order', 'nav.kitchen': 'Kitchen', 'nav.reports': 'Reports', 'nav.admin': 'Admin',
    'header.newClient': '🆕 New bill',
    'hero.tag': 'Digital menu · tablet at the table',
    'hero.title': 'Order right<br><span>from your table</span>',
    'hero.text': 'Open the menu on a tablet, pick your favorite dishes and send the order to the kitchen with one tap.',
    'hero.cta1': 'Choose dishes', 'hero.cta2': 'My order',
    'hero.stat1': 'dishes on menu', 'hero.stat2': 'to order', 'hero.stat3': 'waiter waiting',
    'menu.title': 'Restaurant menu', 'menu.subtitle': 'Pick dishes — they go straight to your order',
    'cart.title': 'Your order', 'cart.subtitle': 'Check the items and send to the kitchen',
    'cart.table': 'Table number', 'cart.comment': 'Order comment', 'cart.commentPh': 'No onion, extra spicy...',
    'cart.positions': 'Items', 'cart.count': 'Total dishes', 'cart.total': 'Total',
    'cart.submit': 'Send order to kitchen', 'cart.clear': 'Clear order',
    'kitchen.title': 'Kitchen / admin screen', 'kitchen.subtitle': 'New orders appear here automatically',
    'reports.title': 'Sales report', 'reports.subtitle': 'Order history and live analytics',
    'reports.top': 'Top dishes', 'reports.history': 'Order history',
    'reports.seed': 'Add demo data', 'reports.clear': 'Clear history',
    'admin.title': 'Admin — menu management', 'admin.subtitle': 'Add, edit, delete dishes and set stop-list',
    'admin.formAdd': 'Add / edit dish', 'admin.name': 'Name', 'admin.category': 'Category',
    'admin.price': 'Price (₽)', 'admin.desc': 'Description', 'admin.img': 'Photo URL',
    'admin.save': 'Save', 'admin.reset': 'Reset', 'admin.list': 'Dishes on menu',
    'footer.local': 'Data stored locally (localStorage)',
    'receipt.title': 'Receipt', 'receipt.print': '🖨 Print', 'receipt.pay': 'Paid'
  },
  uz: {
    'nav.menu': 'Menyu', 'nav.cart': 'Buyurtma', 'nav.kitchen': 'Oshxona', 'nav.reports': 'Hisobotlar', 'nav.admin': 'Admin',
    'header.newClient': '🆕 Yangi chek',
    'hero.tag': 'Elektron menyu · stoldagi planshet',
    'hero.title': 'To‘g‘ridan-to‘g‘ri<br><span>stolingizdan buyurtma bering</span>',
    'hero.text': 'Planshetdagi menyuni oching, sevimli taomlaringizni tanlang va bir tegish bilan oshxonaga yuboring.',
    'hero.cta1': 'Taom tanlash', 'hero.cta2': 'Mening buyurtmam',
    'hero.stat1': 'menyudagi taomlar', 'hero.stat2': 'buyurtma uchun', 'hero.stat3': 'ofitsiant kutish',
    'menu.title': 'Restoran menyusi', 'menu.subtitle': 'Taomlarni tanlang — ular darhol buyurtmangizga tushadi',
    'cart.title': 'Sizning buyurtmangiz', 'cart.subtitle': 'Tarkibni tekshiring va oshxonaga yuboring',
    'cart.table': 'Stol raqami', 'cart.comment': 'Buyurtmaga izoh', 'cart.commentPh': 'Piyozsiz, achchiqroq...',
    'cart.positions': 'Pozitsiyalar', 'cart.count': 'Jami taomlar', 'cart.total': 'Jami',
    'cart.submit': 'Oshxonaga yuborish', 'cart.clear': 'Buyurtmani tozalash',
    'kitchen.title': 'Oshxona / administrator ekrani', 'kitchen.subtitle': 'Yangi buyurtmalar bu yerda avtomatik paydo bo‘ladi',
    'reports.title': 'Savdo hisoboti', 'reports.subtitle': 'Buyurtmalar tarixi va real vaqtdagi tahlil',
    'reports.top': 'Eng ko‘p taomlar', 'reports.history': 'Buyurtmalar tarixi',
    'reports.seed': 'Demo ma’lumot qo‘shish', 'reports.clear': 'Tarixni tozalash',
    'admin.title': 'Admin — menyu boshqaruvi', 'admin.subtitle': 'Taomlarni qo‘shish, tahrirlash, o‘chirish va stop-list',
    'admin.formAdd': 'Taom qo‘shish / tahrirlash', 'admin.name': 'Nomi', 'admin.category': 'Kategoriya',
    'admin.price': 'Narxi (₽)', 'admin.desc': 'Tavsif', 'admin.img': 'Rasm URL',
    'admin.save': 'Saqlash', 'admin.reset': 'Tozalash', 'admin.list': 'Menyudagi taomlar',
    'footer.local': 'Ma’lumotlar lokal (localStorage) saqlanadi',
    'receipt.title': 'Chek', 'receipt.print': '🖨 Chop etish', 'receipt.pay': 'To‘landi'
  }
};

/* ---------- СОСТОЯНИЕ ---------- */
let state = {
  menu: load(LS.menu, null) || DEFAULT_MENU,
  cart: load(LS.cart, []),
  orders: load(LS.orders, []),
  history: load(LS.history, []),
  table: load(LS.table, 1),
  lang: load(LS.lang, 'ru'),
  session: load(LS.session, null),
  activeCategory: 'Все',
  editingDishId: null,
  receiptOrderId: null
};

/* ---------- УТИЛИТЫ ---------- */
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch (e) { console.warn('save failed', key, e); }
}
function money(n) {
  return new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
}
function dishById(id) {
  return state.menu.find(d => d.id === id);
}
function nowTime() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}
function nowFull() {
  return new Date().toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}
function t(key) {
  return (I18N[state.lang] && I18N[state.lang][key]) || (I18N.ru[key] || key);
}
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('is-show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('is-show'), 2400);
}

/* ---------- ПЕРЕВОД ИНТЕРФЕЙСА ---------- */
function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    const val = t(key);
    if (val) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    const val = t(key);
    if (val) el.placeholder = val;
  });
  const sel = document.getElementById('langSelect');
  if (sel) sel.value = state.lang;
  document.documentElement.lang = state.lang;
}

/* ---------- ПЕРЕКЛЮЧЕНИЕ VIEW ---------- */
function switchView(name) {
  document.querySelectorAll('.view').forEach(v => {
    v.classList.toggle('is-active', v.id === 'view-' + name);
  });
  document.querySelectorAll('.nav__btn').forEach(b => {
    b.classList.toggle('is-active', b.dataset.view === name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- СЕССИЯ / НОВЫЙ ЧЕК ---------- */
function startSession(table) {
  state.session = {
    id: 'sess_' + Date.now(),
    table: table,
    startedAt: Date.now()
  };
  save(LS.session, state.session);
  state.cart = [];
  save(LS.cart, state.cart);
  state.table = table;
  save(LS.table, table);
  document.getElementById('commentInput').value = '';
  renderCart();
  renderTables();
  updateCartBadge();
  toast(`Новый чек · Стол №${table}`);
}

function newClientClick() {
  const table = state.table || 1;
  if (state.cart.length && !confirm('Очистить текущий заказ и начать новый чек?')) return;
  startSession(table);
  switchView('menu');
}

/* ---------- КАТЕГОРИИ ---------- */
function renderCategories() {
  const cats = ['Все', ...new Set(state.menu.map(d => d.category))];
  const wrap = document.getElementById('categoryChips');
  wrap.innerHTML = cats.map(c =>
    `<button class="chip ${c === state.activeCategory ? 'is-active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');
}

/* ---------- МЕНЮ ---------- */
function renderMenu() {
  const grid = document.getElementById('menuGrid');
  const list = state.activeCategory === 'Все'
    ? state.menu
    : state.menu.filter(d => d.category === state.activeCategory);

  if (!list.length) {
    grid.innerHTML = `<p class="empty-note">В этой категории пока нет блюд.</p>`;
    return;
  }

  grid.innerHTML = list.map(d => {
    const inCart = state.cart.find(i => i.id === d.id);
    const stop = d.stopped;
    return `
      <article class="dish ${stop ? 'dish--stopped' : ''}">
        <div class="dish__img">
          <img src="${d.img || ''}" alt="${d.name}" loading="lazy" onerror="this.style.display='none'">
          <span class="dish__cat">${d.category}</span>
        </div>
        <div class="dish__body">
          <h3 class="dish__name">${d.name}</h3>
          <p class="dish__desc">${d.desc || ''}</p>
          <div class="dish__footer">
            <span class="dish__price">${money(d.price)}</span>
            ${stop
              ? `<button class="dish__add" disabled>Нет в наличии</button>`
              : `<button class="dish__add ${inCart ? 'is-added' : ''}" data-add="${d.id}">${inCart ? `✓ ${inCart.qty} шт.` : '+ В заказ'}</button>`
            }
          </div>
        </div>
      </article>`;
  }).join('');

  document.getElementById('heroStatDishes').textContent = state.menu.filter(d => !d.stopped).length;
}

/* ---------- ТАБЛИЦА СТОЛОВ ---------- */
function renderTables() {
  const sel = document.getElementById('tableSelect');
  sel.innerHTML = TABLES.map(n =>
    `<option value="${n}" ${n === state.table ? 'selected' : ''}>Стол №${n}</option>`
  ).join('');
}

/* ---------- КОРЗИНА ---------- */
function renderCart() {
  const wrap = document.getElementById('cartItems');
  const sum = getCartSummary();

  if (!state.cart.length) {
    wrap.innerHTML = `<div class="cart-empty"><span>🛒</span>Ваш заказ пуст. Перейдите в меню и выберите блюда.</div>`;
  } else {
    wrap.innerHTML = state.cart.map(item => {
      const d = dishById(item.id);
      if (!d) return '';
      return `
        <div class="cart-item">
          <img class="cart-item__img" src="${d.img || ''}" alt="${d.name}" onerror="this.style.visibility='hidden'">
          <div class="cart-item__info">
            <div class="cart-item__name">${d.name}</div>
            <div class="cart-item__price">${money(d.price)} / шт.</div>
          </div>
          <div class="cart-item__controls">
            <div class="qty">
              <button data-dec="${d.id}" aria-label="−">−</button>
              <span>${item.qty}</span>
              <button data-inc="${d.id}" aria-label="+">+</button>
            </div>
            <div class="cart-item__sum">${money(d.price * item.qty)}</div>
            <button class="cart-item__remove" data-remove="${d.id}" aria-label="Удалить">✕</button>
          </div>
        </div>`;
    }).join('');
  }

  document.getElementById('sumPositions').textContent = sum.positions;
  document.getElementById('sumCount').textContent = sum.count;
  document.getElementById('sumTotal').textContent = money(sum.total);
  document.getElementById('submitOrder').disabled = !state.cart.length;
}

function getCartSummary() {
  let positions = state.cart.length, count = 0, total = 0;
  state.cart.forEach(i => {
    const d = dishById(i.id);
    if (!d) return;
    count += i.qty;
    total += d.price * i.qty;
  });
  return { positions, count, total };
}

function addToCart(id) {
  const d = dishById(id);
  if (!d || d.stopped) return;
  const item = state.cart.find(i => i.id === id);
  if (item) item.qty += 1;
  else state.cart.push({ id, qty: 1 });
  persistCart();
  renderMenu(); renderCart(); updateCartBadge();
  toast('Добавлено в заказ');
}

function changeQty(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) state.cart = state.cart.filter(i => i.id !== id);
  persistCart();
  renderMenu(); renderCart(); updateCartBadge();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(i => i.id !== id);
  persistCart();
  renderMenu(); renderCart(); updateCartBadge();
}

function clearCart() {
  if (!state.cart.length) return;
  if (!confirm('Очистить текущий заказ?')) return;
  state.cart = [];
  persistCart();
  renderMenu(); renderCart(); updateCartBadge();
  toast('Заказ очищен');
}

function persistCart() { save(LS.cart, state.cart); }

function updateCartBadge() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartBadge').textContent = count;
}

/* ---------- ОФОРМЛЕНИЕ ЗАКАЗА ---------- */
function submitOrder() {
  if (!state.cart.length) { toast('Корзина пуста'); return; }

  const table = Number(document.getElementById('tableSelect').value) || state.table;
  state.table = table; save(LS.table, table);

  const comment = (document.getElementById('commentInput').value || '').trim().slice(0, 300);

  const items = state.cart.map(i => {
    const d = dishById(i.id);
    return { id: d.id, name: d.name, price: d.price, qty: i.qty };
  });
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const order = {
    id: 'ord_' + Date.now() + '_' + Math.floor(Math.random() * 999),
    sessionId: state.session ? state.session.id : null,
    table,
    items,
    total,
    comment,
    status: 'new',
    time: nowTime(),
    createdAt: Date.now(),
    startedAt: Date.now(),
    readyAt: null
  };

  state.orders.push(order);
  save(LS.orders, state.orders);

  state.cart = [];
  persistCart();

  renderMenu(); renderCart(); updateCartBadge(); renderKitchen();
  toast(`Заказ отправлен · Стол №${table}`);
  switchView('kitchen');
}

/* ---------- КУХНЯ ---------- */
function renderKitchen() {
  const wrap = document.getElementById('kitchenList');
  const orders = state.orders;

  if (!orders.length) {
    wrap.innerHTML = `<div class="cart-empty"><span>🍳</span>Активных заказов нет. Новые заказы появятся здесь.</div>`;
    updateKitchenBadge();
    return;
  }

  const statusText = {
    new: 'Новый', cooking: 'Готовится', ready: 'Готов', served: 'Подан', paid: 'Оплачен'
  };

  wrap.innerHTML = orders.slice().sort((a, b) => b.createdAt - a.createdAt).map(o => {
    const timer = o.status === 'cooking' || o.status === 'new'
      ? `<div class="order-card__timer" data-timer="${o.id}">⏱ ${formatElapsed(o)}</div>`
      : o.status === 'ready' && o.readyAt
        ? `<div class="order-card__timer">✅ ${formatDuration(o.readyAt - o.startedAt)}</div>`
        : '';

    let actions = '';
    if (o.status === 'new') {
      actions = `<button class="btn btn--primary" data-status="${o.id}" data-next="cooking">Начать готовить</button>`;
    } else if (o.status === 'cooking') {
      actions = `<button class="btn btn--primary" data-status="${o.id}" data-next="ready">Готов</button>`;
    } else if (o.status === 'ready') {
      actions = `<button class="btn btn--primary" data-status="${o.id}" data-next="served">Подан</button>
                 <button class="btn btn--ghost" data-receipt="${o.id}">Чек</button>`;
    } else if (o.status === 'served') {
      actions = `<button class="btn btn--primary" data-status="${o.id}" data-next="paid">Оплачен</button>
                 <button class="btn btn--ghost" data-receipt="${o.id}">Чек</button>`;
    } else {
      actions = `<button class="btn btn--ghost" disabled>Завершён</button>`;
    }

    return `
      <article class="order-card order-card--${o.status}">
        <div class="order-card__head">
          <div>
            <div class="order-card__table">Стол №${o.table}</div>
            <div class="order-card__time">${o.time} · Заказ #${o.id.slice(-4)}</div>
            ${timer}
          </div>
          <span class="status status--${o.status}">${statusText[o.status]}</span>
        </div>
        <ul class="order-card__list">
          ${o.items.map(i => `<li><span>${i.name}</span><b>${i.qty} шт.</b></li>`).join('')}
        </ul>
        ${o.comment ? `<div class="order-card__comment">💬 ${escapeHtml(o.comment)}</div>` : ''}
        <div class="order-card__total">
          <span>Итого</span>
          <span>${money(o.total)}</span>
        </div>
        <div class="order-card__actions">${actions}</div>
      </article>`;
  }).join('');

  updateKitchenBadge();
}

function updateKitchenBadge() {
  const active = state.orders.filter(o => o.status !== 'paid').length;
  document.getElementById('kitchenBadge').textContent = active;
}

function formatElapsed(o) {
  const ms = Date.now() - (o.startedAt || o.createdAt);
  return formatDuration(ms);
}
function formatDuration(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ---------- СМЕНА СТАТУСА ---------- */
function changeOrderStatus(orderId, nextStatus) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = nextStatus;

  if (nextStatus === 'ready') order.readyAt = Date.now();

  if (nextStatus === 'paid') {
    order.closedAt = nowFull();
    state.history.push({ ...order });
    state.orders = state.orders.filter(o => o.id !== orderId);
    save(LS.history, state.history);
    toast(`Заказ стола №${order.table} закрыт на ${money(order.total)}`);
  } else {
    toast({
      cooking: 'Заказ отправлен в готовку',
      ready: 'Заказ готов к выдаче',
      served: 'Заказ подан гостю'
    }[nextStatus] || 'Статус обновлён');
  }

  save(LS.orders, state.orders);
  renderKitchen();
  renderReports();
}

/* ---------- ЧЕК ---------- */
function openReceipt(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;
  state.receiptOrderId = orderId;
  const body = document.getElementById('receiptBody');
  body.innerHTML = `
    <h4>TABLego · ЧЕК</h4>
    <div class="receipt__meta">
      Стол №${order.table} · ${order.time}<br>
      Заказ #${order.id.slice(-6)}
    </div>
    ${order.items.map(i => `
      <div class="receipt__row">
        <span>${escapeHtml(i.name)} × ${i.qty}</span>
        <span>${money(i.price * i.qty)}</span>
      </div>`).join('')}
    <div class="receipt__total">
      <span>ИТОГО</span>
      <span>${money(order.total)}</span>
    </div>
    <div class="receipt__thanks">Спасибо за заказ! Ждём вас снова.</div>
  `;
  document.getElementById('receiptModal').classList.add('is-open');
}

function closeReceipt() {
  document.getElementById('receiptModal').classList.remove('is-open');
  state.receiptOrderId = null;
}

function payFromReceipt() {
  if (!state.receiptOrderId) return;
  changeOrderStatus(state.receiptOrderId, 'paid');
  closeReceipt();
}

function printReceipt() {
  const body = document.getElementById('receiptBody');
  const w = window.open('', '_blank', 'width=400,height=600');
  w.document.write(`<pre style="font-family:'Courier New',monospace;padding:16px;">${body.innerText}</pre>`);
  w.document.close();
  w.focus();
  w.print();
}

/* ---------- ОТЧЁТЫ ---------- */
function renderReports() {
  const h = state.history;
  const totalRevenue = h.reduce((s, o) => s + o.total, 0);
  const totalOrders = h.length;
  const avgCheck = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;

  const dishCounter = {};
  h.forEach(o => o.items.forEach(i => {
    dishCounter[i.name] = (dishCounter[i.name] || 0) + i.qty;
  }));
  const top = Object.entries(dishCounter).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxQty = top.length ? top[0][1] : 1;

  document.getElementById('reportStats').innerHTML = `
    <div class="stat"><div class="stat__label">Выручка</div><div class="stat__value">${money(totalRevenue)}</div></div>
    <div class="stat"><div class="stat__label">Заказов</div><div class="stat__value">${totalOrders}</div></div>
    <div class="stat"><div class="stat__label">Средний чек</div><div class="stat__value">${money(avgCheck)}</div></div>
    <div class="stat"><div class="stat__label">Б