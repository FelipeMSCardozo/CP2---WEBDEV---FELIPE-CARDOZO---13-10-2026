// O carrinho guarda uma entrada por unidade adicionada.
// Ex.: duas camisetas iguais = o mesmo produto duas vezes no array.

import { produtoTemPreco } from './produtos'

export function calcularTotal(carrinho) {
  return carrinho
    .filter((produto) => produtoTemPreco(produto))
    .reduce((total, produto) => total + Number(produto.price), 0)
}

export function agruparItens(carrinho) {
  const itens = []

  carrinho
    .filter((produto) => produtoTemPreco(produto))
    .forEach((produto) => {
      const existente = itens.find((item) => item.produto.id === produto.id)
      if (existente) {
        existente.quantidade += 1
      } else {
        itens.push({ produto, quantidade: 1 })
      }
    })

  return itens
}
