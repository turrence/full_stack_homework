import { useEffect, useState } from "react"
import { Tree } from "@geist-ui/core"
import axios from "axios";
import { getFileNameFromPath } from "../utils";

export default function FileTreeSelector({ field, setFile }) {
    // "customer", "part", "revision", "trial"

    // this probably shouldn't be here
    const apiBaseURL = "http://localhost:8000/";
    
    const [folderData, setFolderData] = useState({});

    useEffect(() => {
        const urlToGet = (f) => {
            let url = apiBaseURL
            switch (field) {
                case "customer":
                    url += "get_files_by_customer"
                    break;
                case "part":
                    url += "get_files_by_part"
                    break;
                case "part revision":
                    url += "get_files_by_revision"
                    break;
                case "trial":
                    url += "get_files_by_trial"
                    break;
                default:
                    url += "get_files_by_customer"
                    break;
            }
            return url
        }

        axios.get(urlToGet(field)).then((response) => {
            setFolderData(response.data.data);
        }).catch((e) => {
            console.error("error" + e)
        })
    }, [field]);

    let fileClick = (path, ftype) => {
        setFile({ 'path': path, 'fileType': ftype })
    }

    return (<div>
        <div>
            <Tree>
                {Object.entries(folderData).map((key, index) => {
                    let name = key[0];
                    let data = key[1];
                    return <Tree.Folder key={index} name={name}>
                        {data.map((d, ind2) => {
                            let { path, fileType } = d;
                            return (<Tree.File key={ind2} name={getFileNameFromPath(path)} onClick={() => fileClick(path, fileType)}></Tree.File>)
                        })}
                    </Tree.Folder>
                })}
            </Tree>
        </div>
    </div>)
}

