const canvas = document.getElementById("canvas")
const ctx    = canvas.getContext("2d")
ctx.font     = "20px sans-serif"

class Particle {
  constructor(x, y, vx, vy, r, g, color) {
    this.x     = x
    this.y     = y
    this.vx    = vx
    this.vy    = vy
    this.r     = r
    this.g     = g
    this.color = color
  }
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
  update() {
    this.x  += this.vx
    this.vy += this.g
    this.y  += this.vy 
    
    if(this.y + this.r > canvas.height){
      this.vx *= 0.7
      this.vy *= -0.7
      this.y   = canvas.height - this.r
    }
    this.render()
  }
}

const particleInitialX  = 100 
const particleInitialY  = 100 
const particleInitialVX = 3
const particleInitialVY = -5
const radius            = 20
const g                 = 0.2
const color             = "#800080"

const particle = new Particle(particleInitialX, particleInitialY, particleInitialVX, particleInitialVY, radius, g, color)

function drawBouncingParticle (){
  particle.update()
  window.requestAnimationFrame(drawBouncingParticle)
}

class Text {
  constructor(x, y, vx, vy, g, text, color) {
    this.x     = x
    this.y     = y
    this.vx    = vx
    this.vy    = vy
    this.g     = g
    this.text  = text
    this.color = color
  }
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillText(this.text, this.x, this.y)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
  update() {
    this.x  += this.vx
    this.vy += this.g
    this.y  += this.vy 
    

    //console.log(`y: ${this.y} text: ${this.text}`)

    if(this.y > canvas.height){
      this.vx *= 0.7
      this.vy *= -0.7
      this.y   = canvas.height
    }
    this.render()
  }
}

const textInitialX  = 100 
const textInitialY  = 100 
const textInitialVX = 3
const textInitialVY = -5
let   textContent   = "Hello" 

const text = new Text(textInitialX, textInitialY, textInitialVX, textInitialVY, g, textContent, color)

function drawBouncingText (){
  text.update()
  window.requestAnimationFrame(drawBouncingText)
}

function resetAnime(){
  particle.x  = particleInitialX
  particle.y  = particleInitialY
  particle.vx = particleInitialVX
  particle.vy = particleInitialVY
  text.x      = textInitialX
  text.y      = textInitialY
  text.vx     = textInitialVX
  text.vy     = textInitialVY
}

const textBox  = document.getElementById("msg")
const goButton = document.getElementById("goButton")
goButton.addEventListener("click", setText)

function setText(){
  text.text = textBox.value
  console.log(text.text)
}

