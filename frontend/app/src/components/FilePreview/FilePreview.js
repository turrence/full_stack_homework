import './FilePreview.css'

import { useEffect, useState } from 'react';
import { getFileNameFromPath } from '../utils'

export default function FilePreview({ file }) {
    const { path, fileType } = file;

    const [fileContent, setFileContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    let filePath = "/files/" + path
    let fileName = getFileNameFromPath(path);

    useEffect(() => {
        setIsLoading(true);

        if (fileType === "artifact") {
            fetch(filePath)
                .then(response => response.text())
                .then((text) => {
                    setFileContent(text.slice(0, 500));
                    setIsLoading(false);
                }).catch(e => console.error(e));
        } else {
            setFileContent("");
            setIsLoading(false);
        }
    }, [fileType, filePath])

    return (
        <div className="preview">
            <h1>{fileName}</h1>
            <div className="preview-text">
                <p>
                    {isLoading ? "Loading..." :
                        (fileType === "geometry") ? "(geometry file)" : fileContent
                    }
                </p>
                {path !== "" && <a href={filePath} target="_blank" rel="noreferrer"><button>Download</button></a>}
            </div>
        </div>
    )
}