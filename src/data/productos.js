// Fuente de datos + CRUD con persistencia en localStorage
const KEY = 'ms_products_v1'

const seed = [
  { id: 1, name: 'Torta Tres Leches', price: 14990, category: 'Tortas Circulares', onSale: false, img: '/assets/imagenes/torta-tres-leches.jpg' },
  { id: 2, name: 'Torta Selva Negra', price: 16990, category: 'Tortas Circulares', onSale: true,  img: '/assets/imagenes/selva-negra.jpg' },
  // ...añade el resto
]

function load() {
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : seed
}
function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function getAll() {
  return load()
}
export function getById(id) {
  return load().find(p => p.id === Number(id)) || null
}
export function create(product) {
  const list = load()
  const id = list.length ? Math.max(...list.map(p => p.id)) + 1 : 1
  const nuevo = { id, ...product }
  save([...list, nuevo])
  return nuevo
}
export function update(id, patch) {
  const list = load()
  const i = list.findIndex(p => p.id === Number(id))
  if (i < 0) return null
  list[i] = { ...list[i], ...patch }
  save(list)
  return list[i]
}
export function remove(id) {
  const list = load().filter(p => p.id !== Number(id))
  save(list)
}
export function getByCategory(cat) {
  if (cat === 'all') return getAll()
  return load().filter(p => p.category === cat)
}
export function getOffers() {
  return load().filter(p => p.onSale)
}
