import React, { useEffect, useRef } from "react";

interface NetworkBackgroundProps {
  animated?: boolean;
  density?: number;
  opacity?: number;
}

const NetworkBackground: React.FC<NetworkBackgroundProps> = ({
  animated = false,
  density = 50,
  opacity = 0.15,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!animated) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize the canvas to match the viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class — receives non-null canvas + ctx
    class Particle {
      private canvas: HTMLCanvasElement;
      private ctx: CanvasRenderingContext2D;
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
      }

      draw(opacity: number) {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(100, 100, 100, ${opacity})`;
        this.ctx.fill();
      }
    }

    // Initialize particles
    const particles: Particle[] = Array.from(
      { length: density },
      () => new Particle(canvas, ctx)
    );

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update + draw each particle
      particles.forEach((p) => {
        p.update();
        p.draw(opacity);
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 100, 100, ${
              (1 - dist / 150) * opacity
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [animated, density, opacity]);

  // Animated background (Canvas)
  if (animated) {
    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      />
    );
  }

  // Static SVG fallback for non-animated mode
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#666" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#666" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <g stroke="url(#lineGradient)" strokeWidth="0.5" fill="none">
          {Array.from({ length: 60 }).map((_, i) => {
            const x1 = Math.random() * 800;
            const y1 = Math.random() * 600;
            const x2 = x1 + (Math.random() - 0.5) * 200;
            const y2 = y1 + (Math.random() - 0.5) * 200;
            return (
              <line
                key={`line-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                opacity={Math.random() * 0.5 + 0.2}
              />
            );
          })}

          {Array.from({ length: 50 }).map((_, i) => {
            const cx = Math.random() * 800;
            const cy = Math.random() * 600;
            const r = Math.random() * 2 + 1;
            return (
              <circle
                key={`circle-${i}`}
                cx={cx}
                cy={cy}
                r={r}
                fill="#666"
                opacity={Math.random() * 0.6 + 0.3}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default NetworkBackground;
