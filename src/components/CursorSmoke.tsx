
import React, { useEffect, useState, useRef } from 'react';

interface SmokeParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
}

const CursorSmoke: React.FC = () => {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const particleIdCounter = useRef(0);
  
  // Color palette for smoke particles
  const colors = [
    '#9b60fb', // primary purple
    '#7e4fd4', // dark purple
    '#b57ffb', // light purple
    '#a07dde', // medium purple
    '#8f56e8', // vibrant purple
  ];
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);
      
      // Reset the "moving" state after a short delay
      clearTimeout(window.mouseTimeout);
      window.mouseTimeout = window.setTimeout(() => {
        setIsMouseMoving(false);
      }, 100);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(window.mouseTimeout);
    };
  }, []);

  // Create new particles when mouse is moving
  useEffect(() => {
    if (isMouseMoving) {
      const createParticle = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = Math.random() * 20 + 10; // Size between 10-30
        const maxLife = Math.random() * 1000 + 500; // Life between 500-1500ms
        
        const newParticle: SmokeParticle = {
          id: particleIdCounter.current++,
          x: mousePosition.x + (Math.random() * 10 - 5), // Add slight variation
          y: mousePosition.y + (Math.random() * 10 - 5),
          size: randomSize,
          color: randomColor,
          opacity: 0.8,
          speedX: (Math.random() - 0.5) * 2, // Random direction
          speedY: (Math.random() - 0.5) * 2 - 1, // Slightly upward bias
          life: 0,
          maxLife: maxLife,
        };
        
        setParticles(prev => [...prev, newParticle]);
      };
      
      // Create particles at a steady rate when mouse is moving
      const interval = setInterval(createParticle, 30);
      return () => clearInterval(interval);
    }
  }, [isMouseMoving, mousePosition]);

  // Animation loop for updating particles
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      
      // Update particles
      setParticles(prevParticles => 
        prevParticles
          .map(particle => {
            // Update particle properties
            const life = particle.life + deltaTime;
            const lifeRatio = life / particle.maxLife;
            
            return {
              ...particle,
              x: particle.x + particle.speedX,
              y: particle.y + particle.speedY,
              size: particle.size + 0.2, // Grow slightly
              opacity: 0.8 * (1 - lifeRatio), // Fade out as life increases
              life: life,
              speedX: particle.speedX * 0.99, // Slow down over time
              speedY: particle.speedY * 0.99,
            };
          })
          // Remove dead particles
          .filter(particle => particle.life < particle.maxLife)
      );
    }
    
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  // Start animation loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full blur-md"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `translate(-50%, -50%)`,
            transition: 'opacity 0.2s ease-out',
          }}
        />
      ))}
    </div>
  );
};

export default CursorSmoke;
