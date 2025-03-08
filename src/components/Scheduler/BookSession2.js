import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { realtimeDb } from '../../firebase/config';
import Swal from 'sweetalert2';
import './BookSession2.css';

import Constants from '../Constants';
import LogEvent from '../CommonFunctions/LogEvent';
import TimeSlotFormat from '../CommonFunctions/TimeSlotFormat';
import FormatTime from '../CommonFunctions/FormatTime';
import { useSelector, useDispatch } from 'react-redux';
import { setShowBookSession2 } from '../../Redux/Features';
import { ref, onValue, off } from 'firebase/database';
import { updateValue } from "../../firebase/config";





function BookSession2({ showBookSession2 }) {
    const userInfo = useSelector((state) => state.userInfo.value || {});
    const dispatch = useDispatch();
    const userId = userInfo['userId'];
    const [days, setDays] = useState([]);
    const [timeslots, setTimeslots] = useState({});
    const [calculatedTimeslots, setCalculatedTimeslots] = useState([]);
    const [participantInfo, setParticipantInfo] = useState({});

    const participantId = showBookSession2;

    useEffect(() => {
        const path = '/timeslots/';
        const pptRef = ref(realtimeDb, path);

        const listener = onValue(pptRef, (res) => {
            const temp = res.val() || {};
            setTimeslots(temp);

        });

        return () => {
            off(pptRef, "value", listener);

        }

    }, []);

    useEffect(() => {
        if (participantId == '') return;

        const pptPath = '/participants/' + participantId;
        const pptInfoRef = ref(realtimeDb, pptPath);

        const pptListener = onValue(pptInfoRef, (res) => {
            const temp = res.val() || {};
            setParticipantInfo(temp)
        });

        return () => {
            off(pptInfoRef, "value", pptListener);

        }
    }, [participantId]);

    function bookSession(sessionId) {
        let backupSession = timeslots[sessionId]['backup'] === true;

        Swal.fire({
            title: "Booking an appointment",
            showCancelButton: true,
            confirmButtonText: backupSession ? 'Yes (backup)' : 'Yes',
            html: "<b>" + TimeSlotFormat(sessionId) +
                "<br/>Station: " + sessionId.substring(14) + "<br/>" +
                participantInfo['firstName'] + " " + participantInfo['lastName'] + "</b>" +
                (backupSession ? "<br/><br/><b><u>!!! BACKUP SESSION !!!</u></b><br/>" : ""),

        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    status: 0,
                    participant_id: participantId,
                    confirmed: "no",
                    remind: true
                }

                if (data['locked'] === true) data['locked'] = false;

                // Save the session
                updateValue("/timeslots/" + sessionId, data)
                dispatch(setShowBookSession2(""))

                LogEvent({
                    value: `Booked session`,
                    participantId: participantId,
                    action: 8
                })

                updateValue(`/participants/${participantId}`, { status: 2 })

                LogEvent({
                    participantId: participantId,
                    value: "Participant status: '" + "Scheduled" + "'",
                    action: 0
                })
            }
        })
    }

    useEffect(() => {
        let tempDays = [];
        let tempTimeslots = [];
        const now = new Date();
        Object.keys(timeslots).map(sessionId => {
            const day = sessionId.substring(0, 4) + "-" + sessionId.substring(4, 6) + "-" + sessionId.substring(6, 8);
            const dateOfSession = new Date(day);
            const diffTime = dateOfSession - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays < -7) return;

            if (!tempDays.includes(day)) tempDays.push(day);

            const timeslot = sessionId.substring(9, 11) + ":" + sessionId.substring(11, 13);
            if (!tempTimeslots.includes(timeslot)) tempTimeslots.push(timeslot);
        });

        setDays(tempDays);

        tempTimeslots.sort();
        setCalculatedTimeslots(tempTimeslots);
    }, [timeslots])



    return ReactDOM.createPortal((
        <div className="modal-book-session2-backdrop" onClick={(e) => { if (e.target.className == "modal-book-session2-backdrop") dispatch(setShowBookSession2("")) }}>
            <div className="modal-book-session2-main-container">
                <div className="modal-book-session2-header">
                    Schedule session
                </div>
                <div
                    className="modal-book-session2-sub-header">
                    {participantInfo['firstName']} {participantInfo['lastName']} ({participantId})
                </div>
                <div className="session2-table-container">
                    <table className="session2-table">
                        <thead>
                            <tr>
                                <th className="session2-table-header-cell">

                                </th>
                                {days.map(day => {
                                    return (
                                        <th key={"scheduler-table-item-" + day} className="session2-table-header-cell">
                                            {day}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>

                            {calculatedTimeslots.map(timeslot => {
                                return (
                                    <tr key={"scheduler-table-item-" + timeslot}>
                                        <th className="session2-table-header-cell">
                                            {FormatTime(timeslot)}
                                        </th>
                                        {days.map(day => {
                                            let sessionId = day.replaceAll('-', '') + '_' + timeslot.replaceAll(':', '') + '_';
                                            let sessionIdWithLab = "";
                                            let bookedSessions = Object.keys(timeslots).filter(key => key.startsWith(sessionId) && timeslots[key]['participant_id']).length;
                                            let totalOfSessions = Object.keys(timeslots).filter(key => key.startsWith(sessionId) && !timeslots[key]['locked']).length;
                                            let nextFreeLab = "";
                                            let free = bookedSessions < totalOfSessions;
                                            if (free) {
                                                nextFreeLab = Object.keys(timeslots).filter(key => key.startsWith(sessionId) && !timeslots[key]['participant_id']).sort((a, b) => a < b ? 1 : -1).sort((a, b) => timeslots[a]['backup'] ? 1 : -1)[0].substring(14);
                                                sessionIdWithLab = day.replaceAll('-', '') + '_' + timeslot.replaceAll(':', '') + '_' + nextFreeLab;
                                            }
                                            return (
                                                <td
                                                    className={"session2-table-cell " + (free ? "free-sessions" : "booked-sessions")}
                                                    onClick={() => { if (free) bookSession(sessionIdWithLab) }}
                                                >
                                                    {bookedSessions + " / " + totalOfSessions}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    ), document.body)
};

export default BookSession2;