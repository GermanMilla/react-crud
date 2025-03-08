import externalICF from "./htmlComponents/external_icf.htm";
import fullBodyICF from "./htmlComponents/fullBody_icf.htm";
import faceHandsICF from "./htmlComponents/faceHands_icf.htm"

export const icfQuestions = {
    showQuestionNumbers: false,
    waitForUpload: true,
    completedHtml: "<div style=\"max-width:688px;text-align:center;margin: 16px auto;\">\n\n<div style=\"padding:0 24px;\">\n<h4>Thank you for your registration.</h4>\n<br>\n<p>We will review your registration and contact you with any further steps.</p>\n</div>\n\n</div>\n",
    pages: [
        {
            name: "page1",
            elements: [{
                type: "panel",
                name: "introduction",
                elements: [{
                    type: "html",
                    html: `<div style="text-align: center;">
                    <div style="text-align: center;"><span style="color: #000000">&nbsp;<img src="https://fs30.formsite.com/LB2014/images/TELUS_2017_Int_EN_Hor_RGB_(1).jpg" alt="" width="50%" height="auto" /></span></div>
                    <div style="text-align: center;">
                    <div style="text-align: center;">
                    <div style="text-align: center;"><span style="color: #000000"><strong>Thank you for your interest in our Project Blackburn!</strong></span></div>
                    <div style="text-align: center;">&nbsp;</div>
                    <div style="text-align: center;"><span style="color: #000000">To participate, please sign the Consent Forms below.</span></div>
                    <div style="text-align: center;">&nbsp;</div>
                    <div style="text-align: center;">
                    <div>
                    <p><span>If you have any questions, please reach out to: <span style="font-weight: 400"><a href="mailto:aisourcing@telusinternational.ai">aisourcing@telusinternational.ai</a></span></span></p>
                    <div style="text-align: left;">&nbsp;</div>
                    </div>
                    <p style="text-align: center;"><span"><strong><u>IMPORTANT INFORMATION</u></strong></span></p>
                    <p><span>Your data is protected by our <a href="https://www.telusinternational.com/privacypolicy/contributors" target="_blank" rel="noopener">Privacy Policy</a></span></p>
                    <p><span><strong>About TELUS International AI</strong></span></p>
                    <p><span>Creating and enhancing the world's data to enable better AI via human intelligence</span></p>
                    <p><span>We help companies test and improve machine learning models via our global AI Community of 1 million+ annotators and linguists. Our proprietary AI training platform handles all data types (text, images, audio, video and geo) across 500+ languages and dialects. Our AI Data Solutions vastly enhance AI systems across a range of applications from advanced smart products, to better search results, to expanded speech recognition, to more human-like bot interactions and so much more.</span></p>
                    <p><span><a href="https://www.telusinternational.com/solutions/ai-data-solutions" target="_blank" rel="noopener">TELUS International AI</a></span></p>
                    </div>
                    </div>
                    </div>
                    </div>`
                }]
            }, {
                type: "panel",
                name: "personalInfo",
                elements: [
                    {
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Personal Information`
                            + `</h4>`
                    },
                    {
                        name: "icfEmail",
                        type: "text",
                        title: "Email address:",
                        validators: [
                            { type: "email", text: "Value must be a valid email" }
                        ],
                        isRequired: true,
                        readOnly: true
                    },
                    {
                        name: "referenceId",
                        type: "text",
                        readOnly: true,
                        startWithNewLine: false
                    }
                ]
            }, {
                type: "panel",
                name: "confidentiality",
                elements: [{
                    type: "html",
                    html: `<h4 style="text-align: center;">`
                        + `Consent Form (1/3)`
                        + `</h4>`
                }, {
                    type: "html",
                    html: `<span style="color:red">*Please read and sign the following Consent Form of the Study.</span>`
                }, {
                    type: "html",
                    html: `<iframe src=${externalICF} style="width:100%;height:600px;overflow:auto;border:1px solid #555; padding-left:10px">
                    </iframe>`
                }, {
                    type: "html",
                    html: `<p><span style="text-decoration: underline;"><strong>CONSENT</strong></span></p>
                    <p><span style="font-weight: 400;">By signing this Consent, I acknowledge and agree:&nbsp;</span></p>
                    <ul>
                    <li style="font-weight: 400" aria-level="1"><span style="font-weight: 400;">I have carefully read this Consent, which is written in English, and English is a language that I read and understand.&nbsp;</span></li>
                    <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I understand this Consent and have received answers to my questions.</span></li>
                    <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I am voluntarily signing this Consent indicating that I consent to participate in this Study</span></li>
                    <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I agree that I will keep confidential all information disclosed to me during the Study.</span></li>
                    <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I agree to the collection, use, sharing, disclosure, transfer, including transfer to other countries, and maintenance of my Study Data (including Coded Study Data) as described in this Consent.</span></li>
                    <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I understand that I can withdraw from the Study at any time. </span></li>
                    <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I understand that I will receive a copy of this Consent form after I sign it.</span></li>
                    </ul>
                    <br>
                    <p><span style="font-weight: 400;">If this is an electronic consent, I understand that by clicking accept or typing my name
                    and the date below I am providing my consent electronically and that it has the same
                    force and effect as if I was signing in person on paper.</span></p>`
                }, {
                    name: "externalIcfAgreement",
                    title: "I confirm and agree with all of the above",
                    type: "checkbox",
                    choices: [
                        'Yes',
                    ],
                    isRequired: true
                }, {
                    name: "externalIcfSignatureFirstName",
                    title: "First name:",
                    type: "text",
                    isRequired: true,
                    visibleIf: "{externalIcfAgreement} notempty"
                }, {
                    name: "externalIcfSignatureLastName",
                    title: "Last name:",
                    type: "text",
                    isRequired: true,
                    startWithNewLine: false,
                    visibleIf: "{externalIcfAgreement} notempty"
                }, {
                    name: "externalIcfDate",
                    title: "Signature Date",
                    type: "text",
                    inputType: "date",
                    defaultValueExpression: "today()",
                    minValueExpression: "today()",
                    isRequired: true,
                    startWithNewLine: false,
                    readOnly: true,
                    visibleIf: "{externalIcfAgreement} notempty"

                }, {
                    type: "signaturepad",
                    name: "externalIcfSignature",
                    title: "Signature",
                    signatureWidth: 700,
                    signatureHeight: 400,
                    penColor: "black",
                    isRequired: true,
                    visibleIf: "{externalIcfAgreement} notempty"
                }]
            }, {
                type: "panel",
                name: "confidentiality2",
                elements: [{
                    type: "html",
                    html: `<h4 style="text-align: center;">`
                        + `Consent Form (2/3)`
                        + `</h4>`
                }, {
                    type: "html",
                    html: `<span style="color:red">*Please read and sign the following Consent Form of the Study.</span>`
                }, {
                    type: "html",
                    html: `<iframe src=${faceHandsICF} style="width:100%;height:600px;overflow:auto;border:1px solid #555; padding-left:10px">
                        </iframe>`
                }, {
                    type: "html",
                    html: `<p><span style="text-decoration: underline;"><strong>CONSENT</strong></span></p>
                        <p><span style="font-weight: 400;">By signing this Consent, I acknowledge and agree:&nbsp;</span></p>
                        <ul>
                        <li style="font-weight: 400" aria-level="1"><span style="font-weight: 400;">I have carefully read this Consent, which is written in English, and English is a language that I read and understand.&nbsp;</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I understand this Consent and have received answers to my questions.</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I am voluntarily signing this Consent indicating that I consent to participate in this Study</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I agree that I will keep confidential all information disclosed to me during the Study.</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I agree to the collection, use, sharing, disclosure, transfer, including transfer to other countries, and maintenance of my Study Data (including Coded Study Data) as described in this Consent.</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I understand that I can withdraw from the Study at any time. </span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I understand that I will receive a copy of this Consent form after I sign it.</span></li>
                        </ul>
                        <br>
                        <p><span style="font-weight: 400;">If this is an electronic consent, I understand that by clicking accept or typing my name
                        and the date below I am providing my consent electronically and that it has the same
                        force and effect as if I was signing in person on paper.</span></p>`
                }, {
                    name: "faceHandsIcfAgreement",
                    title: "I confirm and agree with all of the above",
                    type: "checkbox",
                    choices: [
                        'Yes',
                    ],
                    isRequired: true
                }, {
                    name: "faceHandsIcfsignatureFirstName",
                    title: "First name:",
                    type: "text",
                    isRequired: true,
                    visibleIf: "{faceHandsIcfAgreement} notempty"
                }, {
                    name: "faceHandsIcfsignatureLastName",
                    title: "Last name:",
                    type: "text",
                    isRequired: true,
                    startWithNewLine: false,
                    visibleIf: "{faceHandsIcfAgreement} notempty"
                }, {
                    name: "faceHandsIcfDate",
                    title: "Signature Date",
                    type: "text",
                    inputType: "date",
                    defaultValueExpression: "today()",
                    minValueExpression: "today()",
                    isRequired: true,
                    startWithNewLine: false,
                    readOnly: true,
                    visibleIf: "{faceHandsIcfAgreement} notempty"

                }, {
                    type: "signaturepad",
                    name: "faceHandsIcfsignature",
                    title: "Signature",
                    signatureWidth: 700,
                    signatureHeight: 400,
                    penColor: "black",
                    isRequired: true,
                    visibleIf: "{faceHandsIcfAgreement} notempty"
                }
                ]
            }, {
                type: "panel",
                name: "confidentiality3",
                elements: [{
                    type: "html",
                    html: `<h4 style="text-align: center;">`
                        + `Consent Form (3/3)`
                        + `</h4>`
                }, {
                    type: "html",
                    html: `<span style="color:red">*Please read and sign the following Consent Form of the Study.</span>`
                }, {
                    type: "html",
                    html: `<iframe src=${fullBodyICF} style="width:100%;height:600px;overflow:auto;border:1px solid #555; padding-left:10px">
                        </iframe>`
                }, {
                    type: "html",
                    html: `<p><span style="text-decoration: underline;"><strong>CONSENT</strong></span></p>
                        <p><span style="font-weight: 400;">By signing this Consent, I acknowledge and agree:&nbsp;</span></p>
                        <ul>
                        <li style="font-weight: 400" aria-level="1"><span style="font-weight: 400;">I have carefully read this Consent, which is written in English, and English is a language that I read and understand.&nbsp;</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I understand this Consent and have received answers to my questions.</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I am voluntarily signing this Consent indicating that I consent to participate in this Study</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I agree that I will keep confidential all information disclosed to me during the Study.</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I agree to the collection, use, sharing, disclosure, transfer, including transfer to other countries, and maintenance of my Study Data (including Coded Study Data) as described in this Consent.</span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I understand that I can withdraw from the Study at any time. </span></li>
                        <li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">I understand that I will receive a copy of this Consent form after I sign it.</span></li>
                        </ul>
                        <br>
                        <p><span style="font-weight: 400;">If this is an electronic consent, I understand that by clicking accept or typing my name
                        and the date below I am providing my consent electronically and that it has the same
                        force and effect as if I was signing in person on paper.</span></p>`
                }, {
                    name: "fullBodyIcfAgreement",
                    title: "I confirm and agree with all of the above",
                    type: "checkbox",
                    choices: [
                        'Yes',
                    ],
                    isRequired: true
                }, {
                    name: "FullBodyIcfsignatureFirstName",
                    title: "First name:",
                    type: "text",
                    isRequired: true,
                    visibleIf: "{fullBodyIcfAgreement} notempty"
                }, {
                    name: "FullBodyIcfsignatureLastName",
                    title: "Last name:",
                    type: "text",
                    isRequired: true,
                    startWithNewLine: false,
                    visibleIf: "{fullBodyIcfAgreement} notempty"
                }, {
                    name: "FullBodyIcfDate",
                    title: "Signature Date",
                    type: "text",
                    inputType: "date",
                    defaultValueExpression: "today()",
                    minValueExpression: "today()",
                    isRequired: true,
                    startWithNewLine: false,
                    readOnly: true,
                    visibleIf: "{fullBodyIcfAgreement} notempty"

                }, {
                    type: "signaturepad",
                    name: "FullBodyIcfsignature",
                    title: "Signature",
                    signatureWidth: 700,
                    signatureHeight: 400,
                    penColor: "black",
                    isRequired: true,
                    visibleIf: "{fullBodyIcfAgreement} notempty"
                }
                ]
            }]
        }
    ],

};
