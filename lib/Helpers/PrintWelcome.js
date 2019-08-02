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
const figlet_1 = tslib_1.__importDefault(require("figlet"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const log = console.log;
/**
 * Print welcome message when project created successfully.
 * @param {string} projectDirName Project directory name .
 * @param {string} basedTemplate Project based template name.
 */
function PrintWelcome(projectDirName, basedTemplate) {
    figlet_1.default.text('ak', {
        font: 'Doh',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, (figErr, data) => {
        if (figErr) {
            process.exit(0);
        }
        //process.stdout.write('\x1b[2J');
        log(chalk_1.default.blue(data));
        log(chalk_1.default.bold.green('\r Congrats!'));
        log('\r you have successfully created project "' +
            chalk_1.default.cyan.underline.bold(projectDirName) +
            '" based on ' + chalk_1.default.cyan.underline.bold(basedTemplate) + ' template.');
        // log("\r Start work: " +
        //     chalk.keyword('orange')(`cd ${projectDirName} ${chalk.white(' && ')} npm install\n`));
        process.exit(1);
    });
}
exports.default = PrintWelcome;
