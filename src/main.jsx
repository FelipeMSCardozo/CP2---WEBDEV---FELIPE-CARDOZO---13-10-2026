import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './index.css'

// Imagem reserva: se a imagem de um produto não carregar, usa uma imagem genérica
document.addEventListener(
  'error',
  (evento) => {
    const imagem = evento.target
    if (imagem.tagName !== 'IMG' || imagem.dataset.reserva) return
    imagem.dataset.reserva = 'true'
    imagem.src = `https://picsum.photos/seed/${encodeURIComponent(imagem.alt || 'produto')}/400`
  },
  true
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
