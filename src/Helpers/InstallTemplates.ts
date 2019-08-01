/**
* @license
* Copyright (c) 2019 Amresh Kumar
* 
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/
'use strict';


import { readJSONSync, pathExists, removeSync } from 'fs-extra';
import { join } from 'path';
import { execSync } from 'child_process';

const pkg = readJSONSync(join(__dirname, '../../package.json'), {
    throws: false
});

/**
 * @constant tplsPath
 */
const tplsPath = join(__dirname, '../../generators');

async function cloneRepo() {
    //console.log(chalk.blue("Installing templates..."));
    try {
        await execSync('git clone ' + pkg.config.generatorsRepo + ' generators');
        await removeSync(join(tplsPath, '/.git'));
        //console.log(chalk.keyword('orange')("Installed templates successfully!"));
        return {
            error: null,
            success: true,
            errorCode: 200,
            message: 'Install templates successfully'
        };
    } catch (err) {
        return {
            error: err,
            success: false,
            errorCode: 100,
            message: 'Installing templates error'
        };
    }
};

export default async function installTemplate() {
    const isDir = await pathExists(tplsPath);
    if (isDir) {
        await removeSync(tplsPath);
    }
    return await cloneRepo();
}