import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import classes from './FileManager.module.css';
import buttonClasses from './Button.module.css';
import classnames from 'classnames';

interface Props {
    dirContent: Array<{ isDirectory: boolean, name: string, fullName: string; }>,
    onNavigate: (name: string) => void,
    onDelete: (name: string) => void,
}

export const FileManagerList: React.FC<Props> = ({ dirContent, onNavigate, onDelete }) => {

    return <div className={`${classes['item-list']}`}>
        {dirContent.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignContent: 'space-between' }}>
                <button
                    style={{ marginBottom: '1rem', width: '100%' }}
                    className={classnames([buttonClasses['button'], buttonClasses['full-width']])}
                    onClick={() => onNavigate(item.name)}
                >
                    <FontAwesomeIcon
                        icon={(item.isDirectory) ? faFolder : faFile}
                        style={{ width: '3rem' }}
                    />
                    {item.name}
                </button>
                <button
                    style={{ backgroundColor: "#ff8888", marginBottom: "1rem", marginLeft: '.5rem' }}
                    className={classnames([buttonClasses['button'], buttonClasses['full-width']])}
                    onClick={() => {
                        console.log(item);
                        onDelete(item.fullName);
                    }}
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                    />
                </button>
            </div>
        ))}
    </div>;
};