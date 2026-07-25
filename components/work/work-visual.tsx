"use client";

import { motion, useReducedMotion } from "motion/react";
import { ACCENTS } from "@/lib/work";
import type { WorkAccent } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * WorkVisual — a generated "signature visual" for a case study when no real
 * screenshot or video exists. Rather than a generic placeholder, it renders
 * a stylised, animated product mockup whose layout is chosen per project
 * archetype (self-service portal, ops dashboard, fintech pipeline, ERP), so
 * each one reads as a distinct interface. Everything is pure SVG/DOM themed
 * by the project accent, and it degrades to a static frame under
 * reduced-motion.
 */
export function WorkVisual({
  slug,
  accent,
  className,
}: {
  slug: string;
  accent: WorkAccent;
  className?: string;
}) {
  const a = ACCENTS[accent];

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-ink",
        className,
      )}
      style={{ direction: "ltr" }}
    >
      {/* Ambient accent wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(120% 80% at 100% 0%, ${a.from}22, transparent 60%), radial-gradient(100% 80% at 0% 100%, ${a.to}1f, transparent 55%)`,
        }}
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.15]" />

      {/* Window chrome */}
      <div className="relative flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ms-3 h-4 w-40 rounded-full bg-white/[0.06]" />
      </div>

      <div className="relative h-[calc(100%-2.6rem)] p-4">
        <Mock slug={slug} accent={accent} />
      </div>
    </div>
  );
}

/** Route each project archetype to its own mock interface. */
function Mock({ slug, accent }: { slug: string; accent: WorkAccent }) {
  switch (slug) {
    case "isp-customer-self-service":
      return <PortalMock accent={accent} />;
    case "enterprise-operations-automation":
      return <OpsMock accent={accent} />;
    case "financial-tax-integration":
      return <PipelineMock accent={accent} />;
    case "greenhouse-erp":
      return <ErpMock accent={accent} />;
    default:
      return <PortalMock accent={accent} />;
  }
}

function useStagger() {
  const reduce = useReducedMotion();
  return reduce
    ? { initial: false as const, animate: {} }
    : {
        initial: { opacity: 0, y: 8 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
      };
}

/* -------------------- ISP self-service portal -------------------- */
function PortalMock({ accent }: { accent: WorkAccent }) {
  const a = ACCENTS[accent];
  const anim = useStagger();
  return (
    <div className="flex h-full gap-3">
      {/* Sidebar */}
      <div className="hidden w-1/4 flex-col gap-2 sm:flex">
        <div
          className="h-8 w-8 rounded-lg"
          style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
        />
        {[0.9, 0.6, 0.7, 0.5].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded-full bg-white/[0.06]"
            style={{ width: `${w * 100}%` }}
          />
        ))}
      </div>
      {/* Main */}
      <div className="flex flex-1 flex-col gap-3">
        {/* Active service card */}
        <motion.div
          {...anim}
          transition={{ duration: 0.5 }}
          className="rounded-lg border border-line bg-white/[0.03] p-3"
        >
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded-full bg-white/10" />
            <span
              className="rounded-full px-2 py-0.5 text-[8px] font-bold"
              style={{ background: `${a.solid}22`, color: a.solid }}
            >
              ACTIVE
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "72%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${a.from}, ${a.to})`,
              }}
            />
          </div>
        </motion.div>
        {/* Action tiles */}
        <div className="grid flex-1 grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              {...anim}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.02] p-2"
            >
              <div
                className="h-6 w-6 rounded-md"
                style={{
                  background: `linear-gradient(135deg, ${a.from}44, ${a.to}44)`,
                }}
              />
              <div className="h-2 w-8 rounded-full bg-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------- Operations dashboard -------------------- */
function OpsMock({ accent }: { accent: WorkAccent }) {
  const a = ACCENTS[accent];
  const bars = [0.4, 0.7, 0.55, 0.9, 0.65, 0.8, 0.5];
  return (
    <div className="flex h-full flex-col gap-3">
      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-lg border border-line bg-white/[0.03] p-2"
          >
            <div className="h-2 w-10 rounded-full bg-white/10" />
            <div
              className="mt-2 h-4 w-14 rounded"
              style={{ background: `${a.solid}33` }}
            />
          </motion.div>
        ))}
      </div>
      {/* Chart */}
      <div className="flex flex-1 items-end gap-1.5 rounded-lg border border-line bg-white/[0.02] p-3">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: "0%" }}
            whileInView={{ height: `${h * 100}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex-1 rounded-t"
            style={{
              background: `linear-gradient(180deg, ${a.from}, ${a.to}55)`,
            }}
          />
        ))}
      </div>
      {/* Incident rows */}
      <div className="flex flex-col gap-1.5">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-2 rounded-md border border-line bg-white/[0.02] px-2 py-1.5"
          >
            <span
              className="h-2 w-2 flex-none rounded-full"
              style={{ background: a.solid }}
            />
            <div className="h-2 flex-1 rounded-full bg-white/[0.06]" />
            <div className="h-2 w-8 rounded-full bg-white/10" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Fintech pipeline -------------------- */
function PipelineMock({ accent }: { accent: WorkAccent }) {
  const a = ACCENTS[accent];
  const stages = ["Submit", "Track", "Verify", "Done"];
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      {/* Pipeline */}
      <div className="flex items-center justify-between px-2">
        {stages.map((_, i) => (
          <div key={i} className="flex flex-1 items-center last:flex-none">
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-[8px] font-bold text-void"
              style={{
                background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
              }}
            >
              {i + 1}
            </motion.span>
            {i < stages.length - 1 && (
              <div className="mx-1 h-0.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.2 }}
                  className="h-full"
                  style={{ background: a.solid }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Transaction rows */}
      <div className="flex flex-col gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
            className="flex items-center gap-2 rounded-md border border-line bg-white/[0.02] px-2 py-1.5"
          >
            <div className="h-2 w-16 rounded-full bg-white/10 font-mono" />
            <div className="h-2 flex-1 rounded-full bg-white/[0.05]" />
            <span
              className="rounded-full px-1.5 py-0.5 text-[7px] font-bold"
              style={{ background: `${a.solid}22`, color: a.solid }}
            >
              ✓
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- ERP modules -------------------- */
function ErpMock({ accent }: { accent: WorkAccent }) {
  const a = ACCENTS[accent];
  const modules = ["Sales", "Stock", "Finance", "Logistics", "CRM", "Reports"];
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-2">
      {modules.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          className="flex flex-col gap-1.5 rounded-lg border border-line bg-white/[0.02] p-2"
        >
          <div
            className="h-5 w-5 rounded-md"
            style={{
              background: `linear-gradient(135deg, ${a.from}55, ${a.to}55)`,
            }}
          />
          <div className="h-2 w-full rounded-full bg-white/[0.08]" />
          <div className="mt-auto h-1.5 w-2/3 rounded-full bg-white/[0.05]" />
        </motion.div>
      ))}
    </div>
  );
}
