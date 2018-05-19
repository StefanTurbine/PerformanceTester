'use strict';

const sampleSizes = [
    1024,
    2048,
    4096,
    8192,
    16384,
    32768,
    65536,
    131072,
    262144,
    524288,
    1048576
];
const arrays = [];
module.exports.run = function () {
    describe("sorting", () => {
        for (const sampleSize of sampleSizes) {
            describe(`${sampleSize}`, () => {
                testArraySorting(sampleSize)
            });
        }
    });
};


function testArraySorting(arraySize) {
    let floatArray;
    let integerArray;
    let stringArray;

    it("createFloats", () => {
        floatArray = new Array(arraySize) // init array of size 'arraySize'
            .fill() // filling the array with empty values
            .map(() => Math.random() * arraySize);
    });
    it("createIntegers", () => {
        integerArray = new Array(arraySize) // init array of size 'arraySize'
            .fill() // filling the array with empty values
            .map(() => parseInt(Math.random() * arraySize));
    });
    it("createStrings", () => {
        stringArray = new Array(arraySize) // init array of size 'arraySize'
            .fill() // filling the array with empty values
            .map(() => generateRandomString());
    });

    it("float", () => {
        floatArray.sort();
    });
    it("integer", () => {
        integerArray.sort();
    });
    it("string", () => {
        stringArray.sort();
    })
}

function generateRandomString(maxLength = 15, chars) {
    chars = chars || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const stringLength = Math.random() * maxLength;
    let result = "";
    while (result.length <= stringLength) {
        result += chars.charAt(Math.random() * chars.length)
    }
    return result;
}