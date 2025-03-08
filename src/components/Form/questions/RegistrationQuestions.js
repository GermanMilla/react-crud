import exampleimage from './exampleImage.png';
import MST_1 from './mst_swatches/MST_1.png';
import MST_2 from './mst_swatches/MST_2.png';
import MST_3 from './mst_swatches/MST_3.png';
import MST_4 from './mst_swatches/MST_4.png';
import MST_5 from './mst_swatches/MST_5.png';
import MST_6 from './mst_swatches/MST_6.png';
import MST_7 from './mst_swatches/MST_7.png';
import MST_8 from './mst_swatches/MST_8.png';
import MST_9 from './mst_swatches/MST_9.png';
import MST_10 from './mst_swatches/MST_10.png';

export const surveyJson = {
    showQuestionNumbers: false,
    waitForUpload: true,
    completedHtml: "<div style=\"max-width:688px;text-align:center;margin: 16px auto;\">\n\n<div style=\"padding:0 24px;\">\n<h4>Thank you for your registration.</h4>\n<br>\n<p>We will review your registration and contact you with any further steps.</p>\n</div>\n\n</div>\n",
    pages: [
        {
            name: "page1",
            elements: [{
                type: "panel",
                name: "introduction",
                elements: [
                    {
                        type: "html",
                        html: `<h4 style="text-align: center; color: #1D4563">`
                            + `Onsite Study in El Salvador, Central America`
                            + `</h4>`,

                    },
                    {
                        name: "introductoryText",
                        type: "html",
                        html: `<div style="text-align: center;">`
                            + `<div style="text-align: left;"><br>`
                            + `<p><span><span style="font-weight: 400;">Company is seeking participants for an onsite study just south of San Salvador. During your session onsite, you will be photographed and video-recorded while performing basic movements, which may include walking, sitting, standing up, different gestures, or facial expressions. You may be interacting with props and furniture.
                     The study will also collect photos, videos, and audios and measurements of individuals’ head, face, and hands in still and moving poses, under various lighting conditions. Finally, a specialist will make an impression of your outer ear. The tasks can be easily completed by anyone and do not require prior experience or special skills.</span></p>`
                            + `<p>Payments will be made via Hyperwallet, where you can choose PayPal, bank transfer, or Venmo as the payment method.</p>`
                            + `<br/>`
                            + `<b>Task requirements:</b>`
                            + `<ul>`
                            + `<li class="done" aria-level="1"><span><strong>Earn $300 for completing a 3-hour session</strong></span></li>`
                            + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">Be photographed or video recorded following directives from our team for a total duration of 3 hours (including short breaks)</span></li>`
                            + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">Wear form-fitting compression tops and shorts provided on-site</span></li>`
                            + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">Agree to body composition measurements to be taken during the study</span></li>`
                            + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">You must be able to stand and perform physical activities during the study session (including independently climbing a flight of stairs and walking)</span></li>`

                            + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">All ages 13-75 are qualified to participate</span></li>`
                            + `<ul>
                    <li class="done" style="font-weight: 400; padding-left:20px" aria-level="1"><span style="font-weight: 400">13-17-year-olds need a legal guardian to register, provide consent, and need to be accompanied for the session</span></li>
                    </ul>`
                            + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">Must be able to read, speak, and understand instructions provided in English</span></li>`
                            + `<li class="done" style="font-weight: 400;" aria-level="1"><span style="font-weight: 400">Must be a US citizen, legal permanent resident, or authorized to work in the USA (proof will be required)</span></li>`
                            + `</ul>`
                            + `</div>`
                            + `</div>`
                    }, {
                        name: "registeredAs",
                        title: "Please select:",
                        type: "radiogroup",
                        choices: [
                            'I am registering as a participant over the age of 18',
                            'I am a parent or guardian registering a child under 18'
                        ],
                        isRequired: true,
                        defaultValue: 'I am registering as a participant over the age of 18'
                    }]
            }, {
                type: "panel",
                name: "contactInfo",
                elements: [
                    {
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Registration Form (1/2)`
                            + `</h4>`,

                    },
                    {
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Personal Information`
                            + `</h4>
                            <hr>`,
                        visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'"

                    },
                    {
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Parent or Guardian Contact Information`
                            + `</h4>
                            <hr>`,
                        visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'"

                    },
                    {
                        name: "guardianFirstName",
                        title: "First name:",
                        type: "text",
                        isRequired: true,
                        visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'"
                    },
                    {
                        name: "guardianLastName",
                        title: "Last name:",
                        type: "text",
                        isRequired: true,
                        startWithNewLine: false,
                        visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'"

                    },
                    {
                        name: "email",
                        type: "text",
                        title: "Email address:",
                        validators: [
                            { type: "email", text: "Value must be a valid email" }
                        ],
                        isRequired: true,
                        visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'"
                    },
                    {
                        name: "phone",
                        type: "text",
                        title: "Phone number:",
                        inputMask: "phone",
                        inputFormat: "+1(999)-999-9999",
                        isRequired: true,
                        startWithNewLine: false,
                        visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'",
                    },
                    {
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Personal Information of the Child or Minor Participant`
                            + `</h4>
                            <hr>`,
                        visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'"

                    },

                    {
                        name: "firstName",
                        title: "First name:",
                        type: "text",
                        isRequired: true
                    },
                    {
                        name: "lastName",
                        title: "Last name:",
                        type: "text",
                        isRequired: true,
                        startWithNewLine: false
                    }, {
                        name: "email",
                        type: "text",
                        title: "Email address:",
                        validators: [
                            { type: "email", text: "Value must be a valid email" },
                        ],
                        isRequired: true,
                        visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'"
                    }, {
                        name: "phone",
                        type: "text",
                        title: "Phone number:",
                        inputMask: "phone",
                        inputFormat: "+1(999)-999-9999",
                        visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'",
                        isRequired: true,
                        startWithNewLine: false
                    }, {
                        name: "gender",
                        title: "Gender at birth:",
                        type: "dropdown",
                        choices: [
                            'Male',
                            'Female',
                            'Non-binary',
                            'Prefer not to say'
                        ],
                        isRequired: true
                    }, {
                        name: "dob",
                        title: "Date of birth:",
                        type: "text",
                        inputType: "date",
                        isRequired: true,
                        startWithNewLine: false
                    }, {
                        name: "country",
                        title: "Country of residence:",
                        type: "dropdown",
                        choices: [
                            { value: 'United States' },
                            { value: 'Other' },

                        ],
                        isRequired: true
                    }, {
                        name: "residenceState",
                        title: "State of residence:",
                        type: "dropdown",
                        choices: [
                            { value: 'Alabama' },
                            { value: 'Alaska' },
                            { value: 'Arizona' },
                            { value: 'Arkansas' },
                            { value: 'California' },
                            { value: 'Colorado' },
                            { value: 'Connecticut' },
                            { value: 'Delaware' },
                            { value: 'Florida' },
                            { value: 'Georgia' },
                            { value: 'Hawaii' },
                            { value: 'Idaho' },
                            { value: 'Illinois' },
                            { value: 'Indiana' },
                            { value: 'Iowa' },
                            { value: 'Kansas' },
                            { value: 'Kentucky' },
                            { value: 'Louisiana' },
                            { value: 'Maine' },
                            { value: 'Maryland' },
                            { value: 'Massachusetts' },
                            { value: 'Michigan' },
                            { value: 'Minnesota' },
                            { value: 'Mississippi' },
                            { value: 'Missouri' },
                            { value: 'Montana' },
                            { value: 'Nebraska' },
                            { value: 'Nevada' },
                            { value: 'New Hampshire' },
                            { value: 'New Jersey' },
                            { value: 'New Mexico' },
                            { value: 'New York' },
                            { value: 'North Carolina' },
                            { value: 'North Dakota' },
                            { value: 'Ohio' },
                            { value: 'Oklahoma' },
                            { value: 'Oregon' },
                            { value: 'Pennsylvania' },
                            { value: 'Rhode Island' },
                            { value: 'South Carolina' },
                            { value: 'South Dakota' },
                            { value: 'Tennessee' },
                            { value: 'Texas' },
                            { value: 'Utah' },
                            { value: 'Vermont' },
                            { value: 'Virginia' },
                            { value: 'Washington' },
                            { value: 'Washington, D.C.' },
                            { value: 'West Virginia' },
                            { value: 'Wisconsin' },
                            { value: 'Wyoming' },
                        ],
                        isRequired: true,
                        visibleIf: "{country} = 'United States'",
                        startWithNewLine: false,
                    }, {
                        name: "countryOther",
                        title: "Country of residence / other:",
                        type: "text",
                        isRequired: true,
                        startWithNewLine: false,
                        placeholder: 'Please specify the country of residence',
                        visibleIf: "{country} = 'Other'"

                    }, {
                        name: "residenceCity",
                        title: "City of residence:",
                        type: "text",
                        isRequired: true,
                        startWithNewLine: false,
                    },
                    {
                        name: "availability",
                        title: "Are you able to come for a three hour study appointment at our onsite location south of Glendale, California?",
                        type: "radiogroup",
                        choices: ["Yes", "No"],
                        isRequired: true,
                    },
                    {
                        name: "noAvailabilityReason",
                        title: "Can you tell us why you are not able to come to the onsite location?",
                        type: "checkbox",
                        choices: [
                            'I am generally not interested in going to an onsite study.',
                            "I am hesitant to join a study when I don't know what it is about but I would like to have more information.",
                            'I am not interested in participating in this study.',
                            'I am worried about sharing personal information.',
                            'I do not have time at the moment.',
                            'I do not want to answer this question.',
                            'Something else - please provide more information in the feedback if you want.',
                            'The compensation is generally not enough for me.',
                            'The compensation is not enough for me to go to Los Angeles. I would go if the place would be nearer.',
                            'The place is too far for me.'
                        ],
                        visibleIf: "{availability} = 'No'",
                        maxSelectedChoices: 10,
                        isRequired: true
                    }
                ]
            }, {
                type: "panel",
                name: "identification",
                elements: [
                    {
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Identification`
                            + `</h4>
                            <hr>`
                    }, {
                        type: "html",
                        html: `<p><span style="font-weight: 400;">Please upload an image of your ID, preferably driver’s license. You need to hide the </span><span style="font-weight: 400;">address, social security number, ID number on the documents you upload.</span></p>
                            <p>We will need to confirm your identity to qualify you for the study.</p>

                            <br>
                            <p><b>Example Image:</b></p>
                            <img style='height:300px; max-height: 50vw' src='${exampleimage}' />`
                    },
                    {
                        type: "file",
                        title: "Driver's license or other form of identification",
                        name: "identificationFile",
                        waitForUpload: true,
                        allowMultiple: false,
                        maxWidth: "40%",
                        height: 10,
                        isRequired: true
                    }, {
                        type: "html",
                        html: `<div><span style="color: #ff0000;"><strong>NB: </strong>you MUST   HIDE the address, social security number, ID number on the documents you upload.</span></div>`
                    }]
            }, {
                type: "panel",
                name: "otherInformation",
                elements: [{
                    type: "html",
                    html: `<h4 style="text-align: center;">`
                        + `Other Information`
                        + `</h4>
                        <hr>`
                }, {
                    name: "source",
                    title: "How did you find out about this research study?",
                    type: "radiogroup",
                    choices: [
                        'TELUS International Website',
                        'Facebook',
                        'LinkedIn',
                        'Flyer',
                        'Newspaper',
                        'I was referred by someone',
                        'Instagram',
                        'Indeed',
                        'FlexJobs',
                        'Work Market platform',
                        'Through my association',
                        'Twitter',
                        'Craiglist',
                        'Google Ad',
                        "I'm a TELUS International employee",
                        'I was contacted by TELUS International directly',
                        'Snapchat',
                        'Reddit',
                        'Retirement Jobs',
                        'TikTok'
                    ],
                    colCount: "4",
                    isRequired: true,
                    maxSelectedChoices: "1",
                    visibleIf: "{source} != 'Respondent'"
                }, {
                    name: "otherCompanies",
                    title: "Do you, or does any member of your immediate family, currently work for any of the below companies?",
                    type: "checkbox",
                    choices: [
                        'Alphabet',
                        'Amazon',
                        'Appen',
                        'Apple',
                        'BOSE',
                        'Google',
                        'HTC',
                        'Huawei',
                        'IBM',
                        'LG',
                        'Magic Leap',
                        'Meta',
                        'Microsoft',
                        'Netflix',
                        'Nuance',
                        'Samsung',
                        'Sony',
                        'Yahoo'

                    ],
                    separateSpecialChoices: true,
                    showNoneItem: true,
                    noneText: "None of these",
                    maxSelectedChoices: 10,
                    colCount: "5",
                    isRequired: true,
                }, {
                    name: "industry",
                    title: "What industry do you work in?",
                    type: "radiogroup",
                    choices: [
                        'Aerospace',
                        'Commercial Services',
                        'Health Care and Medicine',
                        'Public Services',
                        'Agriculture',
                        'Construction',
                        'Hospitality',
                        'Technology',
                        'Advertising',
                        'Education',
                        'Marketing and Media',
                        'Telecommunications',
                        'Fashion',
                        'Entertainment',
                        'Manufacturing',
                        'Tourism',
                        'Finance',
                        'Energy Sector',
                        'Mining',
                        'Transportation',
                        'Charity or NGO',
                        'Environmental Sciences',
                        'Pharmaceutics',
                        'I am currently not working',
                    ],
                    colCount: "5",
                    isRequired: true,
                }, {
                    name: "interestedInRecruiting",
                    type: "radiogroup",
                    title: "I'm interested in helping TELUS International find more participants like me: ",
                    choices: ["Yes", "No"]
                }]
            }, {
                type: "panel",
                name: "contributorServiceAgreement",
                elements: [{
                    type: "html",
                    html: `<h4 style="text-align: center;">`
                        + `Contributor Services Agreement`
                        + `</h4>
                        <hr>`
                }, {
                    type: "html",
                    html: `<b>Project Sponsor</b>
                    <br>
                    <p>TIAI is collecting the information you submit on behalf of a client of TIAI. Our Client (the “Customer”) 
                    is not affiliated with TIAI and is a separate company that operates in the technology industry (“Customer”). 
                    We will provide the Customer's name before the Study's commencement. If you decide at that time, or any time after commencing the Study, not to participate, you may withdraw from it without any penalty. 
                    Any consent you have provided to transfer information to the Customer will not be effective (i.e., we will consider your consent withdrawn).</p>
                    <br>
                    <b>Selection Process</b>
                    <p>TIAI collects personal information to determine whether you are eligible to be considered for the Study. 
                    If you are selected you will be contacted with detailed guidelines on how to get started.</p>
                    <br>
                    <p>Note that submission of this Participation Agreement is not a guarantee that you will be selected for the Study. Even if you meet all of the eligibility requirements, you may not be selected for the Study for various reasons. For example, 
                    TIAI may have received a sufficient number of participants with similar characteristics.</p>
                    <br>
                    <b>Data Used and Shared</b>
                    <br><br>
                    <p><strong>Contract Data</strong> is collected about people who would like to be considered for our studies.  
                    Contract Data is utilized to, among other things, engage with you, set up your profile, administer our contractual relationship, 
                    determine project-related eligibility, and meet our regulatory obligations. We do not share the Contract Data with the Customer. </p>
                    <br>
                    <p><strong>Demographic Data</strong> refers to additional data that we collect, which is not mandatory when registering with us, and that helps us evaluate your suitability for studies.  
                    If you are selected to participate in this Study we may share some Demographic Data with the Customer. 
                    The Demographic Data is anonymized and not tied to your personal information.</p>
                    <br>
                    <p>For more information about how we use, collect, and share Contract Data and Demographic Data, 
                    as well as your rights to that data, visit our <a href="https://www.telusinternational.com/privacy-policy/contributors" target="_blank">Community Data Privacy Notice</a>.</p>
                    <br>
                    <p><strong>Work Product Data</strong> refers to data we, or our Customer, collect specific to this Study. Whether we collect Work Product Data on behalf 
                    of our Customer or our Customer collects it directly, our Customer controls how it is used and shared. 
                    For more information about how the Work Product Data will be used, stored, and shared you should review the Customer’s 
                    Informed Consent Form, which will be shared with you before collecting Work Product Data. 
                    If you are selected, the name of our customer will be provided to you before the initiation of the Study if required by applicable Laws. 
                    If you choose not to participate after being informed of the Customer’s name, and reviewing the Informed Consent Form, 
                    you may withdraw from the Study, and withdraw any consent that was provided to transmit your information to the Customer, without detriment.</p>
                    <br>
                    <p><strong>Special Category Data</strong>. Some of our studies involve the collection of data that may be more sensitive than others.  
                    If this Study involves such data, we will separately ask your consent to collect and transmit it to our Customer</p>
                    <br>
                    <p>If you have any questions or would like additional information about this Study before submitting a request to participate, 
                    please contact us at <a href="mailto:aisourcing@telusinternational.ai" target="_blank">aisourcing@telusinternational.ai</a>.</p>
                    <br>
                    <p>By clicking submit I acknowledge that I have read and understand the information provided about the Study, 
                    and wish to be considered for participation. I understand that submission of this form is not a guarantee that I will be included in the Study and that 
                    I will not receive any compensation described in this document unless I am selected to participate and complete the Study. 
                    I further understand that participation in this Study is voluntary.</p>`
                }, {
                    type: "html",
                    html: `<span style="color:red">Please read and sign the Contributor Services Agreement below.</span>`
                }, {
                    type: "html",
                    html: `<div style="width:100%;height:600px;overflow:auto;border:1px solid #555; padding-left:10px">`
                        + `<div>
                        <p style="text-align: center;"><strong><u>Contributor Services Agreement</u></strong></p>
                        <p>&nbsp;</p>
                        <p>Hello and Welcome to the community of Independent Contractors for TELUS International AI Inc. (the
                            “Company”)!&nbsp;&nbsp;</p>
                        <p>All of the services provided by you (the “Independent Contractor”) to the Company are governed by the terms
                            and conditions set out in this Contributor Services Agreement (the “Agreement”).&nbsp; Please be sure to
                            review the terms and conditions carefully.&nbsp; By acknowledging this Agreement, you also confirm to have
                            read and understand the terms of the Agreement which has been provided and originally drafted in the English
                            language. En cliquant sur Accepter, vous confirmez également avoir lu et compris les termes du Contrat qui a
                            été fourni et rédigé à l'origine en anglais.&nbsp; By acknowledging this Agreement, you also consent to
                            signing or acknowledging TELUS International documents electronically, and agree that your electronic
                            signature will have the same legal effect as a hand-written signature. Once accepted, a copy of this
                            Agreement will be made available for download in the “Agreements” section of your profile on the
                            platform.&nbsp;</p>
                        <p>Independent Contractor and Company agree as follows:</p>
                        <p>&nbsp;</p>
                        <ol>
                            <li>Services.</li>
                        </ol>
                        <p>1.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Services and Deliverables.&nbsp; Company will
                            propose services to be performed by the Independent Contractor (the “Services”) and for each service will
                            provide information concerning the required deliverables (the “Deliverables”), fees payable, due dates and
                            other business terms that apply to the Services.&nbsp; Company may propose Services through the platform or
                            other means as communicated to Independent Contractor by Company. Independent Contractor may accept the
                            opportunity or decline to provide the Services in Independent Contractor’s sole and absolute discretion
                            without any form of detriment to the Independent Contractor.&nbsp; If Independent Contractor accepts the
                            opportunity, Independent Contractor will perform the Services and provide the Deliverables in accordance
                            with all of the specifications and other requirements included in the Work Statement which are incorporated
                            herein by reference and form the terms of the Agreement.&nbsp; Services shall be performed in a highly
                            skilled and professional manner consistent with the highest professional standards in the industry and
                            confirms that the Independent Contractor has the necessary qualifications and training/expertise required to
                            deliver the Services.&nbsp;&nbsp;&nbsp; Independent Contractor shall promptly correct any failure of the
                            Services or the Deliverables to conform to the above warranty at Independent Contractor's sole cost and
                            expense.&nbsp; Subject to Independent Contractor meeting the requirements for the Services set out or
                            otherwise communicated by Company, Independent Contractor will have the control and reasonable discretion as
                            to the manner and means of performing the Services including full autonomy as to work schedule and tools,
                            materials and equipment used to complete the Services. Independent Contractor represents and warrants that
                            Services and Deliverables to Company and under this Agreement will not breach or conflict with any agreement
                            to which Independent Contractor is a party or any contractual obligation Independent Contractor owes to a
                            third party.</p>
                        <p>1.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Review.&nbsp; Company (or its customer, as
                            applicable) will review each Deliverable and may provide Independent Contractor with requested corrections
                            to align Services and Deliverables with Company’s expectations.&nbsp; Independent Contractor will promptly
                            make all corrections requested by Company that are reasonably within the scope of the Services for no
                            additional fee.&nbsp; If any requested change is outside of the scope of the Services and/or Deliverables,
                            Independent Contractor will promptly notify Company and Independent Contractor will agree on revised
                            Deliverables and delivery dates therto.&nbsp; Any modifications must be agreed by both parties to be
                            effective.&nbsp;&nbsp;&nbsp;</p>
                        <p>1.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Payment.&nbsp; Company will pay Independent
                            Contractor for all Services and Deliverables as described in the services request but no later than sixty
                            (60) days from either the issuance of the applicable invoice or, where fees are calculated automatically
                            through the platform based on Services provided and mutually agreed under the Agreement, the end of the
                            Term.&nbsp; Independent Contractor agrees that the fees offered will be full and complete compensation for
                            Independent Contractor’s performance of the Services and shall be inclusive of any taxes.&nbsp; Independent
                            Contractor will be solely responsible for all costs and expenses associated with the Services.&nbsp;
                            Independent Contractor is also solely responsible for the payment of any taxes, fees, costs or otherwise to
                            the appropriate tax authority in a timely manner and as prescribed by law.</p>
                        <p>1.4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Equipment. Independent Contractor agrees to supply,
                            at its own expense, all tools and materials necessary for Independent Contractor to perform the Services,
                            including, but not limited to, all necessary hardware, software, equipment and supplies. Under exceptional
                            circumstances, the Company may furnish materials and equipment to Independent Contractor. Any materials and
                            equipment furnished by Company to Independent Contractor in connection with this Agreement, unless fully
                            paid for by Independent Contractor are and will remain the property of Company and will be deemed to be
                            loaned to Independent Contractor. Upon the earlier of Company’s request or the expiry or termination of the
                            Agreement, Independent Contractor shall provide, to Company or to Company’s designate, all Company equipment
                            and materials related to the Services covered under the Agreement in the same condition as they were when
                            furnished by Company. Final payment by Company of the fees for Services and Deliverables will be contingent
                            on the return of such equipment and materials in addition to any other legal remedies the Company may have.
                        </p>
                        <p>1.5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Company Requirements.&nbsp; Independent Contractor
                            will comply with all requirements and policies provided to Independent Contractor by Company or the
                            applicable Company customer (collectively, the “Requirements”).&nbsp; In addition to the Requirements,
                            Independent Contractor agrees to comply with&nbsp; Company’s Supplier Code of Conduct found at <a
                                href="http://www.telus.com/suppliercodeofconduct">www.telus.com/suppliercodeofconduct</a> and any
                            requirements concerning information security measures in performance of Independent Contractor’s
                            obligations. Independent Contractor shall observe and comply with all applicable laws, regulations,
                            ordinances, and codes of governmental entities relating to the provision of the Services and
                            Deliverables.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <p>&nbsp;</p>
                        <ol start="2">
                            <li>Confidentiality.</li>
                        </ol>
                        <p>2.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Definition.&nbsp; “Confidential Information” means
                            any non-public information that is provided to Independent Contractor by Company or any of Company’
                            affiliates, customers, business partners or Independent Contractors. The Confidential Information includes,
                            but is not limited to, (i) all software, documentation, financial, marketing and customer data, customer
                            retention plans, strategies and other business information, (ii) any rating procedures, rules and
                            guidelines, systems and processes, ratings hub, and the underlying methodologies and processes of the
                            foregoing and all related training and documentation, and (iii) any discoveries, inventions, trade secrets,
                            research and development efforts, know-how and show-how, and all deliverables, derivatives, improvements,
                            and enhancements to any of the above which were created or developed by Independent Contractor under this
                            Agreement..&nbsp; “Confidential Information” does not include information that: (a) was rightfully known to
                            Independent Contractor, without any obligation of confidentiality, prior to receiving the same information
                            from Company; (b) is or becomes publicly available without breach of any confidentiality obligation; or (c)
                            is rightfully obtained by Independent Contractor from a source other than Company without breach of any
                            confidentiality obligation.&nbsp;</p>
                        <p>2.2&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Use of Information.&nbsp; Independent Contractor
                            understands that Confidential Information constitutes a valuable and unique asset to the Company.&nbsp;
                            Independent Contractor will use Confidential Information only for the purpose of providing the Services and
                            will not use it for Independent Contractor’s own benefit or the benefit of any other party.&nbsp;
                            Independent Contractor will not disclose or distribute Confidential Information to any third party without
                            Company’s prior written consent.&nbsp;&nbsp;</p>
                        <p>2.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Protection of Information.&nbsp; Independent
                            Contractor will protect Confidential Information from any unauthorized use or disclosure, including
                            implementing all reasonable security measures needed to protect the Confidential Information.&nbsp;
                            Independent Contractor will notify Company immediately if Independent Contractor becomes aware of any
                            unauthorized disclosure or use of any Confidential Information, including any personal data received by
                            Independent Contractor in the course of performing the Services.&nbsp; Independent Contractor may disclose
                            Confidential Information pursuant to a valid order issued by a court or government agency; provided that,
                            Independent Contractor gives Company at least ten (10) days prior written notice of such obligation and the
                            opportunity to oppose such disclosure or obtain a protective order or the equivalent.&nbsp;</p>
                        <p>2.4&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Customer Information.&nbsp;&nbsp; In addition to and
                            without reducing any other obligation set out in this Agreement, Independent Contractor specifically
                            acknowledges that all information related to any Company customer, including<em> any</em> information about
                            a customer’s business, product plans, strategic relationships, etc., is to be held in the <em>strictest
                                confidence</em>.&nbsp; Independent Contractor must not disclose any information about the Services
                            performed by Independent Contractor or the customer’s identity in <em>any</em> materials, including postings
                            in social media or on the Independent Contractor’s website.&nbsp; Independent Contractor must not duplicate
                            any images or text provided to Independent Contractor, other than as strictly needed to perform the
                            Services.</p>
                        <p>2.5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Return of Information.&nbsp; All Confidential
                            Information will remain the property of the Company.&nbsp; Upon Company’ request, Independent Contractor
                            will promptly return or destroy all copies of Confidential Information in Independent Contractor’s control
                            and certify the completion of Independent Contractor’s obligations under this Section in
                            writing.&nbsp;&nbsp;&nbsp;</p>
                        <p>2.6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Investigations and Audits.&nbsp; Independent
                            Contractor will cooperate fully in any investigation of any unauthorized disclosure or use of Confidential
                            Information and will promptly provide requested information and reasonable access to any evidentiary matter
                            (e.g. documents or work systems).&nbsp; Independent Contractor will cooperate in any reasonable audit
                            required by law or under Company’s contracts with its customers.&nbsp; Company will provide the Independent
                            Contractor with reasonable notice and an explanation in connection with any required audit.&nbsp;&nbsp;</p>
                        <p>2.7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Protection of Business Interests.&nbsp; Independent
                            Contractor will not directly or indirectly solicit any customer of Company for any business or other
                            opportunity based on any information learned in the course of providing the Services or that was otherwise
                            provided by Company.&nbsp;&nbsp;&nbsp;</p>
                        <p>2.8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Court-granted Relief.&nbsp; Independent Contractor
                            acknowledges that any breach of its obligations under this Agreement will result in irreparable harm to the
                            Company.&nbsp; In the event of an actual or threatened breach of this Agreement, Company will be entitled to
                            immediate injunctive relief in addition to any other legal relief available to it.&nbsp;</p>
                        <p>&nbsp;</p>
                        <ol start="3">
                            <li>Relationship. Independent Contractor is engaged as, and shall perform the Services as&nbsp; an
                                independent contractor and&nbsp; Independent Contractor acknowledges that Independent Contractor will
                                not be considered an employee, agent, joint venture or partner of Company or any of its customers, under
                                the provisions of this Agreement or otherwise.&nbsp; Independent Contractor shall not receive nor be
                                entitled to any employment-related benefit or entitlement such as vacation pay, holiday pay, termination
                                notice, payment in lieu of termination notice, or severance pay, in connection with the performance of
                                its obligations under this Agreement.&nbsp; Independent Contractor does not have and will not have any
                                authority to bind Company or assume or create any obligation on behalf of Company and Independent
                                Contractor will not represent to any third party that Independent Contractor has any such
                                authority.&nbsp; No part of Independent Contractor’s compensation will be subject to withholding by
                                Company or payment by the Company for the payment of social insurance, pension plan, social security,
                                unemployment insurance, or disability insurance or their equivalents or any other similar tax
                                obligations, unless otherwise required by laws applying to Independent Contractors.&nbsp;</li>
                        </ol>
                        <p>&nbsp;</p>
                        <ol start="4">
                            <li>Legal Compliance.</li>
                        </ol>
                        <p>4.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Personal Data.&nbsp;</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            (a)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Independent Contractor’s Personal
                            Data.&nbsp; Company will use and share any personal data provided by Independent Contractor solely in
                            accordance with the terms of its Community Data Privacy Notice.&nbsp; Company’s Community Data Privacy
                            Notice includes information about how to contact Company with any questions or concerns regarding use of
                            personal data.&nbsp;</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            (b)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Others’ Personal Data.&nbsp; Independent
                            Contractor acknowledges that some of the content that Independent Contractor may receive in connection with
                            the Services or generate in the course of providing the Services may include personal data, and acknowledges
                            that personal data is and shall remain the exclusive property of the Company.&nbsp; Independent Contractor
                            will treat all such personal data as Confidential Information as described in Section 2 above.&nbsp; In
                            addition, Independent Contractor will use, process and disclose any such personal data solely as directed by
                            the Company.&nbsp;&nbsp;&nbsp;</p>
                        <p>4.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Legal Compliance.&nbsp; Independent Contractor will
                            comply with all laws, rules and regulations in connection with Independent Contractor’s performance of the
                            Services, including all registration as an independent contractor, as required, reporting and other
                            obligations related to operating a business in Independent Contractor’s jurisdiction, <em>for example</em>,
                            regulations prohibiting bribery, money laundering and discrimination.&nbsp; Independent Contractor
                            represents and warrants that Independent Contractor has the legal authority to enter into this Agreement any
                            and that all of the information they provide to Company in any application or any required form is accurate
                            and complete.&nbsp; Additionally, Independent Contractor represents and warrants that Independent Contractor
                            is not subject to any contractual obligations that interfere with or prohibit Independent Contractor’s
                            performance of the Services.&nbsp;</p>
                        <p>For Independent Contractors operating in France, Independent Contractor represents and warrants that
                            Independent Contractor is duly registered with the <em>Registre du Commerce et des Sociétés</em> as an
                            independent contractor and shall produce any evidence of Independent Contractor’s compliance with
                            independent contractor’s tax and social security regulations as required by the Company under applicable
                            laws.</p>
                        <p>&nbsp;</p>
                        <ol start="5">
                            <li>Proprietary Rights.</li>
                        </ol>
                        <p>5.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ownership.&nbsp; To the extent permitted by
                            applicable law, Independent Contractor agrees that the Services are provided on a “work-for-hire” basis and
                            that all right, title and interest in any and all intellectual property rights (including, <em>for
                                example</em>, all copyrights, trademarks, patents, trade secret rights and all contract and licensing
                            rights) developed by Independent Contractor (either individually or in collaboration with others) relating
                            to the Services or Deliverables (collectively, the “Work Product”) will be the sole and exclusive property
                            of Company.&nbsp; Independent Contractor acknowledges that Company’s rights to the Work Product are
                            exclusive to Company and include, <em>for example</em>, the right to use, adapt, reproduce, distribute,
                            broadcast, display and make derivative works of the Work Product in any and all media and all formats now
                            known or later developed.&nbsp; In addition, all files, records, documents, drawings, specifications,
                            equipment and similar items related to Company’s business, whether prepared by Independent Contractor or
                            otherwise coming into Independent Contractor’s possession, will remain the exclusive property of
                            Company.&nbsp;</p>
                        <p>5.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Assignment of Rights.&nbsp; To the extent permitted
                            by applicable law, Independent Contractor hereby irrevocably assigns and transfers to Company all right,
                            title and interest in and to the Work Product.&nbsp; Independent Contractor acknowledges that the Company
                            will have the sole and exclusive worldwide right, title and interest in perpetuity to use and exploit all or
                            any part of the Work Product.&nbsp; Independent Contractor agrees they will not assert any moral rights in
                            the Work Product and, to the extent permitted by applicable law, hereby waives all such moral rights. In
                            addition, Independent Contractor agrees to execute any documents as the Company may request evidence or
                            otherwise protect Company’s ownership of the Work Product.&nbsp;</p>
                        <p>5.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Third Party Rights.&nbsp; Independent Contractor
                            will not use any third party materials or otherwise infringe any third party property right of any kind in
                            the performance of the Services.&nbsp; Independent Contractor will not disclose any third party confidential
                            information to Company at any time.</p>
                        <p>&nbsp;</p>
                        <ol start="6">
                            <li>Term and Termination. Subject to the terms of this Section, this Agreement will become effective when
                                accepted by Independent Contractor and will remain in effect until terminated by either Independent
                                Contractor or Company for a period of twelve (12) months unless terminated earlier by either Independent
                                Contractor or Company as provided below (the “Term”). Thereafter, this Agreement will automatically be
                                extended for consecutive one (1) year term, unless otherwise terminated as provided in this
                                Agreement.&nbsp; The Parties may terminate this Agreement at any time on written notice to Company;
                                provided Independent Contractor completes any Services that Independent Contractor has agreed to provide
                                prior to Independent Contractor’s termination of the Agreement and provided that the Company will pay
                                Independent Contractor for all Services properly performed as of the termination date.&nbsp; After
                                termination of this Agreement, Independent Contractor and Company will continue to comply with the
                                following Sections of this Agreement: Section 2 (Confidentiality), Section 3 (Relationship), Section 4
                                (Legal Compliance), Section 5 (Proprietary Rights), Section 8 (Company Contracting Party and Governing
                                Law), Section 9 (General) and Section 10 (Arbitration).&nbsp;</li>
                        </ol>
                        <p>&nbsp;</p>
                        <ol start="7">
                            <li>Limitation of Liability and Indemnity.</li>
                        </ol>
                        <p>7.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Neither party shall be liable for any indirect,
                            incidental, special or consequential damages whatsoever arising out of or in connection with this Agreement
                            or the provision of the Services or Deliverables, including lost profits, anticipated or lost revenue. In no
                            event shall Company be liable to Independent Contractor for any injury, claim, losses, damages, liabilities,
                            or costs (including, without limitation, legal fees) of any nature arising out of or related to this
                            A<em>g</em>reement, the Services or the Deliverables in excess of the amount which Company paid for the fees
                            payable to Independent Contractor for the Services and Deliverables for the three (3) prior months preceding
                            the first event or matter that gave rise to the claim, loss, damage or cost.</p>
                        <p>7.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Independent Contractor shall, at its own expense,
                            defend, indemnify, Company and hold harmless Company, its affiliates and successors, and each of their
                            respective directors, officers and employees (each a “Company Indemnitee”) harmless from and against any and
                            all damages, expenses, liabilities, costs, penalties, losses and claims of whatever nature (including legal
                            fees and expenses) arising from or attributable to the Independent Contractor in connection with its
                            performance of Services or any breach of this Agreement by Independent Contractor, including any and all
                            damages, expenses, liabilities, costs, penalties, losses and claims any Company Indemnitee may suffer as a
                            result of enforcing the indemnification provisions set out in this section 7.2.&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <p>7.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Independent Contractor shall (to the extent
                            permitted by applicable law), at its own expense, indemnify, defend and hold Company, its affiliates and
                            their respective directors, officers and employees harmless each Company Indemnitee from a determination by
                            any court, arbitrator, taxing authority, government entity, agency, ministry or adjudicating body that the
                            relationship between the Company and Independent Contractor, is not an independent contractor relationship,
                            including any and all damages, expenses, liabilities, costs, penalties, losses and claims any Company
                            Indemnitee may suffer as a result of enforcing the indemnification provisions set out in this section
                            7.3.&nbsp;</p>
                        <p>&nbsp;</p>
                        <ol start="8">
                            <li>Company Contracting Party and Governing Law.</li>
                        </ol>
                        <p>8.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This Agreement will be governed exclusively by the
                            laws of the State of Delaware, without reference to any conflict of laws principles that would require the
                            application of the laws of any other jurisdiction.&nbsp; Additionally, the provisions of Section 10
                            (Arbitration) below will apply to Independent Contractor.&nbsp;</p>
                        <p>&nbsp;</p>
                        <ol start="9">
                            <li>General. This Agreement and the Requirements embody the entire understanding between the parties
                                concerning the subject matter hereof and supersede any and all other negotiations or agreements between
                                the parties.&nbsp; This Agreement cannot be modified except in the form of a writing accepted by both
                                parties.&nbsp; This Agreement has no third party beneficiaries other than Company’s customers, who may
                                enforce the terms of this Agreement or any applicable Requirements directly.&nbsp; No failure of either
                                party to exercise or enforce any of its rights under this Agreement will act as a waiver of any of its
                                rights.&nbsp; Independent Contractor will not subcontract or assign any of Independent Contractor’s
                                rights or obligations under this Agreement or the Requirements without the prior written consent of
                                Company.&nbsp; This Agreement shall benefit and be binding upon the Company’s successors, affiliates and
                                assigns. Should any provision of this Agreement be found unenforceable, such provision will be enforced
                                to the fullest extent permitted by law and the remainder of this Agreement will remain in full force and
                                effect.&nbsp;</li>
                        </ol>
                        <p>&nbsp;</p>
                        <ol start="10">
                            <li>Arbitration (US-based Independent Contractors only).</li>
                        </ol>
                        <p>10.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Exclusive Use of Arbitration.&nbsp; Independent Contractor and
                            Company mutually agree to resolve any disputes exclusively through final and binding arbitration instead of
                            filing a lawsuit in court.&nbsp; This arbitration provision is governed by the Federal Arbitration Act (9
                            U.S.C. §§ 1-16) and will apply to any and all claims arising out of or relating to the Services, the
                            Requirements, this Agreement, the nature of the relationship between Independent Contractor and Company
                            (including any Company affiliates or customers) and all other aspects of Independent Contractor’s
                            relationship with Company whether arising under federal, state or local statutory or common law. &nbsp;The
                            arbitrator will have the exclusive authority to resolve any dispute relating to the interpretation,
                            applicability, enforceability, or formation of this arbitration provision, other than Sections 10.2 and 10.3
                            below relating to the Class Action Waiver or Representative Action Waiver.&nbsp; Independent Contractor
                            acknowledges this means such disputes will not be resolved by a court or jury trial.&nbsp;</p>
                        <p>10.2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Class Action Waiver.&nbsp; Independent Contractor and Company
                            mutually agree that by agreeing to arbitrate any dispute, each waives its right to have any dispute or claim
                            brought, heard or arbitrated as a class action or collective action and that the arbitrator will not have
                            any authority to hear or arbitrate any class or collective action (“Class Action Waiver”).</p>
                        <p>10.3 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Representative Action Waiver.&nbsp; Independent Contractor and
                            Company mutually agree that by agreeing to arbitrate, each waives its right to have any dispute or claim
                            brought, heard or arbitrated as a representative action and that the arbitrator will not have any authority
                            to arbitrate a representative action ("Representative Action Waiver").</p>
                        <p>10.4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Process.&nbsp;</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (a)
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Notice.&nbsp; If either party wishes to initiate
                            arbitration, the initiating party must notify the other party in writing delivered by courier or other
                            verifiable delivery method.&nbsp; The notice must include (1) the name and address of the party seeking
                            arbitration, (2) a statement of the legal and factual basis of the claim, and (3) a description of the
                            remedy sought.&nbsp;</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            (b)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Procedural Requirements.&nbsp; The
                            arbitration will be governed by the terms of this Section and, except as otherwise provided in this Section
                            10, by the Judicial Arbitration and Mediation Services (“JAMs Rules”).&nbsp; The arbitration will be heard
                            by one arbitrator selected in accordance with the JAMs Rules.&nbsp; The arbitrator will apply the state or
                            federal substantive law, as applicable.&nbsp; The arbitrator may issue orders (including subpoenas to third
                            parties) allowing the parties to conduct discovery sufficient to allow each party to prepare that party’s
                            claims and defenses, taking into consideration that arbitration is designed to be a speedy and efficient
                            method for resolving disputes.&nbsp; The arbitrator may hear motions and will apply the standards of the
                            Federal Rules of Civil Procedure governing such motions.&nbsp; Except as provided in the Class Action Waiver
                            and Representative Action Waiver, the arbitrator may award only remedies that would otherwise be available
                            in a court of law.&nbsp; The arbitrator’s decision or award will be in writing with findings of fact and
                            conclusions of law and will be final and binding on the parties.&nbsp; Notwithstanding the foregoing, either
                            party may apply to a court of competent jurisdiction for temporary or preliminary injunctive relief as
                            needed to protect such party’s rights.&nbsp;</p>
                        <p>&nbsp;&nbsp;</p>
                        <ol start="11">
                            <li>Advice of Counsel. Independent Contractor has the right to consult with private counsel of Independent
                                Contractor’s choice with respect to any aspect of, or any claim that may be subject to, this Agreement,
                                including this arbitration provision.</li>
                        </ol>
                        <p>&nbsp;</p>
                        <ol start="12">
                            <li>Enforceability. In the event any portion of this arbitration provision is deemed unenforceable, the
                                remainder of this arbitration provision will remain in full force and effect.</li>
                        </ol>
                        <p>&nbsp;</p>
                        <ol start="13">
                            <li>Prevailing Language. The parties have expressly requested that this contract be drafted in the English
                                language. <em>Les parties ont expressément requis que ce contrat soit rédigée en anglais. </em>If this
                                Agreement is translated into a language other than English for any purpose, the English version shall
                                prevail in the event of any differences, questions or disputes concerning the meaning, form, validity or
                                interpretation of this Agreement.</li>
                        </ol>
                    </div>`
                }, {
                    type: "html",
                    html: `<div><strong>Consent to the Collection of Personal Data:</strong></div>
                        <ul>
                        <li>I consent to TIAI’s collection of my personal data "Data Collected". TIAI will retain my personal data for one year, unless local law requires a shorter period.</li>
                        <li>I consent to the collection of my personal data "Data Collected" by TIAI’s customer.</li>
                        <li>I consent to TIAI’s collection of my health information. TIAI will retain my health information for one year, unless local law requires a shorter period.</li>
                        <li>I consent to the collection of my health information by TIAI’s customer.</li>
                        <li>I consent to TIAI’s collection of my racial or ethnic origin data. TIAI will retain my racial or ethnic origin data for one year, unless local law requires a shorter period.</li>
                        <li>I consent to the collection of my racial or ethnic origin data by TIAI’s customer.</li>
                        </ul>`
                }, {
                    name: "agreementConfirmation",
                    title: "\n",
                    type: "checkbox",
                    choices: [
                        'I confirm and agree with all of the above',
                    ],
                    isRequired: true
                }, {
                    type: "html",
                    html: `<span style="color:red">If you are a parent or guardian registering a minor, please enter your first and last name and sign the document</span>`,
                    visibleIf: "{registeredAs} != 'I am registering as a participant over the age of 18'"
                }, {
                    name: "signatureFirstName",
                    title: "First name:",
                    type: "text",
                    isRequired: true,
                    defaultValueExpression: "{firstName}",
                    visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'",
                    readOnly: true
                }, {
                    name: "signatureLastName",
                    title: "Last name:",
                    type: "text",
                    isRequired: true,
                    visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'",
                    defaultValueExpression: "{lastName}",
                    readOnly: true,
                    startWithNewLine: false,
                }, {
                    name: "grd_signatureFirstName",
                    title: "First name:",
                    type: "text",
                    isRequired: true,
                    defaultValueExpression: "{guardianFirstName}",
                    visibleIf: "{registeredAs} = 'I am a parent or guardian registering a child under 18'",
                    readOnly: true
                }, {
                    name: "grd_signatureLastName",
                    title: "Last name:",
                    type: "text",
                    isRequired: true,
                    startWithNewLine: false,
                    defaultValueExpression: "{guardianLastName}",
                    visibleIf: "{registeredAs} = 'I am a parent or guardian registering a child under 18'",
                    readOnly: true
                }, {
                    name: "date",
                    title: "Signature Date",
                    type: "text",
                    inputType: "date",
                    defaultValueExpression: "today()",
                    minValueExpression: "today()",
                    isRequired: true,
                    startWithNewLine: false,
                    readOnly: true

                }, {
                    type: "signaturepad",
                    name: "signature",
                    title: "Signature",
                    signatureWidth: 700,
                    signatureHeight: 400,
                    penColor: "black",
                    isRequired: true,
                }]
            },]
        }, {
            name: "page2",
            elements: [
                {
                    type: "panel",
                    name: "personalInfo",
                    elements: [{
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Registration Form (2/2) `
                            + `</h4>
                            <hr>`,

                    }, {
                        name: "isMultipleEthnicities",
                        title: "Do you identify with more than 1 ethnicity?",
                        type: "radiogroup",
                        choices: ["Yes", "No"],
                        isRequired: true,
                        defaultValue: "No"
                    }, {
                        type: "radiogroup",
                        name: "ethnicities",
                        title: "Which ethnicity do you identify with?",
                        choices: [
                            "Aboriginal Australians/Papuans",
                            "African/African-American/Black [African-American, Barbadian, Caribbean, Ethiopian, Ghanian, Haitian, Jamaican, Liberian, Nigerian, Somali, South African, Kenyan, Senegalese, Ivorian]",
                            "Alaskan Native",
                            "Native American [Navite American, Central of South Native American]",
                            "East Asian [Chinese, Japanese, Korean, Taiwanese]",
                            "Hispanic/Latin American/Spanish [Colombian, Cuban, Dominican, Ecuadorian, Honduran, Mexican or Mexican American, Puerto Rican, Salvadorian, Spanish]",
                            "Middle Eastern/North African [Afghan, Algerian, Egyptian, Iranian, Iraqi, Israeli, Lebanese, Moroccan, Syrian, Tunisian]",
                            "Native Hawaiian/Pacific Islander/Indigenous people of Oceania [Chamarro, Chuukese, Fijian, Marshallese, Native Hawaiian, Palauan, Samoan, Tahitian, Tongan]",
                            "South Asian [Asian Indian, Bangladeshi, Pakistani]",
                            "Southeast Asian [Cambodian, Filipino, Hmong, Malaysian, Thai, Singaporean, Vietnamese]",
                            "White - Northern European [Dutch, English, Northern French, German, Irish, Norwegian, Northern European (not listed)]",
                            "White - Southern European [Italian, Southern French, Spanish, Portuguese, Southern European (not listed)]",
                            "Prefer not to state",
                            "Other",
                        ],
                        visibleIf: '{isMultipleEthnicities} = "No"',
                        isRequired: true
                    }, {
                        type: "checkbox",
                        name: "ethnicities",
                        title: "Which ethnicities do you identify with?",
                        choices: [
                            "Aboriginal Australians/Papuans",
                            "African/African-American/Black [African-American, Barbadian, Caribbean, Ethiopian, Ghanian, Haitian, Jamaican, Liberian, Nigerian, Somali, South African, Kenyan, Senegalese, Ivorian]",
                            "Alaskan Native",
                            "Native American [Navite American, Central of South Native American]",
                            "East Asian [Chinese, Japanese, Korean, Taiwanese]",
                            "Hispanic/Latin American/Spanish [Colombian, Cuban, Dominican, Ecuadorian, Honduran, Mexican or Mexican American, Puerto Rican, Salvadorian, Spanish]",
                            "Middle Eastern/North African [Afghan, Algerian, Egyptian, Iranian, Iraqi, Israeli, Lebanese, Moroccan, Syrian, Tunisian]",
                            "Native Hawaiian/Pacific Islander/Indigenous people of Oceania [Chamarro, Chuukese, Fijian, Marshallese, Native Hawaiian, Palauan, Samoan, Tahitian, Tongan]",
                            "South Asian [Asian Indian, Bangladeshi, Pakistani]",
                            "Southeast Asian [Cambodian, Filipino, Hmong, Malaysian, Thai, Singaporean, Vietnamese]",
                            "White - Northern European [Dutch, English, Northern French, German, Irish, Norwegian, Northern European (not listed)]",
                            "White - Southern European [Italian, Southern French, Spanish, Portuguese, Southern European (not listed)]",
                            "Prefer not to state",
                            "Other"
                        ],
                        visibleIf: '{isMultipleEthnicities} = "Yes"',
                        isRequired: true
                    }, {
                        type: "html",
                        html: `<style>
                            td {
                                border: 1px solid black;
                                border-radius: 50%;
                                width: 4em;
                                height: 4em;
                                font-size: 5em
                              }</style>
                            <strong>Monk skin type</strong>
                            <p>The Monk Skin Tone Scale is the work of Harvard professor and sociologist Dr Ellis Monk. The 10-point scale helps machines better understand and, therefore, better represent more varied skin tones</p>`
                    }, {
                        "type": "imagepicker",
                        "name": "skintone",
                        title: 'Select your skin tone:',
                        isRequired: true,
                        "choices": [
                            {
                                value: 1,
                                imageLink: MST_1
                            },
                            {
                                value: 2,
                                imageLink: MST_2
                            },
                            {
                                value: 3,
                                imageLink: MST_3
                            },
                            {
                                value: 4,
                                imageLink: MST_4
                            },
                            {
                                value: 5,
                                imageLink: MST_5
                            },
                            {
                                value: 6,
                                imageLink: MST_6
                            },
                            {
                                value: 7,
                                imageLink: MST_7
                            },
                            {
                                value: 8,
                                imageLink: MST_8
                            },
                            {
                                value: 9,
                                imageLink: MST_9
                            },
                            {
                                value: 10,
                                imageLink: MST_10
                            }
                        ],
                        imageHeight: 75,
                        imageWidth: 75,
                        imageFit: "fill",
                    }, {
                        name: "weightLbs",
                        title: "Your weight (lbs):",
                        description: "In pounds",
                        type: "text",
                        inputType: "number",
                        min: 1,
                        isRequired: true,
                    }, {
                        name: "heightFt",
                        title: "Your height (feet):",
                        description: "between 1-8 feet",
                        type: "text",
                        inputType: "number",
                        min: 1,
                        max: 8,
                        isRequired: true,
                        startWithNewLine: false,
                    }, {
                        name: "heightIn",
                        title: "Your height (inches):",
                        description: "between 0-11 inches",
                        type: "text",
                        inputType: "number",
                        min: 0,
                        max: 11,
                        isRequired: true,
                        startWithNewLine: false,
                    }, {
                        name: "hairType",
                        title: "Hair type:",
                        type: "dropdown",
                        description: "Select one of the available options",
                        choices: [
                            'Curly',
                            'Coily',
                            'Straight',
                            'Wavy'
                        ],
                        isRequired: true,

                    }, {
                        name: "hairLength",
                        title: "Hair length:",
                        type: "dropdown",
                        description: "between Bald - Long",
                        choices: [
                            'Bald',
                            'Short',
                            'Medium',
                            'Long'
                        ],
                        isRequired: true,
                        startWithNewLine: false,
                    }, {
                        name: "hairColor",
                        title: "Hair color:",
                        type: "dropdown",
                        description: "Select one of the available options",
                        choices: [
                            'Black',
                            'Blonde',
                            'Brown',
                            'Grey',
                            'Red',
                            'White',
                            'Colorful'
                        ],
                        isRequired: true,

                    }, {
                        name: "facialHair",
                        title: "Facial hair:",
                        type: "dropdown",
                        description: "Select one of the available options",
                        choices: [
                            'Full beard',
                            'Stubble',
                            'Mustache',
                            'Goatee',
                            'None'
                        ],
                        isRequired: true,
                        startWithNewLine: false,

                    }, {
                        name: "tattoos",
                        title: "Tattoos:",
                        type: "checkbox",
                        description: "Select all of the available options",
                        choices: [
                            'Face, neck or head',
                            'Arms',
                            'Upper body or torso',
                            'Legs',
                        ],
                        isRequired: true,
                        showNoneItem: true,
                        noneText: "None",

                    }, {
                        name: "piercings",
                        title: "Piercings:",
                        type: "checkbox",
                        description: "Select all of the available options",
                        choices: [
                            'Face, neck or head',
                            'Arms',
                            'Upper body or torso',
                            'Legs',
                        ],
                        isRequired: true,
                        startWithNewLine: false,
                        showNoneItem: true,
                        noneText: "None",

                    }, {
                        name: "isPregnant",
                        title: "Are you pregnant?",
                        type: "radiogroup",
                        choices: ["Yes", "No"],
                        isRequired: true,
                    }, {
                        type: "checkbox",
                        name: "healthConditions",
                        title: "Have you experienced or do you have any of the following conditions? Select all that apply:",
                        choices: [
                            "Are experiencing altered or distorted thinking",
                            "Are experiencing or have recently experienced dizziness, lightheadedness, or vertigo",
                            "Are prone to motion sickness",
                            "Currently taking photosensitizing medications or have any known photosensitizing medical conditions",
                            "Diabetes",
                            "Diagnosis of photo-induced seizures or epilepsy",
                            "Have been advised by a healthcare provider not to wear a head-mounted display or AR/VR devices or have previously experienced negative effects when using such devices.",
                            "Hearing loss",
                            "Heart condition",
                            "High blood pressure",
                            "Known neurological disorder",
                            "Medical eye condition (other than prescriptive lenses or LASIK surgery)",
                            "Migraines/Headaches or earaches",
                            "Need assistance climbing a flight of stairs",
                            "Need assistance walking",
                            "Need assistance standing or have difficulty remaining standing for 10-20 minutes (for example, you feel unsteady on your feet)",
                            "Previously had a seizure, or have an epileptic condition",
                            "Sensitivity to enclosed spaces"
                        ],
                        showNoneItem: true,
                        noneText: "None of the above",
                        isRequired: true,
                    }, {
                        type: "checkbox",
                        name: "earConditions",
                        title: "Are you experiencing any of the following ear conditions? Select all that apply:",
                        choices: [
                            "Swimmer’s ear/Bony growths",
                            "Excessive Hair",
                            "Impacted Wax/Cerumen",
                            "Unremovable piercings",
                            "Fluids/Drainage",
                            "Possible infections",
                            "Visible blood"
                        ],
                        showNoneItem: true,
                        noneText: "None of the above",
                        isRequired: true,
                    }, {
                        name: "hasProsthetics",
                        title: "Do you have any prosthetics?",
                        type: "radiogroup",
                        choices: ["Yes", "No"],
                        isRequired: true,
                    }, {
                        name: "prostheticType",
                        title: "What type of prosthetic is it?",
                        type: "text",
                        isRequired: true,
                        placeholder: "(e. g. Limb, eye, joint, etc.)",
                        visibleIf: "{hasProsthetics} =  'Yes'"
                    }, {
                        type: "html",
                        html: `<span style="color:red">Please, kindly read and sign the Consent Form for Sensitive Category Data Processing below, if you wish to participate in this project (please scroll to view the entire document):</span>`
                    }, {
                        type: "html",
                        html: `<div style="width:100%;height:600px;overflow:auto;border:1px solid #555; padding-left:10px">`
                            + `<h2 style="text-align: center;"><strong>Consent Form for Sensitive Category Data Processing</strong></h2>
                            <br>
                            <p>The following types of data collected as part of the Project may be more sensitive in nature. We refer to these as "Special Data Category"</p>
                            <br>
                            <p><strong>Ethnic Origin</strong></p>
                            <br>
                            <p>This Consent may also apply to Special Category Data Previously collected in your profile. TIAI collects Special Category Data to help
                            determine whether you are eligible to participate in the Project. TIAI may also need to send that data to our Customer to help them verify
                             your eligibility. If you are selected for the Project, some of the above data may also be collected or transmitted as part
                             of the Project itself.</p>
                            <br>
                            <p>When we collect Special Category Data it is subject to the TELUS International Data Annotation Solutions Community Data 
                            Privacy Notice. If we transmit Sensitive Data Category Data to our Customer, or when our Customer collects it as part of the Project itself, our Customer's privacy notice
                            describes how they will use, share, or retain it, including whether they can disclose it to others. If we transmit Sensitive Category Data 
                            to our Customer, we will collect a double opt-in before we transmit Sensitive Category Data to our Customer. You will then be informed 
                            about the identity of Customer on a separate page, and asked again whether you consent to your Special Category Data being transmitted to them. 
                            You may choose on this page, or at that time, not to proceed. If you choose not to proceed we will interpret that as a decision that you 
                            do not want to consent to have your Special Category Data transmitted to the Customer. TIAI may be compensated as part of identifying participants in the Project.</p>
                            <br>
                            <p>Providing your consent is optional. You may withdraw your consent at any time by completing this form. You can retain a copy of this consent by printing it out from your computer or contacting 
                            us at <a href="mailto:aisourcing@telusinternational.ai" target="_blank">aisourcing@telusinternational.ai</a>.</p>
                            <br>
                            [ ] I consent to TIAI’s collection and use of the above Special Category Data for the purposes
                            described. <br />
                            [ ] I consent to TIAI transferring Special Category Data to Customer. My consent will not be
                            effective until after I am informed of the name of the Customer and click to proceed, and it will
                            expire (such that we will no longer transfer such data to the Customer) one year after it is given
                            (unless withdrawn earlier).
                        </div>`
                    }, {
                        name: "sdc_fname",
                        title: "First name:",
                        type: "text",
                        isRequired: true,
                        defaultValueExpression: "{firstName}",
                        visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'",
                        readOnly: true
                    },
                    {
                        name: "grd_sdc_fname",
                        title: "First name:",
                        type: "text",
                        isRequired: true,
                        defaultValueExpression: "{guardianFirstName}",
                        startWithNewLine: false,
                        visibleIf: "{registeredAs} = 'I am a parent or guardian registering a child under 18'",
                        readOnly: true
                    }, {
                        name: "sdc_lname",
                        title: "Last name:",
                        type: "text",
                        isRequired: true,
                        startWithNewLine: false,
                        defaultValueExpression: "{lastName}",
                        readOnly: true,
                        visibleIf: "{registeredAs} = 'I am registering as a participant over the age of 18'"
                    }, {
                        name: "grd_sdc_lname",
                        title: "Last name:",
                        type: "text",
                        isRequired: true,
                        startWithNewLine: false,
                        defaultValueExpression: "{guardianLastName}",
                        visibleIf: "{registeredAs} = 'I am a parent or guardian registering a child under 18'",
                        readOnly: true,
                    }, {
                        name: "csadate",
                        title: "Agreement Date",
                        type: "text",
                        inputType: "date",
                        defaultValueExpression: "today()",
                        minValueExpression: "today()",
                        isRequired: true,
                        startWithNewLine: false,
                        readOnly: true

                    }, {
                        type: "signaturepad",
                        name: "sdcSignature",
                        title: "Signature",
                        signatureWidth: 700,
                        signatureHeight: 400,
                        penColor: "black",
                        isRequired: true,
                    }

                    ]
                },
                {
                    type: "panel",
                    name: "termsAndConditions",
                    elements: [{
                        type: "html",
                        html: `<h4 style="text-align: center;">`
                            + `Terms and Contions `
                            + `</h4>
                            <hr>`,

                    }, {
                        type: "html",
                        html: `<div>
                        This project and all material relating to it are strictly confidential.
                        Please do not copy, share, distribute or publish any information, links or material relating to this project with anyone else.
                        By registering for this project, you agree to protect TELUS International's confidential information.
                        <br>
                        <br>
                        <b>Please confirm the four items below to successfully submit your registration.</b>
                        <div>
                        <div>
                        <ul>
                            <li>I confirm that I will NOT disclose, discuss, distribute or share with anyone any of the documentation, training materials or other project documents received from TELUS International, nor I will disclose information about TELUS International’s clients and their names.</li>
                            <li>I confirm that I provide TELUS International the rights to use the data that I will submit for technology and research purposes.</li>
                            <li>I confirm that I understand that I'm personally responsible for declaring the amount of the compensation received for the task according to the tax regulations of my country/region and that I’m legally entitled to perform work.</li>
                            <li>I confirm that all information supplied above is correct and accurate.</li>
                        </ul>
                        <br>
                        <div>If you have any questions or would like additional information about this Study before submitting a request to participate, please contact us at <a href="mailto:aisourcing@telusinternational.ai" target="_blank">aisourcing@telusinternational.ai</a>
                        </div>
                    </div>
                        </div>
                        </div>`
                    }
                    ]
                }
            ]
        }
    ],


};
