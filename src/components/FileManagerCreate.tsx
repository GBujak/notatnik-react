import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Directory, File } from '../dataTypes/document';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import classes from './FileManager.module.css';
import classnames from 'classnames';

interface Props {
    onFileCreate: (file: File) => void,
    onDirCreate: (dir: Directory) => void,
}

export const FileManagerCreate: React.FC<Props> = ({ onFileCreate, onDirCreate }) => {
    const [creating, setCreating] = useState<null | "file" | "dir">(null);
    const [name, setName] = useState("");
    let inputRef = useRef<HTMLInputElement>(null);

    const onTick = () => {
        if (creating == "file") {
            onFileCreate({ name: name, blocks: [] });
        } else if (creating == "dir") {
            onDirCreate({ name: name, subDirectories: [], files: [] });
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [creating]);

    return <div className={classnames([classes['creator-grid']])}>
        <button
            className={classnames([
                classes['button'], classes['new-dir'],
                { [classes['button-active']]: creating === "dir" }
            ])}
            onClick={() => setCreating("dir")}
        >Nowy katalog</button>
        <button
            className={classnames([
                classes['button'], classes['new-file'],
                { [classes['button-active']]: creating === "file" }
            ])}
            onClick={() => setCreating("file")}
        >Nowy folder</button>

        {creating != null && <>
            <input
                ref={inputRef}
                className={classnames([classes['text-input']])}
                type="text"
                onChange={e => setName(e.target.value)}
            />
            <button
                className={classnames([classes['button'], classes['button-ok']])}
                onClick={onTick}>
                <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
                className={classnames([classes['button'], classes['button-cancel']])}
                onClick={() => { setName(""); setCreating(null); }}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </>}
    </div>;
};