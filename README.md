# Portfólio — Anilson Da Silva Pedro

Portfólio pessoal de Anilson Da Silva Pedro, Full-stack Developer em Luanda.
HTML, CSS e JavaScript puros, **sem build e sem npm**. O GSAP anima a entrada e o
scroll; o herói tem um campo de pontos desenhado em canvas.

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

O site está verificado no **Google Search Console** com o ficheiro
`google8ca342e5a76c39f2.html` na raiz — não apagar: o Google volta a verificar
de vez em quando. Se a propriedade mudar de conta, gere um ficheiro novo.

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
└── assets
    ├── css/style.css   tema claro/escuro automático, hairlines, tipografia do sistema
    ├── js/main.js      animações de entrada, campo generativo do herói, scroll suavizado e âncoras
    └── vendor/          GSAP 3.13.0: núcleo + ScrollTrigger, ScrollSmoother, SplitText
```

## Atualizar conteúdo

| O quê | Onde |
|---|---|
| Projetos | `index.html`, secção `#projetos` (cada `<li>` liga ao repositório ou ao site em produção) |
| Stack | `index.html`, secção `#stack` |
| Percurso (experiência, formação e formações) | `index.html`, secção `#percurso` |
| Stack de cada projeto | `index.html`, `#projetos`, dentro de `<span class="row__meta row__meta--icons">` |
| Desenho dos ícones | `assets/css/style.css`, regras `.icon--*` (SVG do simple-icons em data URI) |
| Marca (cabeçalho) | `logo.png`; o `favicon.png` é derivado dele |
| Cartão de partilha | `og.png` (1200×630), também feito a partir de `logo.png` |
| Contactos | `index.html`, secção `#contacto` |
| Cores | `assets/css/style.css`, bloco `:root` |

## Notas

- **Sem JavaScript** o conteúdo continua todo legível: as animações só escondem
  elementos depois de o GSAP carregar. O nome no herói é dividido em palavras
  para a animação; sem JavaScript fica texto simples (o texto lido por leitores
  de ecrã e copiado é sempre o mesmo).
- **Marca**: no cabeçalho, o nome é o `logo.png` — a imagem tem `alt` com o nome
  completo, por isso continua legível por leitores de ecrã e quando a imagem não
  carrega. No tema escuro o logo é invertido (`filter: invert(1)`), senão a tinta
  escura desaparecia no papel escuro. O `favicon.png` é o mesmo logo dentro de um
  quadrado de papel arredondado — a um favicon transparente de tinta escura
  aconteceria o mesmo numa barra de separadores escura. Para o regerar, desenhe
  o `logo.png` centrado num quadrado de papel de 192×192 (cantos redondos).
- **Scroll suavizado** (ScrollSmoother): o conteúdo é deslocado por *transform*
  dentro de um wrapper fixo, mas a barra de scroll e a altura do documento
  continuam nativas. Em ecrãs táteis mantém-se o scroll nativo. Os links
  internos (`#projetos`, `#stack`, `#percurso`, `#contacto` e voltar ao topo) são conduzidos
  pelo plugin, com o foco a seguir para o destino.
- **Nome do herói** dividido em palavras pelo SplitText, com alternativa própria
  caso o plugin não carregue; o `<h1>` conserva o `aria-label` completo e as
  palavras ficam decorativas para leitores de ecrã.
- **Campo generativo do herói**: uma grelha de pontos desenhada em `<canvas>`
  atrás do texto, que enche o herói e desvanece nas bordas — no topo e antes do
  rodapé, para o texto pequeno ficar sempre sobre papel limpo. Onde o nome está,
  os pontos abrem um vazio: o nome resolve-se no campo. Os pontos afastam-se e
  ganham tinta perto do cursor. É decoração: `aria-hidden`, não recebe cliques e
  fica vazio sem JavaScript, com movimento reduzido ou sem GSAP.
- **Ícones das stacks** (secção Stack e linhas de projeto): cada tecnologia é um
  `<span class="icon icon--nome">` com o nome acessível em `aria-label`. O
  desenho vem de uma máscara CSS com o SVG embutido em *data URI* — um `url()`
  para um ficheiro `.svg` externo não carrega a partir de `file://`. Herdam a cor
  do texto por `currentColor`, logo servem os dois temas sem filtros. Ao passar o
  rato aparece um pequeno popover com o nome (só em dispositivos com rato; no
  toque o `aria-label` continua a chegar aos leitores de ecrã). Os desenhos são do
  [simple-icons](https://simpleicons.org/); o C# usa o logo do .NET (o simple-icons
  já não traz C#) e o Guzzle, por não ter logotipo, fica como texto — o mesmo
  acontece com o WSL na stack. Nos contactos
  (email, WhatsApp e GitHub) é o mesmo desenho, mas decorativo
  (`aria-hidden`), porque o nome do canal já está no bloco; o popover lê-o de
  `data-tip`.
- **Cartão de partilha** (`og.png`): 1200×630 com a marca, o nome, o cargo e a
  stack, para o WhatsApp e o LinkedIn não partilharem só texto. É desenhado a
  partir de `logo.png`, com tipografia do sistema (o nome encolhe se não couber).
- **Barra persistente**: quando o cabeçalho sai de ecrã aparece uma barra fixa
  com o logo e atalhos para as quatro secções, assinalando aquela em que se está.
  Vive fora do wrapper do ScrollSmoother, por isso não é arrastada pelo conteúdo,
  e acompanha o scroll quadro a quadro — o smoother continua a mexer a página
  depois do último evento de scroll. É conforto, não dependência: sem JavaScript
  nunca aparece e o cabeçalho normal continua a fazer o trabalho.
- **Selo**: a linha do Tutorando (o projeto em produção) leva um selo
  "Online" que acompanha a inversão da linha.
- **Contacto** (`#contacto`): três canais — e-mail, WhatsApp e GitHub — um por
  coluna, com o ícone em cima, o endereço como título, o canal por baixo e a
  seta no canto. Cada bloco é um link, por isso mantém a inversão do hover e o
  popover do ícone; em ecrã estreito empilham (duas colunas deixariam um buraco,
  com três canais).
- **Rodapé**: só a marca — o mesmo logo do cabeçalho (invertido no tema escuro,
  tinta na impressão), com o nome no `alt`, já que não há texto ao lado — o ano
  (atualizado por JavaScript) e um regresso ao topo.
- **Percurso** (`#percurso`): abre com uma frase de entrada (os quatro anos de
  trabalho a transformar problemas em aplicações), depois experiência (DIGITAL HUB e ASAATtech), formação
  (Engenharia Informática) e formações, com os dados do CV — cada tema
  no seu bloco. As formações levam o logotipo de cada entidade (DataCamp, IBM,
  Anthropic, Microsoft, LinkedIn, freeCodeCamp, HackerRank) e os cursos em texto,
  para não dependerem do hover. As entradas
  são `div`, não `a`, por isso reaproveitam a grelha das listas mas ficam de fora
  da inversão do hover — só o que é clicável se comporta como link.
- **Impressão e PDF**: o bloco `@media print` desmonta o wrapper do
  ScrollSmoother (fixo e deslocado por *transform*: em papel sairia cortado ao
  primeiro ecrã), força papel branco e tinta preta mesmo no tema escuro, mostra
  já os blocos que o JavaScript ainda não revelou, troca os ícones pelo nome em
  texto (uma máscara CSS não imprime com os gráficos de fundo desligados) e
  junta o endereço a cada projeto, que em papel não se clica.
- **Movimento reduzido** (`prefers-reduced-motion: reduce`) desliga as animações
  e o scroll suavizado, ficando o scroll e o texto nativos.
- Os blocos aparecem quando entram no ecrã (IntersectionObserver), com um
  varrimento a cada scroll como rede de segurança: nenhum bloco pode ficar
  escondido se o observer falhar.
- O ano no rodapé é atualizado automaticamente por `assets/js/main.js`.
- `assets/vendor/` traz o GSAP 3.13.0 (núcleo e os três plugins) servido
  localmente: não há dependências externas nem pedidos de rede.
- Pré-visualização local: basta abrir `index.html` no navegador
  (não há módulos nem pedidos de rede para além dos ficheiros locais).
