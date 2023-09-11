import P5 from "p5";
import { getRandomIndexOfArray, randomNumber } from "./utils";
import Circle from "../shapes/circle";
import vaporWave from "../utils/color-palettes";
import setGradient from "../utils/color-utils";
import Axis from "../enums";

const sketch = (p5: P5) => {
  const circles: Circle[] = [];
  let colorOne: P5.Color;
  let colorTwo: P5.Color;
  p5.setup = () => {
    p5.noLoop();
    const canvas = p5.createCanvas(p5.windowWidth / 3, p5.windowHeight - 20);
    canvas.parent("app");
    canvas.center("horizontal");

    colorOne = p5.color(vaporWave[getRandomIndexOfArray(vaporWave.length)]);
    colorTwo = p5.color(vaporWave[getRandomIndexOfArray(vaporWave.length)]);

    for (let i = 1; i < 4; i++) {
      const p = p5.width / 4;
      const circlePos = p5.createVector(p * i, p5.height / 2);
      let size = i % 2 == 0 ? 56 : 32;
      const color = vaporWave[getRandomIndexOfArray(vaporWave.length)];
      circles.push(new Circle(p5, circlePos, size, color));
      if (i % 2 == 0) {
        let size = i % 2 == 0 ? 32 : 56;
        circles.push(
          new Circle(
            p5,
            p5.createVector(p5.width / 2, p5.height * 0.75),
            size,
            color
          )
        );
        circles.push(
          new Circle(
            p5,
            p5.createVector(p5.width / 2, p5.height * 0.25),
            size,
            color
          )
        );
      }
    }
  };

  p5.draw = () => {
    setGradient(p5, 0, 0, p5.width, p5.height, colorOne, colorTwo, Axis.Y_AXIS);
    circles.forEach((circle) => circle.draw());
  };
};

new P5(sketch);
