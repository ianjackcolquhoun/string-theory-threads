import { useState, useEffect } from 'react';

export default function MagicMouseTrail() {
  const [enabled, setEnabled] = useState(true);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    if (!enabled) {
      setTrail([]);
      return;
    }

    let lastTime = Date.now();

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < 30) return;
      lastTime = currentTime;

      // Create single plus sign with guaranteed visibility
      const newPlus = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        rotation: Math.random() * 360,
        size: 30,
        opacity: 1,
        createdAt: Date.now()
      };

      setTrail(prev => [...prev, newPlus].slice(-20));
    };

    // Animate particles
    const animationInterval = setInterval(() => {
      const now = Date.now();
      setTrail(prev => prev
        .map(plus => ({
          ...plus,
          opacity: Math.max(0, 1 - (now - plus.createdAt) / 1000),
          size: plus.size * 0.98,
        }))
        .filter(plus => plus.opacity > 0)
      );
    }, 16);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(animationInterval);
    };
  }, [enabled]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/90" />
      
      {/* Controls */}
      <button
        onClick={() => setEnabled(!enabled)}
        className="fixed bottom-4 right-4 px-4 py-2 bg-white text-black rounded pointer-events-auto"
      >
        {enabled ? 'Disable' : 'Enable'} Trail
      </button>

      {/* Plus signs */}
      {trail.map((plus) => (
        <div
          key={plus.id}
          className="fixed"
          style={{
            left: plus.x,
            top: plus.y,
            zIndex: 10000,
            transform: `translate(-50%, -50%) rotate(${plus.rotation}deg)`,
          }}
        >
          {/* Plus container */}
          <div 
            style={{ 
              width: plus.size, 
              height: plus.size,
              opacity: plus.opacity,
            }}
          >
            {/* Vertical line */}
            <div 
              style={{
                position: 'absolute',
                left: '45%',
                width: '10%',
                height: '100%',
                backgroundColor: 'white',
              }}
            />
            {/* Horizontal line */}
            <div 
              style={{
                position: 'absolute',
                top: '45%',
                width: '100%',
                height: '10%',
                backgroundColor: 'white',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}