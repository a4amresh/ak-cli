"use strict";
/**
* @license
* Copyright (c) 2019 Amresh Kumar
*
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
async function getTemplates() {
    const tplPath = path_1.join(__dirname, '../../generators');
    const getDirectories = (source) => fs_extra_1.readdirSync(source, { withFileTypes: true })
        .filter(salt => salt.isDirectory())
        .map(salt => salt.name);
    const isDir = await fs_extra_1.pathExists(tplPath);
    if (!isDir) {
        return [];
    }
    const tplLists = await getDirectories(tplPath);
    return tplLists;
}
exports.default = getTemplates;
