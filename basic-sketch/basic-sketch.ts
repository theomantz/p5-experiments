import P5 from "p5";
import { getRandomIndexOfArray, randomNumber } from "./utils";
import Circle from "../shapes/circle";
import vaporWave from "../utils/color-palettes";
import setGradient from "../utils/color-utils";
import Axis from "../enums";
import { generateGridPoints } from "../utils/geometric-utils";

const sketch = (p5: P5) => {
  const circles: Circle[] = [];
  let colorOne: P5.Color;
  let colorTwo: P5.Color;
  p5.setup = () => {
    p5.noLoop();
    const canvas = p5.createCanvas(p5.windowWidth / 2, p5.windowHeight - 20);
    canvas.parent("app");
    canvas.center("horizontal");
    console.log(p5);

    colorOne = p5.color(vaporWave[getRandomIndexOfArray(vaporWave.length)]);
    colorTwo = p5.color(vaporWave[getRandomIndexOfArray(vaporWave.length)]);

  //   for (let i = 1; i < 4; i++) {
  //     const p = p5.width / 4;
  //     const circlePos = p5.createVector(p * i, p5.height / 2);
  //     let size = i % 2 == 0 ? 56 : 32;
  //     const color = vaporWave[getRandomIndexOfArray(vaporWave.length)];
  //     circles.push(new Circle(p5, circlePos, size, color));
  //     if (i % 2 == 0) {
  //       let size = i % 2 == 0 ? 32 : 56;
  //       circles.push(
  //         new Circle(
  //           p5,
  //           p5.createVector(p5.width / 2, p5.height * 0.75),
  //           size,
  //           color
  //         )
  //       );
  //       circles.push(
  //         new Circle(
  //           p5,
  //           p5.createVector(p5.width / 2, p5.height * 0.25),
  //           size,
  //           color
  //         )
  //       );
  //     }
  //   }
    const widthDivisions = p5.random(0, p5.width);
    const heightDivisions = p5.random(0, p5.height);
    const vectors = generateGridPoints(p5, widthDivisions, heightDivisions);
    // calculate the longest distance from the center of the canvas
    const maxDistance = p5.dist(0, 0, p5.width / 2, p5.height / 2);
    vectors.forEach((vector) => {
      // generate a size depending on the distance from the center of the canvas
      // calculate the distance of the current vector from the center of the canvas
      const radius = p5.dist(p5.width / 2, p5.height / 2, vector.x, vector.y) / 0.1;
      // calculate the height and width of the element 
      const radialSize = p5.map(radius, 0, maxDistance, 1, 15);
      // const p5.random(255) = p5.random(255);
      const color = p5.color(p5.random(255), p5.random(255), p5.random(255));
      circles.push(new Circle(p5, vector, radialSize, color));
    });
  };



  p5.draw = () => {
    setGradient(p5, 0, 0, p5.width, p5.height, colorOne, colorTwo, Axis.Y_AXIS);
    circles.forEach((circle) => circle.draw());
  };
};

new P5(sketch);
