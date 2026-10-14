import { useState } from 'react'
import { Link, useParams } from 'react-router'
import ProdutoCard from '../components/ProdutoCard'
import { formatarPreco } from '../utils/formatarPreco'
import { produtoDisponivel, produtoTemPreco } from '../utils/produtos'

export default function PaginaProduto({
  produtos,
  onAdicionar,
  onRegistrarInteresse,
  listaEspera = {},
  clienteAtual,
}) {
  const { id } = useParams()
  const produto = produtos.find((item) => item.id === id)
  const [nome, setNome] = useState(clienteAtual?.nome || '')
  const [email, setEmail] = useState(clienteAtual?.email || '')
  const [mensagemEspera, setMensagemEspera] = useState('')

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const relacionados = produtos
    .filter(
      (item) => item.category === produto.category && item.id !== produto.id && produtoDisponivel(item)
    )
    .slice(0, 4)

  const produtoDisponivelParaVenda = produtoTemPreco(produto) && produto.estoque > 0
  const filaProduto = listaEspera[produto.id] || []

  function registrarEspera(evento) {
    evento.preventDefault()

    const nomeFormatado = nome.trim()
    const emailFormatado = email.trim()

    if (!nomeFormatado || !emailFormatado) {
      setMensagemEspera('Preencha nome e e-mail para receber o aviso.')
      return
    }

    onRegistrarInteresse?.(produto.id, nomeFormatado, emailFormatado)
    setMensagemEspera('Você foi adicionado à fila de espera.')
    setNome('')
    setEmail('')
  }

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>
          <p className="detalhe-preco">
            {produtoTemPreco(produto) ? formatarPreco(produto.price) : 'Preço indisponível'}
          </p>
          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">
            {produto.estoque > 0 ? `${produto.estoque} unidades disponíveis` : 'Produto esgotado'}
          </p>

          {produto.estoque === 0 && (
            <form className="form-aviso" onSubmit={registrarEspera}>
              <label className="rotulo" htmlFor="nome-aviso">
                Receber aviso quando voltar
              </label>
              <input
                id="nome-aviso"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Seu nome"
              />
              <input
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                placeholder="Seu e-mail"
              />
              <button type="submit" className="botao botao-grande">
                Quero ser avisado
              </button>
              {mensagemEspera && <p className="mensagem-sucesso">{mensagemEspera}</p>}
            </form>
          )}

          {produto.estoque > 0 && (
            <button
              className="botao botao-grande"
              onClick={() => onAdicionar(produto)}
              disabled={!produtoDisponivelParaVenda}
            >
              {produtoDisponivelParaVenda ? 'Adicionar ao carrinho' : 'Indisponível'}
            </button>
          )}

          {!produtoTemPreco(produto) && (
            <p className="aviso aviso-erro">Este produto está temporariamente indisponível até o preço ser informado.</p>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      {filaProduto.length > 0 && (
        <div className="lista-espera-resumo">
          <h2>Quem está esperando</h2>
          <ul>
            {filaProduto.map((registro, index) => (
              <li key={`${registro.email}-${index}`}>
                {registro.nome} — {registro.email}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2>Produtos relacionados</h2>
      <div className="grade">
        {relacionados.map((item) => (
          <ProdutoCard key={item.id} produto={item} onAdicionar={onAdicionar} />
        ))}
      </div>
    </section>
  )
}
