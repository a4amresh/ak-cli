#!/usr/bin/env node
/**
 * @license
 * Copyright (c) 2019 Amresh Kumar
 *
 * Use of this source code is governed by an MIT-style license that can be found
 * in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
 */
'use strict';

const fs = require('fs');
const path = require('path');
const tsconfig = path.join(__dirname, '../tsconfig.json');
const dev = fs.existsSync(tsconfig);

if (dev) {
    require('ts-node').register({ tsconfig });
}

require(`../${dev ? 'src': 'lib'}`).run(process.argv);
