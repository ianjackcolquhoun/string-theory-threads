// components/PsychedelicBackground.js
import { useEffect, useRef } from 'react'

export default function PsychedelicBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const animate = () => {
      time += 0.01
      ctx.fillStyle = 'rgba(0, 0, 0, 0.01)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `hsl(${(time * 50 + i * 50) % 360}, 70%, 50%)`
        ctx.lineWidth = 2

        for (let j = 0; j < canvas.width; j += 10) {
          const y = Math.sin(j * 0.01 + time + i) * 100 + canvas.height / 2
          if (j === 0) {
            ctx.moveTo(j, y)
          } else {
            ctx.lineTo(j, y)
          }
        }
        ctx.stroke()
      }
      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  )
}