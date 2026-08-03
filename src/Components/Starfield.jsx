import { useEffect, useRef } from 'react'

export default function Starfield({ warp, mousePosition }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const numStars = 220
    const stars = []

    // Initialize stars with 3D positions
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        color: getRandomStarColor(),
        size: Math.random() * 1.5 + 0.5,
      })
    }

    function getRandomStarColor() {
      const colors = [
        '#ffffff', // White
        '#ffffff',
        '#7c7cff', // Light Violet/Purple
        '#31d0c6', // Cyan
        '#e0e7ff', // Blue-white
        '#f472b6', // Light pink
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Animation Loop
    const draw = () => {
      // Semi-transparent background clear to create motion blur trails during warp
      if (warp) {
        ctx.fillStyle = 'rgba(3, 5, 11, 0.12)'
      } else {
        ctx.fillStyle = 'rgba(3, 5, 11, 0.25)' // slight trail for general drift
      }
      ctx.fillRect(0, 0, width, height)

      // Stars projection
      const centerX = width / 2
      const centerY = height / 2

      // Warp speed scale factor
      const speed = warp ? 35 : 1.2

      stars.forEach((star) => {
        // Star movement in Z plane (depth)
        star.z -= speed

        if (star.z <= 0) {
          star.z = width
          star.x = Math.random() * width - width / 2
          star.y = Math.random() * height - height / 2
        }

        // Project 3D coordinates to 2D screen
        const px = (star.x / star.z) * width * 0.8 + centerX
        const py = (star.y / star.z) * height * 0.8 + centerY

        // Include mouse offset drift
        const targetX = px + mousePosition.x * 25
        const targetY = py + mousePosition.y * 25

        // Star size gets larger as it gets closer
        const size = (1 - star.z / width) * 2.5 * star.size

        // Calculate tail coordinate for warp trails
        if (warp) {
          const tailZ = star.z + speed * 1.8
          const tx = (star.x / tailZ) * width * 0.8 + centerX + mousePosition.x * 25
          const ty = (star.y / tailZ) * height * 0.8 + centerY + mousePosition.y * 25

          // Draw warp streak lines
          ctx.beginPath()
          ctx.strokeStyle = star.color
          ctx.lineWidth = size * 0.8
          ctx.moveTo(targetX, targetY)
          ctx.lineTo(tx, ty)
          ctx.stroke()
        } else {
          // Draw standard circular star
          ctx.beginPath()
          ctx.fillStyle = star.color
          ctx.arc(targetX, targetY, Math.max(0.2, size), 0, Math.PI * 2)
          ctx.shadowBlur = size * 4
          ctx.shadowColor = star.color
          ctx.fill()
          ctx.shadowBlur = 0 // reset shadow
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [warp, mousePosition])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
