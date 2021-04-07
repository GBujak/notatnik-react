import React from 'react';
import { FileManagerList } from './FileManagerList';
import classes from './FileManager.module.css';
import { FileManagerCreate } from './FileManagerCreate';

interface Props {
    items: Array<{ isDirectory: boolean, name: string; }>;
    onCreate: (name: string) => void,
    onNavigate: (name: string) => void,
}

export const FileManager: React.FC<Props> = ({ items, onCreate, onNavigate }) => {

    return <div className={`${classes['file-manager-grid-cell']}`} >
        <div className={`${classes['file-manager']}`}>
            <p className={classes['title']}>Menedżer plików</p>
            <FileManagerList
                dirContent={items}
                onNavigate={onNavigate}
            />
            <FileManagerCreate
                onCreate={onCreate}
            />
        </div>
    </div>;
};