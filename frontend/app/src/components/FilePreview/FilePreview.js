import { getFileNameFromPath } from '../utils'

export default function FilePreview({ file }) {
    let { path, fileType } = file;
    let fileName = getFileNameFromPath(path)
    return (
        <div>{fileName} {fileType}</div>
    )
}