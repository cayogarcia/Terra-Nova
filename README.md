🚀 TerraNova - Front-end
Este é o repositório do front-end da TerraNova, uma aplicação desenvolvida com React e TypeScript, focada em gestão de riscos. O projeto utiliza Vite para um desenvolvimento ultra-rápido e está totalmente conteinerizado com Docker.

🛠️ Tecnologias Utilizadas
React 18 (UI Library)

TypeScript (Tipagem estática)

Vite (Build tool e Dev server)

Nginx (Servidor web para produção)

Docker & Docker Compose (Orquestração de containers)

📂 Estrutura de Pastas
Conforme a organização do projeto:

src/assets: Recursos estáticos como imagens e fontes locais.

src/components: Componentes reutilizáveis da interface.

src/pages: Páginas principais (Home, Empresa, Contato, etc.).

src/routes: Configurações de navegação da SPA.

src/styles: Arquivos de estilização global (CSS/SASS).

public: Arquivos estáticos acessíveis diretamente (ícones e logotipos).

🚀 Como Executar o Projeto
🐳 Via Docker (Recomendado para Produção)
O projeto já inclui um Dockerfile e um nginx.conf otimizados. Para subir o ambiente:

Bash
docker-compose up -d
A aplicação estará disponível em http://localhost:8080.

💻 Ambiente de Desenvolvimento
Se desejar rodar localmente sem Docker:

Instale as dependências:

Bash
npm install
Inicie o servidor de desenvolvimento:

Bash
npm run dev
🏗️ Build e Deploy
O processo de build é gerenciado pelo Vite. Em produção, o Docker utiliza uma estratégia de Multi-stage Build:

O código é transpilado e minificado.

Os arquivos estáticos são servidos pelo Nginx na porta 80 do container.

🔒 Acesso Externo
Este projeto está configurado para ser exposto via Cloudflare Tunnel.

Domínio: terranovagestaoderiscos.com.br

Serviço Local: Redirecionado da porta 8080 (Host) para o túnel.