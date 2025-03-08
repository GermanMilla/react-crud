import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off } from 'firebase/database';
import Constants from '../Constants';
import ParticipantFilter from './ParticipantFilter';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import GetSkinTone from '../CommonFunctions/GetSkinTone';
import ParticipantCard from './ParticipantCard';
import UpdateSession from '../Scheduler/UpdateSession';
import GetBMIRange from '../CommonFunctions/GetBMIRange';
import BookSession2 from '../Scheduler/BookSession2';
import CheckDocuments from '../CheckDocuments';
import './index.css'

const defaultFilterStats = {
    genders: Object.assign({}, ...Object.values(Constants['genders']).map(k => ({ [k]: 0 }))),
    ageRanges: Object.assign({}, ...Constants['ageRanges'].map(k => ({ [k]: 0 }))),
    statuses: Object.assign({}, ...Object.values(Constants['participantStatuses']).map(k => ({ [k || 'Blank']: 0 }))),
    skintones: Object.assign({}, ...Constants['skintones'].map(k => ({ [k]: 0 }))),
    ethnicityGroups: Object.assign({}, ...Object.keys(Constants['ethnicityGroups']).map(k => ({ [k]: 0 }))),
    multipleEthnicities: Object.assign({}, ...['Yes', 'No'].map(k => ({ [k]: 0 }))),
    facialHairs: Object.assign({}, ...Object.values(Constants['facialHair']).map(k => ({ [k]: 0 }))),
    hairLengths: Object.assign({}, ...Object.values(Constants['hairLength']).map(k => ({ [k]: 0 }))),
    hairTypes: Object.assign({}, ...Object.values(Constants['hairType']).map(k => ({ [k]: 0 }))),
    hairColors: Object.assign({}, ...Object.values(Constants['hairColor']).map(k => ({ [k]: 0 }))),
    bmiRanges: Object.assign({}, ...Constants['bmiRanges'].map(k => ({ [k]: 0 }))),
    furtherSessions: Object.assign({}, ...['Yes', 'No'].map(k => ({ [k]: 0 }))),
};




function Participants({ showLog, setShowLog, filterDataFromStats, setFilterDataFromStats }) {

    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userRole = userInfo['role'];
    const [shownParticipants, setShownParticipants] = useState([]);
    const [participants, setParticipants] = useState({});
    const [sessions, setSessions] = useState({});
    const showUpdateSession = useSelector((state) => state.userInfo.showUpdateSession);
    const showBookSession2 = useSelector((state) => state.userInfo.showBookSession2);



    useEffect(() => {
        document.getElementById('navbarTitle').innerText = `Filtered participants: ${shownParticipants.length} ${shownParticipants.length > 100 ? "(the list is cropped at 100)" : ""}`;
    }, [shownParticipants]);


    useEffect(() => {
        if (!['admin'].includes(userRole)) return null;

        const path = '/participants';
        const pptRef = ref(realtimeDb, path);

        const sessionsPath = '/timeslots';
        const sessionsRef = ref(realtimeDb, sessionsPath);

        const sessionsListener = onValue(sessionsRef, (res) => {
            setSessions(res.val() || {});
        });

        const listener = onValue(pptRef, (res) => {
            setParticipants(res.val() || {});
        });

        return () => {
            off(pptRef, "value", listener);
            off(sessionsRef, "value", sessionsListener);

        }

    }, []);

    // Reset filterstats
    let filterStats = JSON.parse(JSON.stringify(defaultFilterStats));

    return <>

    <div id="participants">
    <ParticipantFilter
            participants={participants}
            setShownParticipants={setShownParticipants}
            filterStats={filterStats}
            filterDataFromStats={filterDataFromStats}
            setFilterDataFromStats={setFilterDataFromStats}
            sessions={sessions}
        />
        <div id="participantTable">
            
            {shownParticipants.map((participantId, index) => {
                const participantInfo = participants[participantId];

                if (!participantInfo) return null; //prevents attempting to render after deleting ppts

                const gender = Constants['genders'][participantInfo['gender']];
                const ageRange = GetAgeRange(participantInfo)['ageRange'];
                const bmiRange = GetBMIRange(participantInfo)['bmiRange'];
                const status = participantInfo['status'] ? Constants['participantStatuses'][participantInfo['status']] : 'Blank';
                const skintone = GetSkinTone(participantInfo)['skinRange'];
                const facialHair = Constants['facialHair'][participantInfo['facialHair']];
                const hairLength = Constants['hairLength'][participantInfo['hairLength']];
                const hairType = Constants['hairType'][participantInfo['hairType']];
                const hairColor = Constants['hairColor'][participantInfo['hairColor']];
                const ethnicities = participantInfo['ethnicities']
                const furtherSession = participantInfo['furtherSessions'] || false === true ? "Yes" : "No"
                let ethnicityGroups = ethnicities.toString().split(';').map(eth => {
                    return Object.keys(Constants['ethnicityGroups']).find(group => Constants['ethnicityGroups'][group].includes(parseInt(eth)));
                });
                const multipleEthnicities = [...new Set(ethnicityGroups)].length > 1 ? 'Yes' : 'No';

                ethnicityGroups.forEach(ethnicityGroup => filterStats['ethnicityGroups'][ethnicityGroup]++);
                filterStats['genders'][gender]++;
                filterStats['ageRanges'][ageRange]++;
                filterStats['bmiRanges'][bmiRange]++;
                filterStats['statuses'][status]++;
                filterStats['skintones'][skintone]++;
                filterStats['multipleEthnicities'][multipleEthnicities]++;
                filterStats['hairLengths'][hairLength]++;
                filterStats['hairTypes'][hairType]++;
                filterStats['hairColors'][hairColor]++;
                filterStats['facialHairs'][facialHair]++;
                filterStats['furtherSessions'][furtherSession]++;

                if (index >= 100) return null;

                return <ParticipantCard
                    key={"participant-card-" + participantId}
                    participantId={participantId}
                    participants={participants}
                />
            })
            }
        </div>
        {showBookSession2 && <BookSession2 showBookSession2={showBookSession2} />}

    </div>
    </>
};

export default Participants;

