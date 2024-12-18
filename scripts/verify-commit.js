/**
 * ensure that we use a readable, clear commit style. 
 * <type>(<scope>): <description of action committed>.
 * scope is an optional clarification.
 * example:
 * feat(cpu): Added the x87 core functionality
 * more information: https://www.conventionalcommits.org/en/v1.0.0/
 */
import pico from 'picocolors';
import { readFileSync } from 'node:fs';
import path from 'node:path';
const commitMessagePath = path.resolve('.git/COMMIT_EDITMSG');
const commitMessage = readFileSync(commitMessagePath, 'utf-8').trim();
const commitRegEx = 
/^(feat|fix|docs|style|refactor|test|chore|perf|ci|wip)(\(.+\))?: .{1,200}/;

if (!commitRegEx.test(commitMessage)) {
    console.error(`${pico.bold(`invalid commit format.`)}`);
    console.error(`${pico.red(' MESSAGE: ')} ${commitMessage}`);
    console.error(`${pico.green(' EXAMPLE: ')} feat(cpu): Added the x87 core functionality for floats.`);
    process.exit(1);
}