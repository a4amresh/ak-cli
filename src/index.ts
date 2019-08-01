/**
* @license
* Copyright (c) 2019 Amresh Kumar
* 
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/


import { parseArgs, parseMissingOptions } from './Helpers/RunHelpers';
import createProject from './Helpers/CreateProject';
import getTemplates from './Helpers/TemplatesList';
import installTemplate from './Helpers/InstallTemplates';

abstract class Main {

    public static async run(args: []) {

        let options = parseArgs(args);
        const templates = await getTemplates();
        if (templates.length <= 0) {
            const res = await installTemplate();
            if(!res.success) process.exit(1);
        }
        const answers = await parseMissingOptions(options);
        createProject(answers);
    }
}

export = Main;
