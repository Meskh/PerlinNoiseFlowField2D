/* Class.js
 * Developer: Aleksandre Meskhi
 * Date: July 2024
 */

let flowField = [[]]
let particles = []
let zOff = 0
let dimensionWidth = 0
let dimensionHeight = 0

// play around with these parameters for different results
const flowFieldResolution = 50      // resolution of grid vectors
const zstep = 0.01                  // how quick the vectors (direction of particles) change
const numberOfParticles = 5000      
const flowGridResolution = 5        // how different the adjacent cell vectors are within the perlin space (recommended 5)
const flowStrength = 2              // how much the direction of the particle velocity is influenced by the field vector
const maxSpeed = 4                  // maximum (and usually average) speed of the particles
const backgroundColor = [2, 2, 50]  // r,g,b 
const particleColor = [255, 255, 255, 5]  // r,g,b,hue
/* adds a random factor to the color of each particle. format: [[RedStart, RedEnd], [GreenStart, GreenEnd], [BlueStart, BlueEnd]] 
 * To keep the original color with no changes, set to [[1, 1], [1, 1], [1, 1]]
 * Example: 
 * if set to [[1, 1], [0, 1], [0, 1]], green and blue components of the original color have a chance to be reduced
 * and hence the particles will be mostly influenced by the red component of the initial color
*/
const randomColorScale = [[0, 1], [0, 1], [0, 1]]  


function setup() {
  dimensionWidth = windowWidth
  dimensionHeight = windowHeight
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
  //displayFlowField(flowField);

  flowField = updateFlowField(zOff, flowGridResolution)
  zOff += zstep
  console.log(frameRate())

}

// return a flow field (2d vector array) based on the z offset (moving through perlin planes)
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

// Show small lines pointing to the direction of the vector in a given cell within a grid
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

// create particle objects array (see classes.js for class definition)
function createParticles(numOfParticles) {
  array = []
  for (let i = 0; i < numOfParticles; i++) {
    adjustedColor = [particleColor[0] * random(randomColorScale[0][0], randomColorScale[0][1]), particleColor[1] * random(randomColorScale[1][0], randomColorScale[1][1]), particleColor[2] * random(randomColorScale[2][0], randomColorScale[2][1]), particleColor[3]]
    array.push(new Particle(maxSpeed, adjustedColor))
  }
  return array
}

// display and update particles 
function displayParticles(array, flowField, flowFieldResolution) {
  push()
  for (let particle of array) {
    particle.applyFlowForce(flowField, flowFieldResolution, flowStrength)
    particle.move()
    particle.show()
  }
  pop()
}

/* Class.js
 * Developer: Aleksandre Meskhi
 * Date: July 2024
 */

