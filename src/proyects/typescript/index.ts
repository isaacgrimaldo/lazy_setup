import {config} from 'dotenv';
config();

import { exec } from 'child_process';
import simpleGit from 'simple-git';
import fs from 'fs/promises';

import utils from 'util';
const execAsync = utils.promisify(exec);

import { GlobalOptions } from '../../interfaces';
import { gitRepos,  options } from './repos/index';
import { paths } from './helpers/path';

const { repo  } = gitRepos;
const git = simpleGit(options);

/**
 *   generated new project with typescript
 */
export const GenerateProjectTSC = async (prop: GlobalOptions) => {
    const { name, typeServer } = prop;
    const repoName = 'server-setups';
    const {newPath , oldPath} = paths(repoName ,  name); 

    try {
        /**bring the files from the git repository specified*/
        const commands = ['clone' , '--branch' , typeServer , repo ]
        await git.raw(commands)

        /**rename the directory created for git clone*/
        await fs.rename(oldPath, newPath);

        /*deleted the git history of the new folder */
        await fs.rm(newPath + '/.git', { recursive: true, force: true });

        /**install dependencies from  npm*/
        console.log('\n' + '....installing dependencies wait a few moments');
        await execAsync('npm  install', {
            cwd: newPath,
        });

        console.clear();

        console.log();
        console.log('finished the installation process');
        console.log('server type: ' + typeServer);
        console.log('');
        console.log('move at the new directory "cd ' + name + '"' + '\n');
    } catch (error) {
        console.log(error);
        const checkDirs: string[] = await fs.readdir(newPath);

        //**directores controller if the something go wrong*/

        if (checkDirs.includes(name)) {
            fs.rm(newPath, { recursive: true, force: true });
        }

        if (checkDirs.includes(repoName)) {
            fs.rm(oldPath, { recursive: true, force: true });
        }
    }
};
