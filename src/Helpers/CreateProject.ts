/**
* @license
* Copyright (c) 2019 Amresh Kumar
* 
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/


import { join } from 'path';
import { mkdirSync, copy } from 'fs-extra';
const CURR_DIR = process.cwd();

export interface IAnswer {
    skipPrompts: boolean;
    git: boolean;
    template: string;
    projectDir: string;
    runInstall: boolean;
}

export default async function createProject(answers: IAnswer) {
    const projectChoice = answers.template;
    const projectName = answers.projectDir;
    const generatorsPath = join(__dirname, `../../generators/${projectChoice}`);
    await mkdirSync(`${CURR_DIR}/${projectName}`);
    await createDirContents(generatorsPath, projectName);
    return {
        ...answers,
        projectDirName: projectName,
        projectDir: `${CURR_DIR}/${projectName}`
    };
}

async function createDirContents(tplPath: string, pName: string) {

    try {
        await copy(tplPath, pName);
    }
    catch(err) {
        console.log("Creating project error.");
        process.exit(0);
    }

}
