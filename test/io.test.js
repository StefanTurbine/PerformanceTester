'use strict';

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

    describe("init read", () => {
        it("32MB" , async () => {
            dummy_32MB = await promisifiedReadFile(in32MB);
        });
        it("64MB" , async () => {
            dummy_64MB = await promisifiedReadFile(in64MB);
        });
    });

    describe("create bigger variables", () => {
        it("128MB", () => {
            dummy_128MB = dummy_64MB + dummy_64MB;
        });
        it("256MB", () => {
            dummy_256MB = dummy_128MB + dummy_128MB;
        });
        it("512MB", () => {
            dummy_512MB = dummy_256MB + dummy_256MB;
        });
    });

    describe("write", () => {
        it("32MB", async () => {
            await promisifiedWriteFile(out32MB, dummy_32MB)
        });
        it("64MB" , async () => {
            await promisifiedWriteFile(out64MB, dummy_64MB)
        });
        it("128MB" , async () => {
            await promisifiedWriteFile(in128MB, dummy_128MB)
        });
        it("256MB" , async () => {
            await promisifiedWriteFile(in256MB, dummy_256MB);
        });
        it("512MB" , async () => {
            await promisifiedWriteFile(in512MB, dummy_512MB);
        });
    });

    describe("copy", () => {
        it("32MB" , async () => {
            await promisfiedCopyFile(in32MB, out32MB);
        });
        it("64MB" , async () => {
            await promisfiedCopyFile(in64MB, out64MB);
        });
        it("128MB" , async () => {
            await promisfiedCopyFile(in128MB, out128MB);
        });
        it("256MB" , async () => {
            await promisfiedCopyFile(in256MB, out256MB);
        });
        it("512MB" , async () => {
            await promisfiedCopyFile(in512MB, out512MB);
        });
    });

    describe("read", () => {
        it("32MB" , async () => {
            await promisifiedReadFile(in32MB)
        });
        it("64MB" , async () => {
            await promisifiedReadFile(in64MB)
        });
        it("128MB" , async () => {
            await promisifiedReadFile(in128MB)
        });
        it("256MB" , async () => {
            await promisifiedReadFile(in256MB);
        });
        it("512MB" , async () => {
            await promisifiedReadFile(in512MB);
        });
    });

    describe("delete", () => {
        it("32MB" , async () => {
            await promisifiedUnlinkFile(out32MB);
        });
        it("64MB" , async () => {
            await promisifiedUnlinkFile(out64MB);
        });
        it("128MB", async () => {
            await promisifiedUnlinkFile(in128MB);
        });
        it("128MB", async () => {
            await promisifiedUnlinkFile(out128MB);
        });
        it("256MB", async () => {
            await promisifiedUnlinkFile(in256MB);
        });
        it("256MB", async () => {
            await promisifiedUnlinkFile(out256MB);
        });
        it("512MB", async () => {
            await promisifiedUnlinkFile(in512MB);
        });
        it("512MB", async () => {
            await promisifiedUnlinkFile(out512MB);
        });
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