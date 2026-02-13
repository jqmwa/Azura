"use client";

import { Icon } from "@/components/ui/icon";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { fadeInUp } from "@/lib/motion";
import {
  COMPARISON_DIMENSIONS,
  COMPETITORS,
  AZURA_VALUES,
} from "@/lib/constants";

function CellValue({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success/10">
        <Icon name="check" size={12} className="text-success" />
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-700/30">
        <Icon name="minus" size={12} className="text-gray-600" />
      </span>
    );
  return (
    <span className="inline-flex rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-medium text-warning">
      Partial
    </span>
  );
}

export function Comparison() {
  return (
    <section id="compare" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <MotionWrapper variants={fadeInUp} className="mb-12 text-center lg:mb-16">
          <p className="mb-3 text-sm font-medium tracking-wider text-purple-400 uppercase">
            Compare
          </p>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            How Azura{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              stacks up
            </span>
          </h2>
        </MotionWrapper>

        <MotionWrapper variants={fadeInUp}>
          <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-5 py-4 text-left font-medium text-gray-400">
                    Feature
                  </th>
                  {COMPETITORS.map((c) => (
                    <th
                      key={c.name}
                      className="px-4 py-4 text-center font-medium text-gray-500"
                    >
                      {c.name}
                    </th>
                  ))}
                  <th className="px-5 py-4 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 border-l border-white/[0.06]">
                    Azura
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DIMENSIONS.map((dim) => (
                  <tr
                    key={dim.key}
                    className="border-b border-white/[0.04] last:border-b-0 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5 font-medium text-gray-200">
                      {dim.label}
                    </td>
                    {COMPETITORS.map((c) => (
                      <td key={c.name} className="px-4 py-3.5 text-center">
                        <div className="flex justify-center">
                          <CellValue
                            value={c.values[dim.key as keyof typeof c.values]}
                          />
                        </div>
                      </td>
                    ))}
                    <td className="px-5 py-3.5 text-center border-l border-white/[0.06] bg-purple-500/[0.03]">
                      <div className="flex justify-center">
                        <CellValue
                          value={AZURA_VALUES[dim.key as keyof typeof AZURA_VALUES]}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
