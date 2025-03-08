
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Registration from './components/Form/Registration';
import LoginPage from './components/LoginPage';
import React, { useEffect, useState } from 'react';
import { realtimeDb, auth } from './firebase/config';
import { ref, onValue, off } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from './Redux/Features';
import Navbar from './components/Navbar';
import Participants from './components/Participants';
import FilesView from './components/FilesView';
import Stats from './components/Stats';
import Bins from './components/Stats/Bins';
import ICF from './components/Form/ICF';
import Scheduler from './components/Scheduler';
import UpdateSession from './components/Scheduler/UpdateSession';
import CheckDocuments from './components/CheckDocuments';
import SchedulerExternal from './components/Scheduler/SchedulerExternal';
import Overview from './components/Scheduler/Overview';
import SessionStats from './components/Stats/SessionStats';
import Log from './components/Log';


function App() {
  const [userId, setUserId] = useState('');
  const [updateSession, setUpdateSession] = useState("");
  const [timeslotforLog, setTimeslotforLog] = useState("");

  const [filterDataFromStats, setFilterDataFromStats] = useState(false);
  const showDocs = useSelector((state) => state.userInfo.showDocs);
  const showUpdateSession = useSelector((state) => state.userInfo.showUpdateSession);
  const showSessionStats = useSelector((state) => state.userInfo.sessionSessionStats)

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.value || {});
  const isStatsActive = useSelector((state) => state.userInfo.activeStats);
  const isDemoStatsActive = useSelector((state) => state.userInfo.activeDemoStats);
  const showLog = useSelector((state) => state.userInfo.showLog);
  const navigate = useNavigate();

  useEffect(() => {

    if (!userId) return;

    console.log(userInfo);

    const userRef = ref(realtimeDb, "/users/" + userId);
    const listener = onValue(userRef, (snapshot) => {
      dispatch(updateUserInfo(snapshot.val() || {}));
    });

    return () => {
      off(userRef, "value", listener);

    }
  }, [userId, dispatch])




  function getElement(path) {

    switch (path) {
      case "/":
        return <a href='#' onClick={() => { navigate(-1) }}> Invalid link. Go to the previous page.</a>
      case "/scheduler":
        return <Scheduler updateSession={updateSession} setUpdateSession={setUpdateSession} />
      case "/login":
        return <LoginPage setUserId={setUserId} />;
      case "/registration":
        return <Registration />;
      case "/participants":
        return <Participants
          filterDataFromStats={filterDataFromStats}
          setFilterDataFromStats={setFilterDataFromStats}
          setUpdateSession={setUpdateSession}
          timeslotforLog={timeslotforLog}
          setTimeslotforLog={setTimeslotforLog}
          updateSession={updateSession}

        />;
      case "/files":
        return <FilesView />;
      case "/scheduler-external":
        return <SchedulerExternal />;
      case "/overview":
        return <Overview />
      default:
        return null;
    }

  }

  return (
    <div id="mainContainer">
      {userInfo['role'] && <Navbar
        setUserId={setUserId}
      />}
      <Routes>
        <Route path="/" element={getElement("/")} />
        <Route path="/login" element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/overview") : getElement("/login")} />
        <Route path="/registration" element={getElement('/registration')} />
        <Route path='/scheduler' element={(userId && Object.keys(userInfo || {}).length > 0) && userInfo['role'] === 'admin' ? getElement("/scheduler") : getElement("/login")} />
        <Route path='/scheduler-external' element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/scheduler-external") : getElement("/login")} />
        <Route path="/icf/:participantId" element={<ICF />} />
        <Route path="/participants" element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/participants") : getElement("/login")} />
        <Route path="/files" element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/files") : getElement("/login")} />
        <Route path='/overview' element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/overview") : getElement("/login")} />

      </Routes>
      {isStatsActive && <Stats setFilterDataFromStats={setFilterDataFromStats} />}
      {isDemoStatsActive && <Bins />}
      {showDocs && <CheckDocuments />}
      {showUpdateSession && <UpdateSession showUpdateSession={showUpdateSession} />}
      {showSessionStats && <SessionStats setFilterDataFromStats={setFilterDataFromStats} />}
      {showLog && <Log />}


    </div>
  );
}

export default App;
