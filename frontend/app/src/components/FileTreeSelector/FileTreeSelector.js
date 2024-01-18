import { useEffect, useState } from "react"
import axios from "axios";

function renderDictionary(k, v){
    //  "name1": [[file_path, file_type], [2], ...]
    return (
        <div>
            <p>{k}</p>
            {v.map((data, _) => (
                <p>{data[0]}, {data[1]}</p>
            ))}
            <p></p>
        </div>
    )
}

export default function FileTreeSelector({ field }) {
    // "customer", "part", "revision", "trial"

    const [ folderData, setFolderData ] = useState({});

    useEffect(() => {
        const urlToGet = (f) => {
            let url = "http://localhost:8000/"
            switch (field) {
                case "customer":
                    url += "get_files_by_customer"
                break;
                case "part":
                    url += "get_files_by_part"
                break;
                case "revision":
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

    let meClick = () => {
        Object.entries(folderData).map((key, value) => {
            console.log(key);
            console.log(value);
        });
    }

    return (<div>
        <button onClick={() => {meClick()}}>debug</button>
        <div>
            {Object.entries(folderData).map((key, ...value) => <div>
                <h1>{key}</h1> 
                <p>{value}</p>
            </div>)}
        </div>
    </div>)
}

