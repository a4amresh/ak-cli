"use strict";
/**
* @license
* Copyright (c) 2019 Amresh Kumar
*
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arg_1 = __importDefault(require("arg"));
const inquirer_1 = __importDefault(require("inquirer"));
const TemplatesList_1 = __importDefault(require("./TemplatesList"));
const fs_extra_1 = require("fs-extra");
// #region parseArgs
function parseArgs(rawArgs) {
    try {
        const args = arg_1.default({
            // '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            //'-g': '--git',
            '-y': '--yes',
            '-i': '--install',
        }, {
            argv: rawArgs.slice(2),
        });
        return {
            skipPrompts: args['--yes'] || false,
            //git: args['--git'] || false,
            //template: args._[0],
            projectDir: args._[0],
            runInstall: args['--install'] || false,
        };
    }
    catch (err) {
        console.error("ak: bad option: " + process.argv.splice(2));
        process.exit(0);
    }
}
exports.parseArgs = parseArgs;
// #endregion
// #region parse missing arguments
async function parseMissingOptions(options) {
    const templates = await TemplatesList_1.default();
    if (templates.length <= 0) {
        process.exit(1);
    }
    const defaultTemplate = templates[0];
    const currentDir = process.cwd().split("\\");
    const defaultProjectDir = currentDir[currentDir.length - 1];
    if (options.skipPrompts) {
        return Object.assign({}, options, { 
            //template: options.template || defaultTemplate,
            template: defaultTemplate, projectDir: options.projectDir || defaultProjectDir });
    }
    const questions = [];
    if (!options.projectDir) {
        questions.push({
            type: 'input',
            name: 'projectDir',
            message: 'Input project directory name:',
            default: defaultProjectDir,
            validate: async function (input) {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) {
                    var isDir = await fs_extra_1.existsSync(`${process.cwd()}/${input}`);
                    if (!isDir) {
                        return true;
                    }
                    else {
                        return 'Directory All ready exits.';
                    }
                }
                else
                    return 'Project name may only include letters, numbers, underscores and hashes.';
            }
        });
    }
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'What project template would you like to generate?',
            choices: templates,
            default: defaultTemplate,
        });
    }
    // if (!options.git) {
    //     questions.push({
    //         type: 'confirm',
    //         name: 'git',
    //         message: 'Initialize a git repository?',
    //         default: false,
    //     });
    // }
    if (!options.runInstall) {
        questions.push({
            type: 'confirm',
            name: 'runInstall',
            message: 'Install npm packages',
            default: false,
        });
    }
    const answers = await inquirer_1.default.prompt(questions);
    return Object.assign({}, options, { template: options.template || answers.template, projectDir: options.projectDir || answers.projectDir, 
        //git: options.git || answers.git,
        runInstall: options.runInstall || answers.runInstall });
}
exports.parseMissingOptions = parseMissingOptions;
// #endregion
