import { useState } from 'react';
import './App.css';
import { EditorComponent } from './components/EditorComponent';
import { LoginComponent } from './components/LoginComponent';
import './index.css';

export interface EditorLogin {
    uuid: string,
    pass: string,
}

function App() {
    const [login, setLogin] = useState<EditorLogin | null>(null);

    return (login !== null)
        ? <EditorComponent login={login} />
        : <LoginComponent onSetLogin={setLogin} />;
}

export default App;
