// components/SparklyMouseTrail.js
import { useEffect, useRef } from 'react'

export default function SparklyMouseTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.life = 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life -= 0.02
        this.size *= 0.99
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${Math.random() * 60 + 200}, 100%, 70%, ${this.life})`
        ctx.shadowBlur = 15
        ctx.shadowColor = `hsla(${Math.random() * 60 + 200}, 100%, 70%, ${this.life})`
        ctx.fill()
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(x, y))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles = particles.filter(p => p.life > 0)
      particles.forEach(p => {
        p.update()
        p.draw()
      })

      requestAnimationFrame(animate)
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  )
}