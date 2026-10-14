import { formatarPreco } from './formatarPreco'

export function produtoTemPreco(produto) {
    if (!produto) return false

    const preco = Number(produto.price)
    return Number.isFinite(preco) && preco > 0
}

export function produtoDisponivel(produto) {
    if (!produto) return false

    return produto.estoque > 0 && produtoTemPreco(produto)
}

export function valorRestanteFreteGratis(valorTotal, limite = 200) {
    return Math.max(0, limite - valorTotal)
}

export function mensagemFreteGratis(valorTotal, limite = 200) {
    const restante = valorRestanteFreteGratis(valorTotal, limite)

    if (restante === 0) {
        return 'Frete grátis ativado'
    }

    return `Faltam ${formatarPreco(restante)} para ganhar frete grátis`
}
