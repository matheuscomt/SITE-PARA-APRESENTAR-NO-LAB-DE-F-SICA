/* ============================================================
   AQUA THERM — script.js
   Interações: nav, partículas, reveal, contadores, tilt 3D,
   demonstração fade in/out + Chart.js + widget de zoom
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initProgressBar();
  initParticles();
  initReveal();
  initCounters();
  initTilt();
  initFadeDemo();
});

/* ============================================================
   NAVEGAÇÃO — scroll spy, menu mobile, fundo ao rolar
   ============================================================ */
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');

  // Adiciona fundo na nav ao rolar
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Toggle do menu mobile
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
    const expanded = burger.classList.contains('open');
    burger.setAttribute('aria-expanded', expanded);
    burger.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu');
  });

  // Fecha o menu ao clicar em um link
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll spy: destaca a seção ativa na nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = links.querySelectorAll('a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
}

/* ============================================================
   BARRA DE PROGRESSO — topo da página
   ============================================================ */
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* ============================================================
   PARTÍCULAS — bolhas de água flutuantes em canvas
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const COLORS = ['56,189,248', '59,130,246', '251,191,36'];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function build() {
    const count = Math.min(70, Math.floor(w / 22));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.4 + 0.08),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.15,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function tick(t) {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx + Math.sin(t / 2400 + p.phase) * 0.18;
      p.y += p.vy;
      // Reposiciona partículas que saem da tela
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      const glow = p.alpha * (0.65 + 0.35 * Math.sin(t / 900 + p.phase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${glow})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.color},0.8)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    requestAnimationFrame(tick);
  }

  resize();
  build();
  window.addEventListener('resize', () => { resize(); build(); });
  requestAnimationFrame(tick);
}

/* ============================================================
   REVEAL — animação de entrada ao rolar
   ============================================================ */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i % 4) * 90 + 'ms';
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ============================================================
   CONTADORES — animação de números (se houver data-count)
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => io.observe(c));

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 2000;
    const start = performance.now();

    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = target * eased;
      el.textContent = value.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
}

/* ============================================================
   TILT 3D — efeito de inclinação nos cards ao passar o mouse
   ============================================================ */
function initTilt() {
  const cards = document.querySelectorAll('.tilt');
  const MAX = 9;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        `perspective(800px) rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
    });
  });
}

/* ============================================================
   DEMONSTRAÇÃO INTERATIVA DE FADE IN / FADE OUT
   Mostra um LED acendendo suavemente e desligando suavemente,
   com um gráfico em tempo real da intensidade.
   ============================================================ */
function initFadeDemo() {
  const btn = document.getElementById('fadeDemoBtn');
  const led = document.getElementById('fadeLed');
  const path = document.getElementById('fadePath');

  if (!btn || !led) return;

  let running = false;
  let animationFrame;
  let startTime;
  const DURATION = 6000; // 6 segundos por ciclo completo

  btn.addEventListener('click', () => {
    // Se já está rodando, pausa
    if (running) {
      running = false;
      cancelAnimationFrame(animationFrame);
      btn.textContent = '▶ Iniciar demonstração';
      led.classList.remove('active');
      led.style.opacity = '0.15';
      led.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.2)';
      if (path) path.setAttribute('d', 'M 0 180 L 0 180');
      return;
    }

    // Inicia a demonstração
    running = true;
    btn.textContent = '⏸ Pausar demonstração';
    startTime = performance.now();
    let pathData = 'M 0 180';

    function animate(now) {
      if (!running) return;
      const elapsed = now - startTime;
      const progress = (elapsed % DURATION) / DURATION;

      // Define a intensidade conforme a fase:
      // 0-0.4: Fade In (0 → 1)
      // 0.4-0.8: Fade Out (1 → 0)
      // 0.8-1.0: Pausa (0)
      let intensity;
      if (progress < 0.4) {
        intensity = progress / 0.4;
        led.classList.add('active');
      } else if (progress < 0.8) {
        intensity = 1 - ((progress - 0.4) / 0.4);
        if (intensity < 0.1) led.classList.remove('active');
      } else {
        intensity = 0;
        led.classList.remove('active');
      }

      // Atualiza o LED
      led.style.opacity = 0.15 + intensity * 0.85;
      led.style.boxShadow = `0 0 ${20 + intensity * 100}px rgba(56, 189, 248, ${0.2 + intensity * 0.8})`;

      // Atualiza o gráfico em tempo real
      if (path) {
        const x = progress * 600;
        const y = 180 - intensity * 160;
        pathData += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
        path.setAttribute('d', pathData);
      }

      // Reinicia o ciclo
      if (elapsed >= DURATION) {
        startTime = now;
        pathData = 'M 0 180';
      }

      animationFrame = requestAnimationFrame(animate);
    }

    animationFrame = requestAnimationFrame(animate);
  });
}

/* ============================================================
   GRÁFICOS — Chart.js (renderização lazy ao entrar na tela)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chart === 'undefined') return;

  const CYAN = '#38bdf8';
  const BLUE = '#3b82f6';
  const SUN  = '#fbbf24';
  const MUTED = '#94a3b8';
  const GRID = 'rgba(56, 189, 248, 0.08)';

  Chart.defaults.font.family = "'Sora', sans-serif";
  Chart.defaults.color = MUTED;

  const tooltipStyle = {
    backgroundColor: 'rgba(5, 13, 26, 0.95)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderWidth: 1,
    titleColor: CYAN,
    bodyColor: '#e0f2fe',
    padding: 12,
    cornerRadius: 10,
    displayColors: false
  };

  // Função helper: renderiza o gráfico só quando entra na viewport
  const lazyChart = (id, buildFn) => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          buildFn(el);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
  };

  /* ---------- 1. LINHA: temperatura ao longo do dia ---------- */
  lazyChart('chartTemp', el => {
    new Chart(el, {
      type: 'line',
      data: {
        labels: ['6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h'],
        datasets: [
          {
            label: 'Com AquaTherm',
            data: [28, 29, 31, 33, 34, 34, 33, 32],
            borderColor: CYAN,
            backgroundColor: 'rgba(56,189,248,0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: '#050d1a',
            pointBorderColor: CYAN,
            pointBorderWidth: 2,
            pointRadius: 5
          },
          {
            label: 'Sem aquecimento',
            data: [24, 25, 26, 27, 28, 28, 27, 26],
            borderColor: MUTED,
            borderDash: [6, 6],
            fill: false,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1600, easing: 'easeOutQuart' },
        plugins: {
          legend: { labels: { usePointStyle: true, pointStyle: 'circle', padding: 18 } },
          tooltip: { ...tooltipStyle, callbacks: { label: c => ` ${c.parsed.y} °C` } }
        },
        scales: {
          y: {
            grid: { color: GRID },
            ticks: { callback: v => v + ' °C' },
            suggestedMin: 22,
            suggestedMax: 36
          },
          x: { grid: { display: false } }
        }
      }
    });
  });

  /* ---------- 2. ROSCA: matriz energética ---------- */
  lazyChart('chartEnergia', el => {
    new Chart(el, {
      type: 'doughnut',
      data: {
        labels: ['Energia solar térmica', 'Energia elétrica (apoio)', 'Perdas térmicas'],
        datasets: [{
          data: [70, 20, 10],
          backgroundColor: [CYAN, SUN, 'rgba(56,189,248,0.25)'],
          borderColor: '#0a1628',
          borderWidth: 4,
          hoverOffset: 14
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        animation: { animateRotate: true, duration: 1600 },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { usePointStyle: true, pointStyle: 'circle', padding: 18, font: { size: 11 } }
          },
          tooltip: { ...tooltipStyle, callbacks: { label: c => ` ${c.parsed}%` } }
        }
      }
    });
  });

  /* ---------- 3. BARRAS: economia estimada ---------- */
  lazyChart('chartEconomia', el => {
    new Chart(el, {
      type: 'bar',
      data: {
        labels: [
          'Coletor solar térmico',
          'Cobertura térmica noturna',
          'Automação com sensores',
          'Isolamento das tubulações'
        ],
        datasets: [{
          label: '% de economia estimada',
          data: [70, 40, 30, 15],
          backgroundColor: CYAN,
          borderRadius: 10,
          barThickness: 26
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1600, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: { ...tooltipStyle, callbacks: { label: c => ` até ${c.parsed.x}% de economia` } }
        },
        scales: {
          x: { grid: { color: GRID }, max: 80, ticks: { callback: v => v + '%' } },
          y: { grid: { display: false }, ticks: { font: { size: 11 } } }
        }
      }
    });
  });
});

/* ============================================================
   WIDGET DE ACESSIBILIDADE — zoom da interface
   Botões + / − e ícone ♿ (restaura 100%)
   ============================================================ */
(function () {
  const MIN = 80, MAX = 160, STEP = 10;
  let zoom = 100;

  // Recupera o zoom salvo no navegador (se existir)
  try {
    const saved = parseInt(localStorage.getItem('aquatherm-zoom'), 10);
    if (!isNaN(saved)) zoom = Math.min(MAX, Math.max(MIN, saved));
  } catch (e) { /* armazenamento indisponível */ }

  function applyZoom() {
    // Escala o site inteiro (equivale ao zoom do navegador)
    document.documentElement.style.zoom = zoom / 100;

    try { localStorage.setItem('aquatherm-zoom', zoom); } catch (e) {}

    const value = document.getElementById('zoomValue');
    if (value) value.textContent = zoom + '%';

    // Anuncia a mudança para leitores de tela
    const announce = document.getElementById('zoomAnnounce');
    if (announce) announce.textContent = 'Zoom da interface: ' + zoom + '%';

    // Desabilita botões nos limites
    const inBtn = document.getElementById('zoomIn');
    const outBtn = document.getElementById('zoomOut');
    if (inBtn) inBtn.disabled = zoom >= MAX;
    if (outBtn) outBtn.disabled = zoom <= MIN;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const inBtn = document.getElementById('zoomIn');
    const outBtn = document.getElementById('zoomOut');
    const resetBtn = document.getElementById('zoomReset');

    if (inBtn) inBtn.addEventListener('click', () => {
      zoom = Math.min(MAX, zoom + STEP);
      applyZoom();
    });
    if (outBtn) outBtn.addEventListener('click', () => {
      zoom = Math.max(MIN, zoom - STEP);
      applyZoom();
    });
    if (resetBtn) resetBtn.addEventListener('click', () => {
      zoom = 100;
      applyZoom();
    });

    applyZoom();
  });
})();
