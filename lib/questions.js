/**
* @license
* Copyright (c) 2019 Amresh Kumar
* 
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/
'use strict';


const fs = require('fs-extra');
const { join } = require('path');
const chalk = require('chalk');
//const tplLists = fs.readdirSync(join(__dirname, '../generators'));
const tplPath = join(__dirname, '../generators');

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(salt => salt.isDirectory())
        .map(salt => salt.name);

const tplLists = getDirectories(tplPath);

if (tplLists.length <= 0) {
    console.log(chalk.cyan("Right now we have not available any Project starters."));
    console.log(chalk.cyan("Please try after some time."));
    process.exit(0);
}

const questions = [
    {
        name: 'projectName',
        type: 'input',
        message: 'Project name',
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        }
    },
    {
        name: 'projectChoice',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: tplLists
    }
];

module.exports = questions;