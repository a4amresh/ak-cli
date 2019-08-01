import { readdirSync, PathLike } from 'fs-extra';
import { join } from 'path';

export default async function getTemplates() {

    const tplPath = join(__dirname, '../../generators');

    const getDirectories = (source: PathLike) =>
        readdirSync(source, { withFileTypes: true })
            .filter(salt => salt.isDirectory())
            .map(salt => salt.name);

    const tplLists = await getDirectories(tplPath);
    return tplLists;
}
