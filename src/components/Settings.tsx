import { RotateCcw, SunMoon, Terminal, X } from 'lucide-react'
import { Dialog } from './Dialog'

export default function Settings({ close, theme, toggleTheme, terminal, reboot }: {
  close: () => void; theme: string; toggleTheme: () => void; terminal: () => void; reboot: () => void
}) {
  return <Dialog label="Configurações" className="tool-dialog settings" onClose={close}>
    <div className="tool-heading"><h2>Configurações</h2><button className="icon-button" aria-label="Fechar configurações" onClick={close} autoFocus><X size={20}/></button></div>
    <div className="settings-options">
      <button onClick={toggleTheme}><SunMoon size={18}/> Alternar tema <small>{theme === 'dark' ? 'Escuro' : 'Claro'}</small></button>
      <button onClick={terminal}><Terminal size={18}/> Abrir terminal</button>
      <button onClick={reboot}><RotateCcw size={18}/> Reproduzir introdução</button>
    </div>
  </Dialog>
}
