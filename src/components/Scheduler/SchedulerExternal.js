import { useState, useReducer, useMemo, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';
import './index.css';
import Constants from '../Constants';
import TableFilter from '../CommonFunctions/TableFilter';
import SchedulerRow from './SchedulerRow';
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off } from 'firebase/database';
import TimeSlotFormat from '../CommonFunctions/TimeSlotFormat';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import GetBMIRange from '../CommonFunctions/GetBMIRange';


const filterReducer = (state, event) => {

    let newState = JSON.parse(JSON.stringify(state));

    if (event.target.name == "checkAll") {
        let field = event.target.getAttribute('field');
        let values = event.target.getAttribute('values');
        newState[field] = values.split(',');
        return newState;
    }

    if (event.target.type == "checkbox") {
        let filterValue = event.target.name;
        let checked = event.target.checked;
        let filterType = event.target.alt;
        if (checked && !newState[filterType].includes(filterValue)) {
            newState[filterType].push(filterValue);
        } else if (!checked && state[filterType].includes(filterValue)) {
            const index = newState[filterType].indexOf(filterValue);
            newState[filterType].splice(index, 1);
        }
    }

    return newState;
}





function SchedulerExternal({ setUpdateSession, updateSession }) {
    const [days, setDays] = useState([]);
    const [csvData, setCsvData] = useState([[]]);
    const [database, setDatabase] = useState({});
    const [highlightedTimeslots, setHighlightedTimeslots] = useState([]);
    const [filterData, setFilterData] = useReducer(filterReducer, {
        date: [format(new Date(), "yyyy-MM-dd")],
        sessionStatuses: ['Blank', 'Locked', ...Object.values(Constants['sessionStatuses'])],
        participantStatuses: ['Blank', ...Object.values(Constants['participantStatuses'])]
    });


    useEffect(() => {

        const path = '/';
        const pptRef = ref(realtimeDb, path);

        const listener = onValue(pptRef, (res) => {

            setDatabase(res.val() || {});
        });


        return () => {
            off(pptRef, "value", listener);

        }

    }, [])

    useEffect(() => {
        if (Object.keys(database).length === 0) return;
        document.getElementById('navbarTitle').innerText = `Total of booked sessions: ${Object.keys(database['timeslots']).filter(el => database['timeslots'][el]['participant_id']).length}`;
    }, [database]);


    useMemo(() => {
        var temp = [];
        var glassesTimeSlots = {};

        if (Object.keys(database).length === 0) return null

        for (var timeslotId in database['timeslots']) {
            let timeslotDate = timeslotId.substring(0, 4) + "-" + timeslotId.substring(4, 6) + "-" + timeslotId.substring(6, 8);
            if (!temp.includes(timeslotDate)) temp.push(timeslotDate);

            let timeslot = database['timeslots'][timeslotId];
            let timeslotTime = timeslotId.substring(0, 13);
            //let timeslotNr = parseInt(timeslotId.substring(0, 8));
            if (!glassesTimeSlots[timeslotTime]) glassesTimeSlots[timeslotTime] = 0;
            if (timeslot['participant_id'] && timeslot['glasses'] == true) { // && timeslotNr >= todayNr - 1) {
                glassesTimeSlots[timeslotTime]++;
            }
        }
        setHighlightedTimeslots(glassesTimeSlots);
        setDays(temp);



    }, [database])

    function getCSVData() {
        let headers = document.querySelectorAll('#tableHeaders tr th');
        let columns = []
        headers.forEach(child => {
            columns.push(child.textContent)
        })

        let output = [[...columns]];
        let table = document.getElementById("schedulerTable");
        for (var r = 1; r < table.rows.length; r++) {
            let row = table.rows[r];
            let temp = [];
            for (var c = 0; c < row.cells.length; c++) {
                temp.push(row.cells[c].innerHTML);
            }
            output.push(temp);
        }

        setCsvData(output);
        return output;
    }

    return (Object.keys(database).length > 0 && Object.keys(filterData).length > 0 &&
        <div id="schedulerContainer">
            <CSVLink
                className="download-csv-button"
                target="_blank"
                asyncOnClick={true}
                onClick={() => getCSVData()}
                filename={"Blackburn scheduler - " + format(new Date(), "yyyy-MM-dd") + ".csv"}
                data={csvData}
            >Download CSV</CSVLink>
            <div className="scheduler-table-container">
                <table id="schedulerTable" className="scheduler-table">
                    <thead id='tableHeaders'>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Status
                            </th>
                            <th>TELUS ID</th>
                            <th>First Name</th>
                            <th>Last Initial</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>BMI</th>
                            <th>Ethnicity Group</th>
                            <th>Skintone</th>
                            <th>Hair Color</th>
                            <th>Hair Length</th>
                            <th>Hair Type</th>
                            <th>Facial Hair</th>
                            <th>Facial Makeup</th>
                            <th>Tattoos</th>
                            <th>Piercings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(database).length > 0 && Object.keys(database['timeslots'])
                            .sort((a, b) => (a.length == 15 ? (a.substring(0, 14) + "0" + a.substring(14)) : a) < (b.length == 15 ? (b.substring(0, 14) + "0" + b.substring(14)) : b) ? -1 : 1)
                            .map((key, index, array) => {

                                let pInfo = database['participants'][database['timeslots'][key]['participant_id']]
                                return <tr>
                                    <td className='center-tag'>{TimeSlotFormat(key)}</td>
                                    <td className='center-tag'>{Constants['sessionStatuses'][database['timeslots'][key]['status']]}</td>
                                    <td className='center-tag'>{database['timeslots'][key]['participant_id']}</td>
                                    <td className='center-tag'>{pInfo ? pInfo['firstName'] : ""}</td>
                                    <td className='center-tag'>{pInfo ? pInfo['lastName'][0] + "." : ""}</td>
                                    <td className='center-tag'>{pInfo ? Constants['genders'][pInfo['gender']] : ""}</td>
                                    <td className='center-tag'>{pInfo ? GetAgeRange(pInfo)['age'] : ""}</td>
                                    <td className='center-tag'>{pInfo ? GetBMIRange(pInfo)['bmi'] : ""}</td>
                                    <td className='center-tag'>{pInfo ? pInfo['ethnicities'].split(";").map(eth => {
                                        return Object.keys(Constants['ethnicityGroups']).find(group => Constants['ethnicityGroups'][group].includes(parseInt(eth)));
                                    }).join(", ") : ""}</td>
                                    <td className='center-tag'>{pInfo ? pInfo['skintone'] : ""}</td>
                                    <td className='center-tag'>{pInfo ? Constants['hairColor'][pInfo['hairColor']] : ""}</td>
                                    <td className='center-tag'>{pInfo ? Constants['hairLength'][pInfo['hairLength']] : ""}</td>
                                    <td className='center-tag'>{pInfo ? Constants['hairType'][pInfo['hairType']] : ""}</td>
                                    <td className='center-tag'>{pInfo ? Constants['facialHair'][pInfo['facialHair']] : ""}</td>
                                    <td className='center-tag'>{Constants['makeup'][database['timeslots'][key]['makeup']]}</td>
                                    <td className='center-tag'>{pInfo ?
                                        pInfo['tattoos'] === "4" ? "No" : "Yes"
                                        : ""}</td>
                                    <td className='center-tag'>{pInfo ?
                                        pInfo['piercings    '] === "4" ? "No" : "Yes"
                                        : ""}</td>
                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default SchedulerExternal;