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
const CreateProject_1 = tslib_1.__importDefault(require("./Helpers/CreateProject"));
const TemplatesList_1 = tslib_1.__importDefault(require("./Helpers/TemplatesList"));
const InstallTemplates_1 = tslib_1.__importDefault(require("./Helpers/InstallTemplates"));
class Main {
    static async run(args) {
        let options = RunHelpers_1.parseArgs(args);
        const templates = await TemplatesList_1.default();
        if (templates.length <= 0) {
            const res = await InstallTemplates_1.default();
            if (!res.success)
                process.exit(1);
        }
        const answers = await RunHelpers_1.parseMissingOptions(options);
        CreateProject_1.default(answers);
    }
}
module.exports = Main;
