import React from 'react';
import { Directory, File } from '../dataTypes/document';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
import classes from './FileManager.module.css';
import buttonClasses from './Button.module.css';
import classnames from 'classnames';

interface Props {
    dirs: Array<Directory>,
    files: Array<File>,
    onDirOpen: (dir: Directory) => void,
    onFileOpen: (file: File) => void,
}

export const FileManagerList: React.FC<Props> = ({ dirs, files, onDirOpen, onFileOpen }) => {

    return <>
        <div className={`${classes['item-list']}`}>
            {dirs.map((x) => (
                <button
                    className={classnames([buttonClasses['button'], buttonClasses['full-width']])}
                    style={{ marginBottom: '1rem' }}
                    onClick={() => onDirOpen(x)}
                >
                    <FontAwesomeIcon
                        icon={faFolder}
                        style={{ width: '3rem' }}
                    />
                    {x.name}
                </button>
            ))}

            {files.map((x) => (
                <button
                    style={{ marginBottom: '1rem' }}
                    className={classnames([buttonClasses['button'], buttonClasses['full-width']])}
                    onClick={() => onFileOpen(x)}
                >
                    <FontAwesomeIcon
                        icon={faFile}
                        style={{ width: '3rem' }}
                    />
                    {x.name}
                </button>
            ))}
        </div>
    </>;
};