"use strict";
/**
* @license
* Copyright (c) 2019 Amresh Kumar
*
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const CURR_DIR = process.cwd();
async function createProject(answers) {
    const projectChoice = answers.template;
    const projectName = answers.projectDir;
    const generatorsPath = path_1.join(__dirname, `../../generators/${projectChoice}`);
    await fs_extra_1.mkdirSync(`${CURR_DIR}/${projectName}`);
    await createDirContents(generatorsPath, projectName);
    return Object.assign({}, answers, { projectDirName: projectName, projectDir: `${CURR_DIR}/${projectName}` });
}
exports.default = createProject;
async function createDirContents(tplPath, pName) {
    try {
        await fs_extra_1.copy(tplPath, pName);
    }
    catch (err) {
        console.log("Creating project error.");
        process.exit(0);
    }
}
