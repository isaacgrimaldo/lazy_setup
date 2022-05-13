import { GlobalOptions } from './interfaces';
import { GenerateProjectJS } from './proyects/javascript';
import { GenerateProjectTSC } from './proyects/typescript/';

/**
 *  run the creation  the specific project selected for the user
 */
export const setProject = (prop: GlobalOptions) => {
    if (prop.lenguage === 'typescript') {
        GenerateProjectTSC(prop);
    }

    if(prop.lenguage === "javascript"){
        GenerateProjectJS(prop);
    }
};
