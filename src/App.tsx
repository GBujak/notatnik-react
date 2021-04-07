import './App.css';
import { BlockEditor } from './components/BlockEditor';
import { File } from './dataTypes/document';
import { BreadCrumb } from './components/BreadCrumb';
import { FileManager } from './components/FileManager';
import classes from './App.module.css';
import { useImmer } from 'use-immer';
import { Filesystem, getPathContent } from './util/filesystem';
import { useEffect, useMemo } from 'react';

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

    useEffect(() => console.log(filesystem));

    const pathContent = useMemo(() => getPathContent(filesystem), [filesystem.currentPath]);

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

            // Spowoduj odświeżenie pathContent
            draft.currentPath = [...draft.currentPath];
        });
    };

    const onNavigate = (name: string) => {
        let potentialFilename =
            (filesystem.currentPath.length !== 0)
                ? filesystem.currentPath.join("/") + "/" + name
                : name;

        updateFilesystem(draft => {
            if (draft.files[potentialFilename] !== undefined) {
                draft.openFile = potentialFilename;
            } else {
                draft.currentPath.push(name);
            }
        });
    };

    const onBreadCrumbNavigate = (path: Array<string>) => {
        updateFilesystem(draft => {
            draft.currentPath = path;
        });
    };

    return (
        <div className={classes['container']}>
            <BreadCrumb
                currentPath={filesystem.currentPath}
                onBreadCrumbNavigate={onBreadCrumbNavigate}
            ></BreadCrumb>
            <FileManager
                items={pathContent} // Może być wolne (memoizacja)!!!
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
