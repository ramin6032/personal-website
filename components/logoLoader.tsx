"use client";

import { useEffect, useRef, useState } from "react";

interface LogoLoaderProps {
  onComplete?: () => void;
}

export default function LogoLoader({ onComplete }: LogoLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeline = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setIsVisible(false);
      onComplete?.();
    };

    timeline();
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-999 overflow-hidden">
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-indigo-500"
        style={{
          transition: "all 0.3s ease-out",
          opacity: 1,
          animation: `slideUp 0.8s ease-out 3.4s forwards`,
        }}
      />

      <div
        ref={containerRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        style={{
          transition: "all 0.3s ease-out",
          opacity: 1,
          animation: `fadeOut 3.5s ease-out 0.5s forwards`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl"></div>
        </div>

        <svg
          width="300"
          height="296"
          viewBox="0 0 820 804"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          style={{ animation: "logoShrink 3.5s ease-out forwards" }}
        >
          <defs>
            <style>{` 
              @keyframes logoShrink {
                0% { transform:  scale(1);  }
                85% { transform:  scale(1);  }
                100% { transform:  scale(0.5);  }
              } 

              @keyframes strokeDraw {
                0% { stroke-dashoffset: 3000; opacity: 0;  }
                10% { opacity: 1; }
                60% { stroke-dashoffset: 0; opacity: 1; }
                75% { opacity: 1; }
                85% { opacity: 0;  }
                100% { opacity: 0;  }
              }             
              
              @keyframes fillPath {
                0% { fill: none; fill-opacity: 0; }
                60% { fill: none; fill-opacity: 0; }
                75% { fill: oklch(58.5% 0.233 277.117); fill-opacity: 0.6;}     
                80% { fill: oklch(58.5% 0.233 277.117); fill-opacity: 0.8; }           
                85% { fill: oklch(58.5% 0.233 277.117); fill-opacity: 1; }
                100% { fill: oklch(58.5% 0.233 277.117); fill-opacity: 1; }
              }

              @keyframes fadeOut {
                0% { transform: translateY(0);  }
                75% { transform: translateY(0);  }
                98% { transform: translateY(-120%);  }
                100% { transform: translateY(-120%);  }
              }

              @keyframes slideUp {
                0% { height: 100%;  }
                30% { height: 100%;  }
                100% { height: 0;  }
              }

              #main-logo-path {
                stroke: oklch(58.5% 0.233 277.117);
                stroke-width: 3;
                stroke-linecap: round;
                stroke-dasharray: 3000;
                fill: none;
                filter: drop-shadow(0 0 10px oklch(58.5% 0.233 277.117));
                animation: strokeDraw 3.5s ease-out forwards;
              }

              #main-logo-path-fill {
                stroke: none;
                animation: fillPath 3.5s ease-out forwards;
              }

              #accent-line {
                stroke: oklch(60.6% 0.25 292.717);
                stroke-width: 2;
                stroke-linecap: round;
                stroke-dasharray: 0;
                filter: drop-shadow(0 0 8px oklch(60.6% 0.25 292.717));
                animation: strokeDraw 3.5s ease-out forwards;
              }
            `}</style>
          </defs>

          <path
            id="main-logo-path-fill"
            d="M29.7926 21.7175C49.8607 20.4665 82.7836 21.4315 103.565 21.4299L246.966 21.4184L372.17 21.4138C390.921 21.4159 422.255 20.567 440.309 22.0756C468.488 24.2088 496.238 30.1727 522.778 39.8C577.781 60.4416 624.833 97.7175 657.261 146.343C662.997 155.061 672.977 174.192 677.483 183.873C727.656 292.682 700.942 421.16 611.455 501.455C598.417 513.126 584.281 523.531 569.241 532.529C565.088 534.963 552.396 540.785 551.112 544.232C551.264 546.746 551.952 547.275 554.15 549.491C567.73 563.185 581.58 576.927 595.37 590.392L643.004 637.754L788.728 782.091C748.395 783.046 696.36 775.444 657.154 765.788C645.217 762.852 632.522 758.079 620.433 754.985C612.244 751.833 603.693 749.199 595.372 746.019C579.761 740.003 564.448 733.262 549.482 725.818C515.271 708.961 470.477 680.103 440.939 655.67C417.185 635.819 396.683 611.543 374.474 590.296C341.707 558.95 310.433 526.491 277.71 495.178C270.635 488.408 264.331 480.633 257.163 473.908C244.851 462.431 232.71 450.773 220.744 438.939C214.769 433.082 205.79 424.698 200.83 418.444C207.845 419.488 222.192 419.122 229.75 419.122L280.785 419.096L383.024 418.989C401.259 418.93 421.115 419.521 439.316 418.175C445.515 417.158 455.126 417.278 460.713 415.025C514.546 393.324 550.444 347.258 545.532 288.083C543.8 267.219 539.087 250.821 528.054 232.249C524.486 226.241 519.126 221.354 514.49 216.2C499.097 199.357 479.963 185.66 457.667 179.568C442.892 175.406 434.41 176.91 419.414 177.236C410.149 177.359 400.884 177.409 391.619 177.385L249.288 177.377C221.025 177.39 188.409 178.954 161.149 175.026C101.587 166.442 50.2829 123.807 34.6077 65.7952C32.2642 57.1221 25.4226 29.6645 29.7926 21.7175Z"
          />

          <path
            id="main-logo-path"
            d="M29.7926 21.7175C49.8607 20.4665 82.7836 21.4315 103.565 21.4299L246.966 21.4184L372.17 21.4138C390.921 21.4159 422.255 20.567 440.309 22.0756C468.488 24.2088 496.238 30.1727 522.778 39.8C577.781 60.4416 624.833 97.7175 657.261 146.343C662.997 155.061 672.977 174.192 677.483 183.873C727.656 292.682 700.942 421.16 611.455 501.455C598.417 513.126 584.281 523.531 569.241 532.529C565.088 534.963 552.396 540.785 551.112 544.232C551.264 546.746 551.952 547.275 554.15 549.491C567.73 563.185 581.58 576.927 595.37 590.392L643.004 637.754L788.728 782.091C748.395 783.046 696.36 775.444 657.154 765.788C645.217 762.852 632.522 758.079 620.433 754.985C612.244 751.833 603.693 749.199 595.372 746.019C579.761 740.003 564.448 733.262 549.482 725.818C515.271 708.961 470.477 680.103 440.939 655.67C417.185 635.819 396.683 611.543 374.474 590.296C341.707 558.95 310.433 526.491 277.71 495.178C270.635 488.408 264.331 480.633 257.163 473.908C244.851 462.431 232.71 450.773 220.744 438.939C214.769 433.082 205.79 424.698 200.83 418.444C207.845 419.488 222.192 419.122 229.75 419.122L280.785 419.096L383.024 418.989C401.259 418.93 421.115 419.521 439.316 418.175C445.515 417.158 455.126 417.278 460.713 415.025C514.546 393.324 550.444 347.258 545.532 288.083C543.8 267.219 539.087 250.821 528.054 232.249C524.486 226.241 519.126 221.354 514.49 216.2C499.097 199.357 479.963 185.66 457.667 179.568C442.892 175.406 434.41 176.91 419.414 177.236C410.149 177.359 400.884 177.409 391.619 177.385L249.288 177.377C221.025 177.39 188.409 178.954 161.149 175.026C101.587 166.442 50.2829 123.807 34.6077 65.7952C32.2642 57.1221 25.4226 29.6645 29.7926 21.7175Z"
          />
        </svg>
      </div>
    </div>
  );
}
