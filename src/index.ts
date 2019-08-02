/**
* @license
* Copyright (c) 2019 Amresh Kumar
* 
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/


import { parseArgs, parseMissingOptions } from './Helpers/RunHelpers';
import getTemplates from './Helpers/TemplatesList';
import createProject from './Helpers/CreateProject';
import installTemplate from './Helpers/InstallTemplates';
import TaskLoader from './Helpers/TaskLoader';
import PrintWelcome from './Helpers/PrintWelcome';

// interface ICreatedPOpts {
//     targetDir: string;

// }
/**
 * Main class for run ak CLI
 * @constructor
 * @abstract You don't create object of this class. Directly run static function from this class
 */
abstract class Main {

    /**
     * Run CLI business code.
     * @param {array<string>} args pass `process.argv`
     */
    public static async run(args: []): Promise<boolean> {

        let options = parseArgs(args);
        const templates = await getTemplates();

        if (templates.length <= 0) {
            const res = await installTemplate();
            if (!res.success) process.exit(0);
        }

        const answers = await parseMissingOptions(options);
        //await createProject(answers);
        const opts = await TaskLoader(createProject, answers);
        PrintWelcome(opts.projectDirName, opts.template);
        return true;
    }
}

export = Main;
