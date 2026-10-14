# Regras de negócio

Última atualização: outubro de 2026

## Frete grátis

A campanha de frete grátis vale para compras acima de R$ 200 no valor final.

- Se o valor final for menor que R$ 200, o cliente deve ver quanto falta para ganhar o frete grátis.
- Quando o valor final chega a R$ 200 ou mais, o frete é gratuito.
- A mensagem deve ser exibida em contexto de carrinho e também em cards de produto quando aplicável.

## Cupons

| Cupom | Desconto | Quem pode usar |
|---|---|---|
| `PRIMEIRACOMPRA` | 10% sobre o total | Clientes sem pedidos anteriores |

O cupom não diferencia letras maiúsculas e minúsculas.

- Clientes com `pedidosAnteriores > 0` não podem usar o cupom.
- O benefício é válido apenas para a primeira compra.

## Produtos esgotados

- Produtos com estoque zerado não aparecem na loja principal.
- Mesmo assim, o cliente pode acessar a página do produto por link externo e se inscrever para receber aviso quando voltar.
- A fila de espera deve registrar nome e e-mail do interessado.

## Produtos sem preço

- Produtos sem preço informado não podem ser vendidos.
- Esses produtos não devem aparecer como disponíveis para compra.
- O lojista consegue visualizar quais produtos ainda aguardam definição de preço no painel interno.

## Promoções

Produtos em promoção exibem o preço original riscado ao lado do preço atual, quando o dado estiver disponível no catálogo.
