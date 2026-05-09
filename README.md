🚀 TerraNova - Front-end
Este é o repositório do front-end da TerraNova, uma aplicação moderna desenvolvida com React e TypeScript, focada em gestão de riscos. O projeto utiliza Vite para um desenvolvimento de alta performance e está totalmente conteinerizado com Docker.

✨ Funcionalidades (Features)
Design 100% Responsivo: Interface otimizada para uma experiência impecável em dispositivos móveis, tablets e desktops.

Integração com API do WhatsApp: Botão de contato direto para agilizar o atendimento ao cliente.

Captação de Talentos: Formulário estruturado para envio de currículos diretamente por e-mail.

Navegação SPA: Transições fluidas entre as seções Institucional, Empresa, Serviços e Contato.

🛠️ Tecnologias Utilizadas
React 18 (UI Library)

TypeScript (Tipagem estática para maior segurança do código)

Vite (Build tool de próxima geração)

Nginx (Servidor web de alta performance para produção)

Docker & Docker Compose (Orquestração e padronização do ambiente)

📂 Estrutura de Pastas
Organização baseada em boas práticas de escalabilidade:

src/assets: Imagens, ícones e fontes locais.

src/components: Componentes modulares e reutilizáveis.

src/pages: Páginas da aplicação (Home, Empresa, Contato, etc.).

src/routes: Gerenciamento de rotas da SPA.

src/styles: Estilização global e temas.

public: Arquivos estáticos servidos diretamente.

🚀 Como Executar o Projeto
🐳 Via Docker (Recomendado)
O projeto utiliza Multi-stage Build para otimizar o tamanho da imagem final. Para subir o ambiente completo:

Bash
docker-compose up -d
A aplicação estará disponível em http://localhost:8080.

💻 Ambiente de Desenvolvimento
Bash
npm install
npm run dev
🔒 Infraestrutura e Deploy
O projeto foi desenhado para ser resiliente e fácil de escalar:

Servidor Web: Nginx configurado para servir arquivos estáticos de forma otimizada.

Acesso Seguro: Exposto via Cloudflare Tunnel, eliminando a necessidade de abertura de portas vulneráveis no roteador.

Domínio Oficial: terranovagestaoderiscos.com.br.