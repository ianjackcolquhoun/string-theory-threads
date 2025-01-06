// components/WaveBackground.js
import { useEffect, useRef } from 'react'

export default function WaveBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const drawWave = (offset, amplitude, frequency, color) => {
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2)

      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * frequency + time + offset) * amplitude
          + Math.sin(x * frequency * 0.6 + time * 1.5) * amplitude * 0.5
        ctx.lineTo(x, canvas.height / 2 + y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.fillStyle = color
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      // Multiple wave layers with different properties
      drawWave(0, 50, 0.02, 'rgba(59, 130, 246, 0.2)')  // Light blue wave
      drawWave(2, 40, 0.015, 'rgba(99, 102, 241, 0.2)') // Indigo wave
      drawWave(4, 60, 0.01, 'rgba(139, 92, 246, 0.15)') // Purple wave
      drawWave(6, 45, 0.025, 'rgba(79, 70, 229, 0.1)')  // Darker blue wave

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ backgroundColor: 'transparent' }}
    />
  )
}