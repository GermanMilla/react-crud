import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Constants from '../Constants';
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off } from 'firebase/database';

function ICFModal({ setShowICFs, participantId }) {
    const [participant, setParticipant] = useState({})

    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) setShowICFs("") };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, []);

    useEffect(() => {

        const path = `/participants/${participantId}/icfs`;
        const pptRef = ref(realtimeDb, path);

        const listener = onValue(pptRef, (res) => {

            setParticipant(res.val() || {});
        });

        return () => {
            off(pptRef, "value", listener);

        }

    }, []);


    return ReactDOM.createPortal((
        <div className="modal-check-documents-backdrop" onClick={(e) => { if (e.target.className == "modal-check-documents-backdrop") setShowICFs("") }}>
            <div className="modal-check-icfs-main-container">
                <div className="modal-check-documents-header">
                    ICF Signatures of {participantId} (Signed on {new Date(participant['icfDate']).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })})
                </div>
                <div className="documents-container">

                    <>
                        {

                            Object.keys(participant).filter(el => el !== "icfDate").map(upload => {
                                const docUrl = `https://firebasestorage.googleapis.com/v0/b/blackburn-la.appspot.com/o/participants%2F${participantId}%2F${upload}%2F${participantId}_${upload}.png?${participant[upload]}`;

                                return (
                                    <>
                                        <div className="document-title">{Constants['icfNames'][upload]}</div>
                                        <img className="document-preview" style={{ maxWidth: "50%", height: "fit-content", marginRight: "auto", marginLeft: "auto", background: "white" }} src={docUrl} title='document' alt='preview' />
                                    </>
                                )

                            })


                        }
                    </>

                </div>
            </div>
        </div>
    ), document.body)
};

export default ICFModal;