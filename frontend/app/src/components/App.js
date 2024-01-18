import { useState } from 'react';
import './App.css';
import FieldSelector from './FieldSelector/FieldSelector'
import FileTreeSelector from './FileTreeSelector/FileTreeSelector'


function App() {
    const fieldsToOrganizeBy = ["customer", "part", "revision", "trial"]

    const [ selectedField, setSelectedField ] = useState(fieldsToOrganizeBy[0])

    return (
        <div>
            <h1>{selectedField}</h1>
            <FieldSelector fields={fieldsToOrganizeBy} setField={setSelectedField} ></FieldSelector>
            <FileTreeSelector field={selectedField}></FileTreeSelector>
        </div>
    );
}

export default App;
