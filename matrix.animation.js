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

  // Array to store the y-position of each column
  const drops = []
  for (let i = 0; i < columns; i++) {
    drops[i] = 1 // Start at the top
  }

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

  // Function to draw subtle circles (optional, can be removed if not desired)
  function drawCircles() {
    ctx.strokeStyle = "rgba(0, 255, 0, 0.1)" // Faint green circles
    ctx.lineWidth = 1

    for (let i = 0; i < 5; i++) {
      // Draw a few circles
      const radius = Math.random() * 100 + 50
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const startAngle = Math.random() * Math.PI * 2
      const endAngle = startAngle + Math.random() * Math.PI * 1.5

      ctx.beginPath()
      ctx.arc(x, y, radius, startAngle, endAngle)
      ctx.stroke()
    }
  }

  // Animation loop
  function animate() {
    drawMatrix()
    // drawCircles(); // Uncomment if you want the circles
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
  })
})
