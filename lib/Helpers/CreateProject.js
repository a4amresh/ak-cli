"use strict";
/**
* @license
* Copyright (c) 2019 Amresh Kumar
*
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const figlet_1 = tslib_1.__importDefault(require("figlet"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fs_extra_1 = require("fs-extra");
const CURR_DIR = process.cwd();
async function createProject(answers) {
    const projectChoice = answers.template;
    const projectName = answers.projectDir;
    const generatorsPath = path_1.join(__dirname, `../../generators/${projectChoice}`);
    await fs_extra_1.mkdirSync(`${CURR_DIR}/${projectName}`);
    createDirContents(generatorsPath, projectName, projectChoice);
}
exports.default = createProject;
const log = console.log;
function createDirContents(tplPath, pName, basedTemplate) {
    fs_extra_1.copy(tplPath, pName).then(val => {
        figlet_1.default.text('ak', {
            font: 'Doh',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, (figErr, data) => {
            if (figErr) {
                log(chalk_1.default.red(figErr));
                //process.exit(1);
            }
            process.stdout.write('\x1b[2J');
            log(chalk_1.default.blue(data));
            log(chalk_1.default.green('\r Congrats!'));
            log('\r you have successfully created project "' +
                chalk_1.default.cyan.underline.bold(pName) +
                '" based on ' + chalk_1.default.cyan.underline.bold(basedTemplate) + ' template.');
            log("\r Start work: " +
                chalk_1.default.keyword('orange')(`cd ${pName} ${chalk_1.default.white(' && ')} npm install\n`));
            process.exit(0);
        });
    });
}
