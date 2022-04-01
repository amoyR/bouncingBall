const canvas = document.getElementById("canvas")
const ctx    = canvas.getContext("2d")

class Ball {
  constructor(r, color, canvas) {
    this.r = r 
    this.color = color
    this.canvas = canvas
  } 

  isColliding(y) {
    return y + this.r > this.canvas.height
  }

  boundaryAligment() {
    return this.canvas.height - this.r
  }

  render(x, y) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.beginPath()
    ctx.arc(x, y, this.r, 0, Math.PI * 2, true)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

}

class Text {
  constructor(textContent, color, canvas) {
    this.textContent =  textContent
    this.color = color
    this.canvas = canvas
  } 

  isColliding(y) {
    return y > this.canvas.height
  }

  boundaryAligment() {
    return this.canvas.height
  }

  render(x, y){
    ctx.font = "20px sans-serif"
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillText(this.textContent, x, y)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
}



class BounceEngine {
  constructor(x, y, vx, vy, g, objectType) {
    this.x  = x
    this.y  = y
    this.vx = vx
    this.vy = vy
    this.g  = g

    this.setObjectType(objectType)
  }

  setObjectType(bt) {
    this.objectType = bt
  }

  update() {
    this.vy += this.g

    this.x  += this.vx
    this.y  += this.vy 

    if( this.objectType.isColliding(this.y) ){
      this.vx *= 0.7
      this.vy *= -0.7

      this.y   = this.objectType.boundaryAligment()
    }

    this.objectType.render(this.x, this.y)
  }

}

const initialX    = 100 
const initialY    = 100 
const initialVX   = 3
const initialVY   = -5
const g           = 0.2
let   objectType 

//const text = new Text("Hello", "#000000", canvas)
//const ball = new Ball(10, "#000000", canvas) 
const bounceEngine = new BounceEngine(initialX, initialY, initialVX, initialVY, g, objectType)

function startAnimation(){
  bounceEngine.update()
  window.requestAnimationFrame(startAnimation)
  document.getElementById("start").disabled = true
}
function objectStatus(){
  

  //const obelm = document.getElementById("objectStatus")
  //const obradio = document.querySelector('[name="draw"]:checked');
  //const obval = obradio.value;
  //console.log(obval)
  //const elm = document.getElementById("objectStatus")
  //const radio = document.querySelector('[name="color"]:checked');
  //const val = radio.value;
  //console.log(val)

  //console.log(`draw: ${draw}`)
  const objectTypeValue = getValue(objectType, "draw")
  const objectColorValue = getValue(colorType, "color")
  console.log(objectTypeValue)
  console.log(objectColorValue)


  //const objectStatusElm = document.getElementById("objectStatus")
  //const colorFormElmName = objectStatusElm.color 
  //console.log(colorFormElmName)
  //console.log(colorFormElmName.value)
  //const objectStatusElmName = objectStatusElm.draw 
  //console.log(objectStatusElmName)
  if (objectTypeValue == "ball"){
    console.log("ball")
    const ball = new Ball(10, objectColorValue, canvas) 
    bounceEngine.setObjectType(ball)
  } else {
    const text = new Text("Hello", objectColorValue, canvas)
    bounceEngine.setObjectType(text)
  }
}
objectStatus()
function getValue (id, typeName){
  const elm = document.getElementById("id")
  //const elmName = document.querySelector('[name="typeName"]:checked') 
  const elmName = document.querySelector(`[name="${typeName}"]:checked`) 
  console.log(elmName)
  const val = elmName.value
  return val
}
  
    

//function drawBouncingBall(){
//  const ball = new Ball(10, "#000000", canvas) 
//  bounceEngine.setObjectType(ball)
//  console.log("hello")
//}
//
//function drawBouncingText(){
//  const text = new Text("Hello", "#000000", canvas)
//  bounceEngine.setObjectType(text)
//}
//
//
////const redRadioElm = document.getElementById("colorRadioR")
////ball.color = redRadioElm.value
////text.color = redRadioElm.value
//function changeColor(){
//  const colorFormElm = document.getElementById("objectStatus")
//  const objectStatusElmName = objectStatusElm.color 
//  const len = objectStatusElmName.length
//  for (let i = 0; i < len; i++){
//    if (objectStatusElmName.item(i).checked){
//      checkValue = objectStatusElmName.item(i).value;
//      if (checkValue == "ball"){
//        const ball = new Ball(10, "#000000", canvas) 
//        bounceEngine.setObjectType(ball)
//      } else {
//        const text = new Text("Hello", "#000000", canvas)
//        console.log(text.textContent)
//        bounceEngine.setObjectType(text)
//      }
//    }
//  }
//}
//  //ball.color = val
//  //text.color = val
//}

//const textBox  = document.getElementById("msg")
//const goButton = document.getElementById("goButton")
//goButton.addEventListener("click", setText)
//
//function setText(){
//  text.textContent = textBox.value
//}

function resetAnimation(){
  bounceEngine.x  = initialX
  bounceEngine.y  = initialY
  bounceEngine.vx = initialVX
  bounceEngine.vy = initialVY
}
