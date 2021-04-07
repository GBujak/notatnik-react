import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import classes from './FileManager.module.css';
import classnames from 'classnames';

interface Props {
    onCreate: (name: string) => void,
}

export const FileManagerCreate: React.FC<Props> = ({ onCreate }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    let inputRef = useRef<HTMLInputElement>(null);

    const onTick = () => {
        onCreate(name);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [open]);

    return <div className={classnames([classes['creator-grid']])}>
        <button
            className={classnames([
                classes['button'], classes['button-new'],
            ])}
            onClick={() => setOpen(true)}
        >Stwórz nowy</button>

        {open && <>
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
                onClick={() => { setName(""); setOpen(false); }}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </>}
    </div>;
};