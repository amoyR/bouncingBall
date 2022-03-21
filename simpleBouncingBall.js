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
    

    //console.log(`y: ${this.y} radius: ${this.r}`)

    if(this.y - this.r < 0){
      this.vx *= 0.7
      this.vy *= -0.7
      this.y   = this.r
    }
    this.render()
  }
}

const initialX      = 100 
const initialY      = 100 
let   initialVX     = 3
let   initialVY     = 10
let   radius        = 20
let   g             = -0.2
const color         = "#66FF66"

const particle = new Particle(initialX, initialY, initialVX, initialVY, radius, g, color)

function radiusChange(event){
  particle.r = Number(radiusSliderElem.value)
  console.log(`radius: ${typeof particle.r}`)
  console.log(particle.r)
  radiusSliderValueElm.innerText = radiusSliderElem.value
}

const radiusSliderElem         = document.getElementById('radiusSlider') 
const radiusSliderValueElm     = document.getElementById('radius') 
radiusSliderValueElm.innerText = particle.r
radiusSliderElem.addEventListener('input', radiusChange)

function vxChange(event){
  initialVX = Number(vxSliderElem.value)
  vxSliderValueElm.innerText = vxSliderElem.value
}

const vxSliderElem         = document.getElementById('vxSlider') 
const vxSliderValueElm     = document.getElementById('vx') 
vxSliderValueElm.innerText = particle.vx
vxSliderElem.addEventListener('input', vxChange)


function vyChange(event){
  initialVY = Number(vySliderElem.value)
  vySliderValueElm.innerText = vySliderElem.value
}

const vySliderElem         = document.getElementById('vySlider') 
const vySliderValueElm     = document.getElementById('vy') 
vySliderValueElm.innerText = particle.vy
vySliderElem.addEventListener('input', vyChange)

function gChange(event){
  particle.g = Number(gSliderElem.value)
  console.log(particle.g)
  gSliderValueElm.innerText = gSliderElem.value
}

const gSliderElem         = document.getElementById('gSlider') 
const gSliderValueElm     = document.getElementById('g') 
gSliderValueElm.innerText = particle.g
gSliderElem.addEventListener('input', gChange)

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
  particle.color = val
}

const redRadioElm = document.getElementById("colorRadioR")
particle.color = redRadioElm.value

