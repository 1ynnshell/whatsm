/**
 * our examples are built using zig wasm32-freestanding
 * target. these are not distributed with the source, to avoid
 * binary blobs, so zig is a requirement for the toolchain to test with.
 */
const sourcePath = './examples/wasm/';
const minVersion = '0.14.';
const zigCommand = 'zig build-exe';
const zigFlags = '-target wasm32-freestanding -rdynamic -fno-entry -fstrip';

import util from 'node:util';
import child_process from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import pico from 'picocolors';

const exec = util.promisify(child_process.exec);
const readdir = util.promisify(fs.readdir);

const checkZigVersion = async () => {
    const { error, stdout } = await exec("zig version");
    if (error) return false;
    return stdout.startsWith(minVersion);
};

const buildExample = async (filePath) => {
    const outputPath = path.format({
        ...path.parse(filePath),
        base: '',
        ext: '.wasm'
    });
    const command = `${zigCommand} ${filePath} ${zigFlags} -femit-bin=${outputPath}`;
    child_process.exec(command, (err, _, stderr) => {
        if (err) {
        console.error(`${pico.bgRed(' ERR  ')} ${stderr.trim()}`);
        } else {
        console.log(`${pico.bgGreen('  OK  ')} ${filePath}`);
        }
    });
};

if (await checkZigVersion()) {
    try {
        const files = (await readdir(sourcePath)).filter(file => path.extname(file) === '.zig');
        files.forEach(file => {
            const filePath = path.join(sourcePath, file);
            buildExample(filePath);
        });
    } catch (err) {
        console.error(err);
    }
}