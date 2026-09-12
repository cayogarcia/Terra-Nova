import os
from enum import Enum
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from supabase import create_client, Client
from dotenv import load_dotenv
import bcrypt

load_dotenv()

app = FastAPI(title="Terra Nova API - Full Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

raw_url = os.getenv("SUPABASE_URL", "").strip()
url: str = raw_url.split("/rest")[0].rstrip("/")
key: str = os.getenv("SUPABASE_KEY", "").strip()

if not url or not key:
    raise ValueError("Verifique se SUPABASE_URL e SUPABASE_KEY estão definidos no arquivo .env")

supabase: Client = create_client(url, key)

# --- UTILITÁRIOS DE CRIPTOGRAFIA ---

def gerar_hash_senha(senha: str) -> str:
    senha_bytes = senha.encode('utf-8')
    sal = bcrypt.gensalt()
    senha_hash = bcrypt.hashpw(senha_bytes, sal)
    return senha_hash.decode('utf-8')

def verificar_senha(senha_plana: str, senha_hash: str) -> bool:
    senha_bytes = senha_plana.encode('utf-8')
    hash_bytes = senha_hash.encode('utf-8')
    return bcrypt.checkpw(senha_bytes, hash_bytes)

# --- SCHEMAS ---

class TipoPerfilEnum(str, Enum):
    INVESTIDOR = "INVESTIDOR"
    PROJETO_OSC = "PROJETO_OSC"
    ADMIN_TERRA_NOVA = "ADMIN_TERRA_NOVA"

class CadastroInvestidorSchema(BaseModel):
    email: str
    senha: str = Field(min_length=1)
    razao_social: str
    cnpj: str
    causas_interesse: Optional[List[str]] = []

class CadastroProjetoSchema(BaseModel):
    nome_projeto: Optional[str] = None
    email: Optional[str] = None
    senha: Optional[str] = None
    osc_numeros: Optional[List[int]] = []

class LoginSchema(BaseModel):
    email: str
    senha: str

class DiagnosticoProjetoSchema(BaseModel):
    nome_organizacao: Optional[str] = None
    nome_responsavel: Optional[str] = None
    cargo_responsavel: Optional[str] = None
    contato_institucional: Optional[str] = None
    redes_sociais: Optional[str] = None
    possui_cnpj: Optional[bool] = False
    cnpj_numero: Optional[str] = None
    natureza_juridica: Optional[str] = None
    tempo_existencia: Optional[str] = None
    fundadores_motivo: Optional[str] = None
    
    missao: Optional[str] = None
    visao: Optional[str] = None
    valores: Optional[str] = None
    historia_criacao: Optional[str] = None
    problema_social_motivacao: Optional[str] = None
    marcos_conquistas: Optional[str] = None
    
    problema_enfrentado: Optional[str] = None
    publico_afetado: Optional[str] = None
    territorios_atuacao: Optional[str] = None
    dimensionamento_problema: Optional[str] = None
    demanda_nao_atendida: Optional[str] = None
    riscos_sem_intervencao: Optional[str] = None
    
    beneficiarios_diretos: Optional[str] = None
    beneficiarios_indiretos: Optional[str] = None
    pessoas_atendidas_atualmente: Optional[int] = 0
    capacidade_com_recursos: Optional[str] = None
    forma_selecao_encaminhamento: Optional[str] = None
    demanda_reprimida: Optional[str] = None
    caracteristicas_publico: Optional[str] = None
    
    atividades_oferecidas: Optional[str] = None
    frequencia_acoes: Optional[str] = None
    locais_atividades: Optional[str] = None
    atividades_maior_procura: Optional[str] = None
    atividades_desejadas: Optional[str] = None
    parceiros_atuais: Optional[str] = None
    diferenciais: Optional[str] = None
    
    tres_maiores_necessidades: Optional[str] = None
    recursos_financeiros_necessarios: Optional[str] = None
    recursos_para_ampliacao: Optional[str] = None
    necessidades_equipamentos_espaco: Optional[str] = None
    necessidades_pessoal_voluntarios: Optional[str] = None
    necessidades_tecnologia_gestao: Optional[str] = None
    necessidades_juridicas_contabeis: Optional[str] = None
    ajuda_terra_nova_12m: Optional[str] = None
    
    orcamento_mensal_atual: Optional[float] = 0.0
    orcamento_anual_atual: Optional[float] = 0.0
    meta_orcamento_12m: Optional[float] = 0.0
    custo_por_beneficiario: Optional[str] = None
    fontes_receita_atuais: Optional[str] = None
    possui_orcamento_formalizado: Optional[bool] = False
    
    formas_apoio_list: Optional[Any] = None
    aceita_apoio_recorrente: Optional[bool] = True
    aceita_doacao_bens_servicos: Optional[bool] = True
    interesse_voluntariado_corporativo: Optional[bool] = True
    empresas_apoiadoras_atuais: Optional[str] = None
    dificuldade_editais_cnpj: Optional[str] = None
    tipo_empresa_ideal: Optional[str] = None

    mudancas_pretendidas: Optional[str] = None
    indicadores_acompanhados: Optional[str] = None
    ods_relacionados: Optional[Any] = None
    temas_sociais_trabalhados: Optional[str] = None
    praticas_governanca: Optional[str] = None
    equipe_gestao: Optional[str] = None
    impedimentos_crescimento: Optional[str] = None
    maior_dificuldade_captacao: Optional[str] = None
    materiais_disponiveis: Optional[Dict[str, bool]] = {}
    
    cadastro_completo: Optional[bool] = False

# --- ROTAS DE CADASTRO E PROJETOS ---

@app.post("/cadastrar/empresa", status_code=status.HTTP_201_CREATED)
def cadastrar_empresa(dados: CadastroInvestidorSchema):
    try:
        usuario_existente = supabase.table("usuarios").select("id").eq("email", dados.email).execute()
        if usuario_existente.data:
            raise HTTPException(status_code=400, detail="E-mail já cadastrado.")

        senha_hash = gerar_hash_senha(dados.senha)
        res_user = supabase.table("usuarios").insert({
            "email": dados.email,
            "senha_hash": senha_hash,
            "tipo_perfil": TipoPerfilEnum.INVESTIDOR.value
        }).execute()

        if not res_user.data:
            raise HTTPException(status_code=500, detail="Erro ao criar usuário.")

        user_id = res_user.data[0]["id"]

        res_empresa = supabase.table("empresas_investidoras").insert({
            "usuario_id": user_id,
            "razao_social": dados.razao_social,
            "cnpj": dados.cnpj,
            "causas_interesse": dados.causas_interesse
        }).execute()

        return {"message": "Empresa investidora cadastrada com sucesso!", "usuario_id": user_id}

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=400, detail=f"Erro na requisição: {str(e)}")


@app.post("/cadastrar/projeto", status_code=status.HTTP_201_CREATED)
def cadastrar_projeto(dados: CadastroProjetoSchema):
    try:
        user_id = None

        if dados.email and dados.senha:
            usuario_existente = supabase.table("usuarios").select("id").eq("email", dados.email).execute()
            if usuario_existente.data:
                raise HTTPException(status_code=400, detail="E-mail já cadastrado.")

            senha_hash = gerar_hash_senha(dados.senha)
            res_user = supabase.table("usuarios").insert({
                "email": dados.email,
                "senha_hash": senha_hash,
                "tipo_perfil": TipoPerfilEnum.PROJETO_OSC.value
            }).execute()

            if res_user.data:
                user_id = res_user.data[0]["id"]

        payload_projeto = {"nome_projeto": dados.nome_projeto or "Novo Projeto Social"}
        if user_id:
            payload_projeto["usuario_id"] = user_id

        res_projeto = supabase.table("projetos_sociais").insert(payload_projeto).execute()

        if not res_projeto.data:
            raise HTTPException(status_code=500, detail="Erro ao cadastrar o projeto.")

        projeto_id = res_projeto.data[0]["id"]

        if dados.osc_numeros:
            osc_payload = [{"projeto_id": projeto_id, "osc_numero": osc} for osc in dados.osc_numeros]
            supabase.table("osc_projeto").insert(osc_payload).execute()

        return {"message": "Projeto social cadastrado com sucesso!", "projeto_id": projeto_id, "id": projeto_id}

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=400, detail=f"Erro na requisição: {str(e)}")


@app.post("/projetos", status_code=status.HTTP_201_CREATED)
def criar_novo_projeto(dados: DiagnosticoProjetoSchema):
    try:
        nome_proj = dados.nome_organizacao or "Novo Projeto Social"
        res_projeto = supabase.table("projetos_sociais").insert({"nome_projeto": nome_proj}).execute()

        if not res_projeto.data:
            raise HTTPException(status_code=500, detail="Erro ao criar projeto.")

        projeto_id = res_projeto.data[0]["id"]

        payload_diag = dados.dict(exclude_unset=True)
        payload_diag["projeto_id"] = projeto_id

        supabase.table("diagnostico_projeto").upsert(payload_diag, on_conflict="projeto_id").execute()

        return {"message": "Projeto criado com sucesso!", "id": projeto_id, "projeto_id": projeto_id}

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=400, detail=f"Erro ao criar projeto: {str(e)}")


@app.get("/projetos")
def listar_todos_projetos():
    try:
        res = supabase.table("projetos_sociais").select("id, nome_projeto").execute()
        projetos = res.data or []

        # Tenta enriquecer a lista pegando o nome das organizações na tabela de diagnóstico
        for p in projetos:
            diag = supabase.table("diagnostico_projeto").select("nome_organizacao, nome_responsavel").eq("projeto_id", p["id"]).execute()
            if diag.data:
                p["nome_organizacao"] = diag.data[0].get("nome_organizacao") or p["nome_projeto"]
                p["nome_responsavel"] = diag.data[0].get("nome_responsavel")
            else:
                p["nome_organizacao"] = p.get("nome_projeto")

        return projetos
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/login")
def login(dados: LoginSchema):
    try:
        res = supabase.table("usuarios").select("*").eq("email", dados.email).execute()
        
        if not res.data:
            raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")

        usuario = res.data[0]

        if not verificar_senha(dados.senha, usuario["senha_hash"]):
            raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")

        return {
            "message": "Login efetuado com sucesso!",
            "usuario_id": usuario["id"],
            "tipo_perfil": usuario["tipo_perfil"],
            "email": usuario["email"]
        }

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=400, detail=f"Erro na requisição: {str(e)}")


@app.get("/projetos/publicos")
def listar_projetos_publicos():
    try:
        res = supabase.table("projetos_sociais").select("id, nome_projeto").execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/projetos/{projeto_id}")
def obter_detalhes_projeto(projeto_id: str):
    try:
        res = supabase.table("projetos_sociais").select("*, osc_projeto(osc_numero)").eq("id", projeto_id).execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="Projeto não encontrado.")
        return res.data[0]
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))


# --- ROTAS DE DIAGNÓSTICO DO PROJETO ---

@app.put("/projetos/{projeto_id}/diagnostico")
@app.post("/projetos/{projeto_id}/diagnostico")
def salvar_diagnostico_projeto(projeto_id: str, dados: DiagnosticoProjetoSchema):
    try:
        proj = supabase.table("projetos_sociais").select("id").eq("id", projeto_id).execute()
        if not proj.data:
            raise HTTPException(status_code=404, detail="Projeto não encontrado.")

        payload = dados.dict(exclude_unset=True)
        payload["projeto_id"] = projeto_id

        # Atualiza o nome_projeto em projetos_sociais se enviado no diagnostico
        if dados.nome_organizacao:
            supabase.table("projetos_sociais").update({"nome_projeto": dados.nome_organizacao}).eq("id", projeto_id).execute()

        res = supabase.table("diagnostico_projeto").upsert(payload, on_conflict="projeto_id").execute()

        return {"message": "Diagnóstico salvo com sucesso!", "dados": res.data}

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=400, detail=f"Erro ao salvar diagnóstico: {str(e)}")


@app.get("/projetos/{projeto_id}/diagnostico")
def obter_diagnostico_projeto(projeto_id: str):
    try:
        res_proj = supabase.table("projetos_sociais").select("nome_projeto, usuarios(email)").eq("id", projeto_id).execute()
        
        if not res_proj.data:
            raise HTTPException(status_code=404, detail="Projeto não encontrado.")
            
        projeto_base = res_proj.data[0]
        nome_projeto_cadastrado = projeto_base.get("nome_projeto") or ""
        email_usuario = projeto_base.get("usuarios", {}).get("email") if projeto_base.get("usuarios") else ""

        res_diag = supabase.table("diagnostico_projeto").select("*").eq("projeto_id", projeto_id).execute()
        
        dados_diagnostico = res_diag.data[0] if res_diag.data else {}

        if not dados_diagnostico.get("nome_organizacao"):
            dados_diagnostico["nome_organizacao"] = nome_projeto_cadastrado

        if not dados_diagnostico.get("contato_institucional"):
            dados_diagnostico["contato_institucional"] = email_usuario

        return dados_diagnostico

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))