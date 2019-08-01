/**
* @license
* Copyright (c) 2019 Amresh Kumar
* 
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/


import { readdirSync, PathLike, pathExists } from 'fs-extra';
import { join } from 'path';

export default async function getTemplates() {

    const tplPath = join(__dirname, '../../generators');

    const getDirectories = (source: PathLike) =>
        readdirSync(source, { withFileTypes: true })
            .filter(salt => salt.isDirectory())
            .map(salt => salt.name);

    const isDir = await pathExists(tplPath);
    if (!isDir) {
        return [];
    }
    const tplLists = await getDirectories(tplPath);
    return tplLists;
}
