import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { setShowDocs } from '../../Redux/Features';


function CheckDocuments() {
    const dispatch = useDispatch();
    const [participant, setParticipant] = useState({})

    const participantId = useSelector((state) => state.userInfo.showDocs);


    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) dispatch(setShowDocs("")) };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, []);

    useEffect(() => {

        const path = `/participants/${participantId}/docs`;
        const pptRef = ref(realtimeDb, path);

        const listener = onValue(pptRef, (res) => {

            setParticipant(res.val() || {});
        });

        return () => {
            off(pptRef, "value", listener);

        }

    }, []);


    return ReactDOM.createPortal((
        <div className="modal-check-documents-backdrop" onClick={(e) => { if (e.target.className == "modal-check-documents-backdrop") dispatch(setShowDocs("")) }}>
            <div className="modal-check-documents-main-container">
                <div className="modal-check-documents-header">
                    Document of {participantId}
                </div>
                <div className="documents-container">

                    <>
                        {

                            Object.values(participant).map(upload => {
                                return Object.keys(upload).map(docKey => {
                                    const docUrl = `https://firebasestorage.googleapis.com/v0/b/brn-copy.firebasestorage.app/o/participants%2F${participantId}%2Fidentification%2F${upload[docKey]}`

                                    if (docUrl.includes(".jpg") || docUrl.includes(".jpeg") || docUrl.includes(".JPG") || docUrl.includes(".png") || docUrl.includes(".PNG")) {
                                        return (
                                            <TransformWrapper defaultScale={1}>
                                                <TransformComponent style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>
                                                    <img className="document-preview" style={{ maxWidth: "95%", height: "fit-content", marginRight: "auto", marginLeft: "auto" }} src={docUrl} title='document' alt='preview' />
                                                </TransformComponent>
                                            </TransformWrapper>
                                        )

                                    } else {
                                        return (
                                            <iframe className='document-preview' src={docUrl} />
                                        )

                                    }



                                })
                            })
                        }
                    </>

                </div>
            </div>
        </div>
    ), document.body)
};

export default CheckDocuments;