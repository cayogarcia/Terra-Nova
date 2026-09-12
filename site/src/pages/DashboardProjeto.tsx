import React, { useState, useEffect } from 'react';
import imgTerraNovaImpacto from '../assets/imgTerraNovaImpacto.jpg';

interface ProjetoItem {
  id?: string;
  _id?: string;
  nome_organizacao?: string;
  nome_projeto?: string;
  nome_responsavel?: string;
}

interface Props {
  projetoId?: string;
  isLoggedIn?: boolean;
  onNovoProjeto?: () => void;
  onListarProjetos?: () => void;
  onSelectProjeto?: (id: string) => void;
}

export const DashboardProjeto: React.FC<Props> = ({
  projetoId,
  isLoggedIn = true,
  onNovoProjeto,
  onListarProjetos,
  onSelectProjeto,
}) => {
  const [etapa, setEtapa] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentProjetoId, setCurrentProjetoId] = useState<string | undefined>(projetoId);

  // Estados para o Modal de Listagem
  const [modalAberto, setModalAberto] = useState(false);
  const [projetosLista, setProjetosLista] = useState<ProjetoItem[]>([]);
  const [loadingProjetos, setLoadingProjetos] = useState(false);

  const initialFormData = {
    nome_organizacao: '',
    nome_responsavel: '',
    cargo_responsavel: '',
    contato_institucional: '',
    redes_sociais: '',
    possui_cnpj: false,
    cnpj_numero: '',
    natureza_juridica: '',
    tempo_existencia: '',
    fundadores_motivo: '',
    missao: '',
    visao: '',
    valores: '',
    historia_criacao: '',
    problema_social_motivacao: '',
    marcos_conquistas: '',
    problema_enfrentado: '',
    publico_afetado: '',
    territorios_atuacao: '',
    dimensionamento_problema: '',
    demanda_nao_atendida: '',
    riscos_sem_intervencao: '',
    beneficiarios_diretos: '',
    beneficiarios_indiretos: '',
    pessoas_atendidas_atualmente: 0,
    capacidade_com_recursos: '',
    forma_selecao_encaminhamento: '',
    demanda_reprimida: '',
    caracteristicas_publico: '',
    atividades_oferecidas: '',
    frequencia_acoes: '',
    locais_atividades: '',
    atividades_maior_procura: '',
    atividades_desejadas: '',
    parceiros_atuais: '',
    diferenciais: '',
    tres_maiores_necessidades: '',
    recursos_financeiros_necessarios: '',
    recursos_para_ampliacao: '',
    necessidades_equipamentos_espaco: '',
    necessidades_pessoal_voluntarios: '',
    necessidades_tecnologia_gestao: '',
    necessidades_juridicas_contabeis: '',
    ajuda_terra_nova_12m: '',
    orcamento_mensal_atual: 0,
    orcamento_anual_atual: 0,
    meta_orcamento_12m: 0,
    custo_por_beneficiario: '',
    fontes_receita_atuais: '',
    possui_orcamento_formalizado: false,
    formas_apoio_list: '',
    aceita_apoio_recorrente: true,
    aceita_doacao_bens_servicos: true,
    interesse_voluntariado_corporativo: true,
    empresas_apoiadoras_atuais: '',
    dificuldade_editais_cnpj: '',
    tipo_empresa_ideal: '',
    mudancas_pretendidas: '',
    indicadores_acompanhados: '',
    ods_relacionados: '',
    temas_sociais_trabalhados: '',
    praticas_governanca: '',
    equipe_gestao: '',
    impedimentos_crescimento: '',
    maior_dificuldade_captacao: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setCurrentProjetoId(projetoId);
  }, [projetoId]);

  useEffect(() => {
  async function carregarDiagnostico() {
    if (!currentProjetoId || currentProjetoId === 'novo') {
      setFormData(initialFormData);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/projetos/${currentProjetoId}/diagnostico`);
      
      // Trata o caso do projeto ter sido excluído da base (404)
      if (response.status === 404) {
        console.warn('Projeto não encontrado no banco de dados. Limpando referência...');
        setCurrentProjetoId('novo');
        setFormData(initialFormData);
        localStorage.removeItem('projetoId'); // caso utilize armazenamento local
        return;
      }

      const result = await response.json();

      if (result && !result.message) {
        const nomeOrg = result.nome_organizacao || result.nome_projeto || '';
        const contato = result.contato_institucional || result.email || '';
        const cnpjVal = result.cnpj_numero ?? result.cnpj ?? result.numero_cnpj ?? '';
        const temCnpj = Boolean(result.possui_cnpj || (typeof cnpjVal === 'string' && cnpjVal.trim() !== ''));

        setFormData((prev) => ({
          ...prev,
          ...result,
          nome_organizacao: nomeOrg || prev.nome_organizacao,
          contato_institucional: contato || prev.contato_institucional,
          cnpj_numero: String(cnpjVal),
          possui_cnpj: temCnpj,
        }));
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    }
  }

  carregarDiagnostico();
}, [currentProjetoId]);

  const handleChange = (field: string, value: any) => {
    if (!isLoggedIn) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAbrirListarProjetos = async () => {
    setModalAberto(true);
    setLoadingProjetos(true);
    if (onListarProjetos) onListarProjetos();

    try {
      const response = await fetch('http://localhost:8000/projetos');
      const data = await response.json();
      setProjetosLista(Array.isArray(data) ? data : data.projetos || []);
    } catch (error) {
      console.error('Erro ao listar projetos:', error);
      alert('Não foi possível carregar a lista de projetos.');
    } finally {
      setLoadingProjetos(false);
    }
  };

  const handleSelecionarProjetoModal = (id: string) => {
    setCurrentProjetoId(id);
    setModalAberto(false);
    if (onSelectProjeto) onSelectProjeto(id);
  };

  const handleNovoProjetoClick = () => {
    setCurrentProjetoId('novo');
    setFormData(initialFormData);
    setEtapa(1);
    if (onNovoProjeto) onNovoProjeto();
  };

  const handleSave = async (concluido: boolean = false) => {
    if (!isLoggedIn) {
      alert('Você precisa estar logado para salvar ou alterar o projeto.');
      return;
    }

    setLoading(true);
    try {
      const isNovoProjeto = !currentProjetoId || currentProjetoId === 'novo';
      const url = isNovoProjeto
        ? `http://localhost:8000/projetos`
        : `http://localhost:8000/projetos/${currentProjetoId}/diagnostico`;

      const method = isNovoProjeto ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, cadastro_completo: concluido }),
      });

      if (response.ok) {
        const resData = await response.json();
        if (isNovoProjeto && (resData.id || resData.projeto_id || resData._id)) {
          setCurrentProjetoId(resData.id || resData.projeto_id || resData._id);
        }
        alert(concluido ? 'Projeto criado e finalizado com sucesso!' : 'Progresso salvo com sucesso!');
      } else {
        alert('Erro ao salvar as informações.');
      }
    } catch (error) {
      alert('Falha na comunicação com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={imgTerraNovaImpacto} alt="Terra Nova Impacto" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button
          onClick={handleNovoProjetoClick}
          style={{ padding: '10px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Novo Projeto
        </button>
        <button
          onClick={handleAbrirListarProjetos}
          style={{ padding: '10px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          📋 Projetos Cadastrados
        </button>
      </div>

      <h2>Diagnóstico do Projeto Social {currentProjetoId && currentProjetoId !== 'novo' ? `(Editando ID: ${currentProjetoId})` : '(Novo Projeto)'}</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button onClick={() => setEtapa(1)} style={{ fontWeight: etapa === 1 ? 'bold' : 'normal', padding: '8px 12px' }}>
          Identificação & Estrutura
        </button>
        <button onClick={() => setEtapa(2)} style={{ fontWeight: etapa === 2 ? 'bold' : 'normal', padding: '8px 12px' }}>
          Propósito, História & Serviços
        </button>
        <button onClick={() => setEtapa(3)} style={{ fontWeight: etapa === 3 ? 'bold' : 'normal', padding: '8px 12px' }}>
          Problema, Público & Impacto
        </button>
        <button onClick={() => setEtapa(4)} style={{ fontWeight: etapa === 4 ? 'bold' : 'normal', padding: '8px 12px' }}>
          Necessidades & Financeiro
        </button>
      </div>

      <hr />

      {/* ETAPA 1 */}
      {etapa === 1 && (
        <div>
          <h3>Identificação do Projeto / Organização</h3>

          <label>Nome do projeto ou organização:</label>
          <input
            type="text"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.nome_organizacao}
            onChange={(e) => handleChange('nome_organizacao', e.target.value)}
          />

          <label>Nome da pessoa responsável pelo preenchimento:</label>
          <input
            type="text"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.nome_responsavel}
            onChange={(e) => handleChange('nome_responsavel', e.target.value)}
          />

          <label>Cargo/função da pessoa responsável:</label>
          <input
            type="text"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.cargo_responsavel}
            onChange={(e) => handleChange('cargo_responsavel', e.target.value)}
          />

          <label>E-mail e telefone de contato institucional:</label>
          <input
            type="text"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.contato_institucional}
            onChange={(e) => handleChange('contato_institucional', e.target.value)}
          />

          <label>Site, Instagram ou outras redes sociais:</label>
          <input
            type="text"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.redes_sociais}
            onChange={(e) => handleChange('redes_sociais', e.target.value)}
          />

          <div style={{ marginBottom: '12px' }}>
            <label>Possui CNPJ?</label>
            <input
              type="checkbox"
              disabled={!isLoggedIn}
              style={{ marginLeft: '10px' }}
              checked={formData.possui_cnpj}
              onChange={(e) => {
                const checked = e.target.checked;
                setFormData((prev) => ({
                  ...prev,
                  possui_cnpj: checked,
                  cnpj_numero: checked ? prev.cnpj_numero : '',
                }));
              }}
            />
          </div>

          {formData.possui_cnpj && (
            <>
              <label>Número do CNPJ e situação cadastral:</label>
              <input
                type="text"
                disabled={!isLoggedIn}
                style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
                value={formData.cnpj_numero}
                onChange={(e) => handleChange('cnpj_numero', e.target.value)}
              />
            </>
          )}

          <label>Qual é a natureza jurídica/estrutura?:</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.natureza_juridica}
            onChange={(e) => handleChange('natureza_juridica', e.target.value)}
          />

          <label>Há quanto tempo o projeto existe?</label>
          <input
            type="text"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.tempo_existencia}
            onChange={(e) => handleChange('tempo_existencia', e.target.value)}
          />

          <label>Quem fundou o projeto e por quê?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.fundadores_motivo}
            onChange={(e) => handleChange('fundadores_motivo', e.target.value)}
          />

          <h3>Governança e Equipe</h3>

          <label>Como é formada a equipe de gestão e quem toma as principais decisões?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.equipe_gestao}
            onChange={(e) => handleChange('equipe_gestao', e.target.value)}
          />

          <label>Existe governança, conselho ou práticas de transparência?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.praticas_governanca}
            onChange={(e) => handleChange('praticas_governanca', e.target.value)}
          />
        </div>
      )}

      {/* ETAPA 2 */}
      {etapa === 2 && (
        <div>
          <h3>Propósito e História</h3>

          <label>Qual é a missão do projeto?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.missao}
            onChange={(e) => handleChange('missao', e.target.value)}
          />

          <label>Qual é a visão de futuro do projeto?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.visao}
            onChange={(e) => handleChange('visao', e.target.value)}
          />

          <label>Quais são os principais valores que orientam a atuação?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.valores}
            onChange={(e) => handleChange('valores', e.target.value)}
          />

          <label>Como e por que o projeto foi criado?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.historia_criacao}
            onChange={(e) => handleChange('historia_criacao', e.target.value)}
          />

          <label>Qual problema social motivou sua criação?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.problema_social_motivacao}
            onChange={(e) => handleChange('problema_social_motivacao', e.target.value)}
          />

          <label>Quais foram os principais marcos ou conquistas até hoje?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.marcos_conquistas}
            onChange={(e) => handleChange('marcos_conquistas', e.target.value)}
          />

          <h3>Atuação e Serviços</h3>

          <label>Quais atividades, serviços ou ações o projeto oferece?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.atividades_oferecidas}
            onChange={(e) => handleChange('atividades_oferecidas', e.target.value)}
          />

          <label>Qual a frequência das ações realizadas?</label>
          <input
            type="text"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.frequencia_acoes}
            onChange={(e) => handleChange('frequencia_acoes', e.target.value)}
          />

          <label>Onde as atividades são realizadas?</label>
          <input
            type="text"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.locais_atividades}
            onChange={(e) => handleChange('locais_atividades', e.target.value)}
          />

          <label>Quais atividades têm maior procura?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.atividades_maior_procura}
            onChange={(e) => handleChange('atividades_maior_procura', e.target.value)}
          />

          <label>Quais atividades desejam implementar no futuro?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.atividades_desejadas}
            onChange={(e) => handleChange('atividades_desejadas', e.target.value)}
          />

          <label>Quais são os principais parceiros atuais?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.parceiros_atuais}
            onChange={(e) => handleChange('parceiros_atuais', e.target.value)}
          />

          <label>Quais os diferenciais do projeto?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.diferenciais}
            onChange={(e) => handleChange('diferenciais', e.target.value)}
          />
        </div>
      )}

      {/* ETAPA 3 */}
      {etapa === 3 && (
        <div>
          <h3>Problema Social, Público e Impacto</h3>

          <label>Qual problema social o projeto busca enfrentar?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.problema_enfrentado}
            onChange={(e) => handleChange('problema_enfrentado', e.target.value)}
          />

          <label>Quem é o público afetado por esse problema?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.publico_afetado}
            onChange={(e) => handleChange('publico_afetado', e.target.value)}
          />

          <label>Em quais territórios atuam?</label>
          <input
            type="text"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.territorios_atuacao}
            onChange={(e) => handleChange('territorios_atuacao', e.target.value)}
          />

          <label>Como dimensionam a gravidade e abrangência do problema?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.dimensionamento_problema}
            onChange={(e) => handleChange('dimensionamento_problema', e.target.value)}
          />

          <label>Qual a principal demanda não atendida pelo poder público/mercado?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.demanda_nao_atendida}
            onChange={(e) => handleChange('demanda_nao_atendida', e.target.value)}
          />

          <label>Quais os riscos se o problema continuar sem intervenção?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.riscos_sem_intervencao}
            onChange={(e) => handleChange('riscos_sem_intervencao', e.target.value)}
          />

          <h3>Público Beneficiário e Indicadores</h3>

          <label>Quem são os beneficiários diretos?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.beneficiarios_diretos}
            onChange={(e) => handleChange('beneficiarios_diretos', e.target.value)}
          />

          <label>Quem são os beneficiários indiretos?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.beneficiarios_indiretos}
            onChange={(e) => handleChange('beneficiarios_indiretos', e.target.value)}
          />

          <label>Quantas pessoas são atendidas atualmente?</label>
          <input
            type="number"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.pessoas_atendidas_atualmente || ''}
            onChange={(e) => handleChange('pessoas_atendidas_atualmente', parseInt(e.target.value) || 0)}
          />

          <label>Qual a capacidade de atendimento caso recebam mais recursos?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.capacidade_com_recursos}
            onChange={(e) => handleChange('capacidade_com_recursos', e.target.value)}
          />

          <label>Como é realizada a seleção ou encaminhamento dos beneficiários?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.forma_selecao_encaminhamento}
            onChange={(e) => handleChange('forma_selecao_encaminhamento', e.target.value)}
          />

          <label>Existe demanda reprimida (lista de espera)? Explique:</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.demanda_reprimida}
            onChange={(e) => handleChange('demanda_reprimida', e.target.value)}
          />

          <label>Quais as principais características socioeconômicas do público?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.caracteristicas_publico}
            onChange={(e) => handleChange('caracteristicas_publico', e.target.value)}
          />

          <label>Quais as mudanças sociais pretendidas a médio/longo prazo?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.mudancas_pretendidas}
            onChange={(e) => handleChange('mudancas_pretendidas', e.target.value)}
          />

          <label>Quais indicadores de impacto são acompanhados?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.indicadores_acompanhados}
            onChange={(e) => handleChange('indicadores_acompanhados', e.target.value)}
          />

          <label>Quais Objetivos de Desenvolvimento Sustentável (ODS) estão relacionados?</label>
          <input
            type="text"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.ods_relacionados}
            onChange={(e) => handleChange('ods_relacionados', e.target.value)}
          />

          <label>Quais temas sociais específicos são trabalhados?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.temas_sociais_trabalhados}
            onChange={(e) => handleChange('temas_sociais_trabalhados', e.target.value)}
          />
        </div>
      )}

      {/* ETAPA 4 */}
      {etapa === 4 && (
        <div>
          <h3>Necessidades do Projeto</h3>

          <label>Quais são hoje as três maiores necessidades do projeto?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.tres_maiores_necessidades}
            onChange={(e) => handleChange('tres_maiores_necessidades', e.target.value)}
          />

          <label>Quais recursos financeiros são estritamente necessários?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.recursos_financeiros_necessarios}
            onChange={(e) => handleChange('recursos_financeiros_necessarios', e.target.value)}
          />

          <label>De quais recursos necessitam para ampliação das atividades?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.recursos_para_ampliacao}
            onChange={(e) => handleChange('recursos_para_ampliacao', e.target.value)}
          />

          <label>Necessidades de materiais, espaço físico, equipamentos e transporte:</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.necessidades_equipamentos_espaco}
            onChange={(e) => handleChange('necessidades_equipamentos_espaco', e.target.value)}
          />

          <label>Necessidades de pessoas, profissionais ou voluntários:</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.necessidades_pessoal_voluntarios}
            onChange={(e) => handleChange('necessidades_pessoal_voluntarios', e.target.value)}
          />

          <label>Necessidades de tecnologia e gestão (sistemas, softwares, mentoria):</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.necessidades_tecnologia_gestao}
            onChange={(e) => handleChange('necessidades_tecnologia_gestao', e.target.value)}
          />

          <label>Necessidades jurídicas e contábeis:</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.necessidades_juridicas_contabeis}
            onChange={(e) => handleChange('necessidades_juridicas_contabeis', e.target.value)}
          />

          <label>Se a Terra Nova pudesse ajudar a resolver 3 problemas em 12 meses, quais seriam?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.ajuda_terra_nova_12m}
            onChange={(e) => handleChange('ajuda_terra_nova_12m', e.target.value)}
          />

          <h3>Orçamento e Captação</h3>

          <label>Orçamento mensal aproximado (R$):</label>
          <input
            type="number"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.orcamento_mensal_atual || ''}
            onChange={(e) => handleChange('orcamento_mensal_atual', parseFloat(e.target.value) || 0)}
          />

          <label>Orçamento anual aproximado (R$):</label>
          <input
            type="number"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.orcamento_anual_atual || ''}
            onChange={(e) => handleChange('orcamento_anual_atual', parseFloat(e.target.value) || 0)}
          />

          <label>Valor necessário para manter o projeto por 12 meses (R$):</label>
          <input
            type="number"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.meta_orcamento_12m || ''}
            onChange={(e) => handleChange('meta_orcamento_12m', parseFloat(e.target.value) || 0)}
          />

          <label>Custo médio aproximado por beneficiário:</label>
          <input
            type="text"
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
            value={formData.custo_por_beneficiario}
            onChange={(e) => handleChange('custo_por_beneficiario', e.target.value)}
          />

          <label>Quais são as fontes de receita atuais?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.fontes_receita_atuais}
            onChange={(e) => handleChange('fontes_receita_atuais', e.target.value)}
          />

          <div style={{ marginBottom: '12px' }}>
            <label>Possui orçamento formalizado/planilhado?</label>
            <input
              type="checkbox"
              disabled={!isLoggedIn}
              style={{ marginLeft: '10px' }}
              checked={formData.possui_orcamento_formalizado}
              onChange={(e) => handleChange('possui_orcamento_formalizado', e.target.checked)}
            />
          </div>

          <label>Formas de apoio aceitas (descrição):</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.formas_apoio_list}
            onChange={(e) => handleChange('formas_apoio_list', e.target.value)}
          />

          <div style={{ marginBottom: '8px' }}>
            <label>Aceita apoio recorrente?</label>
            <input
              type="checkbox"
              disabled={!isLoggedIn}
              style={{ marginLeft: '10px' }}
              checked={formData.aceita_apoio_recorrente}
              onChange={(e) => handleChange('aceita_apoio_recorrente', e.target.checked)}
            />
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label>Aceita doação de bens e serviços?</label>
            <input
              type="checkbox"
              disabled={!isLoggedIn}
              style={{ marginLeft: '10px' }}
              checked={formData.aceita_doacao_bens_servicos}
              onChange={(e) => handleChange('aceita_doacao_bens_servicos', e.target.checked)}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label>Tem interesse em voluntariado corporativo?</label>
            <input
              type="checkbox"
              disabled={!isLoggedIn}
              style={{ marginLeft: '10px' }}
              checked={formData.interesse_voluntariado_corporativo}
              onChange={(e) => handleChange('interesse_voluntariado_corporativo', e.target.checked)}
            />
          </div>

          <label>Quais empresas/parceiros apoiam atualmente?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.empresas_apoiadoras_atuais}
            onChange={(e) => handleChange('empresas_apoiadoras_atuais', e.target.value)}
          />

          <label>Possui dificuldades em editais por causa do CNPJ/documentação?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.dificuldade_editais_cnpj}
            onChange={(e) => handleChange('dificuldade_editais_cnpj', e.target.value)}
          />

          <label>Qual seria o perfil de empresa apoiadora ideal?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.tipo_empresa_ideal}
            onChange={(e) => handleChange('tipo_empresa_ideal', e.target.value)}
          />

          <label>O que mais impede o crescimento ou a captação de recursos hoje?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.impedimentos_crescimento}
            onChange={(e) => handleChange('impedimentos_crescimento', e.target.value)}
          />

          <label>Qual a maior dificuldade na captação de recursos?</label>
          <textarea
            disabled={!isLoggedIn}
            style={{ width: '100%', height: '60px', padding: '8px', marginBottom: '12px' }}
            value={formData.maior_dificuldade_captacao}
            onChange={(e) => handleChange('maior_dificuldade_captacao', e.target.value)}
          />

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handleSave(false)}
              disabled={loading || !isLoggedIn}
              style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Salvar Rascunho
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={loading || !isLoggedIn}
              style={{ padding: '10px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Finalizar Projeto
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE LISTAGEM DE PROJETOS DO BANCO DE DADOS */}
      {modalAberto && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>Projetos Cadastrados</h3>
              <button
                onClick={() => setModalAberto(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ✕
              </button>
            </div>

            {loadingProjetos ? (
              <p>Carregando projetos...</p>
            ) : projetosLista.length === 0 ? (
              <p>Nenhum projeto encontrado no banco de dados.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {projetosLista.map((proj) => {
                  const id = proj.id || proj._id || '';
                  const nome = proj.nome_organizacao || proj.nome_projeto || 'Projeto sem nome';
                  return (
                    <li
                      key={id}
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid #ddd',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <strong>{nome}</strong>
                        {proj.nome_responsavel && <div style={{ fontSize: '12px', color: '#666' }}>Resp: {proj.nome_responsavel}</div>}
                      </div>
                      <button
                        onClick={() => handleSelecionarProjetoModal(id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#007bff',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Selecionar
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            <button
              onClick={() => setModalAberto(false)}
              style={{
                marginTop: '15px',
                width: '100%',
                padding: '8px',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};