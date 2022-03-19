const canvas = document.getElementById("canvas")
const ctx    = canvas.getContext("2d")
ctx.translate(0, canvas.height)
ctx.scale(1, -1)

class Particle {
  constructor(x, y, vx, vy, r, g, color) {
    this.x  = x
    this.y  = y
    this.vx = vx
    this.vy = vy
    this.r  = r
    this.g  = g
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
    

    console.log(`y: ${this.y} radius: ${this.r}`)

    if(this.y - this.r < 0){
      this.vx *= 0.7
      this.vy *= -0.7
      this.y   = this.r
    }
    this.render()
  }
}

const initialX  = 100 
const initialY  = 100 
const initialVX = 3
const initialVY = 10
const radius    = 20
const g         = -0.2
const color = "#66FF66"

const particle = new Particle(initialX, initialY, initialVX, initialVY, radius, g, color)

function radiusChange(event){
  particle.r = Number(radiusSliderElem.value)
  console.log(`radius: ${typeof particle.r}`)
  console.log(particle.r)
  sliderValueElm.innerText = radiusSliderElem.value
}

const radiusSliderElem = document.getElementById('radiusSlider') 
const sliderValueElm   = document.getElementById('radius') 
sliderValueElm.innerText = particle.r
radiusSliderElem.addEventListener('input', radiusChange)

function render() {
  particle.update()
  window.requestAnimationFrame(render)
}

function startAnime(){
  document.getElementById("start").disabled = true
  render()
}

function resetAnime(){
  particle.x  = initialX
  particle.y  = initialY
  particle.vx = initialVX
  particle.vy = initialVY
}

function colorChange(val){
  console.log(val)
  particle.color = val
}
