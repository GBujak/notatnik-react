import { File } from "../dataTypes/document";

export interface Filesystem {
    currentPath: Array<string>,
    openFile: string,
    files: {
        [path: string]: File,
    },
}

export function getPathContent(filesystem: Filesystem): Array<{ isDirectory: boolean, name: string, }> {
    console.log("ran getPathContent");
    let paths = Object.keys(filesystem.files);
    let currentPathStr = filesystem.currentPath.join("/") + "/";
    if (currentPathStr === "/") currentPathStr = "";
    let result = paths
        .filter(p => p.startsWith(currentPathStr))
        .map(p => p.substring(currentPathStr.length, p.length))
        .map(p => ({ isDirectory: isDirectory(p), name: p }))
        .map(p => ({ ...p, name: p.name.split("/")[0] }));
    return uniqueItems(result);
}

function isDirectory(name: string) {
    return name.indexOf("/") !== -1;
}

function uniqueItems(items: Array<{ isDirectory: boolean, name: string; }>) {
    let result = [];
    let names = new Set();
    for (let item of items) {
        if (!names.has(item.name)) {
            names.add(item.name);
            result.push(item);
        }
    }
    return result;
}