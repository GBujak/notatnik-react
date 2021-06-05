import axios from 'axios';
import React, { useState } from 'react';
import { EditorLogin } from '../App';
import sjcl from 'sjcl';
import { convertCompilerOptionsFromJson } from 'typescript';

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
        axios.post("/api/get-nodepad", { uuid: editorLogin.uuid }).then(response => {
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

    return <div>
        <h3>Logowanie</h3>
        <p>Podaj kod notatnika</p>
        <input type="text" value={loginString} onChange={e => setLoginString(e.target.value)} />
        <button onClick={() => onLogin()}>Zaloguj się</button>
        <br></br>
        <button onClick={onCreateNew}>Stwórz nowy notatnik</button>
        {message !== "" && <h4 style={{ color: 'darkred' }}>{message}</h4>}
    </div>;
};