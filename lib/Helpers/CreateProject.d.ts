/**
* @license
* Copyright (c) 2019 Amresh Kumar
*
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/
export interface IAnswer {
    skipPrompts: boolean;
    git: boolean;
    template: string;
    projectDir: string;
    runInstall: boolean;
}
export default function createProject(answers: IAnswer): Promise<void>;
