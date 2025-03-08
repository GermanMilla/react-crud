import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { surveyLocalization } from "survey-core";
import { inputmask } from "surveyjs-widgets";
import * as SurveyCore from "survey-core";
import { useNavigate, useParams } from 'react-router-dom';
import { surveyJson } from './questions/RegistrationQuestions';
import 'survey-core/defaultV2.min.css';
import { themeObj } from '../themes/registrationTheme';
import telus from '../telus.png';
import { useEffect, useState, useCallback } from 'react';
import { realtimeDb, ref, updateValue, storage } from '../../firebase/config';
import { runTransaction } from 'firebase/database';
import Constants from '../Constants'
import Validator from '../CommonFunctions/Validator';
import { uploadBytesResumable, getDownloadURL, ref as storeRef, deleteObject } from "firebase/storage";
import "./index.css"

function Registration() {
    const [showtymsg, setShowtymsg] = useState(false);
    let pptId;
    let IdUrl;
    let idName;
    const localeSettings = {
        completeText: "Submit",
        requiredError: "This item is required",
        loadingFile: "Loading...",
        chooseFileCaption: "Select a file",
        pageNextText: "Next",
        pagePrevText: "Previous"

    };

    const navigate = useNavigate();

    inputmask(SurveyCore);
    surveyLocalization.locales["en"] = localeSettings;
    const survey = new Model(surveyJson);
    const tempFileStorage = {};
    survey.applyTheme(themeObj);

    const questions = survey.getAllQuestions();
    for (const question of questions) {
        const type = question.getType();
        if (type === "file") {
            question.storeDataAsText = false;
        }
    }

    const createTransactionID = async () => {

        const dbref = ref(realtimeDb, "/nextParticipantId");

        const resultId = await runTransaction(dbref, (currentValue) => {
            return currentValue + 1;
        });

        const pptId = resultId.snapshot.val();
        return pptId
    }

    const uploadSignature = async (imgData, id, subpath) => {
        const byteChars = atob(imgData.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
        let byteArrays = [];

        for (let offset = 0; offset < byteChars.length; offset += 512) {
            const slice = byteChars.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const imageBlob = new Blob(byteArrays, { type: 'image/png' });
        const storageRef = storeRef(storage, `participants/${id}/${subpath}/${id}_${subpath}.png`);
        const uploadTask = uploadBytesResumable(storageRef, imageBlob);

        return uploadTask;
    }

    useEffect(() => {
        //current issue: IdName doesn't work unless I assign the variable without useState
        //also, If the files get replaced, it deletes the previous file from firebase storage, but if you do it again, it won't delete them anymore
        const uploadFunction = async (sender, options) => {

            await createTransactionID().then(onFulfill => {
                pptId = onFulfill;


            });

            document.getElementById("loading").style.display = "block";

            if (idName !== undefined) {
                const storageRef = storeRef(storage, `participants/${pptId}/identification/exampleImage.png`);
                deleteObject(storageRef).then(() => {
                    console.log("deleted")
                }).catch(error => {
                    console.log(error)
                })
            }

            // Add files to the temporary storage
            if (tempFileStorage[options.name] !== undefined) {
                tempFileStorage[options.name].concat(options.files);
            } else {
                tempFileStorage[options.name] = options.files;
            }

            idName = options.files[0]['name'];

            // Load file previews
            const content = [];
            options.files.forEach(file => {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    content.push({
                        name: file.name,
                        type: file.type,
                        content: fileReader.result,
                        file: file
                    });

                    if (content.length === options.files.length) {
                        // Return a file for preview as a { file, content } object 
                        const promises = content.map(fileContent => {
                            return new Promise((resolve, reject) => {
                                const byteChars = atob(fileContent.content.split(',')[1]);
                                const byteArrays = [];

                                for (let offset = 0; offset < byteChars.length; offset += 512) {
                                    const slice = byteChars.slice(offset, offset + 512);
                                    const byteNumbers = new Array(slice.length);

                                    for (let i = 0; i < slice.length; i++) {
                                        byteNumbers[i] = slice.charCodeAt(i);
                                    }

                                    const byteArray = new Uint8Array(byteNumbers);
                                    byteArrays.push(byteArray);
                                }

                                const imageBlob = new Blob(byteArrays, { type: file.type });

                                const storageRef = storeRef(storage, `participants/${pptId}/identification/${file.name}`);

                                uploadBytesResumable(storageRef, imageBlob).then((onFulfill) => {
                                    if (onFulfill.state === 'success') {
                                        // Resolve with the preview object only after successful upload
                                        resolve({
                                            file: fileContent.file,
                                            content: fileContent.content
                                        });
                                    } else {
                                        // Reject if upload is not successful
                                        reject(new Error("Upload failed"));
                                    }
                                    getDownloadURL(storageRef).then(url => {
                                        IdUrl = url.split(`https://firebasestorage.googleapis.com/v0/b/brn-copy.firebasestorage.app/o/participants%2F${pptId}%2Fidentification%2F`)[1];
                                        document.getElementById("loading").style.display = "";
                                    })

                                }).catch(error => {
                                    reject(error);
                                });
                            });
                        });

                        // Wait for all promises to resolve before calling the callback
                        Promise.all(promises)
                            .then(previews => {
                                options.callback(previews);
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }
                };
                fileReader.readAsDataURL(file);
            });

        }

        const clearFileFunction = (_, options) => {
            const storageRef = storeRef(storage, `participants/${pptId}/identification/exampleImage.png`);
            deleteObject(storageRef).then(() => {
                console.log("deleted")
            }).catch(error => {
                console.log(error)
            })

            if (options.fileName === null) {
                tempFileStorage[options.name] = [];
                options.callback("success");
                return;
            }


            // Remove an individual file
            const tempFiles = tempFileStorage[options.name];
            if (!!tempFiles) {
                const fileInfoToRemove = tempFiles.filter(file => file.name === options.fileName)[0];
                if (fileInfoToRemove) {
                    const index = tempFiles.indexOf(fileInfoToRemove);
                    tempFiles.splice(index, 1);
                }
            }

            options.callback("success");

        }

        const completeFunction = async (sender, options) => {
            options.allow = false;


            await uploadSignature(sender.data['sdcSignature'], pptId, "sdc");
            await uploadSignature(sender.data['signature'], pptId, "sla");

            let senderObj = {};

            Object.keys(sender.data).forEach(element => {

                if (!Constants.tobeExcluded.includes(element)) {

                    senderObj[element] = sender.data[element];
                }

            })

            //deleting no's 
            if (senderObj['interestedInRecruiting'] === "No") delete senderObj['interestedInRecruiting'];
            //if (senderObj['tattoos'][0] === 'none') delete senderObj['tattoos'];
            //if (senderObj['piercings'][0] === 'none') delete senderObj['piercings'];

            //Reassignment of Object properties based on Constants
            senderObj['registeredAs'] = parseInt(Constants.getKeyByValue(Constants['registeredAs'], sender.data['registeredAs']));
            senderObj['gender'] = parseInt(Constants.getKeyByValue(Constants['genders'], sender.data['gender']));
            senderObj['residenceState'] = parseInt(Constants.getKeyByValue(Constants['usStates'], sender.data['residenceState']));
            senderObj['source'] = parseInt(Constants.getKeyByValue(Constants['sources'], sender.data['source']));
            senderObj['industry'] = parseInt(Constants.getKeyByValue(Constants['industries'], sender.data['industry']));
            senderObj['hairLength'] = parseInt(Constants.getKeyByValue(Constants['hairLength'], sender.data['hairLength']));
            senderObj['hairType'] = parseInt(Constants.getKeyByValue(Constants['hairType'], sender.data['hairType']));
            senderObj['facialHair'] = parseInt(Constants.getKeyByValue(Constants['facialHair'], sender.data['facialHair']));
            senderObj['hairColor'] = parseInt(Constants.getKeyByValue(Constants['hairColor'], sender.data['hairColor']));
            senderObj['docs'] = { [pptId]: { 1: IdUrl }, pending: true };

            //multiple selection questions
            if (sender.data['isMultipleEthnicities'] === "Yes") {
                senderObj['ethnicities'] = sender.data['ethnicities'].map((v) => parseInt(Constants.getKeyByValue(Constants['ethnicities'], v))).join(';');
            } else {
                senderObj['ethnicities'] = Constants.getKeyByValue(Constants['ethnicities'], sender.data['ethnicities']).toString();
            }

            if (sender.data['healthConditions'].length > 1) {
                senderObj['healthConditions'] = sender.data['healthConditions'].map((v) => parseInt(Constants.getKeyByValue(Constants['healthConditions'], v))).join(';');
            } else {
                senderObj['healthConditions'] = Constants.getKeyByValue(Constants['healthConditions'], sender.data['healthConditions'][0]).toString();
            }

            if (sender.data['earConditions'].length > 1) {
                senderObj['earConditions'] = sender.data['earConditions'].map((v) => parseInt(Constants.getKeyByValue(Constants['earConditions'], v))).join(';');
            } else {
                senderObj['earConditions'] = Constants.getKeyByValue(Constants['earConditions'], sender.data['earConditions'][0]).toString();
            }

            if (sender.data['otherCompanies'].length > 1) {
                senderObj['otherCompanies'] = sender.data['otherCompanies'].map((v) => parseInt(Constants.getKeyByValue(Constants['otherCompanies'], v))).join(';');
            } else {
                senderObj['otherCompanies'] = Constants.getKeyByValue(Constants['otherCompanies'], sender.data['otherCompanies'][0]).toString();
            }

            if (sender.data['piercings'].length > 1) {
                senderObj['piercings'] = sender.data['piercings'].map((v) => parseInt(Constants.getKeyByValue(Constants['piercings'], v))).join(';');
            } else {
                senderObj['piercings'] = Constants.getKeyByValue(Constants['piercings'], sender.data['piercings'][0]).toString();
            }

            if (sender.data['tattoos'].length > 1) {
                senderObj['tattoos'] = sender.data['tattoos'].map((v) => parseInt(Constants.getKeyByValue(Constants['tattoos'], v))).join(';');
            } else {
                senderObj['tattoos'] = Constants.getKeyByValue(Constants['piercings'], sender.data['tattoos'][0]).toString();
            }

            if (sender.data['availability'] === "No") {
                if (sender.data['noAvailabilityReason'].length > 1) {
                    senderObj['noAvailabilityReason'] = sender.data['noAvailabilityReason'].map((v) => parseInt(Constants.getKeyByValue(Constants['noAvailabilityReason'], v))).join(';');
                } else {
                    senderObj['noAvailabilityReason'] = Constants.getKeyByValue(Constants['noAvailabilityReason'], sender.data['noAvailabilityReason'][0]).toString();
                }
            }

            //rejection validations
            if (Validator.rejectionValidator(senderObj)) {
                senderObj['status'] = 5;
                senderObj['comment'] = `${senderObj['date']} SYSTEM: automatically rejected by validator`
            }
            //re-enabling the form completion for redirection
            options.allow = true;
            sender.getAllQuestions().forEach(function (question) {
                question.readOnly = true;
            })

            //db record
            const firebasePath = `/participants/${pptId}/`;
            updateValue(firebasePath, senderObj);

            //displays thank you page
            setShowtymsg(true);
        }

        survey.onCompleting.add(completeFunction);
        survey.onUploadFiles.add(uploadFunction);
        survey.onClearFiles.add(clearFileFunction);

        return () => {
            survey.onCompleting.remove(completeFunction);
            survey.onUploadFiles.remove(uploadFunction);
            survey.onClearFiles.remove(clearFileFunction);

        }

    }, [survey.onCompleting, survey.onUploadFiles, survey.onClearFiles]);

    return (
        <div className='form-container'>
            <div id='loading'></div>
            {showtymsg && <div id="ThankyouPage">
                <img className="telus-logo" src={telus} style={{ height: "50px" }} alt="TELUS Logo" />

                <h4>Thank you for your registration.</h4><br />
                <p>We will review your registration and contact you with any further steps.</p>
            </div>}
            <img className="telus-logo" src={telus} style={{ height: "50px"  }} alt="" />
            <Survey model={survey}></Survey>
        </div>
    );
}

export default Registration;