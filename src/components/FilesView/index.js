import { listAll, ref as storeRef, } from "firebase/storage";
import { storage } from "../../firebase/config";
import React, { useState, useEffect, } from 'react';
import './index.css'





const addToNestedObject = (obj, path, filename) => {
    const parts = path.split("/");
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
            current[part] = {}; // Initialize if not existing
        }
        current = current[part]; // Move to the next level
    }
    const lastPart = parts[parts.length - 1];
    current[lastPart] = {
        path,
        filename
    };
};

function FilesView() {
    const [files, setFiles] = useState({ participants: {} });

    useEffect(() => {
        let filesLength = Object.keys(files.participants).length || 0;
        if (filesLength > 0) document.getElementById('navbarTitle').innerText = `Participants in files: ${Object.keys(files.participants).length}`;
    }, [files]);


    useEffect(() => {
        const fetchFiles = async () => {
            const listRef = storeRef(storage, '/participants');
            const res = await listAll(listRef);

            const allSubfolderPromises = res.prefixes.map(async (folderRef) => {
                const subRef = storeRef(storage, folderRef.fullPath);
                const subres = await listAll(subRef);

                const allItemPromises = subres.prefixes.map(async (subfolderRef) => {
                    const lowestRef = storeRef(storage, subfolderRef.fullPath);
                    const lowestRes = await listAll(lowestRef);
                    return lowestRes.items.map((item) => item.fullPath);
                });

                const allItems = await Promise.all(allItemPromises);
                return allItems.flat();
            });

            const allSubfolders = await Promise.all(allSubfolderPromises);
            const allFiles = allSubfolders.flat();

            const nestedFiles = {}; // The object to hold nested structure
            allFiles.forEach((filePath) => {
                const splitPath = filePath.split("/");
                const filename = splitPath[splitPath.length - 1]; // Last part is the filename
                const path = splitPath.slice(0, splitPath.length - 1).join("/");
                addToNestedObject(nestedFiles, path, filename);
            });

            setFiles(nestedFiles);
        };
        fetchFiles();
    }, [files]);

    return <div>
        {files && <table id="schedulerExternalTable" className="scheduler-external-table">
            <thead>
                <tr>
                    <th>Participant ID</th>
                    <th>Path</th>
                </tr>

            </thead>
            <tbody>
                {Object.keys(files['participants']).map((id, i) => {
                    return <tr key={i}>
                        <td>{id}</td>
                        {
                            Object.keys(files['participants'][id]).map((item, j) => {

                                return <tr key={item}><td>{item}</td></tr>
                            })
                        }
                    </tr>
                })}
            </tbody>
        </table>
        }

    </div>
};

export default FilesView;