import { Directory, File } from "../dataTypes/document";

export function navigatePath(dir: Directory, path: Array<string>): Directory | null {
    let currentDir = dir;
    for (let pathElement of path) {
        for (let subdir of currentDir.subDirectories) {
            if (subdir.name === pathElement) {
                currentDir = subdir;
                break;
            }
        }
        return null;
    }
    return currentDir;
}

export function mergeFile(root: Directory, file: File, path: Array<string>): Directory | null {
    let dir = navigatePath(root, path);
    dir?.files.push(file);
    dir?.files.sort((a, b) => a.name.localeCompare(b.name));
    return dir;
}

export function mergeDir(root: Directory, newDir: Directory, path: Array<string>): Directory | null {
    let dir = navigatePath(root, path);
    dir?.subDirectories.push(newDir);
    dir?.subDirectories.sort((a, b) => a.name.localeCompare(b.name));
    return dir;
}