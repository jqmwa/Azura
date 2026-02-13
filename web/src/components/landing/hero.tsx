"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// --- Sparkle canvas ---
function SparkleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
    }[] = [];

    function resize() {
      canvas!.width = canvas!.offsetWidth * window.devicePixelRatio;
      canvas!.height = canvas!.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    // Create particles with tiered opacity
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1, // tiered opacity
        hue: Math.random() > 0.5 ? 270 : 220, // purple or blue
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.offsetWidth, canvas!.offsetHeight);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas!.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.offsetHeight) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
        ctx!.fill();
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

// --- Dot grid background ---
function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 animate-grid-fade"
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(136,136,160,0.15) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}

// --- Mesh gradient background ---
function MeshGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Primary purple orb — top right */}
      <div
        className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, #B24BF3 0%, #8F2CC9 40%, transparent 70%)",
        }}
      />
      {/* Blue orb — left center */}
      <div
        className="absolute top-1/3 -left-48 h-[500px] w-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, #3B82F6 0%, #2563EB 40%, transparent 70%)",
        }}
      />
      {/* Cyan accent — bottom */}
      <div
        className="absolute -bottom-24 left-1/3 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, #22D3EE 0%, #06B6D4 40%, transparent 70%)",
        }}
      />
      {/* Violet bridge — center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full opacity-10 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, #8B5CF6 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

// --- Glassmorphism dashboard preview card ---
function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="relative"
      style={{ perspective: "1200px" }}
    >
      <div className="rounded-xl border border-white/[0.08] bg-gray-900/60 backdrop-blur-xl shadow-xl overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-error/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
          <span className="ml-3 text-xs font-mono text-gray-500">
            azura.dev/dashboard
          </span>
        </div>

        {/* Dashboard mock content */}
        <div className="p-5">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-purple-500/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-purple-400">A</span>
              </div>
              <span className="text-xs font-semibold text-gray-200">Treasury Overview</span>
            </div>
            <div className="flex gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Live
              </span>
            </div>
          </div>

          {/* TVL */}
          <div className="mb-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Total Value Locked</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-50 to-gray-300 bg-clip-text text-transparent">
                $2,847,391
              </span>
              <span className="text-xs font-medium text-success">+12.4%</span>
            </div>
          </div>

          {/* Mini chart area — fake sparkline */}
          <div className="mb-4 h-16 rounded-lg bg-gray-800/50 border border-white/[0.04] overflow-hidden relative">
            <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B24BF3" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#B24BF3" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 45 L20 40 L40 42 L60 35 L80 38 L100 25 L120 28 L140 18 L160 20 L180 12 L200 15"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#B24BF3" />
                </linearGradient>
              </defs>
              <path
                d="M0 45 L20 40 L40 42 L60 35 L80 38 L100 25 L120 28 L140 18 L160 20 L180 12 L200 15 L200 60 L0 60Z"
                fill="url(#sparkGrad)"
              />
            </svg>
          </div>

          {/* Workflow rows */}
          <div className="space-y-2">
            {[
              { name: "Weekly Payroll", status: "active", chain: "Base", color: "#0052FF" },
              { name: "Rebalance ETH", status: "active", chain: "Arbitrum", color: "#2D374B" },
              { name: "Bridge to L2", status: "pending", chain: "Ethereum", color: "#627EEA" },
            ].map((wf) => (
              <div
                key={wf.name}
                className="flex items-center justify-between rounded-lg bg-gray-800/40 border border-white/[0.04] px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      wf.status === "active" ? "bg-success" : "bg-warning"
                    }`}
                  />
                  <span className="text-xs text-gray-200">{wf.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: wf.color }}
                  />
                  <span className="text-[10px] text-gray-500">{wf.chain}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Glow reflection underneath */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-16 w-3/4 rounded-full bg-purple-500/10 blur-2xl" />
    </motion.div>
  );
}

// --- Main hero ---
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const prefersReduced = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center"
    >
      {/* Layered backgrounds */}
      <MeshGradient />
      <DotGrid />
      <SparkleCanvas />

      {/* Top fade from navbar area */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-950 to-transparent" />

      {/* Content */}
      <motion.div
        style={prefersReduced ? {} : { y, opacity }}
        className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-32 lg:py-0"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center"
        >
          {/* Left column — copy */}
          <div className="flex flex-col gap-6">
            <motion.div variants={item}>
              <Badge variant="info" className="w-fit gap-1.5 border border-blue-500/20 bg-blue-500/10 text-blue-400 px-3 py-1 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                Built on Chainlink CRE
              </Badge>
            </motion.div>

            <motion.div variants={item}>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-gray-50">Treasury ops,</span>
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #C574F6 0%, #B24BF3 25%, #8B5CF6 50%, #3B82F6 75%, #22D3EE 100%)",
                    backgroundSize: "200% auto",
                    animation: "gradient-shift 6s ease-in-out infinite",
                  }}
                >
                  fully automated.
                </span>
              </h1>
            </motion.div>

            <motion.div variants={item}>
              <p className="max-w-lg text-lg leading-relaxed text-gray-400">
                Define cross-chain treasury workflows in TypeScript.
                Simulate against forked state. Deploy to Chainlink&apos;s
                decentralized execution runtime — and never touch a
                multisig UI again.
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 hover:from-purple-400 hover:via-violet-400 hover:to-blue-400 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300"
                >
                  Launch App
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="lg"
                className="border-white/[0.08] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06]"
              >
                View Docs
              </Button>
            </motion.div>

            <motion.div variants={item}>
              <div className="group flex items-center gap-3 w-fit rounded-lg border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm px-4 py-2.5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04] cursor-pointer">
                <span className="text-purple-400 font-mono text-sm">$</span>
                <code className="font-mono text-sm text-gray-300">
                  npx azura init my-treasury
                </code>
                <span className="text-[10px] text-gray-600 border border-white/[0.08] rounded px-1.5 py-0.5 ml-auto group-hover:text-gray-400 transition-colors">
                  copy
                </span>
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={item} className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {["#627EEA", "#8247E5", "#0052FF", "#FF0420"].map((c, i) => (
                  <div
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-gray-950"
                    style={{ backgroundColor: c, opacity: 0.7 }}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Deployed on <span className="text-gray-400">4 chains</span> &middot; Secured by Chainlink
              </p>
            </motion.div>
          </div>

          {/* Right column — dashboard preview */}
          <div className="hidden lg:block">
            <DashboardPreview />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  );
}
