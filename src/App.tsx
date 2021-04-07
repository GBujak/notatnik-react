import './App.css';
import { BlockEditor } from './components/BlockEditor';
import { File } from './dataTypes/document';
import { BreadCrumb } from './components/BreadCrumb';
import { FileManager } from './components/FileManager';
import classes from './App.module.css';
import { useImmer } from 'use-immer';
import { Filesystem, getPathContent } from './util/filesystem';

function App() {
    const [filesystem, updateFilesystem] = useImmer<Filesystem>({
        currentPath: [],
        openFile: "plik jeden",
        files: {
            "plik jeden": {
                name: "plik jeden",
                blocks: ["test"],
            },
            "folder/plik dwa": {
                name: "folder/plik dwa",
                blocks: ['test 2']
            }
        }
    });

    const onFileChange = (newFile: File) => {
        updateFilesystem(draft => {
            draft.files[newFile.name] = newFile;
        });
    };

    const onCreate = (name: string) => {
        if (filesystem.currentPath.length !== 0)
            name = filesystem.currentPath.join("/") + "/" + name;
        updateFilesystem(draft => {
            draft.files[name] = { name: name, blocks: [""] };
        });
    };

    const onNavigate = (name: string) => {
        if (filesystem.currentPath.length !== 0)
            name = filesystem.currentPath.join("/") + "/" + name;
        updateFilesystem(draft => {
            if (filesystem.files[name] !== undefined) {
                draft.openFile = name;
            } else {
                draft.currentPath.push(name);
            }
        });
    };

    return (
        <div className={classes['container']}>
            <BreadCrumb currentPath={['/', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć']}></BreadCrumb>
            <FileManager
                items={getPathContent(filesystem)} // Może być wolne (memoizacja)!!!
                onCreate={onCreate}
                onNavigate={onNavigate}
            />
            <BlockEditor
                openFile={filesystem.files[filesystem.openFile]}
                onFileChange={onFileChange}
            />
        </div>
    );
}

export default App;
