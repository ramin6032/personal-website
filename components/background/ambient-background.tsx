import { cn } from "@/lib/utils";

/**
 * AmbientBackground — reusable depth system.
 * Layers (back to front): base gradient · aurora mesh blobs ·
 * technical grid (edge-masked) · film grain. Purely CSS/GPU — zero JS cost.
 */
export function AmbientBackground({
  className,
  grid = true,
  aurora = true,
}: {
  className?: string;
  grid?: boolean;
  aurora?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* Base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#0d0d16_0%,#050507_55%)]" />

      {/* Aurora mesh blobs */}
      {aurora && (
        <>
          <div className="absolute -left-[10%] top-[-15%] h-[55vh] w-[55vh] rounded-full bg-electric/25 blur-[120px] [animation:var(--animate-aurora)]" />
          <div className="absolute right-[-8%] top-[10%] h-[50vh] w-[50vh] rounded-full bg-violet/25 blur-[130px] [animation:var(--animate-aurora)] [animation-delay:-6s]" />
          <div className="absolute bottom-[-20%] left-[30%] h-[45vh] w-[45vh] rounded-full bg-cyan/20 blur-[120px] [animation:var(--animate-aurora)] [animation-delay:-11s]" />
        </>
      )}

      {/* Technical grid, faded at edges */}
      {grid && (
        <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
      )}

      {/* Film grain */}
      <div className="bg-noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
    </div>
  );
}
