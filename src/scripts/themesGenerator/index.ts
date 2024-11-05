import path from 'path'
import fs from 'fs'
import { DefaultThemesType } from "@packages/ui";

const directory = './public/themes'

export const themesGenerator = async () => {
    const files = fs.readdirSync(directory);
    const result: DefaultThemesType = {light: {}}

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.lstatSync(filePath);
        if (stat.isFile() && file.endsWith('.json')) {
            const prefix = file.split('.')[0];
            const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                result[prefix] = {
                    ...result[prefix],
                    ...fileContent
                }
        }
    });

    try {
        await fs.promises.writeFile('./src/config/themes.json', JSON.stringify(result, null, 2))
        console.log('Themes config generated successfully!')
    } catch (error) {
        console.log('Themes config generated failed: \n', error)
    }
}