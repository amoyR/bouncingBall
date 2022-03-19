const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.translate(0, canvas.height)
ctx.scale(1, -1)

class Particle {
  constructor(x, y, radius, vx, vy, color, g) {
    this.x = x
    this.y = y
    this.radius = radius
    this.vx = vx
    this.vy = vy
    this.color = color
    this.g = g
  }
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
  update() {
    this.x += this.vx
    this.vy += this.g
    this.y += this.vy 
    

    console.log(`y: ${typeof this.y} radius: ${this.radius}`)

    if(this.y - this.radius < 0){
      this.vx *= 0.7
      this.vy *= -0.7
      this.y = this.radius
    }
    this.render()
  }
}

const x = 100 
const y = 100 
const radius= 20
const vx = 3
const vy = 10
const color = "#66FF66"
const g = -0.2


//
//function setCurrentValue(val){
//  currentValueElem.innerText = val
//}
////const setCurrentValue = (val) => {
////    currentValueElem.innerText = val;
////}
////const radius = setCurrentValue 
////console.log(setCurrentValue)
//
//function rangeOnChange(e){
//  console.log(e.target)
//  console.log(e.target.value)
//  setCurrentValue(e.target.value);
//  return e.target.value
//}
//
////const rangeOnChange = (e) =>{
////  const sliderValue = e.target.value
////  setCurrentValue(sliderValue);
////    //console.log(e.target.value)
////}
//
//window.onload = () => {
//    inputElem.addEventListener('input', rangeOnChange); 
//    setCurrentValue(inputElem.value); 
//}

const bounce = new Particle(x, y, radius, vx, vy, color, g)

function radiusChange(event){
  bounce.radius = Number(radiusSliderElem.value)
  console.log(`radius: ${typeof bounce.radius}`)
  //bounce.radius = 100
  console.log(bounce.radius)
  currentRadiusSliderValue.innerText = bounce.radius
}
const radiusSliderElem = document.getElementById('radiusSlider'); 
const currentRadiusSliderValue = document.getElementById('radius'); 
currentRadiusSliderValue.innerText = bounce.radius
radiusSliderElem.addEventListener('input', radiusChange); 

function render() {
  bounce.update()
  window.requestAnimationFrame(render)
}

function vxChange(event){
  bounce.x = x
  bounce.y = y
  bounce.vx = vxSliderElem.value
  currentvxSliderValue.innerText = vxSliderElem.value
}
const vxSliderElem = document.getElementById('vxSlider'); 
const currentvxSliderValue = document.getElementById('vx'); 
currentvxSliderValue.innerText = vxSliderElem.value
vxSliderElem.addEventListener('input', vxChange); 

function startAnime(){
  document.getElementById("start").disabled = true
  //document.getElementById("str")
  render()
}

function resetAnime(){
  bounce.x = x
  bounce.y = y
  bounce.vx = vx
  bounce.vy = vy
  //bounce.color = color
  //bounce.g = g
}

//function colorChange(){
//  const red = Math.floor(Math.random()*256)
//  const green = Math.floor(Math.random()*256)
//  const blue = Math.floor(Math.random()*256)
//  const alpha = Math.floor(Math.random()*101) 
//  bounce.color= "rgb("+red+", "+green+", "+blue+","+alpha+")"
//}

function colorChange(val){
  console.log(val)
  bounce.color = val
}
//document.getElementById('main').onclick = function () {
//    this.style.backgroundColor = "#3fb811";
//};
