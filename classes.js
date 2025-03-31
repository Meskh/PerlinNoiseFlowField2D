
class Particle {
    constructor(maxSpeed, color) {
        this.position = createVector(random(dimensionWidth), random(dimensionHeight))
        this.previousPosition = this.position.copy()
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.maxSpeed = maxSpeed
        this.color = color

    }    
    show() {
        push()
        noFill()
        stroke(this.color[0], this.color[1], this.color[2], this.color[3])
        line(this.position.x, this.position.y, this.previousPosition.x, this.previousPosition.y)
        this.updatePreviousPosition()
        pop()
        return this.position
    }
    move() {
        this.edges()
        this.velocity.limit(this.maxSpeed)
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
        this.acceleration.mult(0)
    }
    applyForce(force) {
        this.acceleration.add(force)
    }
    applyFlowForce(flowField, flowFieldResolution, strength) {
        let ix = int(map(this.position.x, 0, dimensionWidth, 0, flowFieldResolution - 1))
        let iy = int(map(this.position.y, 0, dimensionHeight, 0, flowFieldResolution - 1))
        this.acceleration.add(flowField[ix][iy])
        this.acceleration.mult(strength)
    }
    edges() {
        if (this.position.x < 0) {
            this.position.x = dimensionWidth;
            this.updatePreviousPosition()
        }
        else if (this.position.x > dimensionWidth) {
            this.position.x = 0;
            this.updatePreviousPosition()
        }
        if (this.position.y < 0) {
            this.position.y = dimensionHeight;
            this.updatePreviousPosition()
        }
        else if (this.position.y > dimensionHeight) {
            this.position.y = 0;
            this.updatePreviousPosition()
        }
    }
    updatePreviousPosition() {
        this.previousPosition = this.position.copy()
    }
}



class Queue {
    constructor() {
        this.items = {}
        this.frontIndex = 0
        this.backIndex = 0
    }
    enqueue(item) {
        this.items[this.backIndex] = item
        this.backIndex++
        return item + ' inserted'
    }
    dequeue() {
        const item = this.items[this.frontIndex]
        delete this.items[this.frontIndex]
        this.frontIndex++
        return item
    }
    peek() {
        return this.items[this.frontIndex]
    }
    getQueue() {
        return Object.values(this.items);
    }
}