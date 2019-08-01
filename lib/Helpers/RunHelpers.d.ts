/**
* @license
* Copyright (c) 2019 Amresh Kumar
*
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/
export declare function parseArgs(rawArgs: []): {
    skipPrompts: boolean;
    git: boolean;
    projectDir: string;
    runInstall: boolean;
} | undefined;
export declare function parseMissingOptions(options: any): Promise<any>;
