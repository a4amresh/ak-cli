
import arg from 'arg';
import inquirer, { Question } from 'inquirer';
import getTemplates from './TemplatesList';
import { existsSync } from 'fs-extra';

// #region parseArgs
export function parseArgs(rawArgs: []) {
    try {
        const args = arg(
            {
                '--git': Boolean,
                '--yes': Boolean,
                '--install': Boolean,
                '-g': '--git',
                '-y': '--yes',
                '-i': '--install',
            },
            {
                argv: rawArgs.slice(2),
            }
        );
        return {
            skipPrompts: args['--yes'] || false,
            git: args['--git'] || false,
            template: args._[0],
            runInstall: args['--install'] || false,
        };
    }
    catch (err) {
        console.error("ak: bad option: " + process.argv.splice(2));
        process.exit(0);
    }
}
// #endregion

// #region parse missing arguments
export async function parseMissingOptions(options: any) {
    const templates = await getTemplates();
    if (templates.length <= 0) {
        process.exit(1);
    }
    const defaultTemplate = templates[0];
    const currentDir = process.cwd().split("\\");
    const defaultProjectDir = currentDir[currentDir.length - 1];

    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
            projectDir: defaultProjectDir
        };
    }

    const questions = [];

    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'What project template would you like to generate?',
            choices: templates,
            default: defaultTemplate,
        });
    }

    questions.push({
        type: 'input',
        name: 'projectDir',
        message: 'Input project directory name:',
        default: defaultProjectDir,
        validate: async function (input: string) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) {
                var isDir = await existsSync(`${process.cwd()}/${input}`);
                if (!isDir) {
                    return true;
                }
                else {
                    return 'Directory All ready exits.';
                }
            }
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        }
    });

    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Initialize a git repository?',
            default: false,
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        template: options.template || answers.template,
        projectDir: options.projectDir || answers.projectDir,
        git: options.git || answers.git,
    };
}
// #endregion
