/**
* @license
* Copyright (c) 2019 Amresh Kumar
* 
* Use of this source code is governed by an MIT-style license that can be found
* in the LICENSE file at https://github.com/a4amresh/ak-cli/blob/master/LICENSE
*/


import figlet from 'figlet';
import chalk from 'chalk';

const log = console.log;
/**
 * Print welcome message when project created successfully.
 * @param {string} projectDirName Project directory name .
 * @param {string} basedTemplate Project based template name.
 */
export default function PrintWelcome(projectDirName: string, basedTemplate: string) {
    figlet.text('ak', {
        font: 'Doh',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, (figErr: any, data: any) => {
        if (figErr) {
            process.exit(0);
        }
        //process.stdout.write('\x1b[2J');
        log(chalk.blue(data));
        log(chalk.bold.green('\r Congrats!'));
        log('\r you have successfully created project "' +
            chalk.cyan.underline.bold(projectDirName) +
            '" based on ' + chalk.cyan.underline.bold(basedTemplate) + ' template.'
        );
        // log("\r Start work: " +
        //     chalk.keyword('orange')(`cd ${projectDirName} ${chalk.white(' && ')} npm install\n`));
        process.exit(1);
    });
}
