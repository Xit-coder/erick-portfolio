import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFound() {
  return <main id="conteudo" className="not-found shell">
    <p className="eyebrow"><span/> ERRO 404</p><h1>Página não encontrada<span className="accent">.</span></h1>
    <p>O endereço solicitado pode ter mudado.</p>
    <Link className="button primary" to="/"><ArrowLeft size={18}/> Voltar ao início</Link>
  </main>
}
