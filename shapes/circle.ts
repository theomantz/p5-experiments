import P5 from "p5";
import Shape from "./abstract-shape";

/**
 * Basic circle shape
 * @extends Shape
 */

export default class Circle extends Shape {
  draw() {
    const p5 = this._p5; // just for convenience

    p5.push();

    p5.translate(this._pos);
    p5.noStroke();
    p5.fill(this._fill as P5.Color);
    p5.ellipse(0, 0, this._size);

    p5.pop();
  }
}
