"use strict";
/**
* @license
* Copyright (c) 2019 Amresh Kumar
*
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/
const tslib_1 = require("tslib");
const RunHelpers_1 = require("./Helpers/RunHelpers");
const TemplatesList_1 = tslib_1.__importDefault(require("./Helpers/TemplatesList"));
const CreateProject_1 = tslib_1.__importDefault(require("./Helpers/CreateProject"));
const InstallTemplates_1 = tslib_1.__importDefault(require("./Helpers/InstallTemplates"));
const TaskLoader_1 = tslib_1.__importDefault(require("./Helpers/TaskLoader"));
const PrintWelcome_1 = tslib_1.__importDefault(require("./Helpers/PrintWelcome"));
// interface ICreatedPOpts {
//     targetDir: string;
// }
/**
 * Main class for run ak CLI
 * @constructor
 * @abstract You don't create object of this class. Directly run static function from this class
 */
class Main {
    /**
     * Run CLI business code.
     * @param {array<string>} args pass `process.argv`
     */
    static async run(args) {
        let options = RunHelpers_1.parseArgs(args);
        const templates = await TemplatesList_1.default();
        if (templates.length <= 0) {
            const res = await InstallTemplates_1.default();
            if (!res.success)
                process.exit(0);
        }
        const answers = await RunHelpers_1.parseMissingOptions(options);
        //await createProject(answers);
        const opts = await TaskLoader_1.default(CreateProject_1.default, answers);
        PrintWelcome_1.default(opts.projectDirName, opts.template);
        return true;
    }
}
module.exports = Main;
