"use client";

import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

const stepColors = [
  { accent: "from-purple-500 to-violet-500", dot: "border-purple-500", text: "text-purple-400" },
  { accent: "from-violet-500 to-blue-500", dot: "border-blue-500", text: "text-blue-400" },
  { accent: "from-blue-500 to-cyan-400", dot: "border-cyan-400", text: "text-cyan-400" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 lg:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-[1280px] px-6">
        <MotionWrapper variants={fadeInUp} className="mb-12 text-center lg:mb-16">
          <p className="mb-3 text-sm font-medium tracking-wider text-purple-400 uppercase">
            How It Works
          </p>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Go from zero to AI-managed treasury
          </h2>
        </MotionWrapper>

        <MotionWrapper
          variants={staggerContainer}
          className="relative flex flex-col gap-12 lg:gap-16"
        >
          {/* Connecting gradient line */}
          <div className="absolute top-8 bottom-8 left-6 hidden w-px lg:left-[calc(50%-0.5px)] lg:block">
            <div className="h-full w-full border-l border-dashed border-purple-500/30" />
          </div>

          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const color = stepColors[i];
            return (
              <MotionWrapper
                key={step.step}
                variants={fadeInUp}
                className={`relative grid gap-8 lg:grid-cols-2 lg:gap-16`}
              >
                {/* Step info */}
                <div className={`flex flex-col gap-4 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${color.dot} bg-gray-950 text-lg font-bold ${color.text}`}>
                      {step.step}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-50">
                      {step.title}
                    </h3>
                  </div>
                  <p className="max-w-md text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Code block */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden shadow-lg">
                    <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-error/40" />
                      <div className="h-2.5 w-2.5 rounded-full bg-warning/40" />
                      <div className="h-2.5 w-2.5 rounded-full bg-success/40" />
                      <span className="ml-2 text-xs text-gray-500 font-mono">
                        {step.step === 1 ? "workflow.ts" : "terminal"}
                      </span>
                    </div>
                    <pre className="overflow-x-auto p-4 text-xs leading-relaxed sm:text-sm">
                      <code className="font-mono text-gray-300 whitespace-pre">
                        {step.code}
                      </code>
                    </pre>
                  </div>
                </div>
              </MotionWrapper>
            );
          })}
        </MotionWrapper>
      </div>
    </section>
  );
}
