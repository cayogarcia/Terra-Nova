import os
from enum import Enum
from typing import List, Optional
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
    email: str
    senha: str = Field(min_length=1)
    nome_projeto: str
    ods_numeros: Optional[List[int]] = []

class LoginSchema(BaseModel):
    email: str
    senha: str

# --- ROTAS DE CADASTRO ---

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
        usuario_existente = supabase.table("usuarios").select("id").eq("email", dados.email).execute()
        if usuario_existente.data:
            raise HTTPException(status_code=400, detail="E-mail já cadastrado.")

        senha_hash = gerar_hash_senha(dados.senha)
        res_user = supabase.table("usuarios").insert({
            "email": dados.email,
            "senha_hash": senha_hash,
            "tipo_perfil": TipoPerfilEnum.PROJETO_OSC.value
        }).execute()

        if not res_user.data:
            raise HTTPException(status_code=500, detail="Erro ao criar usuário.")

        user_id = res_user.data[0]["id"]

        res_projeto = supabase.table("projetos_sociais").insert({
            "usuario_id": user_id,
            "nome_projeto": dados.nome_projeto,
        }).execute()

        projeto_id = res_projeto.data[0]["id"]

        if dados.ods_numeros:
            ods_payload = [{"projeto_id": projeto_id, "ods_numero": ods} for ods in dados.ods_numeros]
            supabase.table("ods_projeto").insert(ods_payload).execute()

        return {"message": "Projeto social cadastrado com sucesso!", "projeto_id": projeto_id}

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=400, detail=f"Erro na requisição: {str(e)}")


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
            "tipo_perfil": usuario["tipo_perfil"]
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