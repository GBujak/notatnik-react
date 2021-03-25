import { FormEvent, KeyboardEvent } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { headingLevel } from "../util/headingLevel";
import classes from './TextBlock.module.css';

interface Props {
    blockIndex: number,
    value: string,
    onValueChange: (newValue: string) => void,
    onSplitBlock: (index: number, blockOne: string, blockTwo: string) => void,
}

export const TextBlock: React.FC<Props> = ({ value, onValueChange, onSplitBlock, ...params }) => {

    const hLevel = headingLevel(value.substring(0, 6));

    let handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
        let newVal = e.currentTarget.value;
        onValueChange(newVal);
    };

    let handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.shiftKey) return;

        const caretPosition = (e.target as any).selectionStart;
        const textLength = (e.target as any).textLength;
        const [atTextStart, atTextEnd] = [caretPosition === 0, caretPosition === textLength];

        if (e.key === "Enter") {
            e.preventDefault();
            onSplitBlock(
                params.blockIndex,
                value.substring(0, caretPosition),
                value.substring(caretPosition, value.length),
            );
        }

        if (e.key === "Backspace" && atTextStart) {

        }

        if (e.key === "Delete" && atTextEnd) {

        }
    };

    return (
        <TextareaAutosize
            className={`${classes.textArea} ${(hLevel) ? classes['header' + hLevel] : ''}`}
            value={value}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
        />
    );
};