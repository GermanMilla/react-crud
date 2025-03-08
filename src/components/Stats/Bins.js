import React, { useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { realtimeDb, updateValue } from '../../firebase/config';
import { ref, onValue, off, get } from 'firebase/database';
import Constants from '../Constants';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { isDemoStatsActive } from '../../Redux/Features';
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

function Bins({ }) {
    const [demos, setDemos] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const demoRef = ref(realtimeDb, '/demo_bins');
        const demoListener = onValue(demoRef, (res) => {
            setDemos(res.val() || {});
        });

        return () => {
            off(demoRef, "value", demoListener);
        }

    }, []);




    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) dispatch(isDemoStatsActive(false)); };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, []);

    if (Object.values(demos).length === 0) return;

    return ReactDOM.createPortal((
        <div className="modal-stats-backdrop" onClick={(e) => { if (e.target.className == "modal-stats-backdrop") dispatch(isDemoStatsActive(false)) }}>
            <div className='modal-stats-main-container'>
                <div className="modal-stats-header">
                    Demo Bins
                </div>

                <div className="modal-stats-content">
                    {['Male', 'Female'].map((gender) => {
                        return <table key={gender} className="table-of-stats">
                            <thead>
                                <tr>
                                    <th>
                                        {gender}
                                    </th>
                                    {Object.keys(Constants['ethnicityGroups']).filter(el => el != "Total").map(eth => {
                                        return <th key={'stats-header-' + eth}>{eth}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {Constants['listOfAgeRanges'].map(ageRange => {
                                    return <tr key={ageRange}>
                                        <th>{ageRange}</th>
                                        {Object.keys(Constants['ethnicityGroups']).filter(el => el != "Total").map(columnName => {
                                            let eth = Constants['ethDbMap2'][columnName]
                                            //let eth2 = Constants['ethnicityGroups'][columnName].map(el => Constants['ethnicities'][el]);

                                            let currentValue = demos[gender][eth][ageRange]
                                            return <td className={"stats-demo-bin-cell demo-bin-" + currentValue.toString()} onClick={() => updateValue("/demo_bins/" + gender + "/" + eth, { [ageRange]: (currentValue === 2 ? 0 : currentValue + 1) })}>
                                                <span className="demo-status" >{Constants['demoBinStatusDictionary'][currentValue]}</span>
                                            </td>
                                        })}
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    })}
                </div>
            </div>
        </div>
    ), document.body);
};

export default Bins;