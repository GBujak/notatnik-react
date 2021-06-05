import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import { Filesystem, getPathContent } from '../util/filesystem';
import { File } from '../dataTypes/document';
import classes from '../App.module.css';
import { BreadCrumb } from './BreadCrumb';
import { FileManager } from './FileManager';
import { BlockEditor } from './BlockEditor';
import { EditorHud } from './EditorHud';
import axios from 'axios';
import { EditorLogin } from '../App';
import sjcl from 'sjcl';

interface Props {
    login: EditorLogin,
}

export const EditorComponent: React.FC<Props> = ({ login }) => {

    const [loaded, setLoaded] = useState(false);
    const [synchronized, setSynchronized] = useState(true);

    const [filesystem, updateFilesystem] = useImmer<Filesystem>({
        currentPath: [],
        openFile: null,
        files: {
            "plik jeden": {
                name: "plik jeden",
                blocks: ["test"],
            },
        }
    });

    const timeoutRef = useRef<any>();

    const uploadFilesystem = () => {
        axios.post("/api/save-notepad", {
            uuid: login.uuid,
            encrypted: sjcl.encrypt(login.pass, JSON.stringify(filesystem)),
        }).then(() => {
            timeoutRef.current = null;
            setSynchronized(true);
        });
    };

    const loadFilesystem = () => {
        axios.post("/api/get-notepad", { uuid: login.uuid }).then((data) => {
            console.log(data);
            let notepadStr = data.data.encrypted;
            console.log(notepadStr);
            console.log(timeoutRef);

            if (notepadStr === "") {
                timeoutRef.current = setTimeout(uploadFilesystem, 1000);
            } else {
                updateFilesystem((draft => {
                    Object.assign(draft, JSON.parse(sjcl.decrypt(login.pass, notepadStr)));
                }));
                setLoaded(true);
            }
        });
    };

    if (!loaded) loadFilesystem();

    useEffect(() => {
        if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            uploadFilesystem();
        }, 1000);
        setSynchronized(false);
    }, [filesystem]);

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
            <EditorHud login={login} synchronized={synchronized} />
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