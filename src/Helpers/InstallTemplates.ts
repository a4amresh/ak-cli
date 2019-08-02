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
 * @constant tplPath
 */
const tplPath = join(__dirname, '../../generators');

/**
 * Cloning repository for generators
 * @constructor
 */
async function cloneRepo() {
    //console.log(chalk.blue("Installing templates..."));
    try {
        //const cloneDir = join(__dirname, "../../generators");
        await execSync('git clone ' + pkg.config.generatorsRepo + ' ' + tplPath);
        await removeSync(join(tplPath, '/.git'));
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

/**
 * Installing templates if is not available in local
 * @constructor
 */
export default async function installTemplate() {
    const isDir = await pathExists(tplPath);
    if (isDir) {
        await removeSync(tplPath);
    }
    return await cloneRepo();
}
