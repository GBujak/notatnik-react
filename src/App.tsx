import { useState } from 'react';
import './App.css';
import update from 'immutability-helper';
import { BlockEditor } from './components/BlockEditor';
import { File } from './dataTypes/document';
import { BreadCrumb } from './components/BreadCrumb';
import { FileManager } from './components/FileManager';
import classes from './App.module.css';


interface FilesState {
    [files: string]: File,
}

function App() {
    const [files, setFiles] = useState<FilesState>({
        "test": {
            "name": "test",
            "blocks": [
                '# Tytuł',
                '## Podtytuł',
                '### Podpodtytuł',
                '#### Podpodpodtytuł',
                'Blok jeden',
                'Blok dwa',
                'Blok trzy',
            ]
        }
    });

    const onFileChange = (newFile: File) => {
        setFiles(update(files, { $merge: { [newFile.name]: newFile } }));
    };

    return (
        <div className={classes['container']}>
            <BreadCrumb currentPath={['/', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć']}></BreadCrumb>
            <FileManager openDir={{
                name: "test", files: [
                    { name: "Plik 1", blocks: [] },
                    { name: "Plik 2", blocks: [] },
                    { name: "Plik 3", blocks: [] },
                ],
                subDirectories: [
                    { name: "Katalog 1", files: [], subDirectories: [] },
                    { name: "Katalog 2", files: [], subDirectories: [] },
                    { name: "Katalog 3", files: [], subDirectories: [] },
                ]
            }}></FileManager>
            <BlockEditor
                openFile={files['test']}
                onFileChange={onFileChange}
            />
        </div>
    );
}

export default App;
