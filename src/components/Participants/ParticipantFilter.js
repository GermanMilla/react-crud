import React, { useState } from "react";
import { useEffect, useReducer } from 'react';
import './ParticipantFilter.css';
import Constants from '../Constants';
import GetAgeRange from "../CommonFunctions/GetAgeRange";
import GetSkinTone from "../CommonFunctions/GetSkinTone";
import alltypes from "../CommonFunctions/PropTypes";
import Card from '@mui/material/Card';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GetBMIRange from "../CommonFunctions/GetBMIRange";
import Button from '@mui/material/Button';

const defaultFilterValues = {
    genders: Object.values(Constants['genders']),
    ageRanges: Constants['ageRanges'].filter(ageRange => ageRange != "<13"),
    statuses: Object.values(Constants['participantStatuses']).map(status => status || 'Blank'),
    skintones: Constants['skintones'],
    multipleEthnicities: ['Yes', 'No'],
    ethnicityGroups: Object.keys(Constants['ethnicityGroups']).filter(group => group != 'Other'),
    hairLengths: Object.values(Constants['hairLength']),
    hairTypes: Object.values(Constants['hairType']),
    hairColors: Object.values(Constants['hairColor']),
    facialHairs: Object.values(Constants['facialHair']),
    bmiRanges: Constants['bmiRanges'],
    furtherSessions: ["Yes", "No"]

}




const filterReducer = (state, event) => {

    // If the filter is called from stats
    if (event.fromStats) return event;

    if (event.target.name == "resetFilter") {
        return JSON.parse(JSON.stringify(defaultFilterValues));
    }

    let newState = JSON.parse(JSON.stringify(state));
    if (event.target.name == "countryOfResidence") {
        newState['countryOfResidence'] = event.target.value;
        return newState;
    } else if (event.target.tagName == "BUTTON") {
        // Use this to 'filter only...'
        let value = event.target.name;
        let arrayName = event.target.getAttribute('alt');

        newState[arrayName] = [value];
        return newState;
    } else if (event.target.type == "checkbox") {
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

    if (event.target.type == "text" || event.target.type == "number") {
        let filterName = event.target.name;
        let filterValue = event.target.value.toLowerCase();

        if (['email', 'phone'].includes(filterName)) filterValue = filterValue.trim();

        if (filterValue == "") {
            if (newState[filterName]) delete newState[filterName];
        } else {
            newState[filterName] = filterValue;
        }
    }

    if (event.target.type == "date") {
        let filterName = event.target.name;
        let filterValue = event.target.value;
        if (filterValue == "") {
            if (newState[filterName]) delete newState[filterName];
        } else {
            newState[filterName] = filterValue;
        }
    }

    return newState;
}



function ParticipantFilter({ participants, sessions, setShownParticipants, filterStats, filterDataFromStats, setFilterDataFromStats }) {

    const [filterData, setFilterData] = useReducer(filterReducer, JSON.parse(JSON.stringify(defaultFilterValues)));

    //proptype validation
    ParticipantFilter.propTypes = alltypes.ParticipantComponent;

    useEffect(() => {
        if (filterDataFromStats) {
            setFilterData(filterDataFromStats);
            setFilterDataFromStats(false);
        }
    }, [filterDataFromStats, setFilterDataFromStats])



    function filterFunction(participantId) {
        const participantInfo = participants[participantId];
        if (filterData['participantId'] && !participantId.includes(filterData['participantId'])) return false;

        const firstName = participantInfo['firstName'].toLowerCase();
        if (filterData['firstName'] && !firstName.includes(filterData['firstName'].trim())) return false;

        const lastName = participantInfo['lastName'].toLowerCase();
        if (filterData['lastName'] && !lastName.includes(filterData['lastName'].trim())) return false;

        const email = participantInfo['email'].toLowerCase();
        if (filterData['email'] && !email.includes(filterData['email'].trim())) return false;

        const phone = participantInfo['phone'].toLowerCase();
        if (filterData['phone'] && !phone.includes(filterData['phone'].trim())) return false;


        const gender = Constants['genders'][participantInfo['gender']];
        if (!filterData['genders'].includes(gender)) return false;

        const ageRange = GetAgeRange(participantInfo)['ageRange'];
        if (!filterData['ageRanges'].includes(ageRange)) return false;

        const bmiRange = GetBMIRange(participantInfo)['bmiRange'];
        if (!filterData['bmiRanges'].includes(bmiRange)) return false;

        const ethnicities = participantInfo['ethnicities'];
        const ethnicityGroups = ethnicities.toString().split(';').map(eth => {
            return Object.keys(Constants['ethnicityGroups']).find(group => Constants['ethnicityGroups'][group].includes(parseInt(eth)));
        });

        const multipleEthnicities = [...new Set(ethnicityGroups)].length > 1 ? 'Yes' : 'No';
        if (!filterData['multipleEthnicities'].includes(multipleEthnicities)) return false;
        if (!filterData['ethnicityGroups'].some(group => ethnicityGroups.includes(group))) return false;


        const status = participantInfo['status'] ? Constants['participantStatuses'][participantInfo['status']] : 'Blank';
        if (!filterData['statuses'].includes(status)) return false;

        const skintone = GetSkinTone(participantInfo)['skinRange'];
        if (!filterData['skintones'].includes(skintone)) return false;

        const hairLength = Constants['hairLength'][participantInfo['hairLength']];
        if (!filterData['hairLengths'].includes(hairLength)) return false;

        const hairType = Constants['hairType'][participantInfo['hairType']];
        if (!filterData['hairTypes'].includes(hairType)) return false;

        const hairColor = Constants['hairColor'][participantInfo['hairColor']];
        if (!filterData['hairColors'].includes(hairColor)) return false;

        const facialHair = Constants['facialHair'][participantInfo['facialHair']];
        if (!filterData['facialHairs'].includes(facialHair)) return false;

        const furtherSession = participantInfo['furtherSessions'] || false === true ? "Yes" : "No";
        if (!filterData['furtherSessions'].includes(furtherSession)) return false;

        // Check date of registration
        let dateOfRegistration;
        let dateFrom = filterData['dateOfRegistrationFrom'];
        let dateTo = filterData['dateOfRegistrationTo'];
        if (dateFrom) {
            dateOfRegistration = new Date(participantInfo['date']);
            dateFrom = new Date(dateFrom);
            if (dateOfRegistration < dateFrom) return false;
        }
        if (dateTo) {
            if (!dateOfRegistration) dateOfRegistration = new Date(participantInfo['date']);
            dateTo = new Date(dateTo);
            dateTo.setDate(dateTo.getDate() + 1);
            if (dateOfRegistration > dateTo) return false;
        }

        let sessionDateFrom = filterData['dateOfSessionsFrom'];
        let sessionDateTo = filterData['dateOfSessionsTo'];
        if (sessionDateFrom) {
            sessionDateFrom = new Date(sessionDateFrom);
            let sessionFromList = Object.keys(sessions).find(session => {
                let tempDate = new Date(session.substring(0, 4) + "-" + session.substring(4, 6) + "-" + session.substring(6, 8))
                return tempDate >= sessionDateFrom && sessions[session]['participant_id'] == participantId
            })
            if (typeof sessionFromList == "undefined") return false
        }

        if (sessionDateTo) {
            sessionDateTo = new Date(sessionDateTo);
            let sessionToList = Object.keys(sessions).find(session => {
                let tempDate = new Date(session.substring(0, 4) + "-" + session.substring(4, 6) + "-" + session.substring(6, 8))

                return tempDate <= sessionDateTo && sessions[session]['participant_id'] == participantId
            })
            if (typeof sessionToList == "undefined") return false
        }

        return true;
    }

    useEffect(() => {
        const filteredParticipants = Object.keys(participants).filter(pid => filterFunction(pid))
        setShownParticipants(filteredParticipants);
    }, [participants, filterData]);


    return <div className="filter-main-container">

        <div className="filter-container">
            <span className="filter-container-header">Filter</span>

            <div className="filter-element">
                <input name="participantId" type="number" placeholder="Participant ID" className="main-input" autoComplete="off" onChange={setFilterData} value={filterData['participantId'] || ""} />
            </div>
            <div className="filter-element">
                <input name="firstName" type="text" placeholder="First name" className="main-input" autoComplete="off" onChange={setFilterData} value={filterData['firstName'] || ""} />
            </div>
            <div className="filter-element">
                <input name="lastName" type="text" placeholder="Last name" className="main-input" autoComplete="off" onChange={setFilterData} value={filterData['lastName'] || ""} />
            </div>
            <div className="filter-element">
                <input name="email" type="text" placeholder="E-mail" className="main-input" autoComplete="off" onChange={setFilterData} value={filterData['email'] || ""} />
            </div>
            <div className="filter-element">
                <input name="phone" type="text" placeholder="Phone number" className="main-input" autoComplete="off" onChange={setFilterData} value={filterData['phone'] || ""} />
            </div>

            <div className="filter-element gap">
                <span>Date of registration</span>
                <input name="dateOfRegistrationFrom" type="date" onChange={setFilterData} min="2024-03-01" max="2024-12-31" value={filterData['dateOfRegistrationFrom'] || ""} />
            </div>
            <div className="filter-element">
                <input name="dateOfRegistrationTo" type="date" onChange={setFilterData} min="2024-03-01" max="2024-12-31" value={filterData['dateOfRegistrationTo'] || ""} />
            </div>
            <div className="filter-element gap">
                <span>Date of session(s)</span>
                <input name="dateOfSessionsFrom" type="date" onChange={setFilterData} min="2024-03-01" max="2024-12-31" value={filterData['dateOfSessionsFrom'] || ""} />
            </div>
            <div className="filter-element">
                <input name="dateOfSessionsTo" type="date" onChange={setFilterData} min="2024-03-01" max="2024-12-31" value={filterData['dateOfSessionsTo'] || ""} />
            </div>

            <div className="filter-element">
                <Button variant="contained" size="small" name="resetFilter" className="reset-filter-button" onClick={setFilterData}>Reset filter</Button>
            </div>
        </div>

        <div className="filter-container">
        <span className="filter-container-header">Status</span>
            <div className="filter-element">
                
                {Object.keys(Constants['participantStatuses']).map((statusId, i) => {
                    const val = Constants['participantStatuses'][statusId] || "Blank";
                    return <div key={"filter-status-" + i} className="filter-object">
                        <input id={"filter-status-" + val} name={val} type="checkbox" alt="statuses" onChange={setFilterData} checked={filterData['statuses'].includes(val)} />
                        <label htmlFor={"filter-status-" + val}>{val + " (" + filterStats['statuses'][val] + ")"}</label>
                        <button name={val} alt="statuses" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
        </div>

        <div className="filter-container">
            <span className="filter-container-header">Gender</span>
            <div className="filter-element">


                {Object.keys(Constants['genders']).map((genderId, i) => {
                    const val = Constants['genders'][genderId];
                    return <div key={"filter-gender-" + i} className="filter-object">
                        <input id={"filter-gender-" + val} name={val} type="checkbox" alt="genders" onChange={setFilterData} checked={filterData['genders'].includes(val)} />
                        <label htmlFor={"filter-gender-" + val}>{val + " (" + filterStats['genders'][val] + ")"}</label>
                        <button name={val} alt="genders" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
        </div>

        <div className="filter-container" >
            <span className="filter-container-header">Age range</span>
            <div className="filter-element" id="ageRange" >
                {Constants['ageRanges'].map((val, i) => {
                    return <div key={"filter-age-" + i} className="filter-object">
                        <input id={"filter-age-" + val} name={val} type="checkbox" alt="ageRanges" onChange={setFilterData} checked={filterData['ageRanges'].includes(val)} />
                        <label htmlFor={"filter-age-" + val}>{val + " (" + filterStats['ageRanges'][val] + ")"}</label>
                        <button name={val} alt="ageRanges" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
        </div>
        <div className="filter-container" >
            <span className="filter-container-header">BMI range</span>
            <div className="filter-element">
                {Constants['bmiRanges'].map((val, i) => {
                    return <div key={"filter-bmi-" + i} className="filter-object">
                        <input id={"filter-bmi-" + val} name={val} type="checkbox" alt="bmiRanges" onChange={setFilterData} checked={filterData['bmiRanges'].includes(val)} />
                        <label htmlFor={"filter-bmi-" + val}>{val + " (" + filterStats['bmiRanges'][val] + ")"}</label>
                        <button name={val} alt="bmiRanges" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
            <span className="filter-container-header">Skin tones</span>
            <div className="filter-element" id="skintones" >
                {Constants['skintones'].map((val, i) => {
                    val = val.toString();
                    return <div key={"filter-skintone-" + i} className="filter-object">
                        <input id={"filter-skintone-" + val} name={val} type="checkbox" alt="skintones" onChange={setFilterData} checked={filterData['skintones'].includes(val)} />
                        <label htmlFor={"filter-skintone-" + val}>{val + " (" + filterStats['skintones'][val] + ")"}</label>
                        <button name={val} alt="skintones" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
        </div>

        <div className="filter-container" >
        <span className="filter-container-header">Multiple Ethnicities?</span>
            <div className="filter-element" >
                
                {["Yes", "No"].map((val, i) => {
                    val = val.toString();
                    return <div key={"filter-multipleEthnicities-" + i} className="filter-object">
                        <input id={"filter-multipleEthnicities-" + val} name={val} type="checkbox" alt="multipleEthnicities" onChange={setFilterData} checked={filterData['multipleEthnicities'].includes(val)} />
                        <label htmlFor={"filter-multipleEthnicities-" + val}>{val + " (" + filterStats['multipleEthnicities'][val] + ")"}</label>
                        <button name={val} alt="multipleEthnicities" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
            <div className="filter-element gap" id="ethnicityGroups" >
                <span className="filter-container-header">Ethnic Group</span>
                {Object.keys(Constants['ethnicityGroups']).filter(el => el !== "Total").map((val, i) => {
                    val = val.toString();
                    return <div key={"filter-ethnicityGroups-" + i} className="filter-object">
                        <input id={"filter-ethnicityGroups-" + val} name={val} type="checkbox" alt="ethnicityGroups" onChange={setFilterData} checked={filterData['ethnicityGroups'].includes(val)} />
                        <label htmlFor={"filter-ethnicityGroups-" + val}>{val + " (" + filterStats['ethnicityGroups'][val] + ")"}</label>
                        <button name={val} alt="ethnicityGroups" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>

        </div>

        <div className="filter-container">
        <span className="filter-container-header">Hair Length</span>
            <div className="filter-element">
                

                {Object.keys(Constants['hairLength']).map((hairLengthId, i) => {
                    const val = Constants['hairLength'][hairLengthId];
                    return <div key={"filter-hairLength-" + i} className="filter-object">
                        <input id={"filter-hairLength-" + val} name={val} type="checkbox" alt="hairLengths" onChange={setFilterData} checked={filterData['hairLengths'].includes(val)} />
                        <label htmlFor={"filter-hairLength-" + val}>{val + " (" + filterStats['hairLengths'][val] + ")"}</label>
                        <button name={val} alt="hairLengths" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
            <div className="filter-element gap">
                <span className="filter-container-header">Hair Types</span>

                {Object.keys(Constants['hairType']).map((hairTypeId, i) => {
                    const val = Constants['hairType'][hairTypeId];
                    return <div key={"filter-hairType-" + i} className="filter-object">
                        <input id={"filter-hairType-" + val} name={val} type="checkbox" alt="hairTypes" onChange={setFilterData} checked={filterData['hairTypes'].includes(val)} />
                        <label htmlFor={"filter-hairType-" + val}>{val + " (" + filterStats['hairTypes'][val] + ")"}</label>
                        <button name={val} alt="hairTypes" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
        </div>
        <div className="filter-container">
        <span className="filter-container-header">Hair Color</span>
            <div className="filter-element">
                

                {Object.keys(Constants['hairColor']).map((hairColorid, i) => {
                    const val = Constants['hairColor'][hairColorid];
                    return <div key={"filter-hairColor-" + i} className="filter-object">
                        <input id={"filter-hairColor-" + val} name={val} type="checkbox" alt="hairColors" onChange={setFilterData} checked={filterData['hairColors'].includes(val)} />
                        <label htmlFor={"filter-hairColor-" + val}>{val + " (" + filterStats['hairColors'][val] + ")"}</label>
                        <button name={val} alt="hairColors" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>

        </div>
        <div className="filter-container">
        <span className="filter-container-header">Facial Hair</span>
            <div className="filter-element">
                

                {Object.keys(Constants['facialHair']).map((facialId, i) => {
                    const val = Constants['facialHair'][facialId];
                    return <div key={"filter-facialHair-" + i} className="filter-object">
                        <input id={"filter-facialHair-" + val} name={val} type="checkbox" alt="facialHairs" onChange={setFilterData} checked={filterData['facialHairs'].includes(val)} />
                        <label htmlFor={"filter-facialHair-" + val}>{val + " (" + filterStats['facialHairs'][val] + ")"}</label>
                        <button name={val} alt="facialHairs" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>

        </div>
        <div className="filter-container" >
        <span className="filter-container-header">Repeat</span>
            <div className="filter-element" >
                
                {["Yes", "No"].map((val, i) => {
                    val = val.toString();
                    return <div key={"filter-furtherSessions-" + i} className="filter-object">
                        <input id={"filter-furtherSessions-" + val} name={val} type="checkbox" alt="furtherSessions" onChange={setFilterData} checked={filterData['furtherSessions'].includes(val)} />
                        <label htmlFor={"filter-furtherSessions-" + val}>{val + " (" + filterStats['furtherSessions'][val] + ")"}</label>
                        <button name={val} alt="furtherSessions" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
        </div>
    </div>


};
export default ParticipantFilter;

