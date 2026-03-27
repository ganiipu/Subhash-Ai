// ===== XP LIVE CLOCK =====
function updateClock() {
    const el = document.getElementById('xp-clock');
    if (!el) return;
    const now = new Date();
    let h = now.getHours(), m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    el.textContent = h + ':' + String(m).padStart(2, '0') + ' ' + ampm;
}
updateClock();
setInterval(updateClock, 1000);


// ===== TYPEWRITER =====
const words = ['Portfolio', 'Intelligence', 'Automation', 'Engineering'];
let wIdx = 0, cIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function typeStep() {
    const word = words[wIdx];
    if (!deleting) {
        typeEl.textContent = word.slice(0, ++cIdx);
        if (cIdx === word.length) { deleting = true; setTimeout(typeStep, 2000); return; }
    } else {
        typeEl.textContent = word.slice(0, --cIdx);
        if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
    }
    setTimeout(typeStep, deleting ? 55 : 100);
}
setTimeout(typeStep, 1000);

// ===== GSAP =====
gsap.registerPlugin(ScrollTrigger);

// ===== ANIMATED COUNTERS =====
function animCounter(el) {
    const target = parseInt(el.dataset.target);
    if (isNaN(target)) return;
    let cur = 0;
    const inc = target / 60;
    const t = setInterval(() => {
        cur = Math.min(cur + inc, target);
        el.textContent = Math.floor(cur);
        if (cur >= target) clearInterval(t);
    }, 18);
}

// Run hero counters with delay
setTimeout(() => {
    document.querySelectorAll('.xp-stat-num[data-target]').forEach(animCounter);
}, 1200);

// ===== SCROLL REVEAL VIA INTERSECTIONOBSERVER =====
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
                if (entry.target.dataset.target) animCounter(entry.target);
            }, (entry.target.dataset.delay || 0));
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

// ===== PROJECT DATA =====
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

// ===== RENDER CARDS =====
function renderGrid(dataArray, gridId) {
    const gridEl = document.getElementById(gridId);
    if (!gridEl) return;
    dataArray.forEach((p, i) => {
        const num = String(i + 1).padStart(2, '0');
        const prefix = p.type === 'llm' ? 'LLM' : 'SYS';
        const tags = p.tags.map(t => `<span class="ctag">${t}</span>`).join('');
        const el = document.createElement('div');
        el.className = 'sys-card' + (p.link ? ' island-card' : '');
        el.dataset.id = p.id;
        el.dataset.delay = i * 80;

        // Live app button — only for cards with a link
        const liveBtn = p.link ? `
            <a class="card-live-btn" href="${p.link}" target="_blank" rel="noopener"
               onclick="event.stopPropagation()">
                🌐 Launch App
            </a>
        ` : '';

        el.innerHTML = `
            <div class="card-img">
                <img src="${p.image}" alt="${p.title}">
            </div>
            <div class="card-body">
                <div class="card-meta">
                    <span class="card-num">${prefix}_${num}</span>
                    <span class="card-badge">${p.badge}</span>
                </div>
                <h3>${p.title}</h3>
                <p class="card-sub">${p.subtitle}</p>
                <div class="card-tags">${tags}</div>
                <div class="card-footer-row">
                    <div class="card-cta">
                        Open Case Study
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                    ${liveBtn}
                </div>
            </div>
        `;
        gridEl.appendChild(el);
        revealObs.observe(el);
    });
}

// ===== LLM PROJECTS DATA =====
const llmProjects = [
    {
        id: 7,
        type: 'llm',
        title: "Text Emotion & Sentiment Analysis",
        badge: "NLP CLASSIFICATION",
        subtitle: "Fine‑tuned a BERT model to understand text emotion and sentiment.",
        tags: ["BERT", "NLP", "Emotion AI"],
        story: "Fine‑tuned a BERT model to understand text emotion and sentiment, identifying feelings like love, joy, anger, sadness, and fear. The model interprets contextual meaning to detect emotion with high accuracy in natural language.",
        impact: [
            "Fine‑tuned BERT for multi‑class emotion classification",
            "Preprocessed and labeled custom emotion datasets",
            "Optimized model for balanced performance and interpretability"
        ],
        workflow: ["Social media emotion tracking, feedback analytics, wellness or relationship chatbots, and brand sentiment monitoring."],
        intervention: "Input: “I absolutely love how supportive my friends have been lately.”\nOutput: Emotion → Love ❤️",
        stack: "BERT → HuggingFace → Python",
        image: "assets/llm1.png",
        link: "https://sentimentalanalysis-f2gahq2gzxaypcaagpvpyr.streamlit.app/"
    },
    {
        id: 8,
        type: 'llm',
        title: "Fake News Detection",
        badge: "TEXT CLASSIFICATION",
        subtitle: "Fine‑tuned TinyBERT model to detect misinformation in news content.",
        tags: ["TinyBERT", "NLP", "Transformers"],
        story: "Fine‑tuned TinyBERT model and compared multiple compact transformer models to detect misinformation in news content. Focused on resource efficiency and inference speed.",
        impact: [
            "Benchmarked accuracy vs. latency across BERT variants",
            "Built balanced fake vs. real news datasets",
            "Optimized for mobile and real‑time moderation systems"
        ],
        workflow: ["News verification, social media moderation, cybersecurity content filters."],
        intervention: null,
        stack: "TinyBERT → PyTorch → Python",
        image: "assets/llm2.png",
        link: "https://fake-news-detector-ixryga3b2upsgtlajxcgmg.streamlit.app/"
    },
    {
        id: 9,
        type: 'llm',
        title: "Restaurant Query NER System",
        badge: "NAMED ENTITY RECOGNITION",
        subtitle: "Built an NER model by fine‑tuning DistilBERT to extract structured entities.",
        tags: ["DistilBERT", "NER", "NLP"],
        story: "Built a Named Entity Recognition (NER) model by fine‑tuning DistilBERT to extract structured entities (cuisine, price, location) from natural language queries.",
        impact: [
            "Custom tagging schema for restaurant‑related attributes",
            "Integrated with search pipelines for smarter query understanding",
            "Demonstrates domain adaptation for conversational AI"
        ],
        workflow: ["Food delivery platforms, chatbots, travel search assistants."],
        intervention: null,
        stack: "DistilBERT → HuggingFace",
        image: "assets/llm3.png"
    },
    {
        id: 10,
        type: 'llm',
        title: "Indian Food Image Classifier",
        badge: "COMPUTER VISION",
        subtitle: "Fine‑tuned Vision Transformer (ViT) on Indian food image datasets.",
        tags: ["ViT", "Vision", "Transformers"],
        story: "Fine‑tuned Vision Transformer (ViT) on Indian food image datasets to classify dishes accurately and assist visual‑based recommendation systems.",
        impact: [
            "Transfer learning on food‑specific image datasets",
            "Improved accuracy over CNN baselines",
            "Adaptable across visual quality inspection pipelines"
        ],
        workflow: ["Food recognition apps, nutrition analysis, hospitality tech."],
        intervention: null,
        stack: "Vision Transformer (ViT) → PyTorch",
        image: "assets/llm4.png"
    },
    {
        id: 11,
        type: 'llm',
        title: "Product Knowledge Assistant",
        badge: "LLM FINE-TUNING",
        subtitle: "Custom fine‑tuned the Phi‑2 LLM on product information and FAQs.",
        tags: ["Phi-2", "QA", "Conversational AI"],
        story: "Custom fine‑tuned the Phi‑2 LLM on product information, FAQs, and specification documents to answer user queries conversationally.",
        impact: [
            "Domain‑specific instruction tuning and prompt optimization",
            "Fine‑tuned for factual QA and reasoning on structured product data",
            "Built for scalable deployment in customer support systems"
        ],
        workflow: ["E‑commerce AI assistants, support chatbots, enterprise knowledge bases."],
        intervention: null,
        stack: "Phi-2 → HuggingFace",
        image: "assets/llm5.png"
    }
];

renderGrid(projects, 'systems-grid');
renderGrid(llmProjects, 'llms-grid');

// observe strip and metric cards
document.querySelectorAll('.strip-card, .metric-box').forEach(el => revealObs.observe(el));
document.querySelectorAll('.mb-num[data-target]').forEach(el => revealObs.observe(el));

// ===== MODAL =====
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');

function openModal(id) {
    const intId = parseInt(id);
    const p = projects.find(x => x.id === intId) || llmProjects.find(x => x.id === intId);
    if (!p) return;

    // Adapt Modal Headers Based on Project Type
    if (p.type === 'llm') {
        document.getElementById('modal-h-story').textContent = 'Description';
        document.getElementById('modal-h-impact').textContent = 'Highlights';
        document.getElementById('modal-h-workflow').textContent = 'Use Cases';
        
        if (p.intervention) {
            document.getElementById('modal-block-intervention').style.display = 'block';
            document.getElementById('modal-h-intervention').textContent = 'Example';
        } else {
            document.getElementById('modal-block-intervention').style.display = 'none';
        }
    } else {
        document.getElementById('modal-h-story').textContent = 'The Challenge';
        document.getElementById('modal-h-impact').textContent = 'Measured Impact';
        document.getElementById('modal-h-workflow').textContent = 'Data Pipeline';
        document.getElementById('modal-block-intervention').style.display = 'block';
        document.getElementById('modal-h-intervention').textContent = 'The Solution';
    }

    document.getElementById('modal-badge').textContent = p.badge;
    document.getElementById('modal-title').textContent = p.title;
    document.getElementById('modal-subtitle').textContent = p.subtitle;
    document.getElementById('modal-img').src = p.image;
    document.getElementById('modal-tags').innerHTML = p.tags.map(t => `<span>${t}</span>`).join('');
    document.getElementById('modal-story').textContent = p.story;
    
    // Live Link Logic
    const linkEl = document.getElementById('modal-live-link');
    if (p.link) {
        linkEl.href = p.link;
        linkEl.style.display = 'inline-block';
    } else {
        linkEl.style.display = 'none';
    }
    
    if (p.intervention) {
        document.getElementById('modal-intervention').innerText = p.intervention;
    }

    document.getElementById('modal-workflow').innerHTML = p.workflow.map((s, i) => `
        <div class="pipeline-step">
            <span class="step-n">${p.type === 'llm' ? '→' : (i+1)}</span>
            <span class="step-t">${s}</span>
        </div>
    `).join('');

    document.getElementById('modal-impact').innerHTML = p.impact.map(item => `
        <div class="impact-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
            <span>${item}</span>
        </div>
    `).join('');

    document.getElementById('modal-stack').textContent = p.stack;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

document.addEventListener('click', e => {
    const card = e.target.closest('.sys-card');
    if (card) openModal(card.dataset.id);
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== SMOOTH SCROLL =====
document.getElementById('explore-btn').addEventListener('click', () => {
    document.getElementById('systems').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.nav-links a[href^="#"], footer a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById('theme-toggle');
document.body.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
themeBtn.addEventListener('click', () => {
    const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});
