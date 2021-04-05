import React, { useRef } from 'react';
import { File } from '../dataTypes/document';
import { TextBlock } from './TextBlock';
import update from 'immutability-helper';

interface Props {
    openFile: File,
    onFileChange: (newFile: File) => void,
}

const placeholderFocusBlock = (index: number) => {
    setTimeout(() => {
        (document.querySelectorAll("#block-editor > *")[index] as HTMLTextAreaElement).focus();
        (document.querySelectorAll("#block-editor > *")[index] as HTMLTextAreaElement).setSelectionRange(0, 0);
    });
};

export const BlockEditor: React.FC<Props> = ({ openFile, onFileChange }) => {

    const blockRefs = useRef<Array<HTMLTextAreaElement | null>>([]);

    const focusBlock = (index: number, caretPos: number = 0) => {
        setTimeout(() => {
            let blk = blockRefs.current[index];
            if (blk instanceof HTMLTextAreaElement) {
                blk.focus();
                blk.setSelectionRange(caretPos, caretPos);
            }
        });
    };

    const onSplitBlock = (index: number, blockOne: string, blockTwo: string) => {
        let newFile = update(openFile, {
            "blocks": { $splice: [[index, 1, blockOne, blockTwo]] }
        });
        onFileChange(newFile);
        focusBlock(index + 1);
    };

    const onCollapseBlock = (index: number) => {
        if (index >= blockRefs.current.length - 1) return;
        let caretPos = blockRefs.current[index]?.value.length;

        let left = blockRefs.current[index]?.value;
        let right = blockRefs.current[index + 1]?.value;
        let newVal;

        if (left !== undefined && right !== undefined) {
            newVal = left + right;
        } else {
            return;
        }

        let newFile = update(openFile, {
            "blocks": {
                $splice: [[index, 2, newVal]]
            }
        });
        focusBlock(index, caretPos);
        onFileChange(newFile);
    };

    const onBlockChange = (index: number, newValue: string) => {
        let newFile = update(openFile, {
            "blocks": { $splice: [[index, 1, newValue]] }
        });
        onFileChange(newFile);
    };

    const onSimpleFocus = (index: number) => {
        if (index > -1 && index < blockRefs.current.length) {
            focusBlock(index);
        }
    };

    return <div id="block-editor">
        {openFile.blocks.map((content, index) => <TextBlock
            key={index}
            blockIndex={index}
            refFunc={(ref) => { blockRefs.current[index] = ref; }}
            value={content}
            onValueChange={newValue => onBlockChange(index, newValue)}
            onSplitBlock={onSplitBlock}
            onSimpleFocus={onSimpleFocus}
            onCollapseBlock={onCollapseBlock}
        />)}
    </div>;
};