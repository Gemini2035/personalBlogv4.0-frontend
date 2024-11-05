var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/scripts/localesGenerator/index.ts
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var LanguageDic = ["en", "zh"];
var localesResources = LanguageDic.reduce((acc, cur) => {
  acc[cur] = { translation: {} };
  return acc;
}, {});
var DEFAULT_DIR = "./public/locales";
var generateResource = (directory2) => {
  const files = import_fs.default.readdirSync(directory2);
  files.forEach((file) => {
    const filePath = import_path.default.join(directory2, file);
    const stat = import_fs.default.lstatSync(filePath);
    if (stat.isDirectory()) {
      generateResource(filePath);
    } else if (stat.isFile() && file.endsWith(".json")) {
      const prefix = file.split(".")[0];
      if (LanguageDic.includes(prefix)) {
        const fileContent = JSON.parse(import_fs.default.readFileSync(filePath, "utf-8"));
        localesResources[prefix].translation = {
          ...localesResources[prefix].translation,
          ...fileContent
        };
      }
    }
  });
};
var localesGenerator = async () => {
  generateResource(DEFAULT_DIR);
  try {
    await import_fs.default.promises.writeFile("./src/config/locales.json", JSON.stringify(localesResources, null, 2));
    console.log("Locales config generated successfully!");
  } catch (error) {
    console.log("Locales config generated failed: \n", error);
  }
};

// src/scripts/themesGenerator/index.ts
var import_path2 = __toESM(require("path"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var directory = "./public/themes";
var themesGenerator = async () => {
  const files = import_fs2.default.readdirSync(directory);
  const result = { light: {} };
  files.forEach((file) => {
    const filePath = import_path2.default.join(directory, file);
    const stat = import_fs2.default.lstatSync(filePath);
    if (stat.isFile() && file.endsWith(".json")) {
      const prefix = file.split(".")[0];
      const fileContent = JSON.parse(import_fs2.default.readFileSync(filePath, "utf-8"));
      result[prefix] = {
        ...result[prefix],
        ...fileContent
      };
    }
  });
  try {
    await import_fs2.default.promises.writeFile("./src/config/themes.json", JSON.stringify(result, null, 2));
    console.log("Themes config generated successfully!");
  } catch (error) {
    console.log("Themes config generated failed: \n", error);
  }
};

// src/scripts/index.ts
async function main() {
  const generatorList = [localesGenerator, themesGenerator];
  await Promise.all(generatorList.map(async (generator) => {
    await generator();
  }));
}
main();
