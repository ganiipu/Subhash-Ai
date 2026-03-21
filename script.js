/* ===========================================
   PORTFOLIO — CLEAN SCRIPT
   =========================================== */

// ─── Cursor Glow (smooth lerp follow) ──────
const cursorGlow = document.getElementById('cursor-glow');
let mx = 0, my = 0, gx = 0, gy = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursorGlow.style.opacity = '1'; });

function animateCursor() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    cursorGlow.style.left = gx + 'px';
    cursorGlow.style.top = gy + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// ─── Neural Canvas ─────────────────────────
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
const NODE_COUNT = 60;
const CONN_DIST = 140;
let nodes = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Node {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.22;
        this.vy = (Math.random() - 0.5) * 0.22;
        this.r = Math.random() * 1.3 + 0.4;
        this.alpha = Math.random() * 0.35 + 0.1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.fillStyle = `rgba(99,102,241,${this.alpha * 0.45})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}

resizeCanvas();
for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());
window.addEventListener('resize', resizeCanvas);

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONN_DIST) {
                ctx.strokeStyle = `rgba(99,102,241,${0.04 * (1 - dist / CONN_DIST)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(drawCanvas);
}
drawCanvas();

// ─── Typewriter ────────────────────────────
const words = ['Portfolio', 'Intelligence', 'Automation', 'Engineering'];
const typeEl = document.getElementById('typewriter');
let wordIdx = 0, charIdx = 0, deleting = false;

function typeStep() {
    const word = words[wordIdx];
    if (!deleting) {
        typeEl.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) {
            deleting = true;
            setTimeout(typeStep, 2200);
            return;
        }
    } else {
        typeEl.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) {
            deleting = false;
            wordIdx = (wordIdx + 1) % words.length;
        }
    }
    setTimeout(typeStep, deleting ? 50 : 95);
}
setTimeout(typeStep, 1200);

// ─── GSAP & ScrollTrigger ──────────────────
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.section-title').forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        y: 35, opacity: 0, duration: 0.8, ease: 'power3.out'
    });
});

document.querySelectorAll('.section-tag').forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        x: -20, opacity: 0, duration: 0.6, ease: 'power2.out'
    });
});

// ─── Animated Counters (eased) ─────────────
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    if (isNaN(target)) return;
    const duration = 1200;
    const start = performance.now();
    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(easeOutCubic(progress) * target);
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

// Run hero counters
setTimeout(() => {
    document.querySelectorAll('.stat__value[data-target]').forEach(animateCounter);
}, 1000);

// ─── Scroll Reveal (IntersectionObserver) ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay) || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
                if (entry.target.dataset.target) animateCounter(entry.target);
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

// ─── Project Data ──────────────────────────
const projects = [
    {
        id: 1,
        title: "The Autonomous Talent Scout",
        badge: "HR AUTOMATION",
        subtitle: "Time-to-interview dropped from 6 days to 6 minutes.",
        tags: ["n8n", "GPT-4", "Slack", "ATS"],
        story: "A global hiring team was drowning in 500+ resumes per week. Top-tier talent was slipping through the cracks because humans couldn't read fast enough — by the time a recruiter opened a PDF, the candidate had already signed with a competitor.",
        intervention: "I designed a Cognitive Pipeline using n8n and LLMs to act as a 24/7 Digital Recruiter. This intelligent layer scores candidates against true job requirements — not just keywords — and automatically promotes top-tier talent into a fast-lane.",
        workflow: [
            "n8n intercepts incoming applications from ATS/email pipelines.",
            "Documents are parsed and sent to GPT-4 to score career trajectory vs. job requirements.",
            "Top 5% candidates are instantly pushed into a 'Fast Lane' with Slack alerts.",
            "Automated, personalized initial outreach emails are dispatched immediately."
        ],
        impact: [
            "85% of manual screening effort eliminated.",
            "Time-to-interview reduced from 6 days to 6 minutes.",
            "Zero high-value Candidate Decay."
        ],
        stack: "n8n → OpenAI (GPT-4) → Slack API → Greenhouse/ATS",
        image: "assets/workflow1.png"
    },
    {
        id: 2,
        title: "The Digital Oracle",
        badge: "DATA INTELLIGENCE",
        subtitle: "Executive reporting time slashed from 48 hours to under 10 seconds.",
        tags: ["n8n", "SQL", "LLM", "Slack"],
        story: "Executives spent up to 48 hours waiting for standard SQL reports. Vital business data was a locked vault, accessible only to specialized data scientists, delaying critical strategic decisions.",
        intervention: "I built a Conversational Intelligence Bridge via Slack. Executives now simply 'chat' with their datasets in plain English. n8n interprets intent, executes query logic, and renders actionable insights instantly.",
        workflow: [
            "User asks a natural language question via a dedicated Slack channel.",
            "n8n routes the query to an LLM calibrated for text-to-SQL translation.",
            "The validated SQL query runs against the read-only data warehouse.",
            "Results are returned as a concise, actionable summary in Slack."
        ],
        impact: [
            "Response Time: 48 hours → < 10 seconds.",
            "20+ hours per week reclaimed for Data Engineering.",
            "Shifted company culture from 'Guessing' to 'Knowing'."
        ],
        stack: "n8n → OpenAI → PostgreSQL/Snowflake → Slack",
        image: "assets/workflow2.png"
    },
    {
        id: 3,
        title: "The Infinite Support Agent",
        badge: "RAG SYSTEM",
        subtitle: "Deflected 70% of repetitive tickets with human-like precision.",
        tags: ["n8n", "RAG", "Pinecone", "Zendesk"],
        story: "The support team was trapped in a hamster wheel of repetitive queries — high agent burnout and frustrated customers who felt they were communicating with unhelpful, rigid rule-based bots.",
        intervention: "I deployed an Autonomous Knowledge Weaver. Using n8n to stitch together Notion docs, internal wikis, and ticket history, I built a RAG system that actually resolves problems, not just deflects them.",
        workflow: [
            "New support ticket triggers an n8n webhook.",
            "Query is vectorized and cross-referenced against the Knowledge Base (Pinecone).",
            "Contextually rich prompt is fed to the LLM to generate an empathetic response.",
            "If confidence > 90%, auto-sends; otherwise, drafted for human review."
        ],
        impact: [
            "70% Autonomy Rate on Tier-1 support tickets.",
            "Customer Satisfaction (CSAT) peaked at 98%.",
            "Average response speed dropped to under 30 seconds."
        ],
        stack: "n8n → Pinecone/Qdrant → Zendesk/Intercom → LLM",
        image: "assets/workflow3.png"
    },
    {
        id: 4,
        title: "The Frictionless Finance Engine",
        badge: "OCR & FINANCE",
        subtitle: "Achieved 100% data integrity and zero late penalties.",
        tags: ["n8n", "OCR", "ERP", "Finance"],
        story: "A single typo in a $100k invoice can trigger weeks of reconciliation chaos. The AP team was manually processing hundreds of invoices, taking 20+ minutes of staring and typing per document.",
        intervention: "I engineered a Zero-Touch Financial Flow. Using n8n and advanced OCR, I created an automated assembly line that identifies, extracts, and stages payments without human error.",
        workflow: [
            "Vendor emails with PDF attachments are monitored and intercepted by n8n.",
            "PDFs are processed via OCR (AWS Textract / Google Document AI).",
            "Extracted line items, totals, and PO numbers are validated against business rules.",
            "Clean data is pushed directly into the ERP (NetSuite/QuickBooks) for approval."
        ],
        impact: [
            "Processing Speed: 20 min → 30 seconds per invoice.",
            "100% Data Integrity — zero costly typos.",
            "Zero late payment penalties since launch."
        ],
        stack: "n8n → AWS Textract → Google Doc AI → ERP APIs",
        image: "assets/workflow4.png"
    },
    {
        id: 5,
        title: "The Real-Time Intelligence Hub",
        badge: "PULSE DASHBOARD",
        subtitle: "Replaced stale Friday PDFs with living, real-time metrics.",
        tags: ["n8n", "Notion", "CRM", "Metrics"],
        story: "Leadership was trying to steer a global ship using yesterday's weather. Status reports were manually compiled Frankensteins of spreadsheets and PDFs that were stale by Friday morning.",
        intervention: "I crafted a Dynamic Synchronization Layer. Instead of static files, I built a 'Living Dashboard' that auto-pulses across all operational tools to provide a single, real-time source of truth.",
        workflow: [
            "Scheduled n8n workflows poll CRM, Marketing, and Financial APIs every hour.",
            "Data is cleaned, normalized, and mapped to standard KPIs.",
            "The unified dataset updates Notion databases or Looker/Tableau.",
            "Significant anomalies trigger immediate Slack alerts to department heads."
        ],
        impact: [
            "Eliminated 100% of manual weekly reporting.",
            "Real-time decision velocity for the executive team.",
            "Unified, transparent vision across isolated departments."
        ],
        stack: "n8n → Notion API → Salesforce/HubSpot → Slack",
        image: "assets/workflow5.png"
    },
    {
        id: 6,
        title: "The Proactive Security Sentinel",
        badge: "INFOSEC AUTOMATION",
        subtitle: "Automated threat isolation responding in < 1 second.",
        tags: ["n8n", "Security", "DevSecOps", "SIEM"],
        story: "Security incidents required humans to manually cross-reference logs across three platforms before action. During an active threat, those lost minutes could mean the difference between a blocked IP and a data breach.",
        intervention: "I built a high-speed automated incident response layer using n8n to connect SIEM alerts directly to firewall actions — creating an autonomous immune system for the infrastructure.",
        workflow: [
            "SIEM (Datadog/Splunk) detects anomalous behavior and fires a webhook to n8n.",
            "n8n instantly enriches the IP data using external threat intelligence APIs.",
            "If the threat score breaches a strict threshold, n8n calls Cloudflare/AWS WAF to block.",
            "A comprehensive incident report is generated and logged in Jira."
        ],
        impact: [
            "MTTR dropped from 15 minutes to < 1 second.",
            "Thousands of probes blocked without alert fatigue.",
            "Security engineers now focus purely on advanced threat hunting."
        ],
        stack: "n8n → SIEM APIs → Cloudflare/AWS WAF → Jira",
        image: "assets/workflow6.png"
    }
];

// ─── Render Project Cards ──────────────────
const grid = document.getElementById('systems-grid');

projects.forEach((project, index) => {
    const num = String(index + 1).padStart(2, '0');
    const tagHTML = project.tags.map(t => `<span class="ctag">${t}</span>`).join('');

    const card = document.createElement('article');
    card.className = 'sys-card';
    card.dataset.id = project.id;
    card.dataset.delay = index * 100;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View case study: ${project.title}`);

    card.innerHTML = `
        <div class="card-img">
            <img src="${project.image}" alt="${project.title} workflow visualization" loading="lazy">
        </div>
        <div class="card-body">
            <div class="card-meta">
                <span class="card-num">SYS_${num}</span>
                <span class="card-badge">${project.badge}</span>
            </div>
            <h3>${project.title}</h3>
            <p class="card-sub">${project.subtitle}</p>
            <div class="card-tags">${tagHTML}</div>
            <div class="card-cta">
                Open Case Study
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
        </div>
    `;

    grid.appendChild(card);
    revealObserver.observe(card);
});

// Observe capability and metric cards
document.querySelectorAll('.cap-card, .metric-card').forEach(el => revealObserver.observe(el));
document.querySelectorAll('.metric-card__value[data-target]').forEach(el => revealObserver.observe(el));

// ─── 3D Card Tilt on Hover ─────────────────
grid.addEventListener('mousemove', e => {
    const card = e.target.closest('.sys-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3;
    card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

document.querySelectorAll('.sys-card').forEach(card => {
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ─── Modal Logic ───────────────────────────
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');

function openModal(id) {
    const p = projects.find(x => x.id === parseInt(id));
    if (!p) return;

    document.getElementById('modal-badge').textContent = p.badge;
    document.getElementById('modal-title').textContent = p.title;
    document.getElementById('modal-subtitle').textContent = p.subtitle;
    document.getElementById('modal-img').src = p.image;
    document.getElementById('modal-img').alt = p.title + ' workflow';

    document.getElementById('modal-tags').innerHTML =
        p.tags.map(t => `<span>${t}</span>`).join('');

    document.getElementById('modal-story').textContent = p.story;
    document.getElementById('modal-intervention').textContent = p.intervention;

    document.getElementById('modal-workflow').innerHTML = p.workflow.map((step, i) => `
        <div class="pipeline-step">
            <span class="step-n">${i + 1}</span>
            <span class="step-t">${step}</span>
        </div>
    `).join('');

    document.getElementById('modal-impact').innerHTML = p.impact.map(item => `
        <div class="impact-pill">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <path d="M22 4L12 14.01l-3-3"/>
            </svg>
            <span>${item}</span>
        </div>
    `).join('');

    document.getElementById('modal-stack').textContent = p.stack;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

grid.addEventListener('click', e => {
    const card = e.target.closest('.sys-card');
    if (card) openModal(card.dataset.id);
});

grid.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.sys-card');
        if (card) { e.preventDefault(); openModal(card.dataset.id); }
    }
});

modalClose.addEventListener('click', closeModal);
modal.querySelector('.modal__backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ─── Smooth Scroll ─────────────────────────
document.getElementById('explore-btn').addEventListener('click', () => {
    document.getElementById('systems').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.nav__links a[href^="#"], .footer__links a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ─── Theme Toggle ──────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
});

// ─── Initialize Lucide Icons ───────────────
function initLucide(retries) {
    retries = retries || 30;
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else if (retries > 0) {
        setTimeout(function() { initLucide(retries - 1); }, 200);
    }
}

initLucide();
window.addEventListener('load', function() { initLucide(); });
