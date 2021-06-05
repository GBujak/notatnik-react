import React, { useEffect, useMemo } from 'react';
import { useImmer } from 'use-immer';
import { Filesystem, getPathContent } from '../util/filesystem';
import { File } from '../dataTypes/document';
import classes from '../App.module.css';
import { BreadCrumb } from './BreadCrumb';
import { FileManager } from './FileManager';
import { BlockEditor } from './BlockEditor';

interface Props { }

export const EditorComponent: React.FC<Props> = ({ }) => {
    const [filesystem, updateFilesystem] = useImmer<Filesystem>({
        currentPath: [],
        openFile: null,
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

    const onDelete = (name: string) => {
        console.log(`deleting: ${name}`);
        updateFilesystem(draft => {
            if (name === draft.openFile) draft.openFile = null;
            delete draft.files[name];

            if (getPathContent(draft).length === 0)
                draft.currentPath = [];
            else draft.currentPath = [...draft.currentPath];
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
                onDelete={onDelete}
                onNavigate={onNavigate}
            />
            {(filesystem.openFile !== null)
                ? <BlockEditor
                    openFile={filesystem.files[filesystem.openFile!]}
                    onFileChange={onFileChange}
                />
                : <h3>Wybierz plik z menedżera po lewej</h3>
            }
        </div >
    );
};