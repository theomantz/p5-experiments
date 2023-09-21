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

export function generateGridPoints(p5: P5, width: number, height?: number) {
    const points: P5.Vector[] = [];
    const w = p5.width / width;
    const h = height ? p5.height / height : w;
    
    for (let y = h; y < p5.height; y += h) {
        for (let x = w; x < p5.width; x += w) {
            points.push(p5.createVector(x, y));
        }
    }
    
    return points;
}