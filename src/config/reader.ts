import * as fs from "fs";
import * as path from "path";

let file: string = "config.json";
let previous: string = "";
const parent: string = ".." + path.sep;

/**
 * Test if a file exists or not.
 *
 * @param path The filename/path to test
 * @return True if the file is a file and exists, false otherwise
 */
function fileExistsSync(path: string): boolean {
    try {
        return fs.statSync(path).isFile();
    } catch (err) {
        return false;
    }
}

// Searching config.json everywhere in the parent tree
while (!fileExistsSync(file)) {
    file = parent + file;
    const norm: string = path.resolve(file);

    if (norm === previous) {
        throw new Error("Could not locate config.json file!");
    }

    previous = norm;
}

console.info(`Reading config file from "${file}"`);

export const config = JSON.parse(fs.readFileSync(file, "utf8"));