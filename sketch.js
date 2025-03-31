
const flowFieldResolution = 30
let flowField = [[]]
let particles = []
let zOff = 0

const zstep = 0.01
const numberOfParticles = 5000
const flowGridResolution = 10
const flowStrength = 2
const maxSpeed = 4
const backgroundColor = [2, 2, 50]
const particleColor = [255, 255, 255, 5]
const randomColorScale = [[0, 1], [0, 1], [0, 1]]
let MainCanvas = null
let dimensionWidth = 0
let dimensionHeight = 0
let recording = false

function setup() {
  dimensionWidth = windowWidth//windowWidth//200//7680
  dimensionHeight = windowHeight//windowHeight//200//4320
  MainCanvas = createCanvas(windowWidth, windowHeight);
  //camera(1200, -200, 1500, 0, 0, 0, 0, 1, 0);
  background(backgroundColor);
  flowField = updateFlowField(0, flowGridResolution)
  particles = createParticles(numberOfParticles)
  //saveGif('Winds', 2)
}

function draw() {
  //background(backgroundColor)
  displayParticles(particles, flowField, flowFieldResolution)
  
  flowField = updateFlowField(zOff, flowGridResolution)
  zOff += zstep
  console.log(frameRate())
  
  
  
}

function updateFlowField(zOff, resolution) {
  let array = [[]]
  for (let x = 0; x <= flowFieldResolution; x++) {
    for (let y = 0; y <= flowFieldResolution; y++) {
      array[x].push(p5.Vector.fromAngle(noise(x / resolution,y / resolution, zOff) * 2 * PI + 3 / 2 * PI))
    }
    array.push([])
  }
  return array
}

function displayFlowField(field) {
  for (let x = 0; x < flowFieldResolution; x++) {
    for (let y = 0; y < flowFieldResolution; y++) {
      push()
      stroke(255)
      translate(x * dimensionWidth / flowFieldResolution, y * dimensionHeight / flowFieldResolution)
      rotate(field[x][y].heading())
      line(0, 0, 20, 0)

      pop()
    }
  }
}

function createParticles(numOfParticles) {
  array = []
  for (let i = 0; i < numOfParticles; i++) {
    adjustedColor = [particleColor[0] * random(randomColorScale[0][0], randomColorScale[0][1]), particleColor[1] * random(randomColorScale[1][0], randomColorScale[1][1]), particleColor[2] * random(randomColorScale[2][0], randomColorScale[2][1]), particleColor[3]]
    array.push(new Particle(maxSpeed, adjustedColor))
  }
  return array
}

function displayParticles(array, flowField, flowFieldResolution) {
  push()
  //beginShape()
  for (let particle of array) {
    particle.applyFlowForce(flowField, flowFieldResolution, flowStrength)
    particle.move()
    particle.show()
    //newVertex = particle.show()
    fill(50, 50, 50)
    //vertex(newVertex.x, newVertex.y)
    
  }
  //endShape()
  pop()
}

