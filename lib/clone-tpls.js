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
const exec = require('child_process').exec;
const chalk = require('chalk');
const pkg = fs.readJSONSync(join(__dirname, '../package.json'), {
    throws: false
});

/**
 * @constant tplsPath
 */
const tplsPath = join(__dirname, '../generators');

function cloneRepo() {
    console.log(chalk.blue("Cloning generator templates..."))
    exec('git clone ' + pkg.config.generatorsRepo + ' generators', (err) => {
        if (err) {
            console.log(chalk.red("Please install again."));
            console.error(err);
            process.exit(1);
        }
        fs.remove(join(tplsPath, '/.git')).then(isDeleted => {
            console.log(chalk.keyword('orange')("Cloned generator templates successfully!"));
            process.exit(0);
        });
    });
};

fs.pathExists(tplsPath).then(isDir => {
    if (isDir) {
        fs.remove(tplsPath).then(isDeleted => {
            setTimeout(cloneRepo, 1000);
        });
    } else {
        cloneRepo();
    }
});