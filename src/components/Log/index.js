import { CSVLink } from 'react-csv';
import { useState, useReducer, useMemo, useEffect } from 'react';
import { format } from "date-fns";
import TableFilter from './TableFilter';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLog } from '../../Redux/Features';
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off } from 'firebase/database';
import TimeSlotFormat from '../CommonFunctions/TimeSlotFormat';
import DateFromLog from '../CommonFunctions/DateFromLog';

import './index.css';

const filterReducer = (state, event) => {
    let newState = JSON.parse(JSON.stringify(state));

    if (event.target.name == "checkAll") {
        let field = event.target.getAttribute("field");
        let values = event.target.getAttribute("values");
        newState[field] = values.split(",");
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
};

function Log({ showLog }) {
    const [logCsvData, setLogCsvData] = useState([[]]);
    const [days, setDays] = useState([]);
    const [database, setDatabase] = useState({});
    const participantId = showLog;


    const [filterData, setFilterData] = useReducer(filterReducer, {
        date: [format(new Date(), "yyyy-MM-dd")],
    });
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo.showLog || {});

    useEffect(() => {

        const dbRef = ref(realtimeDb, '/log');

        const listener = onValue(dbRef, (res) => {
            setDatabase(res.val() || {});
        });

        return () => {
            off(dbRef, "value", listener);
        }

    }, []);



    let result = {};
    for (const key in database['log']) {
        if (database['log'][key].pid === participantId) {
            result[key] = database['log'][key];
        }
    }

    let filteredResult = result;

    //pending to check
    // if (timeslotforLog) {
    //     result = {};
    //     for (const key in filteredResult) {

    //         if (typeof filteredResult[key]['timeslot'] !== 'undefined' && filteredResult[key]['timeslot'] === timeslotforLog) {
    //             result[key] = filteredResult[key];
    //         }
    //     }
    // }



    useMemo(() => {
        let temp = [];
        for (let timestampId in database['log']) {
            let timestampDate =
                "20" +
                timestampId.substring(0, 2) +
                "-" +
                timestampId.substring(2, 4) +
                "-" +
                timestampId.substring(4, 6);
            if (!temp.includes(timestampDate)) temp.push(timestampDate);

        }
        setDays(temp);
    }, [Object.keys(result).length]);

    function filterFunction(timeslotId) {
        let timeslotDate = "20" + `${timeslotId.substring(0, 2)}-${timeslotId.substring(2, 4)}-${timeslotId.substring(4, 6)}T${timeslotId.substring(6, 8)}:${timeslotId.substring(8, 10)}`;
        const parsedDate = new Date(timeslotDate);

        parsedDate.setHours(parsedDate.getHours() - 7);
        //converting date to LA time so the data matches the filtered date
        let adjustedDate = format(parsedDate, "yyyy-MM-dd")

        return filterData["date"].includes(adjustedDate);
    }




    function getCSVdata() {
        let output = [['Date', 'Timeslot', 'Station', 'Participant', 'Action', 'User']]

        let data = Object.keys(database['log']).
            filter((id) => filterFunction(id))
            .map((key) => [
                DateFromLog(key),
                TimeSlotFormat(database['log'][key]['timeslot']),
                database[key]['timeslot'],
                database[key]['pid'],
                database[key]['action'],
                database[key]['user']
            ])

        for (var i in data) {
            output.push(data[i])

        }

        setLogCsvData(output);
        return output
    }

    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) dispatch(setShowLog(false)); };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, []);

    return ReactDOM.createPortal((
        <div
            className="modal-activitylog-backdrop"
            onClick={(e) => {
                if (e.target.className == "modal-activitylog-backdrop") dispatch(setShowLog(false));
            }}
        >
            <div className="modal-activitylog-main-container">
                <div className="modal-activitylog-header">Activity Log</div>
                {!participantId ?
                    <CSVLink
                        className="download-csv-button"
                        target="_blank"
                        asyncOnClick={true}
                        onClick={getCSVdata}
                        filename={"penelope-logs_" + new Date().toISOString().split("T")[0] + ".csv"}
                        data={logCsvData}
                    >Download CSV</CSVLink> : ""
                }


                <div className="activityLogContainer" style={{ width: "55vw", minHeight: "70vh", height: "auto" }}>
                    {Object.keys(result).length > 0 ? (
                        <div className="scrollable-content" style={{ maxHeight: "90vh", minHeight: "80vh", overflowY: "auto" }}>
                            <div className="">
                                <table
                                    className="activityLog-table"
                                    style={{ width: "50vw" }}
                                >
                                    <thead>
                                        <th>
                                            {!participantId ? <TableFilter
                                                filterName="Date"
                                                alt="date"
                                                values={days}
                                                filterData={filterData}
                                                setFilterData={setFilterData}
                                                selectedEach={true}
                                            /> : <div style={{ color: 'white' }}>Date</div>}

                                        </th>
                                        <th>Timeslot</th>
                                        <th>Station</th>
                                        <th>Participant</th>
                                        <th>Action</th>
                                        <th>User</th>
                                    </thead>
                                    <tbody>
                                        {Object.keys(result)
                                            .filter((id) => {
                                                if (!participantId) {
                                                    return filterFunction(id);
                                                }
                                                return true;
                                            })
                                            .map((key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className="center-tag no-wrap">
                                                            {DateFromLog(key)}
                                                        </td>
                                                        <td className="center-tag no-wrap">
                                                            {TimeSlotFormat(
                                                                result[key]["timeslot"]
                                                            )}
                                                        </td>
                                                        <td className="center-tag no-wrap">
                                                            {
                                                                result[key]["timeslot"]
                                                            }
                                                        </td>
                                                        <td className="center-tag no-wrap" >
                                                            {result[key]["pid"]}
                                                        </td>
                                                        <td className="white-space-wrap">{result[key]["action"]}</td>
                                                        <td className="center-tag no-wrap">
                                                            {result[key]["user"]}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <h2 className="center-tag no-wrap" style={{ marginTop: "1vw" }}>
                            No records found
                        </h2>
                    )}
                </div>
            </div>
        </div>
    ), document.body);
}

export default Log;