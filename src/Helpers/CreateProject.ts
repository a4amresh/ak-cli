import { join } from 'path';
import figlet from 'figlet';
import chalk from 'chalk';
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
    createDirContents(generatorsPath, projectName, projectChoice);
}

const log = console.log;

function createDirContents(tplPath: string, pName: string, basedTemplate: string) {

    copy(tplPath, pName).then(val => {
        figlet.text('ak', {
            font: 'Doh',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, (figErr: any, data: any) => {
            if (figErr) {
                log(chalk.red(figErr));
                process.exit(1);
            }
            process.stdout.write('\x1b[2J');
            log(chalk.blue(data));
            log(chalk.green('\r Congrats!'));
            log('\r you have successfully created project "' +
                chalk.cyan.underline.bold(pName) +
                '" based on ' + chalk.cyan.underline.bold(basedTemplate) + ' template.'
            );
            log("\r Start work: " +
                chalk.keyword('orange')(`cd ${pName} ${chalk.white(' && ')} npm install\n`));
            process.exit(0);
        });
    });

}
