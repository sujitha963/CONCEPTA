/* ==========================================================================
   SUJITHA J — PERSONAL PORTFOLIO INTERACTIVE LOGIC
   Features:
   1. Interactive HTML5 Canvas Constellation (AI · DATA · CLOUD · CODE)
   2. Project Architecture Flow Animation & Interactive Modals
   3. Navbar Scroll Blur & Active Section Tracking
   4. Copy to Clipboard Toasts & Print Resume Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initConstellation();
  initNavbar();
  initModals();
  initCopyButtons();
  initContactForm();
  initArchitectureInteractivity();
});

/* ==========================================================================
   1. INTERACTIVE CONSTELLATION CANVAS (AI · DATA · CLOUD · CODE)
   ========================================================================== */
function initConstellation() {
  const canvas = document.getElementById('constellation-canvas');
  const container = document.getElementById('constellation-container');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resizeCanvas() {
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Core labeled nodes
  const labeledNodes = [
    { label: 'AI', x: 0.3 * width, y: 0.3 * height, vx: 0.3, vy: 0.25, size: 8, color: '#9279B5' },
    { label: 'DATA', x: 0.7 * width, y: 0.32 * height, vx: -0.25, vy: 0.3, size: 8, color: '#9279B5' },
    { label: 'CLOUD', x: 0.65 * width, y: 0.7 * height, vx: 0.2, vy: -0.2, size: 8, color: '#9279B5' },
    { label: 'CODE', x: 0.28 * width, y: 0.68 * height, vx: -0.3, vy: -0.25, size: 8, color: '#9279B5' }
  ];

  // Background structural particles
  const bgParticles = [];
  const particleCount = 22;

  for (let i = 0; i < particleCount; i++) {
    bgParticles.push({
      x: Math.random() * (width || 400),
      y: Math.random() * (height || 400),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 1.5,
      color: '#C5B5DD'
    });
  }

  // Mouse interaction state
  const mouse = { x: -1000, y: -1000, radius: 120 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  container.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  let animationFrameId;

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const allNodes = [...labeledNodes, ...bgParticles];

    // Update positions & bounds check
    allNodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 30 || node.x > width - 30) node.vx *= -1;
      if (node.y < 30 || node.y > height - 30) node.vy *= -1;

      // Mouse attraction
      const dx = mouse.x - node.x;
      const dy = mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        node.x += (dx / dist) * force * 1.2;
        node.y += (dy / dist) * force * 1.2;
      }
    });

    // Draw connecting lines
    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        const p1 = allNodes[i];
        const p2 = allNodes[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = 130;
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(197, 181, 221, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Draw background particles
    bgParticles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(197, 181, 221, 0.7)';
      ctx.fill();
    });

    // Draw labeled nodes with glowing aura and text labels
    labeledNodes.forEach(n => {
      // Glow aura
      const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 2.5);
      gradient.addColorStop(0, 'rgba(146, 121, 181, 0.4)');
      gradient.addColorStop(1, 'rgba(146, 121, 181, 0)');
      
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Node core
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
      ctx.fillStyle = '#9279B5';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text Tag
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#26232B';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, n.x, n.y - 14);
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. NAVBAR SCROLL & ACTIVE SECTION INDICATOR
   ========================================================================== */
function initNavbar() {
  const navbarWrapper = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Scrolled class toggle
    if (window.scrollY > 30) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });
  }
}

/* ==========================================================================
   3. MODALS (RESUME & PROJECT DETAILS)
   ========================================================================== */
function initModals() {
  // Resume Modal
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');
  const copyModalEmailBtn = document.getElementById('copy-email-modal-btn');

  if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeResumeBtn && resumeModal) {
    closeResumeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (copyModalEmailBtn) {
    copyModalEmailBtn.addEventListener('click', () => {
      copyToClipboard('sujitha061906@gmail.com', 'Email copied to clipboard!');
    });
  }

  // Project Details Modal
  const projectModal = document.getElementById('project-modal');
  const closeProjectBtn = document.getElementById('close-project-modal');
  const projectDetailBtns = document.querySelectorAll('.open-project-modal');

  const projectData = {
    'serverless-app': {
      title: 'Serverless Feedback App (Cloud Native)',
      badge: 'Cloud Native',
      content: `
        <div class="project-modal-detail">
          <p class="project-summary">
            <strong>Serverless Feedback App</strong> is a high-performance, cloud-native feedback collection system engineered with AWS serverless services. Designed to deliver SaaS-grade scalability and robust operational insight.
          </p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-deep);">KEY HIGHLIGHTS & ARCHITECTURE</h4>
          <ul style="padding-left: 1.25rem; line-height: 1.7; color: var(--text-secondary);">
            <li><strong>150ms P99 Latency:</strong> Optimized cold starts and database queries to achieve consistent sub-150ms tail latency response times under peak load.</li>
            <li><strong>AWS Cloud-Native Services:</strong> Built using serverless compute and fully managed cloud infrastructure.</li>
            <li><strong>Automated Deployments:</strong> Infrastructure as Code (IaC) and automated CI/CD deployment pipelines.</li>
            <li><strong>Deep Observability:</strong> Full request tracing and real-time operational monitoring using <strong>AWS CloudWatch</strong> and <strong>AWS X-Ray</strong>.</li>
            <li><strong>Production-Ready Standard:</strong> Implements rate limiting, secure payload validation, and robust fault-tolerance mechanisms.</li>
          </ul>

          <div style="margin-top: 2rem; display: flex; gap: 1rem;">
            <a href="https://github.com/sujitha963" target="_blank" class="btn btn-primary btn-sm">VIEW GITHUB REPOSITORY ↗</a>
          </div>
        </div>
      `
    },
    'cloud-portfolio': {
      title: 'AWS Cloud Portfolio',
      badge: 'Infrastructure',
      content: `
        <div class="project-modal-detail">
          <p class="project-summary">
            A comprehensive cloud infrastructure project demonstrating practical deployment, security hardening, and hosting on Amazon Web Services (AWS).
          </p>

          <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-deep);">KEY HIGHLIGHTS</h4>
          <ul style="padding-left: 1.25rem; line-height: 1.7; color: var(--text-secondary);">
            <li>Demonstrates core AWS cloud architecture concepts and best practices.</li>
            <li>Configured secure bucket policies, SSL/TLS certificates, and static content distribution.</li>
            <li>Hands-on integration with cloud monitoring and resource management tools.</li>
          </ul>

          <div style="margin-top: 2rem; display: flex; gap: 1rem;">
            <a href="https://github.com/sujitha963" target="_blank" class="btn btn-primary btn-sm">VIEW GITHUB REPOSITORY ↗</a>
          </div>
        </div>
      `
    }
  };

  projectDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      const data = projectData[projectKey];

      if (data && projectModal) {
        document.getElementById('modal-project-title').textContent = data.title;
        document.getElementById('modal-project-badge').textContent = data.badge;
        document.getElementById('modal-project-body').innerHTML = data.content;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeProjectBtn && projectModal) {
    closeProjectBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }
}

/* ==========================================================================
   4. COPY TO CLIPBOARD & TOAST SYSTEM
   ========================================================================== */
function initCopyButtons() {
  const copyElements = document.querySelectorAll('[data-copy]');
  copyElements.forEach(el => {
    const copyBtn = el.querySelector('.btn-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const textToCopy = el.getAttribute('data-copy');
        copyToClipboard(textToCopy, `Copied "${textToCopy}" to clipboard!`);
      });
    }
  });
}

function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(message);
  }).catch(() => {
    showToast('Failed to copy text.');
  });
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==========================================================================
   5. CONTACT FORM INTERACTIVITY
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thank you! Your message has been sent successfully.');
    form.reset();
  });
}

/* ==========================================================================
   6. ARCHITECTURE DIAGRAM FLOW INTERACTIVITY
   ========================================================================== */
function initArchitectureInteractivity() {
  const archNodes = document.querySelectorAll('.arch-node');
  archNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const nodeName = node.getAttribute('data-node');
      let statusText = '';
      if (nodeName === 'USER') statusText = 'Client HTTP Request Sent';
      if (nodeName === 'API') statusText = 'API Gateway Router — 150ms P99';
      if (nodeName === 'SERVERLESS') statusText = 'AWS Serverless Lambda Function Executed';
      if (nodeName === 'DATABASE') statusText = 'Database Record Stored';
      if (nodeName === 'OBSERVABILITY') statusText = 'CloudWatch Logs & X-Ray Trace Active';

      const statusEl = document.querySelector('.arch-status');
      if (statusEl && statusText) {
        statusEl.textContent = statusText;
        statusEl.style.color = '#9279B5';
      }
    });

    node.addEventListener('mouseleave', () => {
      const statusEl = document.querySelector('.arch-status');
      if (statusEl) {
        statusEl.textContent = 'LIVE SIMULATION';
        statusEl.style.color = 'var(--text-secondary)';
      }
    });
  });
}
