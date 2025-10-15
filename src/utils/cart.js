// src/utils/cart.js
const KEY = 'cart'

export function readCart() {
  try {
    const raw = localStorage.getItem(KEY)
    const val = raw ? JSON.parse(raw) : []
    return Array.isArray(val) ? val : []
  } catch {
    return []
  }
}

export function writeCart(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(Array.isArray(list) ? list : []))
  } catch {}
}

export function addItem(p, qty = 1) {
  const cart = readCart()
  const i = cart.findIndex(it => it.id === p.id)
  if (i >= 0) {
    cart[i] = { ...cart[i], qty: Number(cart[i].qty || 0) + Number(qty || 1) }
  } else {
    cart.push({ ...p, qty: Number(qty || 1) })
  }
  writeCart(cart)
  return cart
}
