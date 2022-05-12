import {SimpleGitOptions} from "simple-git";
import { config } from "dotenv";
config();

let path:string;
if(process.env.NODE_ENV === "development" ){
    path = process.cwd() + '/test'; 
}else{
    path = process.cwd();
}

export const gitRepos = {
    repo: 'https://github.com/isaacgrimaldo/server-setups.git',
};

export const options: Partial<SimpleGitOptions> = {
    baseDir: path,
    binary: 'git',
    maxConcurrentProcesses: 6,
};