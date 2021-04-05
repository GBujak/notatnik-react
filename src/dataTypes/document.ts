
export interface File {
    name: string,
    blocks: Array<string>,
}

export interface Directory {
    name: string,
    subDirectories: Array<Directory>,
    files: Array<File>,
}

