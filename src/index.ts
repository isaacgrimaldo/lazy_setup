#!/usr/bin/env node

import inquirer from 'inquirer';
import { GlobalOptions } from './interfaces';
import { setProject } from './proyect';
import { questions } from './questions';

/**
 *  principal point of app
 */
function main() {
    inquirer.prompt(questions).then((x) => setProject(x as GlobalOptions));
}

main();
