import P5 from "p5";
import Axis from "../../enums";

/**
 * This function is a modified version of the setGradient function from the p5.js reference  https://p5js.org/examples/color-linear-gradient.html
 * @param p5: P5 - the p5 instance
 * @param x: number - the x position of the gradient
 * @param y: number - the y position of the gradient
 * @param width: number - the width of the gradient bounds
 * @param height: number - the height of the gradient bounds
 * @param c1: P5.Color - the first color of the gradient
 * @param c2: P5.Color - the second color of the gradient
 * @param axis: Axis - the axis of the gradient
 */
export default function setGradient(
  p5: P5,
  x: number,
  y: number,
  width: number,
  height: number,
  c1: P5.Color,
  c2: P5.Color,
  axis: Axis
) {
  p5.noFill();
  console.log(p5);
  if (axis === Axis.Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + height; i++) {
      let inter = p5.map(i, y, y + height, 0, 1);
      let c = p5.lerpColor(c1, c2, inter);
      p5.stroke(c);
      p5.line(x, i, x + width, i);
    }
  } else if (axis === Axis.X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + width; i++) {
      let inter = p5.map(i, x, x + width, 0, 1);
      let c = p5.lerpColor(c1, c2, inter);
      p5.stroke(c);
      p5.line(i, y, i, y + height);
    }
  } else if (axis === Axis.DIAGONAL) {
    // Diagonal gradient
    const diagonalLength = Math.sqrt(width * width + height * height);
    for (let i = 0; i <= diagonalLength; i++) {
      let inter = p5.map(i, 0, diagonalLength, 0, 1);
      let c = p5.lerpColor(c1, c2, inter);
      p5.stroke(c);
      p5.line(x, y, x + i, y + i);
    }
  }
}
