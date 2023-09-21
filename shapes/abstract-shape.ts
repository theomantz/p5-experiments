import P5 from "p5";
/**
 * Abstract shape class
 * @abstract
 * @class Shape
 * @property {P5} _p5 - the p5 instance
 * @property {P5.Vector} _pos - the position of the shape
 * @property {number} _size - the size of the shape
 * @property {number[]} _fill - the fill color of the shape
 *
 * @constructor
 * @param {P5} p5 - the p5 instance
 * @param {P5.Vector} pos - the position of the shape
 * @param {number} size - the size of the shape
 * @param {number[]} fill - the fill color of the shape
 */
export default abstract class Shape {
  _p5: P5;
  _pos: P5.Vector;
  _size: number;
  _fill: number[] | P5.Color;

  constructor(p5: P5, pos: P5.Vector, size: number, fill: number[] | P5.Color) {
    this._p5 = p5;
    this._pos = pos;
    this._size = size;
    this._fill = fill;
  }

  draw(): void {}
}
