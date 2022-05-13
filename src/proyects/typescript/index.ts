import {config} from 'dotenv';
config();

import exec from '../helpers/exec';
import simpleGit from 'simple-git';
import fs from 'fs/promises';


import { GlobalOptions } from '../../interfaces';
import { gitReposTs,  options } from '../repos';
import { paths } from '../helpers/path';

const { repo  } = gitReposTs;
const git = simpleGit(options);

/**
 *   generated new project with typescript
 */
export const GenerateProjectTSC = async (prop: GlobalOptions) => {
    const { name, typeServer } = prop;
    const repoName = 'server-setups-ts';
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
        await exec('npm  install', {
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
        const checkPath = (process.env.NODE_ENV === 'production') ? process.cwd()  : process.cwd() + '/test'
        const checkDirs: string[] = await fs.readdir(checkPath);
    3
        //**directores controller if the something go wrong*/
        if (checkDirs.includes(repoName)) {
            fs.rm(oldPath, { recursive: true, force: true });
        }else if(checkDirs.includes(name)){
            fs.rm(newPath, { recursive: true, force: true });
        }
    }
};
