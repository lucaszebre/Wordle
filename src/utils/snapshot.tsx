import React, { useCallback } from 'react';
import { getSnapshot, useEditor } from 'tldraw';


function SnapshotToolbar() {
    const editor = useEditor();

    const save = useCallback(() => {
        const { document, session } = getSnapshot(editor.store);
        localStorage.setItem('snapshot', JSON.stringify({ document, session }));
    }, [editor]);

    // Use an effect to handle side effects, triggered on component mount for example
    React.useEffect(() => {
        // Call save when component mounts or editor changes, based on your requirement
        // If save needs to be triggered by an event, place it in an event handler instead
    }, [save]);

    // If you need a button to manually save the snapshot
    return <button onClick={save}>Save Snapshot</button>;
}

export default SnapshotToolbar;
