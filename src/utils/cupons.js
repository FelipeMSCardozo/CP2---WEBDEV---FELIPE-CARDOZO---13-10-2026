const CUPONS = {
  PRIMEIRACOMPRA: 0.1,
}

export function validarCupom(codigo, cliente) {
  const codigoNormalizado = String(codigo ?? '').trim().toUpperCase()
  const desconto = CUPONS[codigoNormalizado]

  if (!desconto) {
    return { valido: false, mensagem: 'Cupom inválido.' }
  }

  const pedidosAnteriores = Number(cliente?.pedidosAnteriores ?? 0)

  if (codigoNormalizado === 'PRIMEIRACOMPRA' && pedidosAnteriores > 0) {
    return {
      valido: false,
      mensagem: 'Este cupom é válido apenas para clientes sem pedidos anteriores.',
    }
  }

  return { valido: true, desconto, mensagem: 'Cupom aplicado!' }
}
