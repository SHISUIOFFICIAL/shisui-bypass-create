document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("matrixCanvas")
  const ctx = canvas.getContext("2d")

  // Set canvas dimensions to fill the window
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Characters for the matrix rain
  const characters = "0123456789ABCDEF" // Hex characters for a more "hacker" feel
  const fontSize = 16
  const columns = canvas.width / fontSize

  // Array to store the y-position of each column for matrix rain
  const drops = []
  for (let i = 0; i < columns; i++) {
    drops[i] = 1 // Start at the top
  }

  // Array to store circle properties
  const circles = []
  const maxCircles = 10 // Number of circles to animate concurrently

  // Function to draw the matrix rain
  function drawMatrix() {
    // Semi-transparent black rectangle to fade out old characters
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Green color for the characters
    ctx.fillStyle = "#0F0" // Bright green
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length))
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      // Send the drop back to the top randomly
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }

      // Increment y-position
      drops[i]++
    }
  }

  // Function to draw and animate circles
  function drawCircles() {
    // Add new circles if below max
    if (circles.length < maxCircles && Math.random() < 0.05) {
      // Randomly add new circles
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 50 + 20, // Random radius between 20 and 70
        alpha: 0.5, // Initial opacity
        speed: Math.random() * 0.5 + 0.1, // Speed of fading
        lineWidth: Math.random() * 2 + 0.5, // Line width
      })
    }

    // Update and draw existing circles
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i]
      ctx.strokeStyle = `rgba(0, 255, 0, ${circle.alpha})` // Faint green circles
      ctx.lineWidth = circle.lineWidth

      ctx.beginPath()
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
      ctx.stroke()

      circle.alpha -= 0.005 // Fade out
      circle.radius += circle.speed // Grow

      // Remove faded circles
      if (circle.alpha <= 0) {
        circles.splice(i, 1)
        i--
      }
    }
  }

  // Animation loop
  function animate() {
    drawMatrix()
    drawCircles() // Call the circle drawing function
    requestAnimationFrame(animate)
  }

  // Start the animation
  animate()

  // Handle window resizing
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    drops.length = 0 // Reset drops for new column count
    const newColumns = canvas.width / fontSize
    for (let i = 0; i < newColumns; i++) {
      drops[i] = 1
    }
    circles.length = 0 // Clear circles on resize
  })
})
