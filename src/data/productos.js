// src/data/productos.js
const KEY = 'ms_products_v1';

const seed = [
  { id: 1,  code: 'TC001', category: 'Tortas Cuadradas',   name: 'Torta Cuadrada de Chocolate', price: 45000,  img: '/assets/imagenes/torta-cuadrada-chocolate.jpg', onSale: false },
  { id: 2,  code: 'TC002', category: 'Tortas Cuadradas',   name: 'Torta Cuadrada de Frutas',    price: 50000,  img: '/assets/imagenes/torta-cuadrada-frutas.jpg',    onSale: false },
  { id: 3,  code: 'TT001', category: 'Tortas Circulares',  name: 'Torta Circular de Vainilla',  price: 40000,  img: '/assets/imagenes/torta-circular-vainilla.jpg', onSale: false },
  { id: 4,  code: 'TT002', category: 'Tortas Circulares',  name: 'Torta Circular de Manjar',    price: 42000,  img: '/assets/imagenes/torta-circular-manjar.jpg',   onSale: false },
  { id: 5,  code: 'PI001', category: 'Postres Individuales', name: 'Mousse de Chocolate',       price: 5000,   img: '/assets/imagenes/mousse-chocolate.jpg',       onSale: false },
  { id: 6,  code: 'PI002', category: 'Postres Individuales', name: 'Tiramisú Clásico',          price: 5500,   img: '/assets/imagenes/tiramisu.jpg',                onSale: false },
  { id: 7,  code: 'PSA001', category: 'Productos Sin Azúcar', name: 'Torta Sin Azúcar de Naranja', price: 48000, img: '/assets/imagenes/torta-sin-azucar-naranja.jpg', onSale: false },
  { id: 8,  code: 'PSA002', category: 'Productos Sin Azúcar', name: 'Cheesecake Sin Azúcar',    price: 47000,  img: '/assets/imagenes/cheesecake-sin-azucar.jpg',  onSale: false },
  { id: 9,  code: 'PT001', category: 'Pastelería Tradicional', name: 'Empanada de Manzana',     price: 3000,   img: '/assets/imagenes/empanada-manzana.jpg',       onSale: false },
  { id:10,  code: 'PT002', category: 'Pastelería Tradicional', name: 'Tarta de Santiago',       price: 6000,   img: '/assets/imagenes/tarta-santiago.jpg',         onSale: false },
  { id:11,  code: 'PG001', category: 'Productos Sin Gluten', name: 'Brownie Sin Gluten',         price: 4000,   img: '/assets/imagenes/brownie-sin-gluten.jpg',     onSale: false },
  { id:12,  code: 'PG002', category: 'Productos Sin Gluten', name: 'Pan Sin Gluten',             price: 3500,   img: '/assets/imagenes/pan-sin-gluten.jpg',        onSale: false },
  { id:13,  code: 'PV001', category: 'Productos Veganos',   name: 'Torta Vegana de Chocolate',  price: 50000,  img: '/assets/imagenes/torta-vegana-chocolate.jpg', onSale: false },
  { id:14,  code: 'PV002', category: 'Productos Veganos',   name: 'Galletas Veganas de Avena',  price: 4500,   img: '/assets/imagenes/galletas-veg-vevena.jpg',    onSale: false },
  { id:15,  code: 'TE001', category: 'Tortas Especiales',   name: 'Torta Especial de Cumpleaños', price: 55000, img: '/assets/imagenes/torta-especial-cumple.jpg', onSale: false },
  { id:16,  code: 'TE002', category: 'Tortas Especiales',   name: 'Torta Especial de Boda',     price: 60000,  img: '/assets/imagenes/torta-especial-boda.jpg',    onSale: false },
]

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : seed;
  } catch {
    return seed;
  }
}

function save(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
}

export function getAll() { return load(); }
export function getById(id) { return load().find(p => p.id === Number(id)) || null; }
export function create(product) {
  const list = load();
  const id = list.length ? Math.max(...list.map(p => p.id)) + 1 : 1;
  const nuevo = { id, ...product };
  save([...list, nuevo]);
  return nuevo;
}
export function update(id, patch) {
  const list = load();
  const i = list.findIndex(p => p.id === Number(id));
  if (i < 0) return null;
  list[i] = { ...list[i], ...patch };
  save(list);
  return list[i];
}
export function remove(id) {
  const list = load().filter(p => p.id !== Number(id));
  save(list);
}
export function getByCategory(cat) {
  if (cat === 'all') return getAll();
  return load().filter(p => p.category === cat);
}
export function getOffers() {
  return load().filter(p => p.onSale);
}
