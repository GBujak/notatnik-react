import axios from 'axios';
import React, { useState } from 'react';
import { EditorLogin } from '../App';
import btnClasses from './Button.module.css';
import textClasses from './TextBlock.module.css';
import sjcl from 'sjcl';
import classNames from 'classnames';

interface Props {
    onSetLogin: (login: EditorLogin) => void,
}

function parseEditorLogin(loginString: string): EditorLogin | null {
    let loginSplit = loginString.split('::');
    if (loginSplit.length !== 2) return null;
    let [uuid, pass] = loginSplit;
    return { uuid, pass };
}

export const LoginComponent: React.FC<Props> = ({ onSetLogin }) => {
    const [loginString, setLoginString] = useState("");
    const [message, setMessage] = useState("");

    const onLogin = () => {
        let editorLogin = parseEditorLogin(loginString);
        if (editorLogin === null) {
            setMessage("Błędny kod notatnika");
            return;
        }
        axios.post("/api/get-notepad", { uuid: editorLogin.uuid }).then(response => {
            if (response.data['msg']) setMessage(response.data['msg']);
            else onSetLogin(editorLogin!);
        });
    };

    const onCreateNew = () => {
        axios.post('/api/new-notepad').then(response => {
            let uuid: string = response.data.uuid;
            let pass = sjcl.random.randomWords(5).join("").toString();
            console.log({ uuid, pass });
            onSetLogin({ uuid, pass });
        });
    };

    return <div style={{ margin: 'auto', maxWidth: '900px' }}>
        <h2>Logowanie</h2>
        <br />
        <p>Kod notatnika:</p>

        <input className={classNames([textClasses['textArea']])}
            style={{ width: 'auto', display: 'inline-block', height: '3rem' }}
            type="text" value={loginString} onChange={e => setLoginString(e.target.value)} />
        <button className={classNames([btnClasses['button']])}
            onClick={() => onLogin()}>Zaloguj się</button>

        <br />
        <button className={classNames([btnClasses['button']])}
            onClick={onCreateNew}>Stwórz nowy notatnik</button>
        {message !== "" && <h4 style={{ color: 'darkred' }}>{message}</h4>}
    </div>;
};