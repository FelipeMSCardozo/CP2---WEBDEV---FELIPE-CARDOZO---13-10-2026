import { useEffect } from 'react'
import { useLocation } from 'react-router'

// Volta ao topo da página sempre que a rota muda
export default function RolarParaTopo() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
