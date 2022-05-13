import { getNameFolder } from './helpers/FolderName';
import { projectNameValid } from './helpers/validates';

/**
 *  questions to generate a specific project
 */
export const questions: any = [
    {
        type: 'input',
        name: 'name',
        message: `set the project_name default(${getNameFolder()}) \n name:`,
        default: getNameFolder(),
        validate: projectNameValid,
    },
    {
        type: 'list',
        name: 'lenguage',
        message: 'set the lenguage project \n lenguage:',
        choices: ['javascript', 'typescript'],
    },
    {
        type: 'list',
        name: 'typeServer',
        message: 'set the server type',
        choices: ['socket-server', 'simple-server'],
    },
];
