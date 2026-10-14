import { Link } from 'react-router'
import { formatarPreco } from '../utils/formatarPreco'
import { produtoTemPreco } from '../utils/produtos'

const CATEGORIAS = ['roupas', 'eletronicos', 'acessorios', 'casa']

export default function Estoque({ produtos, listaEspera = {}, produtosSemPreco = [] }) {
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)

  const resumoPorCategoria = CATEGORIAS.map((categoria) => {
    const itens = produtos.filter((produto) => produto.category === categoria)
    const valorEstoque = itens
      .filter((produto) => produtoTemPreco(produto))
      .reduce((total, produto) => total + Number(produto.price) * Number(produto.estoque || 0), 0)

    const lucroEstimado = itens
      .filter((produto) => produtoTemPreco(produto))
      .reduce((total, produto) => total + Number(produto.price) * Number(produto.estoque || 0) * 0.35, 0)

    const clientesEsperando = Object.entries(listaEspera).reduce((total, [idProduto, registros]) => {
      const produto = produtos.find((item) => item.id === idProduto)
      if (produto && produto.category === categoria) {
        return total + registros.length
      }
      return total
    }, 0)

    return {
      categoria,
      valorEstoque,
      lucroEstimado,
      clientesEsperando,
      itensSemPreco: itens.filter((produto) => !produtoTemPreco(produto)).length,
    }
  })

  const filaGeral = Object.entries(listaEspera).flatMap(([produtoId, registros]) =>
    registros.map((registro) => ({
      produtoId,
      produto: produtos.find((produto) => produto.id === produtoId),
      ...registro,
    }))
  )

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Painel do lojista</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="painel-grid">
        {resumoPorCategoria.map(({ categoria, valorEstoque, lucroEstimado, clientesEsperando, itensSemPreco }) => (
          <article key={categoria} className="painel-card">
            <h2>{categoria}</h2>
            <p className="painel-valor">{formatarPreco(valorEstoque)}</p>
            <ul className="painel-lista">
              <li>Estoque parado: {formatarPreco(valorEstoque)}</li>
              <li>Clientes esperando: {clientesEsperando}</li>
              <li>Produtos sem preço: {itensSemPreco}</li>
              <li>Lucro estimado: {formatarPreco(lucroEstimado)}</li>
            </ul>
          </article>
        ))}
      </div>

      <div className="painel-secao">
        <h2>Produtos aguardando preço</h2>
        {produtosSemPreco.length === 0 ? (
          <p className="aviso">Nenhum produto está aguardando definição de preço.</p>
        ) : (
          <div className="tabela-moldura">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Estoque</th>
                </tr>
              </thead>
              <tbody>
                {produtosSemPreco.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.title}</td>
                    <td>{produto.category}</td>
                    <td>{produto.estoque}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="painel-secao">
        <h2>Fila de espera por produto</h2>
        <div className="tabela-moldura">
          <table className="tabela">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Nome</th>
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody>
              {filaGeral.length === 0 ? (
                <tr>
                  <td colSpan="3">Nenhum cliente aguardando retorno.</td>
                </tr>
              ) : (
                filaGeral.map((registro, index) => (
                  <tr key={`${registro.produtoId}-${registro.email}-${index}`}>
                    <td>{registro.produto?.title || 'Produto removido'}</td>
                    <td>{registro.nome}</td>
                    <td>{registro.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="painel-secao">
        <h2>Estoque geral</h2>
        <div className="tabela-moldura">
          <table className="tabela">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Unidades</th>
                <th>Situação</th>
              </tr>
            </thead>
            <tbody>
              {ordenados.map((produto) => (
                <tr key={produto.id}>
                  <td>
                    <div className="estoque-produto-acoes">
                      <Link to={`/produto/${produto.id}`}>{produto.title}</Link>
                      {produto.estoque === 0 && (
                        <Link to={`/produto/${produto.id}`} className="botao botao-pequeno botao-secundario">
                          Avise-me quando chegar
                        </Link>
                      )}
                    </div>
                  </td>
                  <td>{produto.category}</td>
                  <td>{produto.estoque}</td>
                  <td>
                    {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                    {produto.estoque > 0 && produto.estoque < 5 && (
                      <span className="selo selo-alerta">Repor</span>
                    )}
                    {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
