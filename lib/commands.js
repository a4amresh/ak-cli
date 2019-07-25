/**
* @license
* Copyright (c) 2019 Amresh Kumar
* 
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/
'use strict';


const fs = require('fs-extra');
const path = require('path');
const curr_Dir = process.cwd();
const chalk = require('chalk');
const figlet = require('figlet');

const log = console.log;

function createDirContents(tplPath, pName, basedTemplate) {

    fs.copy(tplPath, pName).then(val => {
        figlet.text('ak', {
            font: 'Doh',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, (figErr, data) => {
            if (figErr) {
                log(chalk.red(figErr));
                process.exit(1);
            }
            process.stdout.write('\x1b[2J');
            log(chalk.blue(data));
            log(chalk.green('\r Congrats!'));
            log('\r you have successfully created project "' +
                chalk.cyan.underline.bold(pName) +
                '" based on ' + chalk.cyan.underline.bold(basedTemplate) + ' template.'
            );
            log("\r Start work: " +
                chalk.keyword('orange')(`cd ${pName} ${chalk.white(' && ')} npm install\n`));
            process.exit(0);
        });
    });

}

function runCommand(answers) {
    const projectChoice = answers['projectChoice'];
    const projectName = answers['projectName'];
    const generatorsPath = path.join(__dirname, `../generators/${projectChoice}`);
    if (!fs.existsSync(`${curr_Dir}/${projectName}`)) {
        fs.mkdirSync(`${curr_Dir}/${projectName}`);
        createDirContents(generatorsPath, projectName, projectChoice);
    } else {
        console.error(`Directory "${projectName}"already exits. please try with another name.`);
        process.exit(1);
    }
}

module.exports = runCommand;