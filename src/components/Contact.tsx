import { useEffect, useState, type FormEvent } from 'react'
import { ArrowUpRight, Clipboard, Mail } from 'lucide-react'
import { Github, Linkedin } from './BrandIcons'
import { profile } from '../data/site'
import { copyText } from '../lib/browser'

export function Contact() {
  const [interactive, setInteractive] = useState(false)
  const [draft, setDraft] = useState('')
  const [feedback, setFeedback] = useState('')
  const [manual, setManual] = useState(false)

  useEffect(() => setInteractive(true), [])

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const name = String(fields.get('name')).trim()
    const subject = String(fields.get('subject')).trim()
    const message = String(fields.get('message')).trim()
    if (!name || !subject || message.length < 10) {
      setDraft('')
      setFeedback('Preencha o nome, o assunto e uma mensagem de pelo menos 10 caracteres.')
      return
    }
    const next = subject + '\n\n' + message + '\n\n' + name
    setDraft(next)
    setManual(false)
    setFeedback('Rascunho pronto. Escolha um canal para concluir o envio.')
  }
  async function copy(value: string, label: string) {
    try { await copyText(value); setFeedback(label) }
    catch {
      if (value === draft) setManual(true)
      setFeedback('A cópia automática está indisponível. Selecione e copie o texto.')
    }
  }

  return <section className="contact-section section" id="contato">
    <div className="shell contact-grid">
      <div data-reveal>
        <h2>Contato</h2>
        <div className="contact-links">
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={19}/> GitHub <ArrowUpRight size={16}/></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={19}/> LinkedIn <ArrowUpRight size={16}/></a>
          {profile.email && <>
            <a href={'mailto:' + profile.email}><Mail size={19}/> {profile.email}</a>
            <button className="text-link" onClick={() => void copy(profile.email, 'Endereço copiado.')}><Clipboard size={16}/> Copiar e-mail</button>
          </>}
        </div>
      </div>
      <div data-reveal className="contact-form">
        <form onSubmit={prepare} onChange={() => { if (draft) { setDraft(''); setFeedback(''); setManual(false) } }}>
          <fieldset disabled={!interactive}>
          <div className="form-row">
            <label>Seu nome<input name="name" autoComplete="name" required maxLength={80}/></label>
            <label>Assunto<input name="subject" required maxLength={120}/></label>
          </div>
          <label>Mensagem<textarea name="message" rows={5} required minLength={10} maxLength={1800}/></label>
          <button type="submit" className="button primary">Preparar mensagem <ArrowUpRight size={18}/></button>
          </fieldset>
        </form>
        <p className="form-status" role="status">{feedback || 'O rascunho é preparado no navegador. O envio é concluído no canal escolhido.'}</p>
        {draft && <div className="draft">
          <button className="button secondary" onClick={() => void copy(draft, 'Rascunho copiado. Cole na conversa para enviá-lo.')}><Clipboard size={16}/> Copiar mensagem</button>
          {profile.email ? <a className="button secondary" href={'mailto:' + profile.email + '?subject=' + encodeURIComponent(draft.split('\n')[0]) + '&body=' + encodeURIComponent(draft.split('\n').slice(2).join('\n'))}><Mail size={16}/> Abrir aplicativo de e-mail</a>
            : <a className="button secondary" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> Abrir LinkedIn</a>}
          {manual && <label>Rascunho para copiar<textarea readOnly value={draft} onFocus={event => event.target.select()}/></label>}
        </div>}
      </div>
    </div>
  </section>
}
