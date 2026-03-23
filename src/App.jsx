import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  bg: "#F9F9F8",
  bgAlt: "#F1F1F0",
  surface: "rgba(255, 255, 255, 0.7)",
  surfaceSolid: "#FFFFFF",
  border: "rgba(226, 232, 240, 0.4)",
  text: "#000000",
  textMuted: "#666666",
  textDim: "#A3A3A3",
  accent: "#171717",
  highlight: "#0066FF",
  slate: "#0F172A",
  green: "#0070F3",
  red: "#E00",
  codeBg: "#0A0A0A",
  codeText: "#EDEDED",
};

// Inline SVG Icons
const Icons = {
  System: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
  Growth: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  Tech: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  Play: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
  Sprints: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>,
  List: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
  Board: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Checkbox: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>,
  Calendar: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  High: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="5 12 12 5 19 12"></polyline></svg>,
  Medium: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><line x1="5" y1="6" x2="19" y2="6"></line></svg>,
  Low: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>,
  Save: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>,
  Send: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
  Home: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  ArrowRight: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
  Github: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
  Book: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
};

const canvasData = [
  { id: "partners", type: "infra", title: "Key Partners", col: "1/3", row: "1/3", items: [{text: "SHRBS (Sindicato Hoteleiro)"}, {text: "Gateways de Pagamento"}, {text: "SEBRAE / SENAC"}] },
  { id: "activities", type: "infra", title: "Key Activities", col: "3/5", row: "1/2", items: [{text: "Onboarding & Curadoria"}, {text: "Motor de Pagamento"}] },
  { id: "resources", type: "infra", title: "Key Resources", col: "3/5", row: "2/3", items: [{text: "API Laravel + Next.js"}, {text: "Base Validada"}] },
  { id: "vp", type: "core", title: "Value Proposition", col: "5/7", row: "1/3", items: [{id: "vp_agile", text: "Agilidade (Match 60s)"}, {text: "Custo Fixo → Variável"}, {text: "Selo ServLink Verificado"}] },
  { id: "relations", type: "market", title: "Customer Relationships", col: "7/9", row: "1/2", items: [{text: "Self-Service Assistido"}, {text: "Comunidade Hiperlocal"}] },
  { id: "channels", type: "market", title: "Channels", col: "7/9", row: "2/3", items: [{text: "Web App Mobile-First"}, {text: "Marketing Integrado"}] },
  { id: "segments", type: "market", title: "Customer Segments", col: "9/11", row: "1/3", items: [{id: "seg_b2b", text: "Estabelecimentos B2B"}, {text: "Profissionais A & B"}] },
];

const narrativeSteps = [
  { id: "step1", time: "18:00", event: "Casa Lotada", desc: "100% de ocupação esperada no Réveillon em Jurerê Internacional.", status: "normal" },
  { id: "jurere", time: "18:45", event: "O Choque", desc: "Chef descobre que 2 garçons e 1 auxiliar não apareceram. Nenhum aviso prévio.", status: "critical" },
  { id: "step3", time: "19:00", event: "Caos Oculto", desc: "Grupos de WhatsApp frenéticos. 'Alguém tem indicação livre?'. Ninguém responde.", status: "warning" },
  { id: "step4", time: "20:30", event: "Impacto Visível", desc: "Gargalo no salão. Pratos atrasam 45min. Clientes premium insatisfeitos e reviews negativos.", status: "critical" },
  { id: "step5", time: "01:00", event: "Fechamento", desc: "Receita sub-otimizada em 25% na noite mais importante devido ao gargalo operacional.", status: "loss" },
];

export default function ServLinkBackOffice() {
  const [activeMain, setActiveMain] = useState("home");
  const [activeSub, setActiveSub] = useState(null);
  const [globalHover, setGlobalHover] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const gridRef = useRef(null);

  // States for SCRUM Board
  const [tasks, setTasks] = useState([
    { id: "SL-01", title: "Refinar Proposta de Valor no BMC", desc: "Ajustar o texto para focar na métrica de 60s.", status: "Done", priority: "High", points: 3, sprint: "Sprint 01", assignees: ["MC"], deadline: "21 Mar", subtasks: {done: 3, total: 3} },
    { id: "SL-02", title: "Estruturar Storytelling Jurerê", desc: "Montar narrativa do Réveillon e impacto do No-Show.", status: "In Progress", priority: "Medium", points: 5, sprint: "Sprint 01", assignees: ["MC"], deadline: "23 Mar", subtasks: {done: 1, total: 4} },
    { id: "SL-03", title: "Arquitetura Next.js/Laravel", desc: "Criar o arquivo boilerplate yaml com a stack. Configurar CI/CD básico.", status: "Backlog", priority: "Low", points: 8, sprint: "Sprint 01", assignees: ["EQ"], deadline: "28 Mar", subtasks: {done: 0, total: 5} }
  ]);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sprintView, setSprintView] = useState("board");
  const [diferencialText, setDiferencialText] = useState("Digite aqui");
  const [diferencialTitle, setDiferencialTitle] = useState("Ideias");
  const [noteStatus, setNoteStatus] = useState("[Rascunho Automático]");

  const handleSaveNote = () => {
    setNoteStatus("Salvando...");
    setTimeout(() => setNoteStatus("Salvo em Segurança"), 500);
    setTimeout(() => setNoteStatus("[Rascunho Automático]"), 3000);
  };

  const handleSendToSprints = () => {
    const newId = "SL-" + String(tasks.length + 1).padStart(2, '0');
    setTasks([...tasks, {
      id: newId,
      title: diferencialTitle || "Ideia Operacional Sem Título",
      desc: diferencialText,
      status: "Backlog",
      priority: "Medium",
      points: 2,
      sprint: "Sprint 01",
      assignees: ["MC"],
      deadline: "TBD",
    }]);
    setNoteStatus("✅ Task Injetada em Backlog!");
    setTimeout(() => setNoteStatus("[Rascunho Automático]"), 3500);
  };

  const handleDragStart = (e, id) => {
    setDraggedTaskId(id);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, status) => {
    e.preventDefault();
    if (!draggedTaskId) return;
    setTasks(ts => ts.map(t => t.id === draggedTaskId ? { ...t, status } : t));
    setDraggedTaskId(null);
  };
  
  const getPriorityColor = (p) => p === "High" ? COLORS.text : p === "Medium" ? COLORS.textMuted : COLORS.textDim;

  // States for ROI Calculator
  const [roiNoShow, setRoiNoShow] = useState(350);
  const [roiEvents, setRoiEvents] = useState(48);
  const [roiRate, setRoiRate] = useState(30);
  const roiTotal = roiNoShow * roiEvents * (roiRate / 100);
  const roiSaved = roiTotal * 0.72;

  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

    :root {
      --font-ui: 'Inter', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    body {
      margin: 0; padding: 0;
      font-family: var(--font-ui); color: ${COLORS.text};
      -webkit-font-smoothing: antialiased;
      background: ${COLORS.bg};
      overflow-x: hidden;
    }

    * { box-sizing: border-box; }

    .mesh-bg {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: -1;
      background: radial-gradient(circle at 15% 50%, #F1F1F0 0%, transparent 50%),
                  radial-gradient(circle at 85% 30%, rgba(226, 232, 240, 0.5) 0%, transparent 50%);
      animation: meshPulse 15s ease-in-out infinite alternate;
    }
    @keyframes meshPulse {
      0% { transform: scale(1); opacity: 0.8; }
      100% { transform: scale(1.1); opacity: 1; }
    }

    .glassmorphic {
      background: ${COLORS.surface};
      backdrop-filter: blur(12px) saturate(140%);
      border: 1px solid ${COLORS.border};
      border-radius: 16px;
    }
      
    .glass-dock {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(24px) saturate(180%);
      border: 1px solid rgba(0,0,0,0.05);
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02);
    }
      
    .glass-nav {
      background: rgba(249, 249, 248, 0.8);
      backdrop-filter: blur(12px) saturate(150%);
      border-bottom: 1px solid ${COLORS.border};
    }

    .status-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
    .status-ok { background: #22C55E; box-shadow: 0 0 8px #22C55E88; }
    .status-alert { background: #EAB308; }
    
    input[type=range] {
      -webkit-appearance: none; width: 100%; background: transparent;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px; width: 16px; border-radius: 50%;
      background: ${COLORS.surfaceSolid}; cursor: pointer;
      border: 1px solid #D0D0D5;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-top: -6px;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%; height: 4px; cursor: pointer;
      background: ${COLORS.border}; border-radius: 2px;
    }

    .bento-card {
      background: ${COLORS.surfaceSolid}; border: 1px solid ${COLORS.border}; border-radius: 12px;
      transition: all 0.2s ease; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }
    .bento-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.04);
    }
  `;

  const NavTab = ({ id, label, icon: Icon, active, set }) => (
    <button onClick={() => set(id)} style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "8px 16px", borderRadius: 8,
      background: active ? COLORS.surfaceSolid : "transparent",
      color: active ? COLORS.text : COLORS.textMuted,
      fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: active ? 600 : 500,
      border: `1px solid ${active ? COLORS.border : "transparent"}`,
      boxShadow: active ? "0 2px 4px rgba(0,0,0,0.02)" : "none",
      cursor: "pointer", transition: "all 0.2s ease",
    }}>
      <Icon /> {label}
    </button>
  );

  const SectionTitle = ({ title, subtitle }) => (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", color: COLORS.text, marginBottom: 4 }}>{title}</h2>
      <p style={{ fontSize: 14, color: COLORS.textMuted }}>{subtitle}</p>
    </div>
  );

  const LivingConnectors = () => {
    const isJurereHovered = globalHover === "jurere";
    return (
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        <motion.path 
          d="M 60% 30% C 75% 30%, 80% 20%, 90% 20%" 
          fill="none" 
          stroke={isJurereHovered ? COLORS.highlight : "rgba(0,0,0,0.05)"} 
          strokeWidth="2" 
          initial={{ pathLength: 0 }} 
          animate={{ pathLength: 1 }} 
          transition={{ duration: 1.5, ease: "easeInOut" }} 
        />
        {isJurereHovered && (
          <motion.circle r="3" fill={COLORS.highlight}
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: "path('M 60% 30% C 75% 30%, 80% 20%, 90% 20%')" }}
          />
        )}
      </svg>
    );
  };

  const renderCard = (block) => {
    const isCore = block.type === "core";
    const isInfra = block.type === "infra";
    const xParallax = mousePos.x * (isCore ? 15 : isInfra ? -5 : 5);
    const yParallax = mousePos.y * (isCore ? 15 : isInfra ? -5 : 5);
    
    const hasHighlight = block.items.some(it => 
      (globalHover === "jurere" && (it.id === "vp_agile" || it.id === "seg_b2b"))
    );

    return (
      <motion.div
        key={block.id}
        className="glassmorphic"
        style={{
          gridColumn: block.col, gridRow: block.row,
          display: "flex", flexDirection: "column", padding: 20,
          position: "relative", zIndex: isCore ? 10 : 1,
          border: hasHighlight ? `1px solid ${COLORS.highlight}` : `1px solid ${COLORS.border}`,
          boxShadow: hasHighlight ? `0 0 20px rgba(0,102,255,0.15)` : 'none'
        }}
        animate={{ x: xParallax, y: yParallax }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        whileHover={{ scale: 1.02, zIndex: 20, boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }}
        onMouseEnter={() => setGlobalHover(block.id)}
        onMouseLeave={() => setGlobalHover(null)}
      >
        {isCore && (
          <motion.div 
            style={{ position: "absolute", top: -50, left: -50, right: -50, bottom: -50, background: `radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)`, zIndex: -1 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        )}
        
        <div style={{
          fontFamily: isInfra ? "var(--font-mono)" : "var(--font-ui)",
          fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          color: isCore ? COLORS.text : COLORS.textMuted,
          marginBottom: 16, display: "flex", alignItems: "center", gap: 8
        }}>
          {isInfra && <span className="status-dot status-ok" />}
          {isCore && <span className="status-dot status-alert" style={{ background: COLORS.highlight, boxShadow: `0 0 8px ${COLORS.highlight}88` }} />}
          {block.title}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
          {block.items.map((item, i) => {
            const itemHighlight = globalHover === "jurere" && (item.id === "vp_agile" || item.id === "seg_b2b");
            return (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: itemHighlight ? COLORS.highlight : COLORS.textDim, flexShrink: 0 }} />
                <div style={{
                  fontSize: isCore ? 14 : 12,
                  fontFamily: isInfra ? "var(--font-mono)" : "var(--font-ui)",
                  fontWeight: itemHighlight || isCore ? 600 : 400,
                  color: itemHighlight ? COLORS.highlight : COLORS.textMuted,
                  lineHeight: 1.4, transition: "color 0.3s ease"
                }}>
                  {item.text}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const renderCoreBMC = () => (
    <motion.div 
      key="bmc"
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6 }}
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.03em", color: COLORS.text }}>Business Model Canvas</h2>
        <p style={{ fontSize: 13, color: COLORS.textMuted }}>Mapeamento estrutural do ecossistema b2b2c.</p>
      </div>

      <div 
        ref={gridRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        style={{ 
          position: "relative",
          display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gridTemplateRows: "repeat(2, 140px)", gap: 16 
        }}
      >
        <LivingConnectors />
        {canvasData.map(renderCard)}
      </div>

      <motion.div className="glass-dock" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: "24px 32px", marginTop: 16, position: "relative" }}>
        <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", background: COLORS.text, color: "#FFF", padding: "4px 16px", borderRadius: 20, fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 600, letterSpacing: "0.05em", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
          FINANCIAL ENGINE
        </div>
        <div style={{ borderRight: `1px solid ${COLORS.border}`, paddingRight: 24 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: COLORS.textMuted, marginBottom: 12 }}>COST STRUCTURE</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["Cloud Infra AWS", "Gateway Fees", "Manual Curation"].map(c => (
               <div key={c} style={{ fontSize: 12, padding: "4px 8px", background: "rgba(0,0,0,0.03)", borderRadius: 6, color: COLORS.textMuted }}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{ paddingLeft: 8 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: COLORS.textMuted, marginBottom: 12 }}>REVENUE STREAMS</div>
          <div style={{ display: "flex", gap: 32 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.04em", color: COLORS.text }}>15-20%</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>Take Rate (Fase 1)</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.04em", color: COLORS.text }}>Pro</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>SaaS Mensal (Fase 2)</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderCoreDiferencial = () => (
    <motion.div key="diferencial" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ display: "flex", flexDirection: "column", gap: 32, paddingBottom: 40, height: "100%" }}>
      <SectionTitle title="Diferencial Competitivo" subtitle="A essência do fosso institucional B2B." />
      
      <div style={{ background: "#FFF", borderRadius: 12, border: `1px solid ${COLORS.border}`, padding: "40px 60px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", fontFamily: "var(--font-ui)", lineHeight: 1.8, fontSize: 16, color: COLORS.text, display: "flex", flexDirection: "column", minHeight: 480 }}>
        <input 
          type="text" 
          value={diferencialTitle}
          onChange={(e) => setDiferencialTitle(e.target.value)}
          style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 24, paddingBottom: 16, border: "none", outline: "none", width: "100%", color: COLORS.text, background: "transparent", borderBottom: `1px dashed ${COLORS.border}` }} 
          placeholder="Título do documento..."
        />
        
        <textarea
          value={diferencialText}
          onChange={(e) => setDiferencialText(e.target.value)}
          placeholder="Comece a digitar suas ideias estratégicas aqui..."
          style={{ flex: 1, width: "100%", border: "none", outline: "none", resize: "none", background: "transparent", color: COLORS.textMuted, fontSize: 15, lineHeight: 1.8, fontFamily: "var(--font-ui)" }}
        />

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13, color: noteStatus.includes("✅") ? "#22C55E" : COLORS.textDim, fontFamily: "var(--font-mono)", transition: "0.2s" }}>
            {noteStatus}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button 
              onClick={() => { setActiveMain("growth"); setActiveSub("partners"); }}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, background: "transparent", color: COLORS.textMuted, borderRadius: 8, border: `1px solid transparent`, cursor: "pointer", transition: "all 0.2s" }}
              title="Sinergia de Parcerias Institucionais"
              onMouseEnter={e => { e.currentTarget.style.color = COLORS.text; }}
              onMouseLeave={e => { e.currentTarget.style.color = COLORS.textMuted; }}
            >
              <Icons.System />
            </button>
            <div style={{ height: 24, width: 1, background: COLORS.border }} />
            <button 
              onClick={handleSaveNote}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "transparent", color: COLORS.textMuted, borderRadius: 8, border: `1px solid transparent`, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s ease" }}
              onMouseEnter={e => { e.currentTarget.style.color = COLORS.text; }}
              onMouseLeave={e => { e.currentTarget.style.color = COLORS.textMuted; }}
            >
              <Icons.Save /> Salvar Draft
            </button>
            <button 
              onClick={handleSendToSprints}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: COLORS.text, color: "#fff", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <Icons.Send /> Gerar Task
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderCoreProposta = () => (
    <motion.div key="proposta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
      <div style={{ paddingRight: 40 }}>
        <SectionTitle title="The Fricton Map" subtitle="A dor real da sazonalidade em Florianópolis." />
        <div style={{ fontSize: 15, color: COLORS.slateDim, lineHeight: 1.6, marginBottom: 24 }}>
          A informalidade dita as regras do turnover na alta estação. 
          Enquanto a demanda escala exponencialmente de Dezembro a Março, 
          a estrutura fixa de hospitalidade não suporta. O gatilho de dor não é 
          apenas o <b>No-Show</b>, é a <b>perda imediata da margem premium</b>.
        </div>
        
        {/* Stage Manager Style Lead Gen Tracker */}
        <div className="glass-dock" style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, background: COLORS.surfaceSolid }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: COLORS.text, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.text }}>TELEMETRY</div>
              <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: COLORS.textMuted }}>Match Efficiency</div>
            </div>
          </div>
          <div style={{ textAlign: "right", fontFamily: "var(--font-mono)" }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: COLORS.text, letterSpacing: "-0.05em" }}>60.0<span style={{ fontSize: 12, color: COLORS.textMuted }}>s</span></div>
          </div>
        </div>
      </div>
      
      <div style={{ position: "relative", paddingLeft: 24, borderLeft: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {narrativeSteps.map((step, i) => {
            const isHovered = globalHover === step.id;
            return (
              <div key={i} style={{ position: "relative", cursor: "pointer" }}
                   onMouseEnter={() => setGlobalHover(step.id)}
                   onMouseLeave={() => setGlobalHover(null)}>
                <div style={{
                  position: "absolute", left: -30, top: 4, width: 11, height: 11, borderRadius: "50%",
                  background: step.status === 'critical' ? COLORS.red : step.status === 'loss' ? COLORS.slate : COLORS.surfaceSolid,
                  border: `2px solid ${step.status === 'normal' ? COLORS.textMuted : 'transparent'}`,
                  boxShadow: isHovered && step.id === 'jurere' ? `0 0 12px ${COLORS.highlight}` : 'none'
                }} />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: isHovered && step.id === 'jurere' ? COLORS.highlight : COLORS.textMuted, marginBottom: 4 }}>{step.time}</div>
                <div style={{ fontSize: 14, fontWeight: isHovered && step.id === 'jurere' ? 600 : 500, color: isHovered && step.id === 'jurere' ? COLORS.highlight : COLORS.text, marginBottom: 4 }}>{step.event}</div>
                <div style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.5 }}>{step.desc}</div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  );

  const renderCorePitch = () => (
    <motion.div key="pitch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: 32, height: "calc(100vh - 240px)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", paddingRight: 16 }}>
        <SectionTitle title="Pitch Studio" subtitle="Script master." />
        {[
          { act: "01", title: "O Gancho", text: "Imagine o restaurante mais caro da ilha. Hoje é Réveillon. 2 garçons faltaram." },
          { act: "02", title: "A Fricção", text: "Grupos de WhatsApp não resolvem o hiato de Confiança. É roleta russa operacional." },
          { act: "03", title: "A Magia", text: "ServLink notifica a rede local. Profissionais verificados aplicam. Match em 60s." },
          { act: "04", title: "Tração", text: "2.700 CNPJs ativos só no epicentro de Floripa. Custo fixo vira variável." }
        ].map((s, i) => (
          <div key={i} style={{ padding: 16, background: COLORS.surfaceSolid, border: `1px solid ${COLORS.border}`, borderRadius: 8 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: COLORS.highlight, marginBottom: 4 }}>ACT {s.act}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text, marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>{s.text}</div>
          </div>
        ))}
      </div>
      <div style={{ background: COLORS.slate, borderRadius: 12, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 16, left: 16, fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>REFERENCE_PLAYER.mov</div>
        <button style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
          <Icons.Play />
        </button>
      </div>
    </motion.div>
  );

  const renderGrowthROI = () => (
    <motion.div key="roi" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ maxWidth: 800 }}>
      <SectionTitle title="Technical ROI Tool" subtitle="Calculadora de conversão B2B." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ padding: 24, background: COLORS.surfaceSolid, borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
          {[
            { label: "Lost revenue / event", val: roiNoShow, set: setRoiNoShow, min: 50, max: 2000, prefix: "R$" },
            { label: "High-volume events / year", val: roiEvents, set: setRoiEvents, min: 10, max: 365, prefix: "" },
            { label: "No-Show factor", val: roiRate, set: setRoiRate, min: 5, max: 80, prefix: "", suffix: "%" }
          ].map((inp, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.textMuted }}>{inp.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: COLORS.text }}>{inp.prefix}{inp.val}{inp.suffix}</span>
              </div>
              <input type="range" min={inp.min} max={inp.max} value={inp.val} onChange={e => inp.set(Number(e.target.value))} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ flex: 1, padding: 24, background: COLORS.surfaceSolid, borderRadius: 12, border: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.textMuted, marginBottom: 8 }}>Estimated Lost Margin</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 32, fontWeight: 500, color: COLORS.text }}>R$ {roiTotal.toLocaleString("pt-BR", {maximumFractionDigits:0})}</div>
          </div>
          <div style={{ flex: 1, padding: 24, background: COLORS.slate, borderRadius: 12, display: "flex", flexDirection: "column", justifyContent: "center" }}>
             <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Value Recovered (72% efficiency)</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 32, fontWeight: 500, color: COLORS.green }}>+R$ {roiSaved.toLocaleString("pt-BR", {maximumFractionDigits:0})}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderGrowthBranding = () => (
    <motion.div key="branding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SectionTitle title="Branding Artifacts" subtitle="Assets and typography identity." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={{ padding: 40, background: COLORS.surfaceSolid, borderRadius: 12, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.04em", color: COLORS.text }}>ServLink</span>
        </div>
        <div style={{ padding: 40, background: COLORS.slate, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.04em", color: "#FFF" }}>ServLink</span>
        </div>
        <div style={{ padding: 40, background: COLORS.surfaceSolid, borderRadius: 12, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 40, height: 40, background: COLORS.slate, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 600, fontSize: 18 }}>S</div>
        </div>
      </div>
      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div style={{ padding: 24, background: COLORS.surfaceSolid, borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 16 }}>TYPOGRAPHY — INTER</div>
          <div style={{ fontSize: 48, fontWeight: 300, color: COLORS.text }}>Aa</div>
          <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 8 }}>The quick brown fox jumps over the lazy dog.</div>
        </div>
        <div style={{ padding: 24, background: COLORS.surfaceSolid, borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 16 }}>CORE PALETTE</div>
          <div style={{ display: "flex", gap: 8 }}>
            {['#F9F9F8', '#FFFFFF', '#EAEAEC', '#171717', '#0F172A', '#0066FF'].map(c => (
              <div key={c} style={{ width: 32, height: 32, borderRadius: 4, background: c, border: `1px solid ${COLORS.border}` }} title={c} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderGrowthBlog = () => (
    <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SectionTitle title="Technical Papers" subtitle="Conteúdo estratégico sobre a economia gig em Florianópolis." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { tag: "MERCADO", title: "O Custo Invisível do No-Show", date: "Q3 2026", desc: "Análise quantitativa do impacto de faltas na margem de lucro de 2.700 estabelecimentos." },
          { tag: "PRODUTO", title: "O Match de 60 Segundos", date: "Q4 2026", desc: "Como a arquitetura de eventos distribui oportunidades na rede ServLink." },
          { tag: "PARCERIAS", title: "Integração SHRBS", date: "Draft", desc: "Validação institucional e seus efeitos em redes hiperlocais." },
          { tag: "VISÃO", title: "Artesãos do Serviço", date: "Draft", desc: "Mobilidade social e o sistema de reputação bilateral." }
        ].map((p, i) => (
          <div key={i} className="bento-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: COLORS.highlight }}>{p.tag}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: COLORS.textMuted }}>{p.date}</div>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 500, color: COLORS.text, marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderGrowthPartners = () => (
    <motion.div key="partners" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SectionTitle title="Validation Ecosystem" subtitle="Integrações B2B e parceiros institucionais." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { name: "SHRBS", status: "Strategic" },
          { name: "SENAC", status: "Technical" },
          { name: "SEBRAE", status: "Business" },
          { name: "Stripe", status: "Infra" },
          { name: "Vercel", status: "Infra" },
          { name: "AWS", status: "Infra" }
        ].map((p, i) => (
          <div key={i} className="bento-card" style={{ height: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", filter: "grayscale(100%)", transition: "all 0.3s ease", padding: 16 }}
               onMouseEnter={e => e.currentTarget.style.filter = "grayscale(0%)"}
               onMouseLeave={e => e.currentTarget.style.filter = "grayscale(100%)"}>
            <div style={{ fontSize: 18, fontWeight: 600, color: COLORS.text, letterSpacing: "-0.04em", cursor: "default" }}>{p.name}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: COLORS.textMuted, marginTop: 8 }}>[{p.status}]</div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderArchitecture = () => (
    <motion.div key="archi" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", justifyContent: "center", paddingTop: 32 }}>
      <div style={{ width: "100%", maxWidth: 800, background: COLORS.codeBg, borderRadius: 16, border: `1px solid rgba(255,255,255,0.1)`, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
        <div style={{ height: 32, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", padding: "0 16px", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
          <div style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.3)", transform: "translateX(-24px)" }}>stack.config.yaml</div>
        </div>
        <div style={{ padding: 24, fontFamily: "var(--font-mono)", fontSize: 13, color: COLORS.codeText, lineHeight: 1.6 }}>
          <span style={{ color: "#FF7B72" }}>version:</span> <span style={{ color: "#79C0FF" }}>"2026.2"</span><br/>
          <span style={{ color: "#FF7B72" }}>project:</span> <span style={{ color: "#79C0FF" }}>"ServLink MVP"</span><br/><br/>
          <span style={{ color: "#FF7B72" }}>infrastructure:</span><br/>
          &nbsp;&nbsp;<span style={{ color: "#7EE787" }}>cloud:</span> AWS<br/>
          &nbsp;&nbsp;<span style={{ color: "#7EE787" }}>compute:</span> Serverless + Vercel<br/>
          &nbsp;&nbsp;<span style={{ color: "#7EE787" }}>database:</span> PostgreSQL (Supabase)<br/><br/>
          
          <span style={{ color: "#FF7B72" }}>frontend:</span><br/>
          &nbsp;&nbsp;<span style={{ color: "#7EE787" }}>framework:</span> Next.js 14 (App Router)<br/>
          &nbsp;&nbsp;<span style={{ color: "#7EE787" }}>styling:</span> Tailwind CSS<br/>
          &nbsp;&nbsp;<span style={{ color: "#7EE787" }}>state:</span> Zustand / React Query<br/><br/>

          <span style={{ color: "#FF7B72" }}>backend:</span><br/>
          &nbsp;&nbsp;<span style={{ color: "#7EE787" }}>core:</span> Laravel 11 / Octane<br/>
          &nbsp;&nbsp;<span style={{ color: "#7EE787" }}>payments:</span> Stripe Connect<br/>
          &nbsp;&nbsp;<span style={{ color: "#7EE787" }}>cache:</span> Redis<br/><br/>
          
          <span style={{ color: "#8B949E" }}># Status: Bootstrapping...</span>
        </div>
      </div>
    </motion.div>
  );

  const renderSprintsBoard = () => {
    const columns = ["Backlog", "To Do", "In Progress", "Done"];
    return (
      <motion.div key="sprints" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: "calc(100vh - 160px)", display: "flex", flexDirection: "column" }}>
        
        {/* Gestão Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", color: COLORS.text, marginBottom: 4 }}>Sprint 01: Modelagem</h2>
              <div style={{ fontSize: 13, color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 6 }}><Icons.List /> 3 issues</div>
            </div>
            
            <div style={{ height: 24, width: 1, background: COLORS.border, margin: "0 8px" }} />
            
            <div style={{ display: "flex", gap: 4, background: COLORS.surfaceSolid, padding: 4, borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
              <button onClick={() => setSprintView("board")} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 6, background: sprintView === "board" ? COLORS.border : "transparent", color: sprintView === "board" ? COLORS.text : COLORS.textMuted, border: "none", cursor: "pointer" }}><Icons.Board /></button>
              <button onClick={() => setSprintView("list")} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 6, background: sprintView === "list" ? COLORS.border : "transparent", color: sprintView === "list" ? COLORS.text : COLORS.textMuted, border: "none", cursor: "pointer" }}><Icons.List /></button>
            </div>
            
            <div style={{ display: "flex", gap: 8, marginLeft: 8 }}>
              {["Modo Eu", "Prioridade", "Responsável"].map(f => (
                <button key={f} style={{ background: "transparent", border: `1px dashed ${COLORS.border}`, padding: "6px 12px", borderRadius: 6, fontSize: 13, fontWeight: 500, color: COLORS.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.textDim} onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>{f}</button>
              ))}
            </div>
          </div>
          
          <div>
            <button style={{ background: COLORS.text, color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}><span style={{ fontFamily: "var(--font-mono)" }}>+</span> New Issue</button>
          </div>
        </div>

        {/* Board View */}
        {sprintView === "board" && (
          <div style={{ flex: 1, display: "flex", gap: 16, overflowX: "auto", paddingBottom: 16 }}>
            {columns.map(col => {
              const colTasks = tasks.filter(t => t.status === col);
              return (
                <div 
                  key={col}
                  onDragOver={handleDragOver}
                  onDrop={e => handleDrop(e, col)}
                  style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column", gap: 12, background: "rgba(255,255,255,0.4)", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 12 }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, padding: "0 4px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{col}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "var(--font-mono)", background: COLORS.surfaceSolid, padding: "2px 6px", borderRadius: 12, border: `1px solid ${COLORS.border}` }}>{colTasks.length}</div>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    {colTasks.map(task => (
                      <motion.div
                        layoutId={task.id}
                        key={task.id}
                        draggable
                        onDragStart={e => handleDragStart(e, task.id)}
                        onClick={() => setSelectedTask(task)}
                        className="bento-card"
                        style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12, background: COLORS.surfaceSolid, opacity: draggedTaskId === task.id ? 0.5 : 1 }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: COLORS.textDim }}>{task.id}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 4, color: task.priority === "High" ? COLORS.text : COLORS.textMuted }}>
                            {task.priority === "High" && <Icons.High />}
                            {task.priority === "Medium" && <Icons.Medium />}
                            {task.priority === "Low" && <Icons.Low />}
                          </div>
                        </div>
                        
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text, marginBottom: 6, lineHeight: 1.3 }}>{task.title}</div>
                        </div>
                        
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                          <div style={{ display: "flex", gap: 12 }}>
                            {task.subtasks && (
                              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: COLORS.textMuted, fontFamily: "var(--font-mono)" }}><Icons.Checkbox /> {task.subtasks.done}/{task.subtasks.total}</div>
                            )}
                            {task.deadline && (
                              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: COLORS.textMuted, fontFamily: "var(--font-mono)" }}><Icons.Calendar /> {task.deadline}</div>
                            )}
                          </div>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            {task.assignees.map(a => (
                              <div key={a} style={{ width: 22, height: 22, borderRadius: "50%", background: COLORS.text, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 600, border: `2px solid ${COLORS.surfaceSolid}`, marginLeft: -4 }}>{a}</div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {sprintView === "list" && (
          <div style={{ flex: 1, overflowY: "auto", background: COLORS.surfaceSolid, border: `1px solid ${COLORS.border}`, borderRadius: 12 }}>
            <div style={{ display: "flex", padding: "12px 16px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: COLORS.textMuted, fontWeight: 600 }}>
              <div style={{ width: 80 }}>ID</div>
              <div style={{ flex: 1 }}>Title</div>
              <div style={{ width: 120 }}>Status</div>
              <div style={{ width: 100 }}>Priority</div>
              <div style={{ width: 100 }}>Assignee</div>
            </div>
            {tasks.map(task => (
              <div key={task.id} onClick={() => setSelectedTask(task)} style={{ display: "flex", padding: "12px 16px", borderBottom: `1px solid ${COLORS.border}`, alignItems: "center", fontSize: 13, cursor: "pointer" }} className="bento-card">
                <div style={{ width: 80, fontFamily: "var(--font-mono)", color: COLORS.textMuted }}>{task.id}</div>
                <div style={{ flex: 1, fontWeight: 500, color: COLORS.text }}>{task.title}</div>
                <div style={{ width: 120 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: COLORS.surface, border: `1px solid ${COLORS.border}`, padding: "2px 6px", borderRadius: 4, fontSize: 11 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.textDim }} /> {task.status}
                  </span>
                </div>
                <div style={{ width: 100, display: "flex", alignItems: "center", gap: 6, color: task.priority === "High" ? COLORS.text : COLORS.textMuted }}>
                  {task.priority === "High" && <Icons.High />}
                  {task.priority === "Medium" && <Icons.Medium />}
                  {task.priority === "Low" && <Icons.Low />}
                  {task.priority}
                </div>
                <div style={{ width: 100 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {task.assignees.map(a => (
                      <div key={a} style={{ width: 22, height: 22, borderRadius: "50%", background: COLORS.text, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 600, border: `2px solid ${COLORS.surfaceSolid}`, marginLeft: -4 }}>{a}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedTask && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedTask(null)}
                style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)", zIndex: 100 }}
              />
              <motion.div
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 440, background: COLORS.surfaceSolid, borderLeft: `1px solid ${COLORS.border}`, zIndex: 101, display: "flex", flexDirection: "column", boxShadow: "-20px 0 40px rgba(0,0,0,0.1)" }}
              >
                <div style={{ padding: "16px 24px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: COLORS.bg }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: COLORS.textMuted, background: COLORS.surfaceSolid, padding: "2px 8px", borderRadius: 4, border: `1px solid ${COLORS.border}` }}>{selectedTask.id}</div>
                    <div style={{ fontSize: 13, color: COLORS.textMuted }}>in <span style={{ color: COLORS.text, fontWeight: 500 }}>{selectedTask.sprint}</span></div>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button style={{ background: "transparent", border: "none", cursor: "pointer", color: COLORS.textMuted }}><Icons.Play /></button>
                    <button onClick={() => setSelectedTask(null)} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 20, color: COLORS.textMuted }}>&times;</button>
                  </div>
                </div>
                
                <div style={{ padding: 32, flex: 1, overflowY: "auto" }}>
                  <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24, letterSpacing: "-0.02em" }}>{selectedTask.title}</h2>
                  
                  {/* Meta Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "16px 0", fontSize: 13, marginBottom: 32 }}>
                    <div style={{ color: COLORS.textMuted, display: "flex", alignItems: "center" }}>Assignee</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {selectedTask.assignees.map(a => (
                        <div key={a} style={{ width: 24, height: 24, borderRadius: "50%", background: COLORS.text, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600 }}>{a}</div>
                      ))}
                    </div>
                    
                    <div style={{ color: COLORS.textMuted, display: "flex", alignItems: "center" }}>Status</div>
                    <div><span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: COLORS.surface, border: `1px solid ${COLORS.border}`, padding: "4px 8px", borderRadius: 6, fontWeight: 500 }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.textDim }} /> {selectedTask.status}</span></div>

                    <div style={{ color: COLORS.textMuted, display: "flex", alignItems: "center" }}>Priority</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 500, color: selectedTask.priority === "High" ? COLORS.text : COLORS.textMuted }}>
                      {selectedTask.priority === "High" && <Icons.High />}
                      {selectedTask.priority === "Medium" && <Icons.Medium />}
                      {selectedTask.priority === "Low" && <Icons.Low />}
                      {selectedTask.priority}
                    </div>

                    <div style={{ color: COLORS.textMuted, display: "flex", alignItems: "center" }}>Estimate</div>
                    <div style={{ fontFamily: "var(--font-mono)" }}>{selectedTask.points} <span style={{ color: COLORS.textMuted }}>pts</span></div>

                    <div style={{ color: COLORS.textMuted, display: "flex", alignItems: "center" }}>Due Date</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.text }}><Icons.Calendar /> {selectedTask.deadline}</div>
                  </div>
                  
                  <div style={{ height: 1, background: COLORS.border, margin: "32px -32px" }} />
                  
                  <div style={{ fontSize: 15, color: COLORS.text, lineHeight: 1.6 }}>
                    {selectedTask.desc}
                  </div>
                  
                  {selectedTask.subtasks && (
                    <div style={{ marginTop: 32 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Subtasks</div>
                      <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 8, overflow: "hidden" }}>
                        {Array.from({length: selectedTask.subtasks.total}).map((_, i) => (
                           <div key={i} style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: i < selectedTask.subtasks.total - 1 ? `1px solid ${COLORS.border}` : 'none', background: COLORS.surfaceSolid }}>
                             <input type="checkbox" checked={i < selectedTask.subtasks.done} readOnly style={{ width: 16, height: 16, accentColor: COLORS.text }} />
                             <span style={{ fontSize: 13, color: i < selectedTask.subtasks.done ? COLORS.textDim : COLORS.text, textDecoration: i < selectedTask.subtasks.done ? "line-through" : "none" }}>Subtask placeholder {i + 1}</span>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderHome = () => (
    <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ display: "flex", flexDirection: "column", gap: 32, paddingBottom: 60, height: "100%" }}>
      {/* Hero Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 16, marginTop: 20 }}>
        <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.04em", color: COLORS.text }}>Bem-vindo ao ServLink Hub.</h1>
        <p style={{ fontSize: 18, color: COLORS.textMuted, lineHeight: 1.6, maxWidth: 800 }}>
          Este é o ecossistema central de desenvolvimento do projeto de ADS, onde a <b>estratégia de negócio (B2B Staffing) e a execução técnica se encontram.</b>  Maneje a planta matriz do app, acompanhe o crescimento analítico ou direcione a arquitetura técnica.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
        
        {/* Bento Grid Navegacao */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { id: "core", sub: "proposta", icon: Icons.Play, title: "Proposta de Valor", desc: "Onde a dor estrutural de Jurerê encontra a resiliência escalável do nosso app." },
            { id: "core", sub: "bmc", icon: Icons.System, title: "Business Model Canvas", desc: "A engrenagem do blueprint estratégico e as regras de negócio em alto nível." },
            { id: "sprints", sub: "board", icon: Icons.Sprints, title: "SCRUM Board", desc: "Gestão executiva linear e coordenação ágil das nossas Sprints de engenharia." },
            { id: "growth", sub: "partners", icon: Icons.Growth, title: "Marketing & Parcerias", desc: "Nossa estratégia B2B de invasão descentralizada e integração com sindicatos." },
            { id: "core", sub: "diferencial", icon: Icons.Book, title: "Diferencial Competitivo", desc: "O que nos torna uma proposta absurdamente única perante o cenário catarinense." },
          ].map(card => (
            <motion.div 
              key={card.title}
              onClick={() => { setActiveMain(card.id); setActiveSub(card.sub); }}
              className="bento-card"
              style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, background: COLORS.surfaceSolid, height: "100%" }}
              whileHover={{ y: -4, borderColor: COLORS.textDim }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.bg, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.text, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <card.icon />
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, marginBottom: 8, letterSpacing: "-0.01em" }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.5 }}>{card.desc}</p>
              </div>
              <div style={{ marginTop: "auto", paddingTop: 16, display: "flex", alignItems: "center", color: COLORS.textDim, fontSize: 13, fontWeight: 500, fontFamily: "var(--font-mono)" }}>
                [Acessar Módulo] <span style={{ marginLeft: 6 }}><Icons.ArrowRight /></span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status Widget Lateral */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Milestone */}
          <div className="bento-card" style={{ padding: 24, background: "#FFF", display: "flex", flexDirection: "column", gap: 16, cursor: "default" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", color: COLORS.textMuted, textTransform: "uppercase" }}>Próxima Milestone</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,102,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.highlight, border: `1px solid rgba(0,102,255,0.15)` }}>
                <Icons.Calendar />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text }}>Status Report ADS</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>Segunda-feira 20h00</div>
              </div>
            </div>
          </div>

          {/* Sprint Progress */}
          <div className="bento-card" style={{ padding: 24, background: "#FFF", display: "flex", flexDirection: "column", gap: 16, cursor: "default" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", color: COLORS.textMuted, textTransform: "uppercase" }}>Sprint Progress</div>
              <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: COLORS.text }}>45%</div>
            </div>
            <div style={{ width: "100%", height: 6, background: COLORS.bg, borderRadius: 3, overflow: "hidden" }}>
              <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ duration: 1, delay: 0.2 }} style={{ height: "100%", background: COLORS.text }} />
            </div>
            <div style={{ fontSize: 13, color: COLORS.textMuted }}><b>Sprint 01</b> - Modelagem (Em progresso)</div>
          </div>

          {/* Lead Counter */}
          <div className="bento-card" style={{ padding: 24, background: COLORS.slate, color: "#FFF", display: "flex", flexDirection: "column", gap: 16, cursor: "default", boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green || "#22C55E" }} />
              Telemetry Pulse
            </div>
            <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.04em", fontFamily: "var(--font-mono)" }}>142</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>Talentos mapeados e injetados em database. Pronto para simulação.</div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div style={{ marginTop: "auto", paddingTop: 32, borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 13, color: COLORS.textMuted }}>Dúvidas sobre os fluxos? Consulte a documentação base ou acesse o repositório.</div>
        <div style={{ display: "flex", gap: 24 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", color: COLORS.textDim, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "0.2s" }} onMouseEnter={e => e.currentTarget.style.color = COLORS.text} onMouseLeave={e => e.currentTarget.style.color = COLORS.textDim}>
            <Icons.Book /> GitBook Docs
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", color: COLORS.textDim, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "0.2s" }} onMouseEnter={e => e.currentTarget.style.color = COLORS.text} onMouseLeave={e => e.currentTarget.style.color = COLORS.textDim}>
            <Icons.Github /> GitHub Repository
          </button>
        </div>
      </div>

    </motion.div>
  );

  return (
    <>
      <style>{css}</style>
      <div className="mesh-bg" />
      <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
        <header className="glass-nav" style={{ position: "sticky", top: 0, zIndex: 50, padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 28, height: 28, background: COLORS.text, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 700, fontSize: 14 }}>S</div>
            <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em" }}>ServLink WorkOS</div>
            <div style={{ width: 1, height: 16, background: COLORS.border, marginLeft: 8 }} />
            <div style={{ display: "flex", gap: 4, marginLeft: 8 }}>
              <NavTab id="home" label="Hub Station" icon={Icons.Home} active={activeMain === "home"} set={(id) => { setActiveMain(id); setActiveSub(null); }} />
              <NavTab id="core" label="The Engine" icon={Icons.System} active={activeMain === "core"} set={(id) => { setActiveMain(id); setActiveSub("bmc"); }} />
              <NavTab id="growth" label="Strategy Lab" icon={Icons.Growth} active={activeMain === "growth"} set={(id) => { setActiveMain(id); setActiveSub("branding"); }} />
              <NavTab id="tech" label="Technical Stack" icon={Icons.Tech} active={activeMain === "tech"} set={(id) => { setActiveMain(id); setActiveSub("archi"); }} />
              <div style={{ width: 1, height: 16, background: COLORS.border, margin: "0 8px" }} />
              <NavTab id="sprints" label="Ops & Sprints" icon={Icons.Sprints} active={activeMain === "sprints"} set={(id) => { setActiveMain(id); setActiveSub("board"); }} />
            </div>
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>PMI 2026.1</div>
        </header>

        {activeMain === "core" && (
          <div style={{ padding: "20px 40px 0", maxWidth: 1200, margin: "0 auto 16px", display: "flex", gap: 24, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "16px", width: "100%" }}>
            {[{id: "bmc", label: "Business Model Canvas"}, {id: "proposta", label: "Proposta de Valor"}, {id: "diferencial", label: "Diferencial Competitivo"}, {id: "pitch", label: "Pitch Studio"}].map(t => (
              <div key={t.id} onClick={() => setActiveSub(t.id)} style={{ fontSize: 13, fontWeight: activeSub === t.id ? 600 : 500, color: activeSub === t.id ? COLORS.text : COLORS.textMuted, cursor: "pointer", position: "relative" }}>
                {t.label}
                {activeSub === t.id && <div style={{ position: "absolute", bottom: -17, left: 0, right: 0, height: 2, background: COLORS.text }} />}
              </div>
            ))}
          </div>
        )}

        {activeMain === "growth" && (
          <div style={{ padding: "20px 40px 0", maxWidth: 1200, margin: "0 auto 16px", display: "flex", gap: 24, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "16px", width: "100%" }}>
            {[
              {id: "branding", label: "Branding Canvas"}, 
              {id: "roi", label: "ROI Calculator"},
              {id: "blog", label: "Blog Engine"},
              {id: "partners", label: "Partnerships Board"}
            ].map(t => (
              <div key={t.id} onClick={() => setActiveSub(t.id)} style={{ fontSize: 13, fontWeight: activeSub === t.id ? 600 : 500, color: activeSub === t.id ? COLORS.text : COLORS.textMuted, cursor: "pointer", position: "relative" }}>
                {t.label}
                {activeSub === t.id && <div style={{ position: "absolute", bottom: -17, left: 0, right: 0, height: 2, background: COLORS.text }} />}
              </div>
            ))}
          </div>
        )}

        {activeMain === "sprints" && (
          <div style={{ padding: "20px 40px 0", maxWidth: 1200, margin: "0 auto 16px", display: "flex", gap: 24, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "16px", width: "100%" }}>
            {[{id: "board", label: "Sprint Board"}].map(t => (
              <div key={t.id} onClick={() => setActiveSub(t.id)} style={{ fontSize: 13, fontWeight: activeSub === t.id ? 600 : 500, color: activeSub === t.id ? COLORS.text : COLORS.textMuted, cursor: "pointer", position: "relative" }}>
                {t.label}
                {activeSub === t.id && <div style={{ position: "absolute", bottom: -17, left: 0, right: 0, height: 2, background: COLORS.text }} />}
              </div>
            ))}
          </div>
        )}

        <main style={{ flex: 1, padding: "40px 60px", maxWidth: 1200, width: "100%", margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            {activeMain === "home" ? renderHome() : null}
            {activeMain === "core" && activeSub === "bmc" ? renderCoreBMC() : null}
            {activeMain === "core" && activeSub === "proposta" ? renderCoreProposta() : null}
            {activeMain === "core" && activeSub === "diferencial" ? renderCoreDiferencial() : null}
            {activeMain === "core" && activeSub === "pitch" ? renderCorePitch() : null}
            
            {activeMain === "growth" && activeSub === "branding" ? renderGrowthBranding() : null}
            {activeMain === "growth" && activeSub === "roi" ? renderGrowthROI() : null}
            {activeMain === "growth" && activeSub === "blog" ? renderGrowthBlog() : null}
            {activeMain === "growth" && activeSub === "partners" ? renderGrowthPartners() : null}

            {activeMain === "tech" ? renderArchitecture() : null}
            {activeMain === "sprints" ? renderSprintsBoard() : null}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}