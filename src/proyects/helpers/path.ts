import {config} from 'dotenv';
config();

interface Props {
    newPath:string
    oldPath:string
}

/**
 * Generate 2 string are the paths where the project will create 
 * @param repoName default project'name
 * @param name  new project'name 
 * @returns 2 string, oldPath and newPath
 */

export const paths = (repoName:string , name:string):Props => {
    const cwd: string = process.cwd();
    
    /**this code is just in  development*/
    if(process.env.NODE_ENV === "development"){
        const oldPath = cwd + '/test' + '/' + repoName;
        const newPath = cwd + '/test' +  '/' + name;

        return {
            oldPath,
            newPath,
        }
    }
    
    const oldPath = cwd + '/' + repoName;
    const newPath = cwd + '/' + name;

    return{
        oldPath,
        newPath
    }
    
}