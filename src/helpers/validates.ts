/**
 * check the project'name set for the user
 * @param input project's name set to the users
 * @returns valid the name
 */
export const projectNameValid = async (
    input: string
): Promise<string | boolean> => {
    if (input.length === 0) {
        return 'set a correct name';
    }
    return true;
};
