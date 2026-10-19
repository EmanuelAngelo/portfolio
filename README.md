# Emanuel Angelo — Survivor District 3D

Portfólio em Vue 3, Vite e Three.js com cenário WebGL 2, modelos tridimensionais, câmera em perspectiva e sombras. O personagem e a arquitetura são geometrias originais, criadas no código. A atmosfera de sobrevivência urbana usa cores sóbrias, concreto, tijolos e vegetação; não inclui modelos, texturas, músicas ou marcas extraídos de Project Zomboid.

O personagem tem pele clara, cabelo preto, camiseta preta, calça cargo, botas e mochila militar verde-oliva. Pernas, joelhos, braços e cotovelos são articulados. A câmera acompanha o deslocamento e os prédios ficam translúcidos quando encobrem o personagem.

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
| `src/game/geometry.js`           | Câmera em perspectiva, raycasting no chão e posição dos rótulos         |
| `src/game/movement.js`           | Movimento independente do FPS, limites e proximidade                    |
| `src/game/renderer.js`           | Cena Three.js, iluminação, oclusão e ciclo de vida do WebGL             |
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
- **Explorar mapa:** escolher um distrito e caminhar até sua entrada. O conteúdo só abre por E, Entrar ou pelo rótulo da entrada próxima.
- **E ou botão Explorar:** abrir a experiência próxima.
- **Esc ou ×:** fechar a janela.
- **Explorar mapa:** selecionar destinos, além de acessar perfil e contato.
- **Marca no cabeçalho:** reposicionar o personagem e voltar à apresentação.

O personagem respeita os limites da ilha, os prédios e o reservatório central. Destinos por toque usam busca de caminho para contornar obstáculos e parar diante da entrada. Nenhum painel abre automaticamente ao chegar: pressione E ou toque em Entrar.

## Celular e tablet

O desktop mantém a composição do modelo aprovado. Em telas compactas, o cenário mantém uma escala maior e a câmera acompanha o personagem suavemente. A ilha não é reduzida para caber inteira. A apresentação permanece visível e apenas a entrada próxima exibe um rótulo. Controles direcionais aparecem em celulares, tablets e dispositivos com ponteiro de toque. Há regras específicas para orientação horizontal, áreas seguras e janelas com rolagem.

O menu de distritos oferece acesso alternativo ao conteúdo sem depender do WebGL ou do controle do personagem. A preferência de movimento reduzido desativa as animações decorativas. O passaporte continua funcionando em memória caso o navegador bloqueie o armazenamento local.

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

A suíte verifica projeção e enquadramento em nove dimensões, escala e enquadramento do personagem no celular, desenho do cenário com contexto de teste, deslocamento, chegada aos seis distritos, persistência, falhas de API e renderização dos componentes via SSR.

**Limite da verificação:** os testes de geometria e SSR não substituem testes visuais e de toque em navegadores reais. Não houve inspeção visual em navegador neste ambiente. Antes de substituir o site público, confira o build em um celular e em um tablet, especialmente rotação de tela, teclado virtual e zoom.

## Personalizar

Edite `src/data/zones.js` para atualizar experiências e projetos e `src/data/profile.js` para contato, currículo e habilidades. As cores e o layout ficam em `src/styles/`. Para mudar o desenho dos edifícios, edite `src/game/renderer.js`.

O ZIP contém código-fonte e recursos, sem `node_modules`, histórico Git ou credenciais. Instale as dependências com `npm ci`.

## Correção da experiência de jogo — 19/10/2026

- Personagem nasce em uma passagem livre, com anel de identificação e animação de braços e pernas.
- Câmera aproximada no mobile e tablet, com acompanhamento suave.
- Cabeçalho e apresentação não desaparecem ao tocar no cenário.
- Rótulos aparecem apenas perto das entradas; toque no mapa geral para selecionar um destino.
- Colisões com casas e fonte; o caminho por clique contorna os obstáculos.
- WASD, setas e direcional por toque compartilham o mesmo motor de movimento.
- Soltar o toque, perder o foco ou abrir uma janela interrompe o movimento.
- A captura de ponteiro tem tratamento para navegadores que não a suportam.
- Teste de integração com DOM simulado verifica movimento real do estado da interface, chegada sem abrir painel, tecla E e retomada após fechar.

A validação automatizada usa DOM simulado e adaptador de GPU substituído, além do build de produção. Ela não representa uma inspeção visual nem um teste em aparelho físico.

## Arquitetura 3D e validação

- `src/game/three/survivor.js`: modelo e animação do personagem.
- `src/game/three/environment.js`: arquitetura, ruas e vegetação.
- `src/game/three/primitives.js`: materiais, geometrias compartilhadas e agrupamento das partes estáticas.
- `src/game/geometry.js`: a mesma câmera em perspectiva orienta os rótulos e o raycasting do mouse.
- `src/game/renderer.js`: cena, sombras, indicador de destino, transparência de prédios e descarte.
- A resolução interna é limitada a 1,5x em mobile e 2x no desktop.
- Sem WebGL 2, o menu permite abrir as experiências diretamente. Perda e restauração de contexto também são tratadas.

Testes automatizados verificam projeção em nove tamanhos, geometria 3D finita, câmera em perspectiva, mochila, animação, alvo por clique, controles montados em DOM simulado, perda/restauração de contexto e acesso alternativo ao conteúdo. O adaptador de GPU é substituído nos testes de Node: isso não valida shaders, desempenho ou aparência em um navegador real. Não houve teste físico em celular/tablet neste ambiente.

## Atualizar na Vercel

Use o projeto completo deste ZIP, incluindo `package.json`, `package-lock.json` e a nova pasta `src/game/three`. Execute `npm ci` e `npm run build`. Configure o comando de build como `npm run build` e a saída como `dist`. Three.js é incluído no bundle; a cena não depende de CDN nem de downloads de modelos externos.
