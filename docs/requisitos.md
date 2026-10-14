# Requisitos da TechStore

Última atualização: outubro de 2026

## Loja

* A página inicial lista apenas os produtos disponíveis para venda.
* O cliente pode filtrar os produtos por categoria.
* Cada produto é exibido em um card com imagem, nome, avaliação e preço.
* Clicar no card abre a página do produto.
* Produtos sem estoque ou sem preço não devem aparecer como disponíveis para compra na vitrine.

## Produtos esgotados

* Produtos sem unidades em estoque não aparecem na loja principal.
* O botão de compra fica desabilitado para os produtos indisponíveis.
* O cliente pode acessar a página do produto por link e se cadastrar na fila de espera quando ele voltar.

## Produtos sem preço

* Produtos sem preço definido não podem ser vendidos.
* Esses itens devem ser sinalizados como indisponíveis e aparecer no painel do lojista como aguardando preço.

## Página do produto

* Exibe imagem, nome, avaliação, preço, descrição e unidades disponíveis.
* Exibe até 4 produtos relacionados da mesma categoria, desde que também estejam disponíveis.
* Caso o produto esteja esgotado, exibe formulário para receber aviso.

## Carrinho

* Lista os produtos adicionados, com a quantidade de cada um.
* Permite remover unidades.
* Permite aplicar cupons de desconto.
* Exibe o subtotal, o desconto e o total da compra.
* Exibe quanto falta para um cliente atingir o frete grátis no valor final de R$ 200.

## Área interna

* O lojista acessa a página `/estoque` pelo menu.
* A área interna deve mostrar o valor em estoque por categoria, o lucro estimado, produtos sem preço e fila de espera.
* O painel também precisa exibir o estoque geral e o status de reposição.
