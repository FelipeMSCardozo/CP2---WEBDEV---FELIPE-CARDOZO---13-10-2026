import { get } from './api'

export function buscarClientes() {
  return get('/customers.json')
}
