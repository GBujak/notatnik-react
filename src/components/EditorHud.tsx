import classNames from 'classnames';
import React from 'react';
import { EditorLogin } from '../App';
import classes from './Button.module.css';
import { faCloud, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    login: EditorLogin,
    synchronized: boolean,
}

export const EditorHud: React.FC<Props> = (props) => {

    return <div style={{
        backgroundColor: 'lightgrey',
        gridColumn: "1/3",
        display: 'flex',
        alignItems: "center",
        justifyContent: "space-between",
    }}>
        <button
            className={classNames([classes['button']])}
            onClick={() => {
                navigator.clipboard.writeText(props.login.uuid + "::" + props.login.pass);
            }}
        >
            Skopiuj kod notatnika
        </button>

        <FontAwesomeIcon
            style={{ display: "block", fontSize: "2rem", marginRight: "1rem" }}
            icon={(props.synchronized) ? faCloud : faCloudUploadAlt}
        />
    </div>;
};