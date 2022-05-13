import { exec } from 'child_process';
import utils from 'util';
const execAsync = utils.promisify(exec);


export default execAsync;