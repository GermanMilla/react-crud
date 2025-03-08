import { realtimeDb } from '../../firebase/config';
import { useState, useReducer, useMemo } from 'react';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { updateValue } from "../../firebase/config";
import UpdateSession from './UpdateSession';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import BookSession from './BookSession';
import LogEvent from '../CommonFunctions/LogEvent';
import SessionInfo from "../Tooltips/SessionInfo"
import TimeSlotFormat from '../CommonFunctions/TimeSlotFormat';
import Constants from '../Constants';
import { setShowUpdateSession } from '../../Redux/Features';


function SchedulerRow({ database, sessionId, index, array }) {
    const [showBookSession, setShowBookSession] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState("");
    const [justBookedSession, setJustBookedSession] = useState("");
    const dispatch = useDispatch();


    const participantId = database['timeslots'][sessionId]['participant_id'];
    const participantInfo = database['participants'][participantId] || {};

    // Update value in DB
    function cancelSession(sessionId) {
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            html: 'By cancelling the session, it will be deleted from the timetable!',
            confirmButtonText: 'Yes, cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                let path = "/timeslots/" + sessionId;
                let data = {
                    participant_id: "",
                    status: "",
                    confirmed: "",
                    booked_today: false,
                    remind: false,
                    comments: ""
                }

                // Set the bonuses to false
                let bonuses = database['timeslots'][sessionId]['bonus'];
                if (bonuses) {
                    data['bonus'] = JSON.parse(JSON.stringify(bonuses));
                    Object.keys(bonuses).map(bonusId => {
                        data['bonus'][bonusId]['a'] = false;
                    })
                }

                updateValue(path, data);

                LogEvent({
                    participantId: database['timeslots'][sessionId]['participant_id'],
                    value: `Cancelled Session ${sessionId}`,
                    action: 9
                })
            }
        })
    }


    function sendReminder(sessionId) {

        let pid = database['timeslots'][sessionId]['participant_id'];
        let participantInfo = database['participants'][pid];
        Swal.fire({
            title: "Reminder",
            showCancelButton: true,
            confirmButtonText: 'Yes, send',
            html: "Are you sure?"
        }).then((result) => {
            if (result.isConfirmed) {
                updateValue("/timeslots/" + sessionId, { remind: false });

                const scriptURL = 'https://script.google.com/macros/s/AKfycbzBFsfBSx-k5MqCQFz_hv7IH6UJTGGfesQKPsnFg8t8mOpQ_el-KCgfRIowyolDqqxy/exec';
                fetch(scriptURL, {
                    method: 'POST',
                    muteHttpExceptions: true,
                    body: JSON.stringify({
                        "participantId": pid,
                        "emailType": "Reminder",
                        "firstName": participantInfo['firstName'],
                        "lastName": participantInfo['lastName'],
                        "email": participantInfo['email'],
                        "appointment": sessionId
                    })

                }).then(res => {
                    Swal.fire({
                        toast: true,
                        icon: 'success',
                        title: 'Reminder sent',
                        animation: false,
                        position: 'bottom',
                        width: 'unset',
                        showConfirmButton: false,
                        timer: 2000
                    })
                });
            }
        })
    }

    function lockSession(sessionId) {
        updateValue("/timeslots/" + sessionId, { locked: true });
        LogEvent({
            value: `Locked session ${sessionId}`,
            action: 6
        })
    }

    function unlockSession(sessionId) {
        updateValue("/timeslots/" + sessionId, { locked: false });
        LogEvent({
            value: `Unlocked session ${sessionId}`,
            action: 7
        })
    }

    return (<tr key={"schedule-row-" + index} className={(justBookedSession == sessionId ? "highlighted-session-row" : "") + (index < array.length - 1 ? (sessionId.substring(0, 13) != array[index + 1].substring(0, 13) ? " day-separator" : "") : "")}>
        <td className="center-tag no-wrap">
            {TimeSlotFormat(sessionId)}
            {database['timeslots'][sessionId]['booked_today'] && format(new Date(), "yyyyMMdd") == sessionId.substring(0, 8) &&
                <Tooltip
                    disableInteractive
                    TransitionProps={{ timeout: 100 }}
                    componentsProps={{ tooltip: { sx: { fontSize: '1em' }, } }}
                    title={
                        <b><span>The participant booked the session today!</span></b>
                    }
                >
                    <label className="extra-info fas fa-info-circle" />
                </Tooltip>
            }

        </td>
        <td className="center-tag no-wrap">
            {database['timeslots'][sessionId]['slot']}
        </td>
        <td className={"center-tag " + (database['timeslots'][sessionId]['locked'] === true ? "locked-session-cell" : "")}>
            {database['timeslots'][sessionId]['locked'] === true ? "Locked" : Constants['sessionStatuses'][database['timeslots'][sessionId]['status']]}
        </td>
        <td className="center-tag">
            {Constants['participantStatuses'][participantInfo['status']] || ""}
        </td>
        {database['timeslots'][sessionId]['participant_id'] ?
            <SessionInfo database={database} participantId={database['timeslots'][sessionId]['participant_id']} sessionId={sessionId} />
            : <td></td>}
        <td >
            {participantId ? (participantInfo['firstName'] + " " + participantInfo['lastName']) : ""}
        </td>
        <td >
            {participantId ? (participantInfo['email']) : ""}
        </td>
        <td>
            {database['timeslots'][sessionId]['comments']}
        </td>
        <td className="center-tag">
            <div className="buttons-of-timeslot">
                {database['timeslots'][sessionId]['status'] === "" && !database['timeslots'][sessionId]['locked'] && <button className="update-timeslot-button book-button" onClick={() => { setSelectedSessionId(sessionId); setShowBookSession(true) }}>Schedule</button>}
                {database['timeslots'][sessionId]['status'] === "" && !database['timeslots'][sessionId]['locked'] && <button className="update-timeslot-button lock-button" onClick={() => { lockSession(sessionId) }}>Lock</button>}
                {database['timeslots'][sessionId]['status'] === "" && database['timeslots'][sessionId]['locked'] === true && <button className="update-timeslot-button unlock-button" onClick={() => { unlockSession(sessionId) }}>Unlock</button>}
                {database['timeslots'][sessionId]['status'] === 0 && database['timeslots'][sessionId]['remind'] == true && <button className="update-timeslot-button remind-button" onClick={() => sendReminder(sessionId)}>Remind</button>}
                {database['timeslots'][sessionId]['status'] !== "" && <button className="update-timeslot-button update-button" onClick={() => dispatch(setShowUpdateSession(sessionId))}>Update</button>}
                {database['timeslots'][sessionId]['status'] !== "" && <button className="update-timeslot-button cancel-button" onClick={() => cancelSession(sessionId)}>Cancel</button>}
            </div>
        </td>
        {showBookSession && <BookSession database={database} setShowBookSession={setShowBookSession} selectedSessionId={selectedSessionId} setJustBookedSession={setJustBookedSession} />}

    </tr>
    )
}

export default SchedulerRow;