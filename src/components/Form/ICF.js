import 'survey-core/defaultV2.min.css'
import { Model, surveyLocalization } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { icfQuestions } from './questions/ICFQuestions';
import { inputmask } from "surveyjs-widgets";
import { getDownloadURL } from 'firebase/storage';
import { ref, onValue, off } from 'firebase/database';
import { realtimeDb, updateValue } from '../../firebase/config';
import telus from "../telus.png";
import * as SurveyCore from "survey-core";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { themeObj } from '../themes/registrationTheme';
import Constants from '../Constants'
import uploadICFSignature from '../CommonFunctions/UploadSignature';
import { element } from 'prop-types';


const localeSettings = {
    completeText: "Submit",
    requiredError: "This item is required",
    loadingFile: "Loading...",
    chooseFileCaption: "Select a file",
    pageNextText: "Next"
}

inputmask(SurveyCore);
surveyLocalization.locales["en"] = localeSettings;
const survey = new Model(icfQuestions);
survey.applyTheme(themeObj);


function ICF() {
    const [loading, setLoading] = useState(true);
    const [showICFty, setShowICFty] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const params = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pptId = params['participantId']
    survey.setValue("referenceId", pptId)
    survey.setValue("icfEmail", searchParams.get('email'));


    useEffect(() => {
        const path = `/participants/${params['participantId']}/`;
        const pptRef = ref(realtimeDb, path);

        const listener = onValue(pptRef, (res) => {
            const snapshot = res.val() || {}
            setNotFound(Object.keys(snapshot).length === 0 || snapshot['email'] !== searchParams.get('email'))
            setLoading(false);
        })

        return () => {
            off(pptRef, "value", listener)
        }

    }, [pptId, searchParams])

    useEffect(() => {

        const completeFunction = async (sender, options) => {
            options.allow = false;

            let senderObj = {};

            const externalUrl = await uploadICFSignature(sender.data['externalIcfSignature'], pptId, `icfExternal`)
            const faceHandsUrl = await uploadICFSignature(sender.data['faceHandsIcfsignature'], pptId, `icfFaceHands`);
            const fullBodyUrl = await uploadICFSignature(sender.data['FullBodyIcfsignature'], pptId, `icfFullBody`);

            senderObj['icfExternal'] = externalUrl;
            senderObj['icfDate'] = new Date();

            senderObj['icfFaceHands'] = faceHandsUrl;
            senderObj['icfFullBody'] = fullBodyUrl;

            options.allow = true;

            //db record
            const firebasePath = `/participants/${pptId}/icfs`;
            updateValue(firebasePath, senderObj)

            setShowICFty(true);
        }

        survey.onCompleting.add(completeFunction);

        return () => {
            survey.onCompleting.remove(completeFunction);
        }


    }, [])


    return (
        <>
            {loading ? (
                <div></div>
            ) : (
                <>
                    {showICFty && <div id="ThankyouPage">
                        <img className="telus-logo" src={telus} style={{ width: "fit-content", maxWidth: "100%" }} alt="TELUS Logo" />
                        <h4>Thank you for your registration.</h4><br />
                        <p>We will review your registration and contact you with any further steps.</p>
                    </div>}
                    {notFound && <div id="ThankyouPage">
                        <img className="telus-logo" src={telus} style={{ width: "fit-content", maxWidth: "100%" }} alt="TELUS Logo" />
                        <h4>The link provided does not exist. <a href="/registration" >Back to the registration form</a></h4><br />
                    </div>}
                    {!notFound && <Survey model={survey}></Survey>}
                </>

            )}

        </>
    )
};

export default ICF;