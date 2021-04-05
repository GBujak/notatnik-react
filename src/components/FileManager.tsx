import React from 'react';
import { Directory } from '../dataTypes/document';
import { FileManagerList } from './FileManagerList';
import classes from './FileManager.module.css';
import { FileManagerCreate } from './FileManagerCreate';

interface Props {
    openDir: Directory,
}

export const FileManager: React.FC<Props> = ({ openDir }) => {

    return <div className={`${classes['file-manager-grid-cell']}`} >
        <div className={`${classes['file-manager']}`}>
            <p className={classes['title']}>Menedżer plików</p>
            <FileManagerList
                dirs={openDir.subDirectories}
                files={openDir.files}
                onDirOpen={() => { }}
                onFileOpen={() => { }}
            />
            <FileManagerCreate
                onFileCreate={() => { }}
                onDirCreate={() => { }}
            />
        </div>
    </div>;
};