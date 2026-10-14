import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import RolarParaTopo from './components/RolarParaTopo'
import Loja from './pages/Loja'
import PaginaProduto from './pages/PaginaProduto'
import Carrinho from './pages/Carrinho'
import Estoque from './pages/Estoque'
import { buscarProdutos } from './services/produtos'
import { buscarClientes } from './services/clientes'
import { produtoDisponivel, produtoTemPreco } from './utils/produtos'

const CHAVE_FILA_ESPERA = 'techstore-fila-espera'

export default function App() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [carrinho, setCarrinho] = useState([])
  const [clientes, setClientes] = useState([])
  const [clienteAtualId, setClienteAtualId] = useState(null)
  const [listaEspera, setListaEspera] = useState(() => {
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE_FILA_ESPERA) || '{}')
      return salvo
    } catch {
      return {}
    }
  })

  useEffect(() => {
    buscarProdutos()
      .then((dados) => setProdutos(dados))
      .catch(() => setErro('Não foi possível carregar os produtos.'))
      .finally(() => setCarregando(false))

    buscarClientes().then((dados) => {
      setClientes(dados)
      if (dados.length > 0) setClienteAtualId(dados[0].id)
    })
  }, [])

  useEffect(() => {
    localStorage.setItem(CHAVE_FILA_ESPERA, JSON.stringify(listaEspera))
  }, [listaEspera])

  function adicionarAoCarrinho(produto) {
    if (!produtoDisponivel(produto)) return

    setCarrinho((anterior) => anterior.concat(produto))
  }

  function removerUmaUnidade(produtoId) {
    // Remove só a primeira unidade encontrada do produto
    let removido = false
    setCarrinho((anterior) =>
      anterior.filter((produto) => {
        if (!removido && produto.id === produtoId) {
          removido = true
          return false
        }
        return true
      })
    )
  }

  function registrarInteresse(produtoId, nome, email) {
    setListaEspera((anterior) => {
      const filaAtual = anterior[produtoId] || []
      const jaCadastrado = filaAtual.some(
        (registro) => registro.email.toLowerCase() === email.toLowerCase()
      )

      if (jaCadastrado) {
        return anterior
      }

      return {
        ...anterior,
        [produtoId]: [
          ...filaAtual,
          {
            nome,
            email,
            data: new Date().toISOString(),
          },
        ],
      }
    })
  }

  const clienteAtual = clientes.find((cliente) => cliente.id === clienteAtualId)
  const produtosDisponiveis = produtos.filter((produto) => produtoDisponivel(produto))
  const produtosSemPreco = produtos.filter((produto) => !produtoTemPreco(produto))

  return (
    <div className="app">
      <RolarParaTopo />
      <Header carrinho={carrinho} clienteAtual={clienteAtual} />

      <main className="conteudo">
        {carregando && <p className="aviso">Carregando produtos...</p>}
        {erro && <p className="aviso aviso-erro">{erro}</p>}

        {!carregando && !erro && (
          <Routes>
            <Route
              path="/"
              element={<Loja produtos={produtosDisponiveis} onAdicionar={adicionarAoCarrinho} />}
            />
            <Route
              path="/produto/:id"
              element={
                <PaginaProduto
                  produtos={produtos}
                  onAdicionar={adicionarAoCarrinho}
                  onRegistrarInteresse={registrarInteresse}
                  listaEspera={listaEspera}
                  clienteAtual={clienteAtual}
                />
              }
            />
            <Route
              path="/carrinho"
              element={
                <Carrinho
                  carrinho={carrinho}
                  produtos={produtosDisponiveis}
                  clienteAtual={clienteAtual}
                  onAdicionar={adicionarAoCarrinho}
                  onRemover={removerUmaUnidade}
                />
              }
            />
            <Route
              path="/estoque"
              element={<Estoque produtos={produtos} listaEspera={listaEspera} produtosSemPreco={produtosSemPreco} />}
            />
          </Routes>
        )}
      </main>

      <Footer
        clientes={clientes}
        clienteAtualId={clienteAtualId}
        onTrocarCliente={setClienteAtualId}
      />
    </div>
  )
}
