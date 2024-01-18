import { useState } from 'react';
import { GeistProvider } from '@geist-ui/core'
import './App.css';

import FieldSelector from './FieldSelector/FieldSelector'
import FileTreeSelector from './FileTreeSelector/FileTreeSelector'
import FilePreview from './FilePreview/FilePreview'

function App() {
    const fieldsToOrganizeBy = ["customer", "part", "part revision", "trial"]

    const [selectedField, setSelectedField] = useState(fieldsToOrganizeBy[0])
    const [selectedFile, setSelectedFile] = useState({ 'path': '', 'fileType': '' })

    return (
        <div className="app">
            <GeistProvider>
                <div className="sidebar">
                    <FieldSelector fields={fieldsToOrganizeBy} setField={setSelectedField} currentField={selectedField}></FieldSelector>
                    <FileTreeSelector field={selectedField} setFile={setSelectedFile}></FileTreeSelector>
                </div>
                <div className="main-content">
                    <FilePreview file={selectedFile}></FilePreview>
                </div>
            </GeistProvider>
        </div>
    );
}

export default App;
