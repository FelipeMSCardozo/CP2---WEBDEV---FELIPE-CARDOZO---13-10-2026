import { get } from './api'

// Formato dos produtos documentado em docs/api.md
export function buscarProdutos() {
  return get('/products.json')
}
