"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as PIXI from "pixi.js";
import { RGBSplitFilter, GlitchFilter } from "pixi-filters";

interface GlitchCanvasProps {
  width?: number;
  height?: number;
  imageUrl?: string;
  isActive?: boolean;
}

export default function GlitchCanvas({
  width = 600,
  height = 700,
  imageUrl = "/model/portre-2.png",
  isActive = true,
}: GlitchCanvasProps) {
  const appRef = useRef<PIXI.Application | null>(null);
  const imgRef = useRef<PIXI.Sprite | null>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeGlitch = async () => {
      try {
        const app = new PIXI.Application();

        await app.init({
          width,
          height,
          antialias: true,
          backgroundAlpha: 0,
        });

        containerRef.current?.appendChild(app.canvas);

        appRef.current = app;

        // Load texture
        const texture = await PIXI.Assets.load(imageUrl);
        setupImage(app, texture);
      } catch (error) {
        console.error("Error initializing glitch canvas:", error);
      }
    };

    const setupImage = (app: PIXI.Application, texture: PIXI.Texture) => {
      try {
        const img = PIXI.Sprite.from(texture);

        // Center image
        const maxWidth = app.screen.width * 0.8;
        const maxHeight = app.screen.height * 0.8;

        const scale = Math.min(
          maxWidth / texture.width,
          maxHeight / texture.height,
        );

        img.scale.set(scale);

        img.anchor.set(0.5);
        img.position.set(app.screen.width / 2, app.screen.height / 2 - 40);

        // Add image to stage
        app.stage.addChild(img);

        // Create filters
        const rgbSplitFilter = new RGBSplitFilter();
        const glitchFilter = new GlitchFilter();

        img.filters = [rgbSplitFilter, glitchFilter];

        img.eventMode = "static";
        img.cursor = "pointer";

        const baseScale = scale;

        img.on("pointerover", () => {
           gsap.to(img.scale, {
            x: baseScale * 1.08,
            y: baseScale * 1.08,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        img.on("pointerout", () => {
           gsap.to(img.scale, {
            x: baseScale,
            y: baseScale,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        // Reset RGB split
        rgbSplitFilter.red.x = 0;
        rgbSplitFilter.red.y = 0;
        rgbSplitFilter.green.x = 0;
        rgbSplitFilter.green.y = 0;
        rgbSplitFilter.blue.x = 0;
        rgbSplitFilter.blue.y = 0;

        // Reset glitch
        glitchFilter.slices = 0;
        glitchFilter.offset = 20;

        imgRef.current = img;
        startAnimation(img, rgbSplitFilter, glitchFilter);
      } catch (error) {
        console.error("Error setting up image:", error);
      }
    };

    const startAnimation = (
      img: PIXI.Sprite,
      rgbSplitFilter: RGBSplitFilter,
      glitchFilter: GlitchFilter,
    ) => {
      const animate = () => {
        if (!imgRef.current) return;

        const tl = gsap.timeline({
          delay: randomIntFromInterval(3, 6),
          onComplete: animate,
        });

        timelineRef.current = tl;

        // Red channel animation
        tl.to(
          rgbSplitFilter.red,
          {
            duration: 0.2,
            x: randomIntFromInterval(-15, 15),
            y: randomIntFromInterval(-15, 15),
          },
          0,
        );

        tl.to(rgbSplitFilter.red, {
          duration: 0.01,
          x: 0,
          y: 0,
        });

        // Blue channel animation
        tl.to(
          rgbSplitFilter.blue,
          {
            duration: 0.2,
            x: randomIntFromInterval(-15, 15),
            y: 0,
            onComplete() {
              glitchFilter.slices = 20;
              glitchFilter.direction = randomIntFromInterval(-75, 75);
            },
          },
          "-=0.2",
        );

        tl.to(rgbSplitFilter.blue, {
          duration: 0.1,
          x: randomIntFromInterval(-15, 15),
          y: randomIntFromInterval(-5, 5),
          onComplete() {
            glitchFilter.slices = 12;
            glitchFilter.direction = randomIntFromInterval(-75, 75);
          },
        });

        tl.to(rgbSplitFilter.blue, {
          duration: 0.01,
          x: 0,
          y: 0,
          onComplete() {
            glitchFilter.slices = 0;
            glitchFilter.direction = 0;
          },
        });

        // Green channel animation
        tl.to(
          rgbSplitFilter.green,
          {
            duration: 0.2,
            x: randomIntFromInterval(-15, 15),
            y: 0,
          },
          "-=0.2",
        );

        tl.to(rgbSplitFilter.green, {
          duration: 0.1,
          x: randomIntFromInterval(-20, 20),
          y: randomIntFromInterval(-15, 15),
        });

        tl.to(rgbSplitFilter.green, {
          duration: 0.01,
          x: 0,
          y: 0,
        });

        tl.timeScale(1.2);
      };

      animate();
    };

    const randomIntFromInterval = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const cleanup = () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      if (appRef.current) {
        try {
          appRef.current.destroy();
        } catch (e) {
          console.error("Error destroying PIXI app:", e);
        }
        appRef.current = null;
      }

      imgRef.current = null;
    };

    initializeGlitch();

    return cleanup;
  }, [imageUrl, height, width]);

  if (!isActive) return;

  return (
    <div ref={containerRef} />
    // <canvas
    //   ref={canvasRef}
    //   width={width}
    //   height={height}
    //   className="pixi w-full h-full rounded-lg"
    //   style={{
    //     display: "block",
    //     border: "1px solid rgba(255, 255, 255, 0.1)",
    //   }}
    // />
  );
}
