import { localesGenerator } from "./localesGenerator"
import { themesGenerator } from "./themesGenerator"

async function main() {
    const generatorList = [localesGenerator, themesGenerator]

    await Promise.all(generatorList.map(async (generator) => { await generator() }))
}


main()