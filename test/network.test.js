'use strict';
const request = require('superagent');

const token = "85e3c608e171255874dad94655b8e69c16c86e5a";

const url32MB = `https://raw.githubusercontent.com/StefanTurbine/PerformanceTester/master/resource/dummy_32MB.txt`;
const url64MB = `https://raw.githubusercontent.com/StefanTurbine/PerformanceTester/master/resource/dummy_64MB.txt`;

module.exports.run = function () {
    describe("download", () => {
        it("32MB", async () => {
            await request.get(url32MB)
                .set('Authorization', `token ${token}`)
        });
        it("64MB", async () => {
            await request.get(url64MB)
                .set('Authorization', `token ${token}`)
        });
    });
};