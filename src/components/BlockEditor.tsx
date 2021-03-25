import React from 'react';
import { TextBlock } from './TextBlock';

interface Props {
    blockContents: Array<string>,
    onBlockChange: (index: number, newValue: string) => void,
    onSplitBlock: (index: number, blockOne: string, blockTwo: string) => void,
}

export const BlockEditor: React.FC<Props> = ({ blockContents, onBlockChange, onSplitBlock }) => {
    return <div id="block-editor">
        {blockContents.map((content, index) => <TextBlock
            key={index}
            blockIndex={index}
            value={content}
            onValueChange={newValue => onBlockChange(index, newValue)}
            onSplitBlock={onSplitBlock}
        />)}
    </div>;
};