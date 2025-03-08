import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { realtimeDb, updateValue } from '../../firebase/config';
import Swal from 'sweetalert2';
import Constants from '../Constants';
import './BookSession.css';
import LogEvent from '../CommonFunctions/LogEvent';
import TimeSlotFormat from '../CommonFunctions/TimeSlotFormat';

function BookSession({ database, setShowBookSession, selectedSessionId, setJustBookedSession }) {
    const [searchBarText, setSearchBarText] = useState("");

    function participantFilter(pid) {
        let searchText = searchBarText.trim();
        if (!searchBarText) return false;

        let pInfo = database['participants'][pid];
        let pName = pInfo['firstName'].toLocaleLowerCase();
        let email = pInfo['email'];
        let phone = pInfo['phone'].replaceAll('T: ', '').replaceAll(' ', '');

        let output = [];
        if (pid.includes(searchText)) output.push('Participant ID');
        if (pName.includes(searchText)) output.push('Name');
        if (email.includes(searchText)) output.push('E-mail');
        if (phone.includes(searchText)) output.push('Phone');

        return output;
    }

    function bookSession(pid) {
        let backupSession = database['timeslots'][selectedSessionId]['backup'] === true;

        Swal.fire({
            title: "Booking an appointment",
            showCancelButton: true,
            confirmButtonText: backupSession ? 'Yes (backup)' : 'Yes',
            html: "<b>" + TimeSlotFormat(selectedSessionId) +
                "<br/>Station: " + selectedSessionId.substring(14) + "<br/>" +
                database['participants'][pid]['firstName'] + " " + database['participants'][pid]['lastName'] + "</b>" +
                (backupSession ? "<br/><br/><b><u>!!! BACKUP SESSION !!!</u></b><br/>" : ""),

        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    status: 0,
                    participant_id: pid,
                    confirmed: "no",
                    remind: true
                }

                if (data['locked'] === true) data['locked'] = false;

                // Save the session
                let path = "/timeslots/" + selectedSessionId;
                updateValue(path, data);
                setJustBookedSession(selectedSessionId);
                setShowBookSession(false);

                LogEvent({
                    value: `Booked session`,
                    participantId: pid,
                    action: 8
                })

                updateValue(`/participants/${pid}`, { status: 2 })

                LogEvent({
                    participantId: pid,
                    value: "Participant status: '" + "Scheduled" + "'",
                    action: 0
                })
            }
        })
    }

    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) setShowBookSession(false) };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, []);

    return ReactDOM.createPortal((
        <div className="modal-book-session-backdrop" onClick={(e) => { if (e.target.className == "modal-book-session-backdrop") setShowBookSession(false) }}>
            <div className="modal-book-session-main-container">
                <div className="modal-book-session-header">
                    Schedule session
                </div>
                <div
                    className="modal-book-session-sub-header">
                    Station {selectedSessionId.substring(14)}:&nbsp;
                    {TimeSlotFormat(selectedSessionId)}
                </div>
                <input
                    className="search-bar-for-schedule"
                    placeholder="Search..."
                    value={searchBarText}
                    onChange={(e) => setSearchBarText(e.target.value.toLocaleLowerCase())}
                    autoFocus
                />
                <div className="search-table-for-schedule-container">
                    <table className="search-table-for-schedule">
                        <thead>
                            <tr>
                                <th>Participant ID</th>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Year of birth</th>
                                <th>Status</th>
                                <th>Participant comments</th>
                            </tr>
                        </thead>
                        <tbody>

                            {Object.keys(database['participants'])
                                .sort((a, b) => {
                                    return a < b ? -1 : 1;
                                })
                                .map(key => {
                                    const participantStatus = database['participants'][key]['status'];

                                    const filterResult = participantFilter(key);
                                    if (filterResult.length > 0) return (
                                        <tr onClick={() => bookSession(key)}>
                                            <td className={(filterResult.includes('Participant ID') ? "filter-highlighted-cell" : "") + " center-tag"}>
                                                {key}
                                            </td>
                                            <td className={filterResult.includes('Name') ? "filter-highlighted-cell" : ""}>
                                                {database['participants'][key]['full_name']}
                                            </td>
                                            <td className={filterResult.includes('E-mail') ? "filter-highlighted-cell" : ""}>
                                                {database['participants'][key]['email']}
                                            </td>
                                            <td className={(filterResult.includes('Phone') ? "filter-highlighted-cell" : "") + " center-tag"}>
                                                {database['participants'][key]['phone'].replace("T: ", "")}
                                            </td>
                                            <td className="center-tag">
                                                {Constants['genders'][database['participants'][key]['gender']]}
                                            </td>
                                            <td className={(filterResult.includes('Year of birth') ? "filter-highlighted-cell" : "") + " center-tag"}>
                                                {database['participants'][key]['dob'].substring(0, 4)}
                                            </td>
                                            <td className="center-tag">
                                                {Constants['participantStatuses'][database['participants'][key]['status'] || 0]}
                                            </td>
                                            <td>
                                                {database['participants'][key]['comment']}
                                            </td>
                                        </tr>
                                    )
                                }
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ), document.body);
}

export default BookSession;