
/**
 * Get a random factor of two between a min and max
 * @param min
 * @param max
 */
export function getRandomFactorOfTwo (min: number, max: number) {
    // generate a random number within out range
    const randomNumber = Math.random() * (max - min) + min;
    // calculate the log2 of the random number
    const log = Math.log2(randomNumber);
    // round the log down to the nearest integer
    const roundedLog = Math.floor(log);
    // return 2 to the power of the rounded log
    return Math.pow(2, roundedLog);
}

export function roundDownToNearestFactorOfTwo (number: number) {
    // calculate the log2 of the number
    const log = Math.log2(number);
    // round the log down to the nearest integer
    const roundedLog = Math.floor(log);
    // return 2 to the power of the rounded log
    return Math.pow(2, roundedLog);
}

export function roundUpToNearestFactorOfTwo (number: number) {
    // calculate the log2 of the number
    const log = Math.log2(number);
    // round the log down to the nearest integer
    const roundedLog = Math.ceil(log);
    // return 2 to the power of the rounded log
    return Math.pow(2, roundedLog);
}