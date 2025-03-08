import React, { useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off, get } from 'firebase/database';
import Constants from '../Constants';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { isStatsActive } from '../../Redux/Features';


import './index.css';
import './Bins.css';

const filterReducer = (state, event) => {
    let newState = JSON.parse(JSON.stringify(state));
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

function Stats({ setFilterDataFromStats }) {
    const navigate = useNavigate();
    const [database, setDatabase] = useState({});
    const [demos, setDemos] = useState({});
    const [stats, setStats] = useState(getDefaultNumbers());
    const [filterData, setFilterData] = useReducer(filterReducer, {
        statuses: ["Blank", "Not Selected"],
        statuses2: ["Contacted", "Scheduled", "Completed"],
    });
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo.value || {});


    function getDefaultNumbers() {
        let temp = Object.assign({}, ...Object.values(Constants['ethnicities']).map(k => ({
            [k]: Object.assign({}, ...Constants['listOfAgeRanges'].map(k => ({
                [k]: Object.assign({}, ...Object.values(Constants['genders']).map(k => ({
                    [k]: Object.assign({}, ...Object.values(Constants['participantStatuses']).map(k => ({ [k || "Blank"]: 0 })))
                })))
            })))
        })))

        return (temp);
    }

    function selectDemoBin(statuses, ethnicities, ageRange, gender) {
        if (userInfo['role'] !== 'admin') return;
        setFilterDataFromStats({
            fromStats: true,
            ethnicityGroups: [Constants.getKeyByValue(Constants['ethDbMap2'], Constants['ethDbMap'][ethnicities[0]])], //filter the group of the first item only
            multipleEthnicities: ['Yes', 'No'],
            genders: [gender],
            ageRanges: ageRange,
            statuses: statuses,
            skintones: Constants['skintones'],
            hairLengths: Object.values(Constants['hairLength']),
            hairTypes: Object.values(Constants['hairType']),
            hairColors: Object.values(Constants['hairColor']),
            facialHairs: Object.values(Constants['facialHair']),
            bmiRanges: Constants['bmiRanges'],
            furtherSessions: ['Yes', 'No'],
        });

        navigate('participants');
        dispatch(isStatsActive(false));
    }

    useEffect(() => {

        const pptRef = ref(realtimeDb, '/participants');
        const demoRef = ref(realtimeDb, '/demo_bins');

        const listener = onValue(pptRef, (res) => {
            setDatabase(res.val() || {});
        });


        const demoListener = onValue(demoRef, (res) => {
            setDemos(res.val() || {});
        });


        return () => {
            off(pptRef, "value", listener);
            off(demoRef, "value", demoListener);
        }

    }, []);



    useEffect(() => {
        let tempStats = getDefaultNumbers();
        Object.values(database).map(participant => {
            let gender = Constants['genders'][participant['gender']]
            let ageRange = GetAgeRange(participant)['ageRange'];
            let ethnicities = participant['ethnicities'].split(';').map(ethnicity => Constants['ethnicities'][ethnicity]);
            let ethValue = 1 / ethnicities.length;
            let status = Constants['participantStatuses'][participant['status']] || "Blank";
            console.log(ethnicities, participant)
            for (const element of ethnicities) {
                let ethnicity = element.trim();

                if (!Constants['listOfAgeRanges'].includes(ageRange)) continue;
                tempStats[ethnicity][ageRange][gender][status] += ethValue;
            }
        });

        setStats(tempStats);
    }, [database, demos])

    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) dispatch(isStatsActive(false)); };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, []);

    if (Object.values(demos).length === 0) return;

    return ReactDOM.createPortal((
        <div className="modal-stats-backdrop" onClick={(e) => { if (e.target.className == "modal-stats-backdrop") dispatch(isStatsActive(false)); }}>
            <div className='modal-stats-main-container'>
                <div className="modal-stats-header">
                    Participant stats
                </div>

                <div className="stats-filter-element">
                    <div><span className="first-number">First number:</span></div>
                    {Object.values(Constants['participantStatuses']).map((val, i) => {
                        return <div key={"filter-status" + i}>
                            <input id={"stats-filter-participant-status-" + (val || "Blank")} name={val || "Blank"} type="checkbox" alt="statuses" onChange={setFilterData} checked={val == "" ? filterData['statuses'].includes("Blank") : filterData['statuses'].includes(val)} />
                            <label className="first-number" htmlFor={"stats-filter-participant-status-" + (val || "Blank")}>{(val || "Blank")}</label>
                        </div>
                    })}
                </div>

                <div className="stats-filter-element">
                    <div><span className="second-number">Second number:</span></div>
                    {Object.values(Constants['participantStatuses']).map((val, i) => {
                        return <div key={"filter-status" + i}>
                            <input id={"stats-filter2-participant-status-" + (val || "Blank")} name={val || "Blank"} type="checkbox" alt="statuses2" onChange={setFilterData} checked={val == "" ? filterData['statuses2'].includes("Blank") : filterData['statuses2'].includes(val)} />
                            <label className="second-number" htmlFor={"stats-filter2-participant-status-" + (val || "Blank")}>{(val || "Blank")}</label>
                        </div>
                    })}
                </div>

                <div className="modal-stats-content">
                    {['Male', 'Female'].map((gender) => {
                        return <table key={gender} className="table-of-stats">
                            <thead>
                                <tr>
                                    <th>
                                        {gender}
                                    </th>
                                    {Object.keys(Constants['ethnicityGroups']).map(eth => {
                                        return <th key={'stats-header-' + eth}>{eth}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {Constants['listOfAgeRanges'].map(ageRange => {
                                    return <tr key={ageRange}>
                                        <th>{ageRange}</th>
                                        {Object.keys(Constants['ethnicityGroups']).map(columnName => {
                                            let eth = Constants['ethnicityGroups'][columnName].map(el => Constants['ethnicities'][el])
                                            let output = eth.reduce((a, b) => {
                                                return filterData['statuses'].reduce((x, y) => {
                                                    return stats[b][ageRange][gender][y] + x
                                                }, 0) + a
                                            }, 0);
                                            let output2 = eth.reduce((a, b) => {
                                                return filterData['statuses2'].reduce((x, y) => {
                                                    return stats[b][ageRange][gender][y] + x
                                                }, 0) + a
                                            }, 0);
                                            output = parseFloat(output.toFixed(1));
                                            output2 = parseFloat(output2.toFixed(1));

                                            let binClassTag = "";
                                            if (columnName != "Total") {
                                                binClassTag = "demo-bin-" + demos[gender][Constants['ethDbMap2'][columnName]][ageRange];
                                            }


                                            return <td className={"stats-demo-bin-cell " + (binClassTag)}>
                                                <span className="first-number" onClick={() => selectDemoBin(filterData['statuses'], eth, [ageRange], gender)}>{output}</span>
                                                <span className="second-number" onClick={() => selectDemoBin(filterData['statuses2'], eth, [ageRange], gender)}>{output2}</span>
                                            </td>
                                        })}

                                    </tr>
                                })}
                                <tr>
                                    <th className="stats-total-row">Total</th>
                                    {Object.keys(Constants['ethnicityGroups']).map(columnName => {
                                        let eth = Constants['ethnicityGroups'][columnName].map(el => Constants['ethnicities'][el])
                                        let output = eth.reduce((a, b) => {
                                            return filterData['statuses'].reduce((x, y) => {
                                                return Constants['listOfAgeRanges'].reduce((q, w) => { return stats[b][w][gender][y] + q }, 0) + x
                                            }, 0) + a
                                        }, 0);
                                        let output2 = eth.reduce((a, b) => {
                                            return filterData['statuses2'].reduce((x, y) => {
                                                return Constants['listOfAgeRanges'].reduce((q, w) => { return stats[b][w][gender][y] + q }, 0) + x
                                            }, 0) + a
                                        }, 0);
                                        output = parseFloat(output.toFixed(1));
                                        output2 = parseFloat(output2.toFixed(1));

                                        return <td className="stats-demo-bin-cell stats-total-row">
                                            <span className="first-number" >{output}</span>
                                            <span className="second-number">{output2}</span>
                                        </td>
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    })}
                </div>
            </div>
        </div>
    ), document.body);
};

export default Stats;