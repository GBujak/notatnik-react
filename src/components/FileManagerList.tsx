import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
import classes from './FileManager.module.css';
import buttonClasses from './Button.module.css';
import classnames from 'classnames';

interface Props {
    dirContent: Array<{ isDirectory: boolean, name: string; }>,
    onNavigate: (name: string) => void,
}

export const FileManagerList: React.FC<Props> = ({ dirContent, onNavigate }) => {

    return <div className={`${classes['item-list']}`}>
        {dirContent.map((item, index) => (
            <button
                key={index}
                style={{ marginBottom: '1rem' }}
                className={classnames([buttonClasses['button'], buttonClasses['full-width']])}
                onClick={() => onNavigate(item.name)}
            >
                <FontAwesomeIcon
                    icon={(item.isDirectory) ? faFolder : faFile}
                    style={{ width: '3rem' }}
                />
                {item.name}
            </button>
        ))}
    </div>;
};