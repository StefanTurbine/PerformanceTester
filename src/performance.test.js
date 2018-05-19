const assert = require('assert');

const sampleSizes = {
    small: 1024,
    mid: 1048576,
    big: 8388608
};

module.exports.run = function () {
    describe("Array sorting", () => {
        describe(`sample size: ${sampleSizes['small']} `, () => {
            testArraySorting(sampleSizes['small'])
        });
        // describe(`sample size: ${sampleSizes['mid']} `, () => {
        //     testArraySorting(sampleSizes['mid'])
        // });
        // describe(`sample size: ${sampleSizes['big']} `, () => {
        //     testArraySorting(sampleSizes['big'])
        // })
    });
};


function testArraySorting(arraySize){
    it("sorts a random float array", () => {
        const randomFloatArray = new Array(arraySize) // init array of size 'arraySize'
            .fill() // filling the array with empty values
            .map(() => Math.random() * arraySize);
        randomFloatArray.sort();
    });
    it("sorts a random integer array", () => {
        const randomFloatArray = new Array(arraySize) // init array of size 'arraySize'
            .fill() // filling the array with empty values
            .map(() => parseInt(Math.random() * arraySize));
        randomFloatArray.sort();
    });
    it("sorts a random string array", () => {
        const randomStringArray = new Array(arraySize)
            .fill()
            .map(() => generateRandomString())
        ;
        randomStringArray.sort();
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