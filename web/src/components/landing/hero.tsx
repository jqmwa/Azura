"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/* ── Sparkle canvas ────────────────────────────────────────────── */
function SparkleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const dots: {
      x: number; y: number; vx: number; vy: number;
      r: number; o: number; h: number;
    }[] = [];

    function resize() {
      c!.width = c!.offsetWidth * devicePixelRatio;
      c!.height = c!.offsetHeight * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }
    resize();
    addEventListener("resize", resize);

    for (let i = 0; i < 50; i++) {
      dots.push({
        x: Math.random() * c.offsetWidth,
        y: Math.random() * c.offsetHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 0.4,
        o: Math.random() * 0.4 + 0.08,
        h: Math.random() > 0.5 ? 235 : 185,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, c!.offsetWidth, c!.offsetHeight);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > c!.offsetWidth) d.vx *= -1;
        if (d.y < 0 || d.y > c!.offsetHeight) d.vy *= -1;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${d.h},80%,70%,${d.o})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, [reduced]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}

/* ── Mesh gradient bg ──────────────────────────────────────────── */
function MeshGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-32 right-1/4 h-[600px] w-[600px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #6366F1 0%, #4F46E5 40%, transparent 70%)" }} />
      <div className="absolute top-1/2 -left-32 h-[500px] w-[500px] rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, #3B82F6 0%, #2563EB 40%, transparent 70%)" }} />
      <div className="absolute -bottom-32 right-1/3 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, #22D3EE 0%, transparent 60%)" }} />
    </div>
  );
}

/* ── Dot grid ──────────────────────────────────────────────────── */
function DotGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 animate-grid-fade" aria-hidden="true"
      style={{ backgroundImage: "radial-gradient(circle, rgba(136,136,160,0.12) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
  );
}

/* ── Main hero ─────────────────────────────────────────────────── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const reduced = useReducedMotion();

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Layered bg */}
      <MeshGradient />
      <DotGrid />
      <SparkleCanvas />
      <div className="pointer-events-none absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-gray-950 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-gray-950 to-transparent z-20" />

      {/* Content */}
      <motion.div
        style={reduced ? {} : { y, opacity }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1280px] items-center px-6"
      >
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-0 items-end lg:items-center">

          {/* ── Left: Azura character ──────────────────────────── */}
          <div className="relative hidden lg:col-span-5 lg:flex lg:items-end lg:justify-start lg:self-end -ml-6">
            {/* Glow behind Azura */}
            <div className="absolute bottom-0 left-1/3 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-purple-500/15 blur-[80px]" />

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative z-10 translate-y-8"
            >
              <Image
                src="/azura-hero.webp"
                alt="Azura — AI treasury agent"
                width={580}
                height={773}
                className="h-auto w-full max-w-[520px] object-contain object-bottom drop-shadow-2xl"
                priority
              />
            </motion.div>
          </div>

          {/* ── Right: Copy + CTAs ────────────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 py-32 lg:col-span-7 lg:py-0 lg:pl-8"
          >
            <motion.div variants={item}>
              <Badge variant="info" className="w-fit gap-1.5 border border-purple-500/20 bg-purple-500/10 text-purple-300 px-3 py-1 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                AI-powered treasury for your business
              </Badge>
            </motion.div>

            <motion.div variants={item}>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl">
                <span className="block text-gray-50">Your business treasury,</span>
                <span className="block text-cyan-400 mt-1">
                  managed by AI.
                </span>
              </h1>
            </motion.div>

            <motion.div variants={item}>
              <p className="max-w-lg text-lg leading-relaxed text-gray-400">
                Add Bitcoin, Ethereum, and stablecoins to your company&apos;s
                digital treasury. Azura&apos;s AI agent handles rebalancing,
                payroll, and cross-chain transfers — so you can focus on
                building your business.
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="animate-pulse-glow border-purple-200/30 hover:border-purple-200/50 hover:shadow-[0_0_36px_rgba(99,102,241,0.45),0_4px_16px_rgba(0,0,0,0.3),0_0_0_1px_rgba(34,211,238,0.2)] transition-all duration-300"
                >
                  Open Dashboard
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="lg"
                className="border-white/[0.08] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06]"
              >
                See How It Works
              </Button>
            </motion.div>

            <motion.div variants={item}>
              <div className="group flex items-center gap-3 w-fit rounded-lg border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm px-4 py-2.5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04] cursor-pointer">
                <span className="text-purple-400 font-mono text-sm">$</span>
                <code className="font-mono text-sm text-gray-300">npx azura init</code>
                <span className="text-[10px] text-gray-600 border border-white/[0.08] rounded px-1.5 py-0.5 group-hover:text-gray-400 transition-colors">copy</span>
              </div>
            </motion.div>

            {/* Stats strip */}
            <motion.div variants={item} className="flex items-center gap-6 pt-3">
              {[
                { label: "Supported Chains", value: "6+" },
                { label: "Uptime", value: "99.9%" },
                { label: "Businesses Onboarded", value: "200+" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-lg font-bold text-gray-50">{stat.value}</span>
                  <span className="text-[11px] text-gray-500">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* Mobile: Azura character below content */}
      <div className="relative z-10 flex justify-center lg:hidden -mt-8">
        <div className="relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[280px] w-[280px] rounded-full bg-purple-500/15 blur-[60px]" />
          <Image
            src="/azura-hero.webp"
            alt="Azura — AI treasury agent"
            width={380}
            height={507}
            className="relative h-auto w-[320px] object-contain object-bottom drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
