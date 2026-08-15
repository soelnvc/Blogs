import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';

const InteractiveParticleText = ({
  text,
  fontFamily = '"Oswald", sans-serif',
  fontWeight = '700',
  textColor = '#111111',
  secondaryColor = '#F40E3F',
  colorMix = 5, // 5% chance for secondary color
  particleShape = 'Square',
  particleSize = 1.5,
  resolution = 8,
  shatterForce = 6,
  springTension = 0.05,
  friction = 0.85,
  interactionType = 'Hover: Repel',
  cursorRadius = 100,
  className = '',
  style = {}
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, isActive: false, clickPulse: false });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDynamicFontSize = (width) => {
    let size = width * 0.065;
    if (size < 48) size = 48;
    if (size > 115) size = 115;
    return size;
  };
  
  const effectiveFontSize = getDynamicFontSize(windowWidth);
  const currentLineHeight = 1.0;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    
    let ctx = canvas.getContext("2d", { willReadFrequently: true });
    let resizeObserver;
    
    const initParticles = () => {
      cancelAnimationFrame(animationRef.current);
      
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      if (width === 0 || height === 0) return;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.fillStyle = textColor;
      const lineHeightMultiplier = currentLineHeight;
      
      ctx.font = `${fontWeight} ${effectiveFontSize}px ${fontFamily}`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      
      const lines = Array.isArray(text) ? text : typeof text === 'string' ? text.split('\n') : [''];
      
      // Calculate total block height
      const totalHeight = lines.length * (effectiveFontSize * lineHeightMultiplier);
      const startY = Math.max(0, (height / 2) - (totalHeight / 2));
      
      lines.forEach((line, index) => {
        ctx.fillText(line, 0, startY + (index * effectiveFontSize * lineHeightMultiplier));
      });
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let newParticles = [];
      const step = Math.max(1, 11 - resolution);
      
      for (let y = 0; y < canvas.height; y += step * dpr) {
        for (let x = 0; x < canvas.width; x += step * dpr) {
          const index = (y * canvas.width + x) * 4;
          if (data[index + 3] > 128) { // If pixel is not fully transparent
            const canvasX = x / dpr;
            const canvasY = y / dpr;
            const isPrimaryColor = Math.random() > colorMix / 100;
            const pColor = isPrimaryColor ? textColor : secondaryColor;
            newParticles.push({
              originX: canvasX,
              originY: canvasY,
              x: canvasX + (Math.random() - 0.5) * 50, // Slight initial scattering for dramatic assemble
              y: canvasY + (Math.random() - 0.5) * 50,
              vx: 0,
              vy: 0,
              color: pColor
            });
          }
        }
      }
      particlesRef.current = newParticles;
      
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        particlesRef.current.forEach(p => {
          const mouse = mouseRef.current;
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (mouse.isActive && distance < cursorRadius) {
            const force = (cursorRadius - distance) / cursorRadius;
            const dirX = dx / distance;
            const dirY = dy / distance;
            if (interactionType === "Hover: Repel") {
              p.vx -= dirX * force * shatterForce;
              p.vy -= dirY * force * shatterForce;
            }
          }
          
          p.vx += (p.originX - p.x) * springTension;
          p.vy += (p.originY - p.y) * springTension;
          p.vx *= friction;
          p.vy *= friction;
          p.x += p.vx;
          p.y += p.vy;
          
          ctx.fillStyle = p.color;
          ctx.beginPath();
          if (particleShape === "Square") {
            ctx.rect(p.x - particleSize, p.y - particleSize, particleSize * 2, particleSize * 2);
          } else {
            ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
          }
          ctx.fill();
        });
        
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    };
    
    document.fonts.ready.then(() => {
      initParticles();
    });
    
    // Fallback if fonts are already loaded or takes too long
    const timeoutId = setTimeout(() => {
      initParticles();
    }, 500);
    
    resizeObserver = new ResizeObserver(() => {
      initParticles();
    });
    resizeObserver.observe(container);
    
    return () => {
      clearTimeout(timeoutId);
      if (resizeObserver) resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [text, fontFamily, fontWeight, textColor, secondaryColor, colorMix, particleShape, particleSize, resolution, shatterForce, springTension, friction, interactionType, cursorRadius, effectiveFontSize]);

  const updateMouse = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = clientX - rect.left;
    mouseRef.current.y = clientY - rect.top;
  };

  return (
    <div 
      className={className}
      ref={containerRef} 
      style={{ width: "100%", height: "100%", position: "relative", zIndex: 10, ...style }}
      onMouseMove={e => {
        updateMouse(e.clientX, e.clientY);
        mouseRef.current.isActive = true;
      }}
      onMouseLeave={() => mouseRef.current.isActive = false}
      onTouchMove={e => {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
        mouseRef.current.isActive = true;
      }}
      onTouchEnd={() => mouseRef.current.isActive = false}
    >
      <div style={{ 
        visibility: "hidden", 
        pointerEvents: "none", 
        userSelect: "none", 
        fontFamily, 
        fontWeight, 
        fontSize: `${effectiveFontSize}px`, 
        lineHeight: currentLineHeight,
        whiteSpace: 'pre-wrap'
      }}>
        {Array.isArray(text) ? text.join('\n') : text}
      </div>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "block", pointerEvents: "none" }} />
    </div>
  );
}

export default InteractiveParticleText;
