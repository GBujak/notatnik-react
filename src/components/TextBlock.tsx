import { FormEvent, KeyboardEvent } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { headingLevel } from "../util/headingLevel";
import classes from './TextBlock.module.css';

interface Props {
    blockIndex: number,
    value: string,
    refFunc: (ref: HTMLTextAreaElement | null) => void,
    onValueChange: (newValue: string) => void,
    onSplitBlock: (index: number, blockOne: string, blockTwo: string) => void,
    onSimpleFocus: (index: number) => void,
    onCollapseBlock: (index: number) => void,
}

export const TextBlock: React.FC<Props> = ({ value, blockIndex, ...props }) => {

    const hLevel = headingLevel(value.substring(0, 6));

    let handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
        let newVal = e.currentTarget.value;
        props.onValueChange(newVal);
    };

    let handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.shiftKey) return;

        const caretPosition = (e.target as any).selectionStart;
        const textLength = (e.target as any).textLength;
        const [atTextStart, atTextEnd] = [caretPosition === 0, caretPosition === textLength];

        if (e.key === "Enter") {
            e.preventDefault();
            props.onSplitBlock(
                blockIndex,
                value.substring(0, caretPosition),
                value.substring(caretPosition, value.length),
            );
        }

        if (e.key === "Backspace" && atTextStart) {
            e.preventDefault();
            props.onCollapseBlock(blockIndex - 1);
        }

        if (e.key === "Delete" && atTextEnd) {
            e.preventDefault();
            props.onCollapseBlock(blockIndex);
        }

        if (e.key === "ArrowUp" && atTextStart) {
            props.onSimpleFocus(blockIndex - 1);
        }

        if (e.key === "ArrowDown" && atTextEnd) {
            props.onSimpleFocus(blockIndex + 1);
        }
    };

    return (
        <TextareaAutosize
            ref={(ref) => { props.refFunc(ref); }}
            className={`
                ${classes.textArea} 
                ${(hLevel) ? classes['header' + hLevel] : ''}
                ${value.startsWith("* ") || value.startsWith("- ") ? classes['indented'] : ''}
            `}
            value={value}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
        />
    );
};