'use strict';

const assert = require('assert');
const fs = require('fs');

const in32MB = "./resource/dummy_32MB.txt";
const out32MB = "./resource/out_dummy_32MB.txt";

const in64MB = "./resource/dummy_64MB.txt";
const out64MB = "./resource/out_dummy_64MB.txt";

const in128MB = "./resource/dummy_128MB.txt";
const out128MB = "./resource/out_dummy_128MB.txt";

const in256MB = "./resource/dummy_256MB.txt";
const out256MB = "./resource/out_dummy_256MB.txt";

const in512MB = "./resource/dummy_512MB.txt";
const out512MB = "./resource/out_dummy_512MB.txt";

const in758MB = "./resource/dummy_758MB.txt";
const out758MB = "./resource/out_dummy_758MB.txt";

module.exports.run = function () {

    let dummy_32MB;
    let dummy_64MB;
    let dummy_128MB;
    let dummy_256MB;
    let dummy_512MB;
    let dummy_758MB;

    describe("read initial files", () => {
        it("reads a 32MB file", async () => {
            dummy_32MB = await promisifiedReadFile(in32MB);
        });
        it("reads a 64MB file", async () => {
            dummy_64MB = await promisifiedReadFile(in64MB);
        });
    });

    describe("create bigger variables", () => {
        it("creates a 128MB variable", () => {
            dummy_128MB = dummy_64MB + dummy_64MB;
        });
        it("creates a 256MB variable", () => {
            dummy_256MB = dummy_128MB + dummy_128MB;
        });
        it("creates a 512MB variable", () => {
            dummy_512MB = dummy_256MB + dummy_256MB;
        });
        it("creates a 758MB variable", () => {
            dummy_758MB = dummy_512MB + dummy_256MB;
        })
    });

    describe("write files", () => {
        it("writes a 32MB file", async () => {
            await promisifiedWriteFile(out32MB, dummy_32MB)
        });
        it("writes a 64MB file", async () => {
            await promisifiedWriteFile(out64MB, dummy_64MB)
        });
        it("writes a 128MB file", async () => {
            await promisifiedWriteFile(in128MB, dummy_128MB)
        });
        it("writes a 256MB file", async () => {
            await promisifiedWriteFile(in256MB, dummy_256MB);
        });
        it("writes a 512MB file", async () => {
            await promisifiedWriteFile(in512MB, dummy_512MB);
        });
        it("writes a 758MB file", async () => {
            await promisifiedWriteFile(in758MB, dummy_758MB);
        });
    });

    describe("copy files", () => {
        it("copies a 32MB file", async () => {
            await promisfiedCopyFile(in32MB, out32MB);
        });
        it("copies a 64MB file", async () => {
            await promisfiedCopyFile(in64MB, out64MB);
        });
        it("copies a 128MB file", async () => {
            await promisfiedCopyFile(in128MB, out128MB);
        });
        it("copies a 256MB file", async () => {
            await promisfiedCopyFile(in256MB, out256MB);
        });
        it("copies a 512MB file", async () => {
            await promisfiedCopyFile(in512MB, out512MB);
        });
        it("copies a 758MB file", async () => {
            await promisfiedCopyFile(in758MB, out758MB);
        });
    });

    describe("read files", () => {
        it("read a 32MB file", async () => {
            await promisifiedReadFile(in32MB)
        });
        it("read a 64MB file", async () => {
            await promisifiedReadFile(in64MB)
        });
        it("read a 128MB file", async () => {
            await promisifiedReadFile(in128MB)
        });
        it("read a 256MB file", async () => {
            await promisifiedReadFile(in256MB);
        });
        it("read a 512MB file", async () => {
            await promisifiedReadFile(in512MB);
        });
        it("read a 758MB file", async () => {
            await promisifiedReadFile(in758MB);
        });
    });

    describe("delete files", () => {
        it("deletes a 32MB file", async () => {
            await promisifiedUnlinkFile(out32MB);
        });
        it("deletes a 64MB file", async () => {
            await promisifiedUnlinkFile(out64MB);
        });
        it("deletes 128MB in_file", async () => {
            await promisifiedUnlinkFile(in128MB);
        });
        it("deletes 128MB out_file", async () => {
            await promisifiedUnlinkFile(out128MB);
        });
        it("deletes a 256MB in_file", async () => {
            await promisifiedUnlinkFile(in256MB);
        });
        it("deletes a 256MB out_file", async () => {
            await promisifiedUnlinkFile(out256MB);
        });
        it("deletes 512MB in_file", async () => {
            await promisifiedUnlinkFile(in512MB);
        });
        it("deletes 512MB out_file", async () => {
            await promisifiedUnlinkFile(out512MB);
        });
        it("deletes 758MB in_file", async () => {
            await promisifiedUnlinkFile(in758MB);
        });
        it("deletes 758MB out_file", async () => {
            await promisifiedUnlinkFile(out758MB);
        })
    })
};


async function promisfiedCopyFile(inPath, outPath) {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(outPath, {flags: 'w'});
        const readStream = fs.createReadStream(inPath, {flags: 'r'});
        readStream.pipe(writeStream);
        writeStream.on('close', () => {
            return resolve();
        })
    })
}

async function promisifiedReadFile(path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, resp) => {
            if (err)
                return reject(err);
            return resolve(resp);
        })
    })
}

async function promisifiedUnlinkFile(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err, resp) => {
            if (err)
                return reject(err);
            return resolve(resp);
        })
    })
}

async function promisifiedWriteFile(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (err, resp) => {
            if (err)
                return reject(err);
            return resolve(resp);
        })
    })
}