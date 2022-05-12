import { GlobalOptions } from '../../interfaces';
import { exec } from 'child_process';

import utils from 'util';
const execAsync = utils.promisify(exec);

/**
 *   generated new project with typescript
 */
export const GenerateProjectTSC = async (prop: GlobalOptions) => {
    const { name } = prop;
    const cwd = process.cwd();

    try {
        /**bring the files from the git repository specified*/
        await execAsync(
            'git clone https://github.com/isaacgrimaldo/Socker-Server.git',
            { cwd }
        );

        /**rename the folder for the name project*/
        await execAsync(`Ren Socker-Server ${name} `, {
            cwd,
        });

        /*deleted the git history of the new folder */
        await execAsync('rmdir  .git /s /q', {
            cwd: cwd + '/' + name,
        });

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
        const err = error as Error;
        console.log(err);
    }
};
