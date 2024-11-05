import { localesGenerator } from "./localesGenerator"

async function main() {
    const generatorList = [localesGenerator]

    await Promise.all(generatorList.map(async (generator) => { await generator() }))
}


main()