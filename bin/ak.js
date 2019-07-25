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
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')));
const semver = require('semver');

// Check versioning
const nodeVer = process.versions.node;
const requiredNVer = pkg.engines.node;
const isOk = semver.satisfies(nodeVer, requiredNVer);
if (!isOk) {
    const text = 'Node.js %s is not supported. Please use a version %s.';
    console.error(text, nodeVer, requiredNVer);
    process.exit(1);
}

const main = require('../lib/cli');
main();