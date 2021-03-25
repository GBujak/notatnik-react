import { useRef, useState } from 'react';
import './App.css';
import update from 'immutability-helper';
import { BlockEditor } from './components/BlockEditor';

function App() {
    const [blocks, setBlocks] = useState([
        '# Tytuł',
        '## Podtytuł',
        '### Podpodtytuł',
        '#### Podpodpodtytuł',
        'Blok jeden',
        'Blok dwa',
        'Blok trzy',
    ]);

    return (
        <div>
            <BlockEditor
                blockContents={blocks}
                onBlockChange={(index, newValue) => {
                    setBlocks(update(blocks, {
                        [index]: { $set: newValue },
                    }));
                }}
                onSplitBlock={(index, blockOne, blockTwo) => {
                    setBlocks(update(blocks, {
                        $splice: [[index, 1, blockOne, blockTwo]]
                    }));
                    setTimeout(() => {
                        (document.querySelectorAll("#block-editor > *")[index + 1] as HTMLTextAreaElement).focus();
                        (document.querySelectorAll("#block-editor > *")[index + 1] as HTMLTextAreaElement).setSelectionRange(0, 0);
                    });
                }}
            />
        </div>
    );
}

export default App;
