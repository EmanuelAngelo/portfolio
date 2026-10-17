# Emanuel Angelo — Interactive World

Refatoração do portfólio original em Vue 3 e Vite para o modelo de ilha isométrica explorável. O cenário é desenhado em Canvas 2D, sem dependências de motores 3D. A interface é composta por componentes Vue, com conteúdo profissional separado da lógica de navegação.

## Executar

Requisitos: Node.js 22.12 ou superior e npm.

```bash
npm ci
npm run dev
```

Abra o endereço mostrado pelo Vite. Diferentemente do protótipo estático, este projeto Vue precisa do servidor de desenvolvimento ou do build; não abra o `index.html` diretamente.

```bash
npm run build
npm run preview
```

O build é gerado em `dist/`. As configurações de Netlify e Vercel do projeto foram preservadas. Use `npm run build` como comando de build e `dist` como diretório de publicação. O proxy `/api` da configuração original do Vercel foi mantido, mas a experiência do jogo não depende dele.

## Estrutura e responsabilidades

| Pasta / arquivo                  | Responsabilidade                                                        |
| -------------------------------- | ----------------------------------------------------------------------- |
| `src/App.vue`                    | Composição da página e coordenação dos painéis                          |
| `src/components/layout/`         | Cabeçalho e apresentação                                                |
| `src/components/world/`          | HUD, minimapa, passaporte e controles de toque                          |
| `src/components/content/`        | Janelas de conteúdo e lista de projetos                                 |
| `src/composables/useWorld.js`    | Ciclo de animação, entradas de teclado/toque e descarte de recursos     |
| `src/composables/usePassport.js` | Estado reativo das visitas                                              |
| `src/game/geometry.js`           | Projeção isométrica, câmera responsiva e posição dos rótulos            |
| `src/game/movement.js`           | Movimento independente do FPS, limites e proximidade                    |
| `src/game/renderer.js`           | Desenho do cenário, sem dependência de Vue ou manipulação do DOM        |
| `src/data/zones.js`              | Experiências, projetos e coordenadas dos distritos                      |
| `src/data/profile.js`            | Perfil, tecnologias e links de contato                                  |
| `src/services/`                  | Persistência e integração de repositórios                               |
| `src/styles/`                    | Tema visual e regras responsivas                                        |
| `tests/`                         | Testes de navegação, projeção, serviços e montagem da interface via SSR |
| `public/`                        | Currículo, ícones e imagens preservados do projeto original             |
| `netlify/functions/`             | Integração original de repositórios fixados no GitHub                   |

Não há injeção de conteúdo por `innerHTML`: os painéis utilizam templates Vue e interpolação escapada. Eventos globais e animações são removidos ao desmontar a página. Os dados de conteúdo usam objetos com campos nomeados.

## Controles

- **WASD ou setas:** movimentar o personagem na direção da tela.
- **Clique/toque no chão:** caminhar até o ponto escolhido.
- **Clique/toque no nome de um distrito:** caminhar até a entrada e abrir o conteúdo.
- **E ou botão Explorar:** abrir a experiência próxima.
- **Esc ou ×:** fechar a janela.
- **Explorar mapa:** acessar todas as experiências diretamente, além de perfil e contato.
- **Marca no cabeçalho:** reposicionar o personagem e voltar à apresentação.

O movimento reproduz o protótipo: o personagem caminha livremente pela ilha, sem colisões físicas com os edifícios.

## Celular e tablet

O desktop mantém a composição do modelo aprovado. Em telas compactas, a câmera enquadra toda a ilha e reorganiza os rótulos para reduzir sobreposição. Controles direcionais aparecem em celulares, tablets e dispositivos com ponteiro de toque. Há regras específicas para orientação horizontal, áreas seguras e janelas com rolagem.

O menu de distritos oferece acesso alternativo ao conteúdo sem depender do Canvas ou do controle do personagem. A preferência de movimento reduzido desativa as animações decorativas. O passaporte continua funcionando em memória caso o navegador bloqueie o armazenamento local.

## Conteúdo e recursos preservados

O currículo local (`public/resume.pdf`), os ícones, as imagens e os adaptadores de hospedagem foram preservados. A nova experiência adota o conteúdo em português e o tema escuro do modelo aprovado; o antigo layout de seções, o seletor de idiomas e o seletor de tema foram substituídos por essa interface.

Os projetos iniciais são os do modelo. Dentro do laboratório, **Atualizar projetos do GitHub** consulta a função Netlify e, se ela não estiver disponível, a API pública do GitHub. Falhas, limite da API ou ausência de internet mantêm os projetos já exibidos. Não é necessário cadastrar token.

A PWA foi mantida e recebe a nova identidade. As fontes usam Google Fonts, com fontes alternativas em caso de indisponibilidade. Links externos e atualização do GitHub precisam de conexão; não são parte da garantia de cache offline. O currículo permanece como arquivo local do projeto.

## Formatação e testes

```bash
npm run format        # Formatar código
npm run format:check  # Verificar o padrão sem modificar arquivos
npm test              # Executar os testes automatizados
npm run check         # Formatação + testes + build de produção
```

O projeto inclui Prettier e EditorConfig. O lockfile foi atualizado para as dependências utilizadas; Tailwind, ícones Lucide e vue-i18n foram removidos por não serem necessários à nova composição.

A suíte verifica projeção e enquadramento em nove dimensões, posicionamento de rótulos no celular, desenho do cenário com contexto de teste, deslocamento, chegada aos seis distritos, persistência, falhas de API e renderização dos componentes via SSR.

**Limite da verificação:** os testes de geometria e SSR não substituem testes visuais e de toque em navegadores reais. Não houve inspeção visual em navegador neste ambiente. Antes de substituir o site público, confira o build em um celular e em um tablet, especialmente rotação de tela, teclado virtual e zoom.

## Personalizar

Edite `src/data/zones.js` para atualizar experiências e projetos e `src/data/profile.js` para contato, currículo e habilidades. As cores e o layout ficam em `src/styles/`. Para mudar o desenho dos edifícios, edite `src/game/renderer.js`.

O ZIP contém código-fonte e recursos, sem `node_modules`, histórico Git ou credenciais. Instale as dependências com `npm ci`.
