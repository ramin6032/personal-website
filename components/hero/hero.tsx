"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { AmbientBackground } from "@/components/background/ambient-background";
import { ParticleField } from "@/components/background/particle-field";
import { Magnetic } from "@/components/ui/magnetic";
import { TextReveal } from "@/components/ui/text-reveal";
import { STACK } from "@/lib/content";
import { useDictionary } from "@/lib/i18n/context";
import GlitchCanvas from "../GlitchCanvas";

export function Hero() {
  const { hero, profile } = useDictionary();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Normalised pointer position (-0.5 → 0.5)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });

  // Parallax depth layers
  // const portraitX = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  // const portraitY = useTransform(sy, [-0.5, 0.5], [-16, 16]);
  // const portraitRotX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  // const portraitRotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const haloX = useTransform(sx, [-0.5, 0.5], [30, -30]);
  const haloY = useTransform(sy, [-0.5, 0.5], [24, -24]);
  const glowX = useTransform(sx, [-0.5, 0.5], [-40, 40]);
  const glowY = useTransform(sy, [-0.5, 0.5], [-30, 30]);

  const handlePointer = (e: React.MouseEvent) => {
    if (reduce || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointer}
      className="relative flex min-h-svh w-full items-center overflow-hidden px-6 pt-28 pb-16 sm:px-10 lg:px-16"
    >
      <AmbientBackground />
      <div className="pointer-events-none absolute inset-0 z-[-5]">
        <ParticleField />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* -------- Left: copy -------- */}
        <div className="relative z-10 order-2 text-center lg:order-1 lg:text-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-text-secondary lg:mx-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            {profile.availability}
          </motion.div>

          <h1 className="font-(family-name:--font-geist) text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <TextReveal text={hero.titleLine1} delay={0.15} />
            <br />
            <span className="text-gradient">
              <TextReveal text={hero.titleLine2} delay={0.35} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg lg:mx-0"
          >
            {hero.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-start lg:justify-start"
          >
            <Magnetic strength={0.5}>
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_40px_-4px] hover:shadow-electric/60"
              >
                <span className="relative z-10">{hero.primaryCta}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </Magnetic>

            <Magnetic strength={0.4}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-text-primary transition-colors duration-300 hover:border-white/25 hover:bg-white/5"
              >
                {hero.secondaryCta}
              </a>
            </Magnetic>
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 lg:mx-0"
          >
            {hero.stats.map((s) => (
              <div key={s.label} className="text-center " dir="ltr">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-(family-name:--font-geist) text-3xl font-semibold text-text-primary">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-xs text-text-muted">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* -------- Right: portrait composition -------- */}
        <div className="relative order-1 flex items-center justify-center lg:order-2">
          <div
            className="relative flex aspect-3/4 w-70 items-end justify-center sm:w-85 lg:w-105"
            style={{ perspective: 1200 }}
          >
            {/* Ambient glow that follows cursor */}
            <motion.div
              aria-hidden
              style={{ x: glowX, y: glowY }}
              className="absolute inset-0 -z-10"
            >
              <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.35),transparent_62%)] blur-2xl" />
            </motion.div>

            {/* Rotating conic halo */}
            <motion.div
              aria-hidden
              style={{ x: haloX, y: haloY }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              <div className="relative h-[86%] w-[86%]">
                <div className=" absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(34,211,238,0.55),transparent_35%,rgba(139,92,246,0.55),transparent_70%)] opacity-70 blur-[2px] animate-spin-slow" />
                <div className="absolute  inset-0.75 rounded-full bg-void/80 backdrop-blur-sm overflow-hidden ">
                  {/* Active Portrait */}
                  <div className="relative rtl:left-8 ltr:right-8">
                    <GlitchCanvas
                      width={410}
                      height={660}
                      isActive={true}
                      imageUrl={"/portrait.png"}
                    />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border border-white/10 " />
              </div>
            </motion.div>

            {/* Glowing tech arcs */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 flex items-center justify-center"
            >
              <div className="h-[104%] w-[104%] rounded-full border border-cyan/20 animate-spin-slow [animation-duration:34s]" />
              <div className="absolute h-[118%] w-[118%] rounded-full border border-violet/10 animate-spin-slow [animation-direction:reverse] [animation-duration:46s]" />
            </div>

            {/* DisabledPortrait */}
            {/* <motion.div
              style={{
                x: portraitX,
                y: portraitY,
                rotateX: portraitRotX,
                rotateY: portraitRotY,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 h-full w-full overflow-hidden"
            >
              <div className="relative h-full w-full [animation:var(--animate-float-slow)] overflow-hidden">
                {/* <Image
                  src="/portrait.png"
                  alt={`${PROFILE.name} — ${profile.role}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 420px"
                  className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                /> */}

            {/* Rim / key light */}
            {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_30%,rgba(120,170,255,0.18),transparent_70%)] mix-blend-screen" />
              </div> */}
            {/* </motion.div> */}

            {/* Floating tech chips */}
            <FloatingChip
              className="left-[-8%] top-[18%]"
              delay={1.3}
              label="Next.js · TypeScript"
            />

            <FloatingChip
              className="right-[-10%] top-[38%]"
              delay={1.5}
              label="Enterprise Systems"
            />

            <FloatingChip
              className="bottom-[14%] left-[-4%] "
              delay={1.7}
              label="+18k Users"
            />

            {/* Ground reflection */}
            <div
              aria-hidden
              className="absolute -bottom-6 left-1/2 h-10 w-[60%] -translate-x-1/2 rounded-[100%] bg-electric/25 blur-2xl"
            />
          </div>
        </div>
      </div>

      {/* Tech stack ticker */}
      <div className="absolute inset-x-0 bottom-8 hidden justify-center lg:flex">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-text-muted"
        >
          {STACK.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label={hero.scrollLabel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-text-muted lg:left-10 lg:translate-x-0"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-text-secondary"
          />
        </span>
      </motion.a>
    </section>
  );
}

function FloatingChip({
  label,
  className,
  delay,
}: {
  label: string;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass absolute z-20 rounded-xl px-3 py-2 text-xs font-medium text-text-secondary shadow-lg shadow-black/40 ${className ?? ""}`}
    >
      <div className="animate-float-slow" dir="ltr">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan align-middle" />
        {label}
      </div>
    </motion.div>
  );
}
