PAPEL
Atua como Engenheiro Front-end Sénior e Creative Developer, especialista em ScrollTrigger (GSAP), SVG e animação performante em dispositivos modestos.

OBJETIVO
Construir um portfólio pessoal cujo scroll percorre uma ilustração em camadas da cidade de Luanda, com parallax e ciclo dia→pôr do sol→noite ligado ao progresso do scroll. Cada zona da cidade corresponde a uma secção do portfólio.

CONTEXTO
- Público: recrutadores e clientes angolanos e remotos.
- Acesso maioritariamente por Android de gama média, dados móveis caros, ligação instável.
- Idioma: português.

STACK (obrigatória)
- HTML5 semântico, CSS moderno, JavaScript ES modules.
- GSAP + ScrollTrigger (scrub, pin, matchMedia), SplitText. Lenis opcional para scroll suave.
- Ilustração em SVG inline (vetorial, estilo plano/geométrico). Sem imagens raster para o cenário.
- Vite apenas para build.

MAPA DE SECÇÕES (zona → conteúdo)
1. Hero, Marginal e Baía ao amanhecer: nome, título, frase de impacto, indicação de scroll.
2. Ilha de Luanda: sobre mim e percurso.
3. Fortaleza de São Miguel / Cidade Alta: projetos em destaque (cartas interativas).
4. Zona urbana ao pôr do sol (silhuetas de prédios): stack e competências.
5. Noite, céu estrelado: contacto (WhatsApp, e-mail, LinkedIn, GitHub) e chamada para ação.

DADOS DO UTILIZADOR (não inventar)
- Nome: [NOME] | Título: [TÍTULO]
- Sobre: [TEXTO CURTO]
- Projetos: [id, nome, descrição, stack, links, resultado]
- Skills: [LISTA]
- Contactos: WhatsApp [+244...], e-mail, LinkedIn, GitHub

ANIMAÇÃO
- 4 a 5 camadas de parallax com velocidades distintas (céu, montanhas/horizonte, cidade, primeiro plano, estrada).
- Ciclo de cor do céu por interpolação GSAP ligada ao scroll (amanhecer → dia → pôr do sol → noite), incluindo luzes das janelas a acender à noite.
- Elementos vivos: barco na baía, aves, nuvens, e um candongueiro (táxi azul e branco) a atravessar a estrada.
- Texto de cada secção entra com SplitText (palavras/linhas), sincronizado com a zona.
- Cartas de projeto: hover/tap com elevação, revelação de detalhes e abertura em painel (Flip).
- Barra de progresso e navegação lateral que reflete a zona atual, com clique para saltar.
- Animar apenas transform e opacity. Evitar filtros SVG pesados e blur animado.

RESPONSIVIDADE E PERFORMANCE
- Usar gsap.matchMedia: desktop com todas as camadas; mobile com camadas reduzidas e menos elementos animados.
- Peso inicial abaixo de 500 KB, sem contar imagens de projetos (lazy-load, WebP/AVIF).
- Alvo de 60 fps em Android de gama média; sem will-change generalizado.
- Lighthouse mobile: Performance ≥ 85, Acessibilidade ≥ 95, SEO ≥ 95.
- Ecrã de carregamento inexistente ou inferior a 1 s.

ACESSIBILIDADE E SEO
- prefers-reduced-motion: desativar parallax e ciclo de cor, manter conteúdo estático legível.
- Contraste mínimo AA em todas as fases do ciclo de cor (verificar o texto em cada zona).
- Todo o conteúdo em HTML real, ordem lógica de leitura, navegação por teclado, meta tags e Open Graph.
- Fallback sem JS: conteúdo legível em sequência simples.

ESTRUTURA DE ENTREGA
- Árvore de pastas e lista de camadas SVG (nome, função, velocidade de parallax) antes do código.
- Cenário separado em módulos: camadas, ciclo de cor, animações de elementos vivos, secções.
- Dados dos projetos em JSON separado.

RESTRIÇÕES (o que NÃO fazer)
- Não usar scroll-jacking agressivo: o utilizador mantém sempre o controlo do scroll.
- Não usar Three.js nem vídeo de fundo.
- Não inventar dados, métricas ou projetos.
- Não deixar o texto ilegível sobre fundos que mudam de cor.

PROCESSO
1. Propõe a lista de camadas e a paleta por fase do dia; espera a minha aprovação.
2. Entrega por fases: (a) estrutura e SVG base, (b) parallax e ciclo de cor, (c) elementos vivos e secções, (d) mobile, acessibilidade, SEO e otimização.
3. No final, lista de verificação de testes em Android real e Lighthouse.