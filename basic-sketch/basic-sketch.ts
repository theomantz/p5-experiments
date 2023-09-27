import P5 from "p5";
import { getRandomIndexOfArray, randomNumber } from "./utils";
import Circle from "../shapes/circle";
import vaporWave from "../utils/color-palettes";
import setGradient from "../utils/color-utils";
import Axis from "../enums";
import { generateGridPoints } from "../utils/geometric-utils";
import { getRandomFactorOfTwo, roundDownToNearestFactorOfTwo } from "../utils/number-utils/index.";


let R, w, h, grid, u, margin;

const sketch = (p5: P5) => {
  const circles: Circle[] = [];
  let colorOne: P5.Color;
  let colorTwo: P5.Color;
  p5.setup = () => {
    p5.noLoop();
    // create traditional canvas size 
    w = roundDownToNearestFactorOfTwo(((p5.windowWidth / p5.windowHeight) > 4/5) ? p5.windowHeight * 4/5 : p5.windowWidth);
    h = roundDownToNearestFactorOfTwo(((p5.windowWidth / p5.windowHeight) > 4/5) ? p5.windowHeight : p5.windowWidth * 5/4);
    console.log(w, h)
    const canvas = p5.createCanvas(w, h);
    canvas.parent("app");
    canvas.center("horizontal");
    canvas.center("vertical");
    colorOne = p5.color("black");
    colorTwo  = p5.color(p5.random(255), p5.random(255), p5.random(255));
    const widthDivisions = getRandomFactorOfTwo(1, 100);
    const heightDivisions = getRandomFactorOfTwo(1, 100);
    console.log(widthDivisions, heightDivisions)
    const vectors = generateGridPoints(p5, widthDivisions, heightDivisions, false);
    // calculate the longest distance from the center of the canvas
    const maxDistance = p5.dist(0, 0, p5.width / 2, p5.height / 2);
    vectors.forEach((vector) => {
      // generate a size depending on the distance from the center of the canvas
      // calculate the distance of the current vector from the center of the canvas
      const radius = p5.dist(p5.width / 2, p5.height / 2, vector.x, vector.y);
      // calculate the height and width of the element 
      const radialSize = p5.map(radius, 0, maxDistance, 1, 15, true);
      // const p5.random(255) = p5.random(255);
      const inter = p5.map(radius, 0, maxDistance, 0, 1); 
      const color = p5.lerpColor(colorTwo, colorOne, inter);
      // check that vector position plus radius is within the bounds of the canvas
      if (
        vector.x + radialSize <= p5.width 
        && vector.y + radialSize <= p5.height
        && vector.x - radialSize >= 0
        && vector.y - radialSize >= 0
        ) {
        circles.push(new Circle(p5, vector, radialSize, color));
      } else {
        // reduce radial size until it fits within the canvas 
        let newSize = radialSize;
        let halfSize = newSize / 2;
        while (
          vector.x + halfSize > p5.width 
          || vector.y + halfSize > p5.height
          || vector.x - halfSize < 0
          || vector.y - halfSize < 0
          ) {
          newSize--;
          halfSize = newSize / 2;
        }
        circles.push(new Circle(p5, vector, newSize, color));
      }
      // circles.push(new Circle(p5, vector, radialSize, color));
    });
  };

  // check the circles array that none of the circles overlap with their neighbors
  // if they do, reduce the size of the circle until it doesn't overlap
  function checkCirlcesOverlap() {
    circles.forEach((circle) => {
      // check that the circle is not overlapping with any of its neighbors
      const neighbors = circles.filter((c) => c !== circle);
      neighbors.forEach((neighbor) => {
        // calculate the distance between the two circles
        const distance = p5.dist(circle.pos.x, circle.pos.y, neighbor.pos.x, neighbor.pos.y);
        // if the distance is less than the sum of the two radii, then the circles are overlapping
        if (distance < circle.size / 2 + neighbor.size / 2) {
          // reduce the size of the circle until it doesn't overlap
          let newSize = circle.size;
          while (distance < circle.size / 2 + neighbor.size / 2) {
            newSize--;
          }
          circle.size = newSize;
        }
      });
    });
  }


  p5.draw = () => {
    checkCirlcesOverlap();
    setGradient(p5, p5.width / 2, p5.height / 2, p5.width, p5.height, colorOne, colorTwo, Axis.RADIAL);
    circles.forEach((circle) => circle.draw());
  };
};

new P5(sketch);
