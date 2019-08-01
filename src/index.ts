
import { parseArgs, parseMissingOptions } from './Helpers/RunHelpers';
import createProject from './Helpers/CreateProject';

abstract class Main {

    public static async run(args: []) {

        let options = parseArgs(args);
        const answers = await parseMissingOptions(options);
        createProject(answers);
        console.log(answers);
    }
}

export = Main;
