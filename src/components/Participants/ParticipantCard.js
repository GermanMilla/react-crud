import React, { useEffect, useState } from 'react';
import { realtimeDb } from '../../firebase/config';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { renderToString } from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import md5 from 'md5';
import { updateValue } from "../../firebase/config";
import CheckDocuments from '../CheckDocuments';
import ICFModal from '../ICFModal';
import { ref, onValue, off } from 'firebase/database';
import TimeSlotFormat from '../CommonFunctions/TimeSlotFormat';
import { setShowUpdateSession, setShowBookSession2, setShowDocs } from '../../Redux/Features';
import FormatTime from '../CommonFunctions/FormatTime';
import './ParticipantCard.css';
import Constants from '../Constants';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import BMICalculator from '../CommonFunctions/BMICalculator';
import LogEvent from '../CommonFunctions/LogEvent';
import GetFormattedLogDate from '../CommonFunctions/GetFormattedLogDate';

function ParticipantCard({ participantId, participants }) {
    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userId = userInfo['userId'];
    const [showICFs, setShowICFs] = useState(false);
    const [timeslots, setTimeslots] = useState({});

    const dispatch = useDispatch();

    const participantInfo = participants[participantId];
    useEffect(() => {

        const path = '/timeslots';
        const pptRef = ref(realtimeDb, path);

        const listener = onValue(pptRef, (res) => {

            setTimeslots(res.val() || {});
        });


        return () => {
            off(pptRef, "value", listener);

        }

    }, [])


    let ethnicityGroups = participantInfo['ethnicities'].toString().split(';').map(eth => {
        return Object.keys(Constants['ethnicityGroups']).find(group => Constants['ethnicityGroups'][group].includes(parseInt(eth)));
    });
    ethnicityGroups = [...new Set(ethnicityGroups)].sort((a, b) => a > b ? 1 : -1).join(', ');

    let ethnicities = participantInfo['ethnicities'].toString().split(';').map(eth => {
        return Constants['ethnicitiesDisplay'][eth]
    })

    ethnicities = ethnicities.join(";")

    const getIcfUrl = () => {
        return `https://blackburn-la.web.app/icf/${participantId}?email=${participantInfo['email']}`
    }

    const sendMail = async (emailType) => {

        const swalAnswer = await Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonText: 'Yes, send ' + emailType
        })
        if (swalAnswer.isConfirmed) {

            const scriptURL = 'https://script.google.com/macros/s/AKfycbzBFsfBSx-k5MqCQFz_hv7IH6UJTGGfesQKPsnFg8t8mOpQ_el-KCgfRIowyolDqqxy/exec';
            fetch(scriptURL, {
                method: 'POST',
                muteHttpExceptions: true,
                body: JSON.stringify({
                    "participantId": participantId,
                    "emailType": emailType,
                    "firstName": participantInfo['firstName'],
                    "lastName": participantInfo['lastName'],
                    "email": participantInfo['email'],
                    "icfUrl": emailType == 'ICF Request' ? getIcfUrl() : emailType == "Handoff" ? "https://blackburn-appointments.web.app/#" + md5('p_' + participantId) + '&' + participantId : "",
                    "sessionDate": "",
                    "userId": userId
                })
            })
            let tempObject = {};

            if (emailType == 'ICF Request' && participantInfo['status'] != 1) {
                tempObject['status'] = 1;
                LogEvent({ participantId: participantId, action: 2, value: `Sent ${emailType} email` });
            }


            if (Object.keys(tempObject).length > 0) updateValue("/participants/" + participantId, tempObject);


        }
    }

    function updateEthnicity() {
        const HTMLContent = () => {

            return <>
                {Object.values(Constants['ethnicitiesDisplay']).map((val, i) => {
                    return <div key={"popup-filter-eth" + i} className="update-ethnicity-row">
                        <input id={"popup-filter-" + val} name={val} type="checkbox" checked={ethnicities.includes(val) ? true : false} />
                        <label htmlFor={"popup-filter-" + val}>{val}</label>
                    </div>
                })}
            </>
        }

        Swal.fire({
            title: "Updating ethnicities",
            width: 500,
            confirmButtonText: "Save",
            showCancelButton: true,
            html: renderToString(<HTMLContent />)
        }).then((result) => {
            if (result.isConfirmed) {
                let checkboxes = document.querySelectorAll("[id^='popup-filter-']");
                let list = "";
                checkboxes.forEach(x => list += (x.checked ? Constants.getKeyByValue(Constants['ethnicitiesDisplay'], x.name) + ";" : ""));

                list = list.trim();
                list = list.substring(0, list.length - 1);

                if (list) {
                    updateValue("/participants/" + participantId, { ethnicities: list });

                    LogEvent({
                        participantId: participantId,
                        action: 13,
                        value: "Updated Ethnicities"
                    })
                }

            }
        })
    }



    return <div className="participant-card">
        <div className="participant-card-column column-1">
            {participantInfo['registeredAs'] === 1 &&
                <span className="registered-by-parent">Registered by parent or guardian</span>
            }

            <div className="participant-attribute-container">
                <span className="field-label"># {participantId}</span>
                <span>
                    {participantInfo['firstName'] + " " + participantInfo['lastName']}
                </span>
            </div>


            {participantInfo['registeredAs'] === 0
                && <>
                    <div className="participant-attribute-container">
                        <span className="field-label">Phone</span><span className={participantInfo['phone_counter'] > 1 ? "highlighted-span" : ""}>
                            {participantInfo['phone'].toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
                            <div className="copy-email-link fas fa-copy"
                                title="Copy phone number"
                                onClick={(e) => {
                                    e.preventDefault();
                                    let phone = participantInfo['phone'];
                                    navigator.clipboard.writeText(phone);

                                    Swal.fire({
                                        toast: true,
                                        icon: 'success',
                                        title: 'Copied: ' + phone,
                                        position: 'bottom',
                                        width: 'unset',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                }} target="_blank" />
                        </span>
                    </div>
                    <div className="participant-attribute-container">
                        <span className="field-label">E-mail</span>
                        <span>
                            {participantInfo['email']}
                            <div className="copy-email-link fas fa-copy"
                                title="Copy email"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const email = participantInfo['email'];
                                    navigator.clipboard.writeText(email);

                                    Swal.fire({
                                        toast: true,
                                        icon: 'success',
                                        title: 'Copied: ' + email,
                                        position: 'bottom',
                                        width: 'unset',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                }} target="_blank" />
                        </span>
                    </div></>
            }


            <div className="participant-attribute-container">
                <span className="field-label">Metadata</span>
                <span>
                    {Constants['genders'][participantInfo['gender']]} / {GetAgeRange(participantInfo)['ageRange']}   (DOB: {participantInfo['dob']})
                </span>
            </div>
            <div className="participant-attribute-container">
                <span className="field-label">Height / Weight (BMI)</span>
                <span>
                    {`${participantInfo['heightFt']}' ${participantInfo['heightIn']}'' / ${participantInfo['weightLbs']} ${BMICalculator(participantInfo['heightFt'], participantInfo['heightIn'], participantInfo['weightLbs'])}`}
                </span>

            </div>
            <div className="participant-attribute-container">

                <span className="field-label">Skin tone</span>
                <span>
                    {participantInfo['skintone']}
                </span>
            </div>

            <div className="participant-attribute-container">

                <span className="field-label">Hair Length / Color / Type </span>
                <span>
                    {Constants['hairLength'][participantInfo['hairLength']]} / {Constants['hairColor'][participantInfo['hairColor']]} / {Constants['hairType'][participantInfo['hairType']]}
                </span>
            </div>

            <div className={"participant-attribute-container " + (ethnicities.split(';').length > 1 ? 'multiple-ethnicities' : '')}>
                <span className="field-label">Ethnic Group(s)</span>
                <span>
                    {ethnicityGroups}
                    {participantInfo['status'] != 3 && <a className='copy-email-link fas fa-edit'
                        title='Update Ethnicities'
                        onClick={(e) => {
                            e.preventDefault();
                            updateEthnicity();
                        }} target='_blank'></a>
                    }
                </span>


            </div>

            <div className="participant-attribute-container">
                <span className="field-label">Signatures</span>


                {participantInfo['icfs'] ? <>
                    <button className='doc-button icf-doc' onClick={
                        () => {
                            setShowICFs(true);

                        }
                    }>Open ICFs</button>
                </> : <><button className='doc-button missing-doc' onClick={() => { sendMail("ICF Request") }}>Request ICF</button></>
                }

            </div>

            {
                participantInfo['registeredAs'] === 1 && <>
                    <hr />

                    <div className="participant-attribute-container">
                        <span className="field-label">Parent Name</span>
                        <span>
                            {`${participantInfo['guardianFirstName']} ${participantInfo['guardianLastName']}`}
                        </span>
                    </div>
                    <div className="participant-attribute-container">
                        <span className="field-label">Phone</span><span className={participantInfo['phone_counter'] > 1 ? "highlighted-span" : ""}>
                            {participantInfo['phone'].toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
                            <div className="copy-email-link fas fa-copy"
                                title="Copy phone number"
                                onClick={(e) => {
                                    e.preventDefault();
                                    let phone = "+" + participantInfo['phone'];
                                    navigator.clipboard.writeText(phone);

                                    Swal.fire({
                                        toast: true,
                                        icon: 'success',
                                        title: 'Copied: ' + phone,
                                        position: 'bottom',
                                        width: 'unset',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                }} target="_blank" />
                        </span>
                    </div>

                    <div className="participant-attribute-container">
                        <span className="field-label">E-mail</span>
                        <span>
                            {participantInfo['email']}
                            <div className="copy-email-link fas fa-copy"
                                title="Copy email"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const email = participantInfo['email'];
                                    navigator.clipboard.writeText(email);

                                    Swal.fire({
                                        toast: true,
                                        icon: 'success',
                                        title: 'Copied: ' + email,
                                        position: 'bottom',
                                        width: 'unset',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                }} target="_blank" />
                        </span>

                    </div>

                </>
            }



        </div>

        <div className="participant-card-column column-2">
            <div className="participant-attribute-container">
                <span className="field-label">Identification</span>
                <select className="participant-data-selector"
                    onChange={(e) => {
                        updateValue("/participants/" + participantId, { document_approval: parseInt(e.currentTarget.value) });
                        LogEvent({
                            participantId: participantId,
                            action: 3,
                            value: "Document status: " + (e.currentTarget.value || "Blank") + "'"
                        })
                    }}
                >
                    {Object.values(Constants['documentStatuses']).map((s, i) => (
                        <option key={"documents" + i} value={parseInt(i)} selected={i == parseInt(participantInfo['document_approval'])}>{s}</option>
                    ))}</select>
                <button className={"doc-button" + (participantInfo['docs']['pending'] ? " pending-doc" : "")}
                    onClick={
                        () => {
                            dispatch(setShowDocs(participantId));
                            updateValue(`/participants/${participantId}/docs`, { pending: false })
                        }
                    }>
                    Open
                    ({Object.keys(participantInfo['docs'][participantId]).length})
                </button>
                <div className="mark-unchecked fas fa-bookmark" onClick={(e) => {
                    e.preventDefault();
                    updateValue(`/participants/${participantId}/docs`, { pending: true })
                }}></div>
            </div>

            {showICFs && <ICFModal setShowICFs={setShowICFs} participantId={participantId} />}
            <div className="participant-attribute-container">

                <span className="field-label">Status</span>

                <select className="participant-data-selector min-width-selector"
                    onChange={(e) => {
                        updateValue("/participants/" + participantId, { status: parseInt(e.currentTarget.value) });
                        LogEvent({ participantId, action: 0, value: parseInt(e.currentTarget.value), userId: userId });
                    }}>
                    {Object.keys(Constants['participantStatuses']).map(statusId => {
                        const status = Constants['participantStatuses'][statusId];
                        return <option key={"participant-status-" + statusId} value={statusId} selected={statusId == participantInfo['status']}>{status}</option>
                    })}
                </select>
            </div>





            <div className="participant-attribute-container">
                <textarea className="participant-comment"
                    defaultValue={participantInfo['comment']}
                    onBlur={(e) => {
                        const newComment = e.currentTarget.value;
                        if (newComment != participantInfo['comment']) {
                            updateValue("/participants/" + participantId, { comment: newComment });
                            LogEvent({ participantId, action: 1, value: newComment, userId: userId });
                        }
                    }}
                    placeholder="Comments..."
                    onInput={(e) => {
                        let height = e.currentTarget.offsetHeight;
                        let newHeight = e.currentTarget.scrollHeight;
                        if (newHeight > height) {
                            e.currentTarget.style.height = 0;
                            e.currentTarget.style.height = newHeight + "px";
                        }
                    }}
                />
            </div>

            {participantInfo['icfs'] && !["Rejected", "Withdrawn", "Completed", "Not Selected", "Duplicate"].includes(Constants['participantStatuses'][participantInfo['status']]) &&
                participantInfo['document_approval'] == 1 &&
                <div className="participant-attribute-container">
                    <span className="field-label">Communication</span>
                    <button className="email-button handoff-button" onClick={() => sendMail("Handoff")}>Send Handoff email</button>
                    <a className="copy-booking-link fas fa-copy" onClick={(e) => {
                        e.preventDefault();

                        let url = "https://blackburn-appointments.web.app/#" + md5('p_' + participantId) + "&" + participantId
                        navigator.clipboard.writeText(url);

                        Swal.fire({
                            toast: true,
                            icon: 'success',
                            title: 'Copied',
                            html: url,
                            position: 'bottom',
                            width: 'unset',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }} target="_blank" />
                </div>
            }
        </div>

        <div className={"participant-card-column" + " column-4"}>
            <span className="participant-attribute-header">Sessions {participantInfo['external_id'] ? " (" + participantInfo['external_id'] + ")" : ""}</span>
            {Object.keys(timeslots || {}).map(timeslotId => {
                const session = timeslots[timeslotId];
                const station = parseInt(timeslotId.substring(14)) > 100 ? 'Backup' : timeslotId.substring(14);
                if (participantId !== session['participant_id']) return null;
                return (
                    <button
                        key={"session" + timeslotId}
                        className="session-button"
                        onClick={
                            () => {
                                dispatch(setShowUpdateSession(timeslotId));
                                //setTimeslotforLog(timeslotId);
                            }
                        }
                    >
                        {TimeSlotFormat(timeslotId) + " (" + station + ")" + ": " + Constants['sessionStatuses'][session['status']]}
                    </button>
                )
            })}

            {
                !["Rejected", "Withdrawn", "Completed", "Not Selected", "Duplicate"].includes(Constants['participantStatuses'][participantInfo['status']]) &&
                <button className="book-session-button" onClick={
                    () => {
                        dispatch(setShowBookSession2(participantId))
                    }
                }>Schedule session</button>
            }
        </div>

        {
            participantInfo['history'] &&
            <div className={"participant-card-column" + " column-5"}>
                <span className="participant-attribute-header">Email history</span>
                {participantInfo['history'] && Object.keys(participantInfo['history']).map((t) => {
                    let emailTitle = participantInfo['history'][t]['title'];
                    let appointmentTime = "";
                    if (emailTitle.startsWith('Handoff')) {
                        emailTitle = emailTitle.replace("(", "($ ");
                    }
                    else if (emailTitle.startsWith('Confirmation') && emailTitle.length > 15) {
                        appointmentTime = emailTitle.substring(13, 17) + "-" +
                            emailTitle.substring(17, 19) + "-" +
                            emailTitle.substring(19, 21) + " " +
                            FormatTime(emailTitle.substring(22, 24) + ":" + emailTitle.substring(24, 26)) +
                            " (" + (parseInt(emailTitle.substring(27)) > 100 ? 'Backup' : emailTitle.substring(27)) + ")";
                        emailTitle = 'Confirmation';
                    } else if (emailTitle.startsWith('Reminder') && emailTitle.length > 15) {
                        appointmentTime = emailTitle.substring(9, 13) + "-" +
                            emailTitle.substring(13, 15) + "-" +
                            emailTitle.substring(15, 17) + " " +
                            FormatTime(emailTitle.substring(18, 20) + ":" + emailTitle.substring(20, 22)) +
                            " (" + (parseInt(emailTitle.substring(23)) > 100 ? 'Backup' : emailTitle.substring(23)) + ")";
                        emailTitle = 'Reminder';
                    }
                    return <div key={participantId + t} className="participant-attribute-container">
                        <span className="field-label">{t.substring(0, 16).replaceAll('_', ' ')}</span>
                        <span className="email-history-content">
                            <span>{emailTitle}</span>
                            {appointmentTime && <span>{appointmentTime}</span>}
                        </span>
                    </div>
                })}

            </div>
        }



    </div >
}

export default ParticipantCard;