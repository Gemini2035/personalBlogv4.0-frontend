import { ResourcesType } from '@packages/hooks'
import path from 'path';
import fs from 'fs'

const LanguageDic: ReadonlyArray<string> = ['en', 'zh']

const localesResources: ResourcesType = LanguageDic.reduce((acc, cur) => {
    acc![cur] = { translation: {} }
    return acc
}, {} as ResourcesType)

const DEFAULT_DIR = './'

const generateResource = (directory: string) => {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.lstatSync(filePath);

        if (stat.isDirectory()) {
            generateResource(filePath);
        } else if (stat.isFile() && file.endsWith('.json')) {
            const prefix = file.split('.')[0];
            if (LanguageDic.includes(prefix)) {
                const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                localesResources![prefix].translation = {
                    ...(localesResources![prefix].translation as { [key: string]: string }),
                    ...fileContent
                }
            }
        }
    });
}

export const localesGenerator = async () => {
    generateResource(DEFAULT_DIR)
    try {
        await fs.promises.writeFile('./src/config/locales.json', JSON.stringify(localesResources, null, 2))
        console.log('Locales config generated successfully!')
    } catch (error) {
        console.log('Locales config generated failed: \n', error)
    }
}