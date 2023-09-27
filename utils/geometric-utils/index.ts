import P5 from 'p5';

/**
 * a function which returns an array of x,y coordinates
 * which are evenly spaced across the canvas. They are calculated
 * by dividing the width and height of the canvas by the width and optional height.
 * If height is not provided, the function will return an array of coordinates which are done on a best fit basis.
 * @param p5 - the p5 instance
 * @param width - the number of divisions to make across the width of the canvas
 * @param height - the number of divisions to make across the height of the canvas
 * @returns an array of x,y coordinates as P5.Vectors
 */

export function generateGridPoints(p5: P5, width: number, height?: number, toBounds: boolean = false) {
    const points: P5.Vector[] = [];
    // calculate the number nearest to the width which evenly divides the width of the canvas
    const w = p5.width / width;
    const h = height ? p5.height / height : w;

    // 12 / 7 = 1.7142857142857142
    // 12 / 2 = 6
    // find values for w and h which evenly divide the canvas
    for (let y = toBounds ? 0 : h / 2; y <= p5.height + (toBounds ? h / 2 : 0); y += h) {
        for (let x = toBounds ? 0 : w / 2; x <= p5.width + (toBounds? w / 2 : 0); x += w) {
            const vector = p5.createVector(x, y);
            points.push(vector);
        }
    }
    
    return points;
}

