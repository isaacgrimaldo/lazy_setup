import {SimpleGitOptions} from "simple-git";
import { config } from "dotenv";
config();

let path:string;
if(process.env.NODE_ENV === "development" ){
    path = process.cwd() + '/test'; 
}else{
    path = process.cwd();
}

export const gitReposTs = {
    repo: 'https://github.com/isaacgrimaldo/server-setups-ts.git',
};

export const gitReposJs = {
    repo: 'https://github.com/isaacgrimaldo/server-setups-js.git'
}

export const options: Partial<SimpleGitOptions> = {
    baseDir: path,
    binary: 'git',
    maxConcurrentProcesses: 6,
};