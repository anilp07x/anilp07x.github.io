# Portfólio — Anilson Da Silva Pedro

Portfólio pessoal de Anilson Da Silva Pedro, Full-stack Developer em Luanda.
HTML, CSS e JavaScript puros, **sem build e sem npm**. O GSAP anima a entrada e o
scroll; o herói tem um campo de pontos desenhado em canvas.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (por exemplo `prtfolio`).
2. Envie estes ficheiros:

   ```bash
   git init -b main
   git add .
   git commit -m "Portfólio minimalista"
   git remote add origin https://github.com/anilp07x/prtfolio.git
   git push -u origin main
   ```

3. No repositório: **Settings → Pages → Source: Deploy from a branch →
   Branch: `main`, pasta `/ (root)` → Save**.
4. O site fica disponível em (pode levar um ou dois minutos):

   | Repositório | Endereço |
   |---|---|
   | `anilp07x.github.io` | `https://anilp07x.github.io/` |
   | qualquer outro nome | `https://anilp07x.github.io/<nome-do-repo>/` |

5. (Opcional) Domínio próprio: **Settings → Pages → Custom domain**.

### Antes de publicar: corrigir o endereço

O código usa `https://anilp07x.github.io/prtfolio/` como exemplo. Se o endereço
final for diferente, atualize:

- `index.html` — `rel="canonical"` e `og:url`
- `robots.txt` — linha `Sitemap:`
- `sitemap.xml` — `<loc>`

Tudo o resto usa caminhos relativos, por isso funciona em qualquer subpasta.

## Estrutura

```
.
├── index.html          conteúdo real (funciona mesmo sem JavaScript)
├── favicon.svg
├── .nojekyll           impede o Jekyll de processar o site
├── robots.txt
├── sitemap.xml
├── README.md
└── assets
    ├── css/style.css   tema claro/escuro automático, hairlines, tipografia do sistema
    ├── js/main.js      animações de entrada, scroll suavizado e âncoras internas
    └── vendor/          GSAP 3.13.0: núcleo + ScrollTrigger, ScrollSmoother, SplitText
```

## Atualizar conteúdo

| O quê | Onde |
|---|---|
| Projetos | `index.html`, secção `#projetos` (cada `<li>` liga ao repositório ou ao site em produção) |
| Stack | `index.html`, secção `#stack` |
| Contactos | `index.html`, secção `#contacto` |
| Cores | `assets/css/style.css`, bloco `:root` |

## Notas

- **Sem JavaScript** o conteúdo continua todo legível: as animações só escondem
  elementos depois de o GSAP carregar. O nome no herói é dividido em palavras
  para a animação; sem JavaScript fica texto simples (o texto lido por leitores
  de ecrã e copiado é sempre o mesmo).
- **Scroll suavizado** (ScrollSmoother): o conteúdo é deslocado por *transform*
  dentro de um wrapper fixo, mas a barra de scroll e a altura do documento
  continuam nativas. Em ecrãs táteis mantém-se o scroll nativo. Os links
  internos (`#projetos`, `#stack`, `#contacto` e voltar ao topo) são conduzidos
  pelo plugin, com o foco a seguir para o destino.
- **Nome do herói** dividido em palavras pelo SplitText, com alternativa própria
  caso o plugin não carregue; o `<h1>` conserva o `aria-label` completo e as
  palavras ficam decorativas para leitores de ecrã.
- **Campo generativo do herói**: uma grelha de pontos desenhada em `<canvas>`
  atrás do texto. Onde o nome está, os pontos abrem um vazio — o nome resolve-se
  no campo — e a faixa desvanece antes de chegar à ficha técnica e ao rodapé,
  para o texto pequeno ficar sempre sobre papel limpo. Os pontos afastam-se e
  ganham tinta perto do cursor. É decoração: `aria-hidden`, não recebe cliques e
  fica vazio sem JavaScript, com movimento reduzido ou sem GSAP.
- **Ficha técnica** do herói: quatro pares rótulo/valor (função, base, fuso e
  estado). O fuso mostra a hora de Luanda ao vivo, calculada por
  `Intl.DateTimeFormat` com `Africa/Luanda`; sem JavaScript fica o fuso fixo
  escrito no HTML, para nunca aparecer uma hora errada.
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
