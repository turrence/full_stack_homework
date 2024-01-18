import { useState } from 'react';
import { GeistProvider } from '@geist-ui/core'
import './App.css';

import FieldSelector from './FieldSelector/FieldSelector'
import FileTreeSelector from './FileTreeSelector/FileTreeSelector'
import FilePreview from './FilePreview/FilePreview'
import { getFileNameFromPath } from './utils'


function App() {
    const fieldsToOrganizeBy = ["customer", "part", "revision", "trial"]

    const [ selectedField, setSelectedField ] = useState(fieldsToOrganizeBy[0])
    const [ selectedFile, setSelectedFile ] = useState({'path': '', 'fileType': ''})
    
    let fileName = getFileNameFromPath(selectedFile.path)

    return (
        <div class="app">
            <GeistProvider>
                <div class="sidebar">
                    <button onClick={() => {}}>debug global</button>
                    <h1>{selectedField}</h1>
                    <h3>{fileName}</h3>
                    <FieldSelector fields={fieldsToOrganizeBy} setField={setSelectedField}></FieldSelector>
                    <FileTreeSelector field={selectedField} setFile={setSelectedFile}></FileTreeSelector>
                </div>
                <div class="main-content">
                    <FilePreview file={selectedFile}></FilePreview>
                </div>
            </GeistProvider>
        </div>
    );
}

export default App;
