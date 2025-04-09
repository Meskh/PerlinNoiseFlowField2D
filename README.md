# 🌬️ 2 Dimensional Flow Field Animation

This is a generative art project built with [p5.js](https://p5js.org/) that simulates particle movement influenced by a 2D flow field. Particles are dropped onto the canvas and follow a vector field generated using Perlin noise. Over time, they trace intricate, flowing paths, resulting in stunning and organic visuals. This project was inspired and heavily influenced by the following "Coding Train" video https://www.youtube.com/watch?v=BjoM9oKOAKY

---

## ✨ Demo

![flowfield-preview](preview.png)  
*Add a GIF or screenshot of your output here*

---

## 🧠 How It Works

- The canvas is divided into a grid where each cell contains a directional vector.
- These vectors are generated using 3D Perlin noise (`x`, `y`, `z`), with the `z` axis changing over time for animated flow.
- Thousands of particles are initialized with random positions and move based on the vector direction in their current grid cell.
- As particles move, they draw lines from their previous to current positions, building a beautiful flow pattern.
- The system wraps particles around the canvas edges.

---

## 📁 Files

- `sketch.js` – Sets up the canvas, updates the flow field, and controls the animation loop.
- `class.js` – Defines the `Particle` class and its behavior (movement, rendering, interaction with flow).

---

## 🎨 Customization

You can change the following parameters in `sketch.js` to experiment with different visuals:

```js
const numberOfParticles = 5000
const flowStrength = 2
const maxSpeed = 4
const particleColor = [255, 255, 255, 5] // RGBA
const backgroundColor = [2, 2, 50]       // RGB
const flowGridResolution = 10
const flowFieldResolution = 30
```

You can also adjust how `p5.Vector.fromAngle(...)` is calculated inside `updateFlowField` for more dramatic or subtle directional changes.

---

## 🚀 Getting Started

To run this project:

1. Clone the repository or download the files.
2. Open `index.html`.
3. Make sure p5.js is linked properly.
4. Open in browser.

---

## 🐾 Credits

Built using [p5.js](https://p5js.org/).
Inspired by "The Coding Train" Challenge 24 [The Coding Train](https://www.youtube.com/@TheCodingTrain).
Created by Aleksandre Meskhi [LinkedIn](https://www.linkedin.com/in/aleksandre-meskhi/).

