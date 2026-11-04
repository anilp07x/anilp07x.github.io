# Portfólio — Anilson Da Silva Pedro

Portfólio pessoal de Anilson Da Silva Pedro, Full-stack Developer em Luanda.
HTML, CSS e JavaScript puros, **sem build, sem npm e sem bibliotecas**. Duas
colunas no ecrã largo: nome e navegação parados à esquerda, conteúdo a rolar à
direita.

## Publicar no GitHub Pages

1. Crie o repositório `anilp07x.github.io` (site de utilizador: fica servido na
   raiz do domínio).
2. Envie estes ficheiros:

   ```bash
   git init -b main
   git add .
   git commit -m "Portfólio minimalista"
   git remote add origin https://github.com/anilp07x/anilp07x.github.io.git
   git push -u origin main
   ```

3. No repositório: **Settings → Pages → Source: Deploy from a branch →
   Branch: `main`, pasta `/ (root)` → Save**.
4. O site fica disponível em (pode levar um ou dois minutos):

   | Repositório | Endereço |
   |---|---|
   | `anilp07x.github.io` | `https://anilp07x.github.io/` — este site |
   | qualquer outro nome | `https://anilp07x.github.io/<nome-do-repo>/` |

5. (Opcional) Domínio próprio: **Settings → Pages → Custom domain**.

### Endereço

O site está publicado como site de utilizador, em
`https://anilp07x.github.io/`, e os endereços absolutos do código já apontam
para lá: `index.html` (`rel="canonical"`, `og:url`, `og:image` e
`twitter:image`), `robots.txt` (linha `Sitemap:`) e `sitemap.xml` (`<loc>`).

Tudo o resto usa caminhos relativos, por isso funciona em qualquer subpasta.

O site está verificado no **Google Search Console** de duas formas — a etiqueta
`google-site-verification` no `index.html` e o ficheiro
`google8ca342e5a76c39f2.html` na raiz. Basta que uma delas continue a existir:
o Google volta a verificar de vez em quando. Se a propriedade mudar de conta,
gere valores novos.

## Estrutura

```
.
├── index.html          conteúdo real (funciona mesmo sem JavaScript)
├── logo.png            marca do cabeçalho
├── og.png              cartão de partilha 1200×630, feito a partir de logo.png
├── favicon.png         marca num quadrado de papel, gerada a partir de logo.png
├── .nojekyll           impede o Jekyll de processar o site
├── robots.txt
├── sitemap.xml
├── google8ca342e5a76c39f2.html  verificação do site no Search Console
├── README.md
├── PRODUCT.md          público, propósito e factos do portfólio (contexto de design)
└── assets
    ├── css/style.css   tema claro/escuro automático, cores, tipografia, ícones
    ├── js/main.js      secção ativa na navegação, luz do cursor, impressão
    └── fonts/          Fredoka (títulos) e Figtree (texto), variáveis, só latim
```

## Atualizar conteúdo

| O quê | Onde |
|---|---|
| Nome, função e frase da coluna da esquerda | `index.html`, `<header class="side">` |
| Sobre | `index.html`, secção `#sobre` |
| Projetos | `index.html`, `#projetos` (cada `<li>` é uma entrada; as tecnologias são `.tags`) |
| Percurso e certificações | `index.html`, secção `#percurso` |
| Stack | `index.html`, secção `#stack` (um `<li>` por tecnologia: ícone + nome) |
| Contactos | `index.html`, secção `#contacto` e atalhos `.social` na coluna da esquerda |
| Desenho dos ícones | `assets/css/style.css`, regras `.icon--*` (SVG do simple-icons em data URI) |
| Marca | `logo.png`; o `favicon.png` e o `og.png` são derivados dele |
| Cores e tipos de letra | `assets/css/style.css`, bloco `:root` e `@font-face` |

## Notas

- **Layout**: inspirado na estrutura do portfólio de
  [Brittany Chiang](https://brittanychiang.com/) — duas colunas no ecrã largo
  (a da esquerda fica parada com nome, função, navegação e contactos; a da
  direita rola), entradas com uma coluna lateral para datas ou tipo, pílulas
  de tecnologias, hover que destaca a entrada e esbate as outras, e uma luz que
  segue o cursor. A identidade é a deste site: papel e tinta, Fredoka e
  Figtree, amarelo-sol e o logótipo "ap". Abaixo de 1024px é uma coluna só,
  com o título de cada secção preso ao topo enquanto se lê.
- **Tom**: o site segue o logótipo — redondo e quente. Títulos em
  [Fredoka](https://fonts.google.com/specimen/Fredoka), texto em
  [Figtree](https://fonts.google.com/specimen/Figtree), ambas SIL Open Font
  License, servidas de `assets/fonts/` (variáveis, só latim, ~50 KB). O
  amarelo-sol (`--sun`) aparece cheio no selo "Online", na secção ativa da
  navegação e no hover do botão; diluído (`--sun-wash`) nas pílulas e no fundo
  do hover das entradas. O texto por cima é sempre a tinta escura.
- **JavaScript** (`assets/js/main.js`, sem bibliotecas): marca a secção ativa na
  navegação, move a luz do cursor (só com rato e movimento normal) e abre as
  certificações antes de imprimir. Sem JavaScript a página é a mesma, só mais
  quieta.
- **Marca**: o logo tem `alt` com o nome e leva ao início. No tema escuro passa
  a tinta clara (`brightness(0) invert(.93)`). No rodapé é decorativo
  (`alt=""`). Para regerar o `favicon.png`, desenhe o `logo.png` centrado num
  quadrado de papel de 192×192 (cantos redondos).
- **Ícones** (Stack, certificações e atalhos sociais): sempre com o nome em
  texto ao lado (ou num `.sr-only`, nos atalhos), por isso decorativos
  (`aria-hidden`). Máscara CSS com o SVG em *data URI* — um `url()` para um
  `.svg` externo não carrega a partir de `file://`. Desenhos do
  [simple-icons](https://simpleicons.org/); o C# usa o logo do .NET.
- **Certificações**: recolhidas num `<details>`, para não competirem com a
  experiência e os projetos.
- **Cartão de partilha** (`og.png`): 1200×630 com a marca, o nome, o cargo e a
  stack.
- **Impressão e PDF**: uma coluna, papel branco e tinta preta mesmo no tema
  escuro, sem ícones nem botões, certificações abertas e o endereço de cada
  projeto e contacto por baixo.
- **Movimento reduzido** desliga o scroll suave, a luz do cursor e as
  transições.
- O ano no rodapé é atualizado automaticamente por `assets/js/main.js`.
- Não há dependências externas nem pedidos de rede para além dos ficheiros do
  site. Pré-visualização local: basta abrir `index.html` no navegador.
