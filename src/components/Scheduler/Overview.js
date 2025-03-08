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






function Overview() {
    const [days, setDays] = useState([]);
    const [csvData, setCsvData] = useState([[]]);
    const [database, setDatabase] = useState({});

    const defaultStats = {

    }

    useEffect(() => {

        const path = '/timeslots';
        const pptRef = ref(realtimeDb, path);

        const listener = onValue(pptRef, (res) => {
            let temp = res.val() || {};

            let stats = {}

            Object.keys(temp).filter(el => temp[el]['participant_id']).map(el => {
                if (!stats[el.substring(0, 4) + "-" + el.substring(4, 6) + "-" + el.substring(6, 8)]) {
                    stats[el.substring(0, 4) + "-" + el.substring(4, 6) + "-" + el.substring(6, 8)] = { [Constants['sessionStatuses'][temp[el]['status']]]: 1 }
                } else if (!stats[el.substring(0, 4) + "-" + el.substring(4, 6) + "-" + el.substring(6, 8)][Constants['sessionStatuses'][temp[el]['status']]]) {
                    stats[el.substring(0, 4) + "-" + el.substring(4, 6) + "-" + el.substring(6, 8)][Constants['sessionStatuses'][temp[el]['status']]] = 1;
                } else {
                    stats[el.substring(0, 4) + "-" + el.substring(4, 6) + "-" + el.substring(6, 8)][Constants['sessionStatuses'][temp[el]['status']]] += 1;
                }

            })

            setDatabase(stats);
        });


        return () => {
            off(pptRef, "value", listener);

        }

    }, [])

    useEffect(() => {
        if (Object.keys(database).length === 0) return;
        document.getElementById('navbarTitle').innerText = `Scheduled: ${Object.keys(database).filter(el => database[el]['Scheduled']).map(el => {
            return database[el]['Scheduled']
        }).reduce((partialSum, a) => partialSum + a, 0)}. Checked In: ${Object.keys(database).filter(el => database[el]['Checked In']).map(el => {
            return database[el]['Checked In']
        }).reduce((partialSum, a) => partialSum + a, 0)}. Completed: ${Object.keys(database).filter(el => database[el]['Completed']).map(el => {
            return database[el]['Completed']
        }).reduce((partialSum, a) => partialSum + a, 0)}. No Show: ${Object.keys(database).filter(el => database[el]['No Show']).map(el => {
            return database[el]['No Show']
        }).reduce((partialSum, a) => partialSum + a, 0)}`;
    }, [database]);



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

    return (Object.keys(database).length > 0 &&
        <div id="schedulerContainer">
            <CSVLink
                className="download-csv-button"
                target="_blank"
                asyncOnClick={true}
                onClick={() => getCSVData()}
                filename={"Blackburn-overview - " + format(new Date(), "yyyy-MM-dd") + ".csv"}
                data={csvData}
            >Download CSV</CSVLink>
            <div className="scheduler-table-container">
                <table id="schedulerTable" className="scheduler-table">
                    <thead id='tableHeaders'>
                        <tr>
                            <th>Date</th>
                            <th>
                                Scheduled
                            </th>
                            <th>
                                Checked In
                            </th>
                            <th>Completed</th>
                            <th>No Show</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(database).length > 0 && Object.keys(database)
                            .sort((a, b) => (a.length == 15 ? (a.substring(0, 14) + "0" + a.substring(14)) : a) < (b.length == 15 ? (b.substring(0, 14) + "0" + b.substring(14)) : b) ? -1 : 1)
                            .map((key, index, array) => {

                                return <tr>
                                    <td className='center-tag'>{key}</td>
                                    <td className='center-tag'>{database[key]['Scheduled'] || ""}</td>
                                    <td className='center-tag'>{database[key]['Checked In'] || ""}</td>
                                    <td className='center-tag'>{database[key]['Completed'] || ""}</td>
                                    <td className='center-tag'>{database[key]['No Show'] || ""}</td>


                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default Overview;