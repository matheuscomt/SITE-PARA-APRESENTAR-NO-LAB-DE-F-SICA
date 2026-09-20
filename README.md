# 🌊 AQUA THERM — Projeto Integrador CEP

Site desenvolvido para o **Projeto Integrador** do Colégio Estadual do Paraná (CEP), documentando a evolução de um sistema de aquecimento sustentável para a piscina da escola e a aplicação prática dos conceitos de **Fade In** e **Fade Out**.

> *"Do aquecimento sustentável da piscina à aplicação prática dos conceitos de Fade In e Fade Out, integrando Programação, Robótica e Física."*

**Integrantes:** Matheus V., Luisa A., Yasmin M., João P., Uriel H. • **2026**

---

## 📁 Estrutura do projeto

- `index.html` — Estrutura semântica, conteúdo e 7 diagramas SVG ilustrativos.
- `style.css` — Estilização completa, responsividade, animações e tipografia ampliada.
- `script.js` — Lógica de interatividade, demonstração de Fade In/Out, gráficos e acessibilidade.

---

## 🚀 Como rodar

1. Abra o arquivo `index.html` diretamente no navegador (não requer servidor local).
2. É necessária conexão com a internet para carregar as fontes (Google Fonts) e a biblioteca de gráficos (Chart.js via CDN).

### Publicar no GitHub Pages

Suba os arquivos para o repositório e ative em **Settings → Pages → branch `main` + `/ (root)`**.

---

## 🎨 Design

| Item | Escolha |
| --- | --- |
| Tema | Escuro, futurista e minimalista |
| Paleta | Azul profundo `#050d1a`, ciano `#38bdf8`, azul elétrico `#3b82f6`, âmbar solar `#fbbf24` |
| Tipografia | Unbounded (títulos) + Sora (texto) — Google Fonts |
| Tamanho base | 1.15rem (ampliado para projeção em laboratório) |

---

## 🖼️ Diagramas SVG incluídos

1. Sistema completo da piscina (coletores, tubulação, bomba, sensor, Arduino)
2. Ciclo de funcionamento em 5 etapas
3. Comparação Liga/Desliga vs Fade In/Out
4. Estrutura do site (HTML + CSS + JS)
5. Esquema do circuito (sensores, Arduino, LED, relé, bomba)
6. Conceitos físicos (termodinâmica, óptica, eletricidade, eficiência)
7. Integração das três áreas

---

## ✨ Efeitos e interações

- Partículas flutuantes em `<canvas>`
- Cards com tilt 3D que seguem o mouse
- Reveal progressivo das seções ao rolar
- Barra de progresso de leitura no topo
- Nav com scroll-spy e menu mobile animado
- **Demonstração interativa de Fade In/Out** com LED animado e gráfico em tempo real
- Zoom suave nas imagens SVG
- Widget de zoom acessível (80% a 160%)
- Respeita `prefers-reduced-motion`

---

## 🧩 Seções do site

1. **Capa** — Tema, escola e integrantes
2. **Integrantes** — Cards com nome e função
3. **O Cenário Inicial** — Problema da piscina e proposta (com diagrama)
4. **Como Funciona** — Timeline do ciclo de aquecimento
5. **A Evolução** — Transição 1º → 2º trimestre, introdução do Fade
6. **Fade In e Fade Out** — Conceito, demonstração interativa e comparação visual
7. **Programação** — O que foi desenvolvido e aprendido
8. **Robótica** — Aplicação prática com sensores e circuito
9. **Física e Tecnociência** — Conceitos físicos aplicados
10. **Integração** — Como as três áreas se conectam
11. **Principais Aprendizados** — Tags visuais
12. **Conclusão** — Síntese do projeto

---

## ♿ Acessibilidade

- Contraste AA/AAA entre texto e fundo
- Textos alternativos em todas as imagens e SVGs
- Navegação completa por teclado
- Fontes legíveis (Sora, mínimo 1.15rem)
- Estrutura HTML semântica
- Respeito à preferência `prefers-reduced-motion`
- Menu mobile acessível com `aria-expanded`
- Widget de zoom integrado

---

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 puro (variáveis, grid, animações, backdrop-filter)
- JavaScript vanilla (IntersectionObserver, Canvas API, DOM)
- [Chart.js 4](https://www.chartjs.org/) via CDN
- Google Fonts (Unbounded + Sora)
- SVG inline para ilustrações técnicas

---

**Desenvolvido com HTML, CSS, JavaScript e muita curiosidade.** 🚀
