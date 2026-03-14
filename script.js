/* === Mycelium network canvas animation === */
(function () {
  'use strict';

  /* ── Canvas setup ── */
  const canvas = document.getElementById('mycelium-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLOR = 'rgba(61, 220, 132, 1)';
  const NODE_COUNT = 55;
  const MAX_DIST = 160;
  const SPEED = 0.25;

  let nodes = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createNode() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 1.5 + 0.5,
    };
  }

  function init() {
    resize();
    nodes = Array.from({ length: NODE_COUNT }, createNode);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Draw edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = 1 - dist / MAX_DIST;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(61, 220, 132, ${alpha * 0.5})`;
          ctx.lineWidth = alpha * 0.8;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach((n) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = COLOR;
      ctx.fill();
    });
  }

  function update() {
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
})();

/* ── Email form ── */
(function () {
  'use strict';

  const form = document.getElementById('signup-form');
  const msgEl = document.getElementById('form-message');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button[type="submit"]');
    const email = emailInput.value.trim();

    if (!email) {
      showMessage('Please enter your email address.', 'error');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Joining…';

    /* In a real deployment this would POST to a backend / mailing-list API.
       For the static page we just simulate a short async operation. */
    setTimeout(function () {
      showMessage('You\'re on the list — we\'ll be in touch! 🍄', 'success');
      emailInput.value = '';
      btn.disabled = false;
      btn.textContent = 'Notify me';
    }, 800);
  });

  function showMessage(text, type) {
    msgEl.textContent = text;
    msgEl.className = 'form-message ' + type;
  }
})();
