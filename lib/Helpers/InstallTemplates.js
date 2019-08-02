/**
* @license
* Copyright (c) 2019 Amresh Kumar
*
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const child_process_1 = require("child_process");
const pkg = fs_extra_1.readJSONSync(path_1.join(__dirname, '../../package.json'), {
    throws: false
});
/**
 * @constant tplPath
 */
const tplPath = path_1.join(__dirname, '../../generators');
/**
 * Cloning repository for generators
 * @constructor
 */
async function cloneRepo() {
    //console.log(chalk.blue("Installing templates..."));
    try {
        //const cloneDir = join(__dirname, "../../generators");
        await child_process_1.execSync('git clone ' + pkg.config.generatorsRepo + ' ' + tplPath);
        await fs_extra_1.removeSync(path_1.join(tplPath, '/.git'));
        //console.log(chalk.keyword('orange')("Installed templates successfully!"));
        return {
            error: null,
            success: true,
            errorCode: 200,
            message: 'Install templates successfully'
        };
    }
    catch (err) {
        return {
            error: err,
            success: false,
            errorCode: 100,
            message: 'Installing templates error'
        };
    }
}
;
/**
 * Installing templates if is not available in local
 * @constructor
 */
async function installTemplate() {
    const isDir = await fs_extra_1.pathExists(tplPath);
    if (isDir) {
        await fs_extra_1.removeSync(tplPath);
    }
    return await cloneRepo();
}
exports.default = installTemplate;
