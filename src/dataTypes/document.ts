export interface File {
    name: string,
    blocks: Array<string>,
}

export interface Directory {
    name: string,
    subDirectories: Array<Directory>,
    files: Array<File>,
}

export interface Filesystem {
    openPath: Array<string>,
    openFolder: string,
    rootDir: Directory,
}