/**
* @license
* Copyright (c) 2019 Amresh Kumar
* 
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/
'use strict';


const inquirer = require('inquirer');
const qts = require('./questions');
const commands = require('./commands');
/**
 * This is main module for start cli
 * @module lib/cli
 */
function main() {
    inquirer.prompt(qts)
        .then(ans => commands(ans));
};

module.exports = main;