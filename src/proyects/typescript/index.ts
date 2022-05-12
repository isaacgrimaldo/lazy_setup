import { exec } from 'child_process';
import simpleGit, { Options, TaskOptions } from 'simple-git';
import fs from 'fs/promises';

import utils from 'util';
const execAsync = utils.promisify(exec);

import { GlobalOptions } from '../../interfaces';
import { gitRepos } from './repos/index';

const { repo  } = gitRepos;

/**
 *
 */
const options: TaskOptions<Options> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
};
const git = simpleGit(options);

/**
 *   generated new project with typescript
 */
export const GenerateProjectTSC = async (prop: GlobalOptions) => {
    const { name, typeServer } = prop;
    const repoName = 'server-setups';
    const cwd: string = process.cwd();

    try {
        /**bring the files from the git repository specified*/
        const commands = ['clone' , '--branch' , typeServer , repo ]
        await git.raw(commands)

        /**rename the folder for the name project*/
        const oldPath = cwd + '/' + repoName;
        const newPath = cwd + '/' + name;
        await fs.rename(oldPath, newPath);

        /*deleted the git history of the new folder */
        await fs.rm(newPath + '/.git', { recursive: true, force: true });

        /**install dependencies from  npm*/
        console.log('\n' + '....installing dependencies wait a few moments');
        await execAsync('npm  install', {
            cwd: cwd + '/' + name,
        });

        console.clear();

        console.log();
        console.log('finished the installation process');
        console.log('server type: ' + 'socker-server');
        console.log('');
        console.log('move at the new directory "cd ' + name + '"' + '\n');
    } catch (error) {
        console.log(error);
        const checkDirs: string[] = await fs.readdir(cwd);

        //**directores controller if the something go wrong*/

        if (checkDirs.includes(name)) {
            fs.rm(cwd + '/' + name, { recursive: true, force: true });
        }

        if (checkDirs.includes(repoName)) {
            fs.rm(cwd + '/' + repoName, { recursive: true, force: true });
        }
    }
};
