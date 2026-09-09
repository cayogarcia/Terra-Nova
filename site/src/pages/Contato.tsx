import { useState, type ChangeEvent, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'

function Contato() {
  const { t } = useTranslation()
  const [telefone, setTelefone] = useState('')

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 11) value = value.slice(0, 11)

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`
    } else if (value.length > 0) {
      value = `(${value}`
    }

    setTelefone(value)
  }

  return (
    <section style={{ background: '#FFFFFF', padding: '40px 20px' }}>
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          color: '#000000',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            color: '#1B5E20',
            textAlign: 'center',
            marginBottom: '40px',
            textShadow: '0.5px 0.5px 0 #fff',
          }}
        >
          {t('contato.titulo')}
        </h1>

        <div style={{ marginBottom: '60px', fontSize: '18px', lineHeight: '1.6' }}>
          <p>
            <strong>{t('contato.emailLabel')}</strong> terranovagestaoderiscos@gmail.com
          </p>
          <p>
            <strong>{t('contato.telefoneLabel')}</strong> (14) 99683-0077
          </p>
        </div>

        <h1
          style={{
            color: '#1B5E20',
            textAlign: 'center',
            marginBottom: '40px',
            textShadow: '0.5px 0.5px 0 #fff',
          }}
        >
          {t('contato.trabalheConosco')}
        </h1>

        <form
          action="https://formsubmit.co/terranovagestaoderiscos@gmail.com"
          method="POST"
          encType="multipart/form-data"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            name="nome"
            placeholder={t('contato.placeholderNome')}
            required
            style={inputStyle}
          />

          <input
            type="tel"
            name="telefone"
            value={telefone}
            onChange={handlePhoneChange}
            placeholder={t('contato.placeholderTelefone')}
            required
            pattern="\([0-9]{2}\)\s[0-9]{5}-[0-9]{4}"
            title={t('contato.erroTelefone')}
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder={t('contato.placeholderEmail')}
            required
            style={inputStyle}
          />

          <input
            type="file"
            name="curriculo"
            accept=".pdf,.doc,.docx"
            required
            style={{ ...inputStyle, padding: '8px 12px', height: 'auto' }}
          />

          <input
            type="hidden"
            name="_subject"
            value="Novo currículo - Terra Nova"
          />

          <input type="hidden" name="_captcha" value="false" />

          <button
            type="submit"
            style={{
              background: '#1B5E20',
              color: '#fff',
              padding: '12px 28px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '160px',
              fontSize: '16px',
              fontWeight: '600',
              marginTop: '10px',
            }}
          >
            {t('contato.botaoEnviar')}
          </button>
        </form>
      </div>
    </section>
  )
}

const inputStyle: CSSProperties = {
  width: '100%',
  maxWidth: '500px',
  height: '45px',
  padding: '0 15px',
  borderRadius: '8px',
  border: '1px solid #CBD5E0',
  background: '#F8FAF9',
  color: '#1A202C',
  fontSize: '16px',
  boxSizing: 'border-box',
}

export default Contato