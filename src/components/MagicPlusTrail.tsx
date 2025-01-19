"use client"

import { useState, useEffect, useCallback } from "react"

// Define constants to avoid magic numbers
const TRAIL_LENGTH = 20
const MOUSE_MOVE_THROTTLE = 30
const ANIMATION_INTERVAL = 16
const OPACITY_DURATION = 1000
const SIZE_SCALE_FACTOR = 0.98

interface PlusParticle {
  readonly id: number
  readonly x: number
  readonly y: number
  readonly rotation: number
  size: number
  opacity: number
  readonly createdAt: number
}

interface PlusStyles {
  left: number
  top: number
  zIndex: number
  transform: string
}

interface ParticleProps {
  plus: PlusParticle
}

// Separate Plus component for better organization
const Plus: React.FC<ParticleProps> = ({ plus }) => {
  const styles: PlusStyles = {
    left: plus.x,
    top: plus.y,
    zIndex: 10000,
    transform: `translate(-50%, -50%) rotate(${plus.rotation}deg)`,
  }

  return (
    <div key={plus.id} className="fixed" style={styles}>
      <div
        style={{
          width: plus.size,
          height: plus.size,
          opacity: plus.opacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "45%",
            width: "10%",
            height: "100%",
            backgroundColor: "white",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "45%",
            width: "100%",
            height: "10%",
            backgroundColor: "white",
          }}
        />
      </div>
    </div>
  )
}

export default function MagicPlusTrail(): JSX.Element {
  const [enabled, setEnabled] = useState<boolean>(true)
  const [trail, setTrail] = useState<readonly PlusParticle[]>([])

  const createParticle = useCallback(
    (x: number, y: number): PlusParticle => ({
      id: Math.random(),
      x,
      y,
      rotation: Math.random() * 360,
      size: 30,
      opacity: 1,
      createdAt: Date.now(),
    }),
    []
  )

  const updateParticles = useCallback(
    (now: number) =>
      (particles: readonly PlusParticle[]): PlusParticle[] => {
        return particles
          .map((plus) => ({
            ...plus,
            opacity: Math.max(0, 1 - (now - plus.createdAt) / OPACITY_DURATION),
            size: plus.size * SIZE_SCALE_FACTOR,
          }))
          .filter((plus) => plus.opacity > 0)
      },
    []
  )

  useEffect(() => {
    if (!enabled) {
      setTrail([])
      return
    }

    let lastTime = Date.now()

    const handleMouseMove = (e: MouseEvent): void => {
      const currentTime = Date.now()
      if (currentTime - lastTime < MOUSE_MOVE_THROTTLE) return
      lastTime = currentTime

      const newPlus = createParticle(e.clientX, e.clientY)
      setTrail((prev) => [...prev, newPlus].slice(-TRAIL_LENGTH))
    }

    const animationInterval = setInterval(() => {
      const now = Date.now()
      setTrail((prev) => updateParticles(now)(prev))
    }, ANIMATION_INTERVAL)

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(animationInterval)
    }
  }, [enabled, createParticle, updateParticles])

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      <button
        onClick={() => setEnabled((prev) => !prev)}
        className="fixed bottom-4 right-4 px-4 py-2 bg-white text-black rounded pointer-events-auto"
        type="button"
      >
        {enabled ? "Disable" : "Enable"} Trail
      </button>

      {trail.map((plus) => (
        <Plus key={plus.id} plus={plus} />
      ))}
    </div>
  )
}
