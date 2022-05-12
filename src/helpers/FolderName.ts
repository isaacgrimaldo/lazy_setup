/**
 * this function generate a project name for default
 *
 * @returns the new  project's name
 */
export const getNameFolder = (): string => {
    const path: string = process.cwd();
    const splitPath: string[] = path.split('\\');
    const name: string = splitPath[splitPath.length - 1];
    return name;
};
