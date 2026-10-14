export const API_URL = import.meta.env.VITE_API_URL

export function get(caminho) {
  return fetch(API_URL + caminho).then((resposta) => {
    if (!resposta.ok) {
      throw new Error('Erro ao buscar ' + caminho + ': ' + resposta.status)
    }
    return resposta.json()
  })
}
