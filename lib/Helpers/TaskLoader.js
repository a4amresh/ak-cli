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
const Listr_1 = tslib_1.__importDefault(require("Listr"));
const pkg_install_1 = require("pkg-install");
/**
 * Load tasks for showing loader spinner
 * @param {function} createProject Pass `function` for creating project
 * @param {object} options Pass options for creating project
 */
async function TaskLoader(createProject, options) {
    let opts;
    const tasks = new Listr_1.default([
        {
            title: "Creating your project!",
            task: async () => {
                opts = await createProject(options);
            }
        },
        {
            title: 'Installing dependencies!',
            task: () => pkg_install_1.projectInstall({
                cwd: opts.projectDir,
            }),
            skip: () => {
                if (opts.runInstall) {
                    return undefined;
                }
                else {
                    return `Install dependencies by your self! cd ${opts.projectDirName} and then npm install.`;
                }
            }
        },
    ]);
    await tasks.run();
    return opts;
}
exports.default = TaskLoader;
