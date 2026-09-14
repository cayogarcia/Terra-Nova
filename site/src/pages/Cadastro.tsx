import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imgTerraNovaImpacto from '../assets/imgTerraNovaImpacto.jpg';

const API_URL = "http://127.0.0.1:8000";

interface ProjetoPublico {
  id: string;
  nome_projeto: string;
}

// Função para aplicar a máscara de CNPJ (00.000.000/0000-00)
const maskCNPJ = (value: string): string => {
  return value
    .replace(/\D/g, '') // Remove caracteres não numéricos
    .slice(0, 14) // Limita a 14 dígitos puros
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

export const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [modoView, setModoView] = useState<'cadastro' | 'login'>('login');
  const [tipoPerfil, setTipoPerfil] = useState<'empresa' | 'projeto'>('empresa');
  const [feedback, setFeedback] = useState<{ mensagem: string; tipo: 'success' | 'error' } | null>(null);

  // Campos de Cadastro
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [nomeProjeto, setNomeProjeto] = useState('');

  // Campos de Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  // Lista de Projetos Públicos
  const [projetos, setProjetos] = useState<ProjetoPublico[]>([]);

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCnpj = maskCNPJ(e.target.value);
    setCnpj(formattedCnpj);
  };

  const carregarProjetos = async () => {
    try {
      const res = await fetch(`${API_URL}/projetos/publicos`);
      if (res.ok) {
        const data = await res.json();
        setProjetos(data);
      }
    } catch (err) {
      console.error("Erro ao carregar projetos:", err);
    }
  };

  useEffect(() => {
    carregarProjetos();
  }, []);

  const handleSubmitEmpresa = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      const res = await fetch(`${API_URL}/cadastrar/empresa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          senha,
          razao_social: razaoSocial,
          cnpj,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Erro ao realizar o cadastro.');

      setLoginEmail(email);
      setFeedback({ mensagem: 'Empresa cadastrada com sucesso! Faça seu login.', tipo: 'success' });
      
      setEmail(''); setSenha(''); setRazaoSocial(''); setCnpj('');
      setModoView('login');
    } catch (err: any) {
      setFeedback({ mensagem: err.message, tipo: 'error' });
    }
  };

  const handleSubmitProjeto = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      const res = await fetch(`${API_URL}/cadastrar/projeto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome_projeto: nomeProjeto,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Erro ao realizar o cadastro.');

      setFeedback({ mensagem: 'Projeto cadastrado com sucesso! Faça seu login para ver mais detalhes.', tipo: 'success' });
      
      setEmail(''); setSenha(''); setNomeProjeto('');
      setModoView('login');
      
      carregarProjetos();
    } catch (err: any) {
      setFeedback({ mensagem: err.message, tipo: 'error' });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          senha: loginSenha,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'E-mail ou senha inválidos.');

      // Salva os dados no localStorage
      localStorage.setItem('user', JSON.stringify({
        email: data.email || loginEmail,
        id: data.usuario_id,
        tipo_perfil: data.tipo_perfil
      }));

      // Notifica os componentes (ex: Header) sobre a mudança de login
      window.dispatchEvent(new Event('authChange'));

      setFeedback({ mensagem: 'Login realizado com sucesso!', tipo: 'success' });
      setLoginSenha('');

      // Redireciona para o Dashboard do projeto selecionado ou do próprio usuário
      const projetoIdTarget = localStorage.getItem('projeto_selecionado_id') || data.usuario_id;
      if (projetoIdTarget) {
        navigate(`/dashboard/${projetoIdTarget}`);
      }
    } catch (err: any) {
      setFeedback({ mensagem: err.message, tipo: 'error' });
    }
  };

  const handleVerMais = (projetoId: string) => {
    localStorage.setItem('projeto_selecionado_id', projetoId);
    setModoView('login');
    setFeedback({ mensagem: 'Faça login na sua conta para ver todas as informações do projeto.', tipo: 'error' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={pageWrapperStyle}>
      <div style={pageContainerStyle}>
        {/* Container centralizado para as imagens de fundo */}
        <div style={watermarkContainerStyle}>
          <img src={imgTerraNovaImpacto} alt="Terra Nova Impacto" style={watermarkImageStyle} />
        </div>

        <div style={aboutCardStyle}>
          <h2 style={{ color: '#1b4332', fontSize: '26px', marginBottom: '15px' }}>
            Terra Nova Impacto
          </h2>
          <p style={{ color: '#2d6a4f', fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>
            Criando conexões para um impacto duradouro e sustentável.
          </p>
          <p style={{ color: '#333', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
            A <strong>Terra Nova Impacto</strong> é uma plataforma dedicada a conectar empresas comprometidas com a responsabilidade social e ambiental a projetos e Organizações da Sociedade Civil (OSCs) que transformam realidades.
          </p>
          <p style={{ color: '#333', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
            Nossa missão é impulsionar a sustentabilidade, direcionando investimentos e recursos estratégicos para iniciativas de alto impacto socioambiental com transparência e eficiência.
          </p>
          <div style={badgeListStyle}>
            <div style={badgeStyle}>🌱 Sustentabilidade</div>
            <div style={badgeStyle}>🤝 Conexão Estratégica</div>
            <div style={badgeStyle}>📊 Impacto Mensurável</div>
          </div>
        </div>

        <div style={cardContainerStyle}>
          {modoView === 'login' ? (
            <>
              <h2 style={{ textAlign: 'center', color: '#1b4332', marginBottom: '20px' }}>
                Login - Terra Nova
              </h2>

              {feedback && (
                <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', backgroundColor: feedback.tipo === 'success' ? '#d4edda' : '#f8d7da', color: feedback.tipo === 'success' ? '#155724' : '#721c24', textAlign: 'center', fontSize: '14px' }}>
                  {feedback.mensagem}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  value={loginEmail} 
                  onChange={e => setLoginEmail(e.target.value)} 
                  required 
                  style={inputStyle} 
                />
                <input 
                  type="password" 
                  placeholder="Senha" 
                  value={loginSenha} 
                  onChange={e => setLoginSenha(e.target.value)} 
                  required 
                  style={inputStyle} 
                />
                <button type="submit" style={buttonStyle}>Entrar</button>
              </form>

              <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#333' }}>
                Não tem conta?{' '}
                <span 
                  onClick={() => { setModoView('cadastro'); setFeedback(null); }} 
                  style={{ color: '#1b4332', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Cadastre-se
                </span>
              </p>
            </>
          ) : (
            <>
              <h2 style={{ textAlign: 'center', color: '#1b4332', marginBottom: '20px' }}>
                Cadastro - Terra Nova
              </h2>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button 
                  type="button"
                  onClick={() => { setTipoPerfil('empresa'); setFeedback(null); }}
                  style={{ flex: 1, padding: '10px', backgroundColor: tipoPerfil === 'empresa' ? '#1b4332' : '#ccc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Empresa
                </button>
                <button 
                  type="button"
                  onClick={() => { setTipoPerfil('projeto'); setFeedback(null); }}
                  style={{ flex: 1, padding: '10px', backgroundColor: tipoPerfil === 'projeto' ? '#1b4332' : '#ccc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Projeto Social (OSC)
                </button>
              </div>

              {feedback && (
                <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', backgroundColor: feedback.tipo === 'success' ? '#d4edda' : '#f8d7da', color: feedback.tipo === 'success' ? '#155724' : '#721c24', textAlign: 'center', fontSize: '14px' }}>
                  {feedback.mensagem}
                </div>
              )}

              {tipoPerfil === 'empresa' ? (
                <form onSubmit={handleSubmitEmpresa}>
                  <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
                  <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required style={inputStyle} />
                  <input type="text" placeholder="Razão Social" value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} required style={inputStyle} />
                  <input 
                    type="text" 
                    placeholder="CNPJ (00.000.000/0000-00)" 
                    value={cnpj} 
                    onChange={handleCnpjChange} 
                    maxLength={18}
                    required 
                    style={inputStyle} 
                  />
                  <button type="submit" style={buttonStyle}>Cadastrar Empresa</button>
                </form>
              ) : (
                <form onSubmit={handleSubmitProjeto}>
                  <input 
                    type="text" 
                    placeholder="Nome do Projeto" 
                    value={nomeProjeto} 
                    onChange={e => setNomeProjeto(e.target.value)} 
                    required 
                    style={inputStyle} 
                  />
                  <button type="submit" style={buttonStyle}>Cadastrar Projeto</button>
                </form>
              )}

              <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#333' }}>
                Já possui conta?{' '}
                <span 
                  onClick={() => { setModoView('login'); setFeedback(null); }} 
                  style={{ color: '#1b4332', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Faça Login
                </span>
              </p>
            </>
          )}
        </div>
      </div>

      <div style={projectsSectionStyle}>
        <h2 style={{ textAlign: 'center', color: '#1b4332', marginBottom: '10px' }}>
          Conexões
        </h2>
        <p style={{ textAlign: 'center', color: '#555', marginBottom: '30px', fontSize: '15px' }}>
          Conheça os projetos sociais em destaque na nossa plataforma
        </p>

        {projetos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#777', fontStyle: 'italic' }}>
            Nenhum projeto cadastrado no momento. Seja o primeiro a cadastrar!
          </p>
        ) : (
          <div style={projectsGridStyle}>
            {projetos.map((proj) => (
              <div key={proj.id} style={projectCardStyle}>
                <h3 style={{ color: '#2d6a4f', marginTop: 0, marginBottom: '15px' }}>
                  {proj.nome_projeto}
                </h3>
                <button 
                  onClick={() => handleVerMais(proj.id)} 
                  style={verMaisButtonStyle}
                >
                  Ver mais sobre o projeto
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ESTILOS */

const pageWrapperStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const pageContainerStyle: React.CSSProperties = {
  position: 'relative',
  minHeight: '80vh',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: '40px 60px',
  boxSizing: 'border-box',
};

const watermarkContainerStyle: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  opacity: 0.95,
  pointerEvents: 'none',
  zIndex: 0,
};

const watermarkImageStyle: React.CSSProperties = {
  width: '450px',
  height: 'auto',
  objectFit: 'contain',
};

const aboutCardStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: '420px',
  padding: '30px',
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  border: '1px solid rgba(255, 255, 255, 0.6)',
};

const badgeListStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '15px',
};

const badgeStyle: React.CSSProperties = {
  backgroundColor: '#e8f5e9',
  color: '#1b4332',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: 'bold',
  border: '1px solid #b7e4c7',
};

const cardContainerStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: '420px',
  padding: '30px',
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  border: '1px solid rgba(255, 255, 255, 0.6)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  boxSizing: 'border-box',
  borderRadius: '6px',
  border: '1px solid #ccc',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#2d6a4f',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '15px',
};

const projectsSectionStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto 60px auto',
  padding: '0 20px',
  boxSizing: 'border-box',
};

const projectsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '20px',
};

const projectCardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '10px',
  border: '1px solid #e0e0e0',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const verMaisButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  backgroundColor: '#1b4332',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '13px',
  textAlign: 'center',
};