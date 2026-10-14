import { Link } from 'react-router'
import { formatarPreco } from '../utils/formatarPreco'
import { mensagemFreteGratis, produtoTemPreco } from '../utils/produtos'

export default function ProdutoCard({ produto, onAdicionar }) {
  const esgotado = produto.estoque === 0
  const temPreco = produtoTemPreco(produto)

  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="card-imagem" />
        </div>
        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      <p className="card-avaliacao">
        ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
      </p>

      <div className="card-precos">
        {produto.precoOriginal && (
          <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
        )}
        <span className="preco">{temPreco ? formatarPreco(produto.price) : 'Preço indisponível'}</span>
      </div>

      <div className="card-selos">
        {temPreco && Number(produto.price) > 100 && (
          <span className="selo selo-frete">Frete grátis</span>
        )}
        {esgotado && <span className="selo selo-esgotado">Esgotado</span>}
        {!temPreco && <span className="selo selo-alerta">Sem preço</span>}
      </div>

      {temPreco && (
        <button className="botao" onClick={() => onAdicionar(produto)} disabled={esgotado}>
          {esgotado ? 'Indisponível' : 'Adicionar ao carrinho'}
        </button>
      )}

      {!temPreco && (
        <button className="botao botao-secundario" onClick={() => onAdicionar(produto)} disabled>
          Indisponível
        </button>
      )}

      {temPreco && Number(produto.price) <= 200 && (
        <p className="mensagem-frete-card">{mensagemFreteGratis(Number(produto.price))}</p>
      )}
    </article>
  )
}
