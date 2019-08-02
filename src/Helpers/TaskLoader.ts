/**
* @license
* Copyright (c) 2019 Amresh Kumar
* 
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/

import Listr from 'Listr';
import { projectInstall } from 'pkg-install';

/**
 * Load tasks for showing loader spinner
 * @param {function} createProject Pass `function` for creating project
 * @param {object} options Pass options for creating project
 */
export default async function TaskLoader(createProject: any, options: object) {
    let opts: any;

    const tasks = new Listr([
        {
            title: "Creating your project!",
            task: async () => {
                opts = await createProject(options)
            }
        },
        {
            title: 'Installing dependencies!',
            task: () =>
                projectInstall({
                    cwd: opts.projectDir,
                }),
            skip: () => {
                if (opts.runInstall) {
                    return undefined;
                } else {
                    return `Install dependencies by your self! cd ${opts.projectDirName} and then npm install.`;
                }
            }
        },
    ]);
    await tasks.run();
    return opts;
}
