'use strict';

const testResults = './test_results';
const fs = require('fs');

function sumTestFiles(citool) {
    const result = {};
    fs.readdirSync(`${testResults}/${citool}`).forEach(fileName => {
        const path = `${testResults}/${citool}/${fileName}`;
        const tests = JSON.parse(fs.readFileSync(path));
        if(!result["total"] ){
            result["total"] = {results: [tests.stats.duration]}
        } else {
            result["total"].results.push(tests.stats.duration);
        }

        tests.tests.forEach(test => {
            if (!result[test.fullTitle]) {
                result[test.fullTitle] = {
                    results: [test.duration]
                }
            } else {
                result[test.fullTitle].results.push(test.duration);
            }
        });
    });
    return result;
}

function enrichStats(stats) {
    Object.keys(stats)
        .forEach(key => {
            const sum = stats[key].results.reduce(function (a, b) {
                return a + b;
            });
            stats[key].avg = parseInt(sum / stats[key].results.length);
            stats[key].max = Math.max.apply(null, stats[key].results);
            stats[key].min = Math.min.apply(null, stats[key].results);
        });
    return stats
}

const circleStats = sumTestFiles("circleci");
const pipelineStats = sumTestFiles("pipelines");

enrichStats(circleStats);
enrichStats(pipelineStats);

const result = {};

Object.keys(circleStats).forEach(key => {
    if (!result[key])
        result[key] = {};
    result[`${key}`]['circleci'] = circleStats[key];
});
Object.keys(pipelineStats).forEach(key => {
    if (!result[key])
        result[key] = {};
    result[`${key}`]['pipelines'] = pipelineStats[key];
});

let csv_content = "name;cc_avg;cc_max;cc_min;bb_avg;bb_max;bb_min\n";

Object.keys(result).forEach(key => {
    const cc = result[key].circleci;
    const bb = result[key].pipelines;

    csv_content = csv_content + `${key};${cc.avg};${cc.max};${cc.min};${bb.avg};${bb.max};${bb.min}\n`;
});

console.log(csv_content);

fs.writeFileSync(`${testResults}/results.csv`, csv_content);