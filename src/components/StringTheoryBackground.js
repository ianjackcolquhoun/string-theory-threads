// components/StringTheoryBackground.js
import { useEffect, useRef } from 'react'

export default function StringTheoryBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const mouseTrailRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let animationFrameId
    let time = 0

    // Mouse trail particle class
    class TrailParticle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.life = 1
        this.color = `hsla(${Math.random() * 60 + 200}, 100%, 70%, ${this.life})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life -= 0.02
        this.color = `hsla(${Math.random() * 60 + 200}, 100%, 70%, ${this.life})`
        this.size *= 0.99
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // String theory particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 30 + 1
        this.size = Math.random() * 3 + 1
        this.color = `hsla(${Math.random() * 60 + 200}, 70%, 50%, 0.8)`
        this.angle = Math.random() * 360
        this.velocity = Math.random() * 0.02
      }

      update() {
        // Orbital movement
        this.angle += this.velocity
        this.x = this.baseX + Math.cos(this.angle) * 50
        this.y = this.baseY + Math.sin(this.angle) * 50

        // Mouse interaction
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const maxDistance = 100
        const force = (maxDistance - distance) / maxDistance

        if (distance < maxDistance) {
          this.x += forceDirectionX * force * 2
          this.y += forceDirectionY * force * 2
        }

        // Keep particles within bounds
        if (this.x < 0 || this.x > canvas.width) this.baseX = Math.random() * canvas.width
        if (this.y < 0 || this.y > canvas.height) this.baseY = Math.random() * canvas.height
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = this.color
      }
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < 150; i++) {
        particles.push(new Particle())
      }
    }

    const drawConnections = () => {
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            gradient.addColorStop(0, p1.color)
            gradient.addColorStop(1, p2.color)
            ctx.strokeStyle = gradient
            ctx.lineWidth = (100 - distance) / 50
            ctx.stroke()
          }
        })
      })
    }

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      // Add new trail particles
      for (let i = 0; i < 3; i++) {
        mouseTrailRef.current.push(new TrailParticle(e.clientX, e.clientY))
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 20, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections with gradient
      drawConnections()

      // Update and draw mouse trail
      mouseTrailRef.current = mouseTrailRef.current.filter(particle => particle.life > 0)
      mouseTrailRef.current.forEach(particle => {
        particle.update()
        particle.draw()
      })

      time += 0.01
      animationFrameId = requestAnimationFrame(animate)
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ backgroundColor: '#000014' }}
    />
  )
}