const Constants = {
    tobeExcluded: [
        "signature",
        "signatureFirstName",
        "signatureLastName",
        "termsAgreement",
        "futureProjectsInterest",
        "identificationFile",
        "agreementConfirmation",
        "sdc_fname",
        "sdc_lname",
        "sdcSignature",
        "grd_sdc_fname",
        "grd_sdc_lname",
        "noAvailabilityReason",
        "registeredAs",
        "gender",
        "agreementConfirmation",
        "residenceState",
        "source",
        "industries",
        "csadate",
        "grd_signatureFirstName",
        "grd_signatureLastName",
        "ethnicities",
        "hairLength",
        "isMultipleEthnicities",
        "hairType",
        "facialHair",
        "hairColor",
        "otherCompanies",
        "earConditions",
        "healthConditions",
        "piercings",
        "tattoos",
        "referenceId",
        "icfEmail",
        "externalIcfAgreement",
        "externalIcfSignatureFirstName",
        "externalIcfSignatureLastName",
        "externalIcfDate",
        "faceHandsIcfAgreement",
        "faceHandsIcfsignatureFirstName",
        "faceHandsIcfsignatureLastName",
        "faceHandsIcfDate",
        "fullBodyIcfAgreement",
        "FullBodyIcfsignatureFirstName",
        "FullBodyIcfsignatureLastName",
        "FullBodyIcfDate",
        "externalIcfSignature",
        "faceHandsIcfsignature",
        "FullBodyIcfsignature"

    ],
    ethnicities: {
        0: "Aboriginal Australians/Papuans",
        1: "African/African-American/Black [African-American, Barbadian, Caribbean, Ethiopian, Ghanian, Haitian, Jamaican, Liberian, Nigerian, Somali, South African, Kenyan, Senegalese, Ivorian]",
        2: "Alaskan Native",
        3: "Native American [Navite American, Central of South Native American]",
        4: "East Asian [Chinese, Japanese, Korean, Taiwanese]",
        5: "Hispanic/Latin American/Spanish [Colombian, Cuban, Dominican, Ecuadorian, Honduran, Mexican or Mexican American, Puerto Rican, Salvadorian, Spanish]",
        6: "Middle Eastern/North African [Afghan, Algerian, Egyptian, Iranian, Iraqi, Israeli, Lebanese, Moroccan, Syrian, Tunisian]",
        7: "Native Hawaiian/Pacific Islander/Indigenous people of Oceania [Chamarro, Chuukese, Fijian, Marshallese, Native Hawaiian, Palauan, Samoan, Tahitian, Tongan]",
        8: "South Asian [Asian Indian, Bangladeshi, Pakistani]",
        9: "Southeast Asian [Cambodian, Filipino, Hmong, Malaysian, Thai, Singaporean, Vietnamese]",
        10: "White - Northern European [Dutch, English, Northern French, German, Irish, Norwegian, Northern European (not listed)]",
        11: "White - Southern European [Italian, Southern French, Spanish, Portuguese, Southern European (not listed)]",
        12: "Prefer not to state",
        13: "Other"
    },
    ethnicitiesDisplay: {
        0: "Aboriginal Australians/Papuans",
        1: "African/African-American/Black",
        2: "Alaskan Native",
        3: "Native American",
        4: "East Asian",
        5: "Hispanic/Latin American/Spanish",
        6: "Middle Eastern/North African",
        7: "Native Hawaiian/Pacific Islander/Indigenous people of Oceania",
        8: "South Asian",
        9: "Southeast Asian",
        10: "White - Northern European",
        11: "White - Southern European",
        12: "Prefer not to state",
        13: "Other"
    },
    ethnicityGroups: {
        "African/African-American/Black": [1],
        "Med / Mid East": [6, 11],
        "Latin / S. Amer": [5],
        "East Asian": [4],
        "South Asian": [8],
        "N. European": [10],
        "Other": [0, 2, 3, 7, 9, 12, 13],
        "Total": Array.from({ length: 14 }, (v, i) => i)
    },
    ethDbMap: {
        "Aboriginal Australians/Papuans": "Other",
        "African/African-American/Black [African-American, Barbadian, Caribbean, Ethiopian, Ghanian, Haitian, Jamaican, Liberian, Nigerian, Somali, South African, Kenyan, Senegalese, Ivorian]": "AfrAfrAmBlack",
        "Alaskan Native": "Other",
        "Native American [Navite American, Central of South Native American]": "Other",
        "East Asian [Chinese, Japanese, Korean, Taiwanese]": "EastAsian",
        "Hispanic/Latin American/Spanish [Colombian, Cuban, Dominican, Ecuadorian, Honduran, Mexican or Mexican American, Puerto Rican, Salvadorian, Spanish]": "LatinSAmer",
        "Middle Eastern/North African [Afghan, Algerian, Egyptian, Iranian, Iraqi, Israeli, Lebanese, Moroccan, Syrian, Tunisian]": "MedMidEast",
        "Native Hawaiian/Pacific Islander/Indigenous people of Oceania [Chamarro, Chuukese, Fijian, Marshallese, Native Hawaiian, Palauan, Samoan, Tahitian, Tongan]": "Other",
        "South Asian [Asian Indian, Bangladeshi, Pakistani]": "SouthAsian",
        "Southeast Asian [Cambodian, Filipino, Hmong, Malaysian, Thai, Singaporean, Vietnamese]": "Other",
        "White - Northern European [Dutch, English, Northern French, German, Irish, Norwegian, Northern European (not listed)]": "NEuropean",
        "White - Southern European [Italian, Southern French, Spanish, Portuguese, Southern European (not listed)]": "Other",
        "Prefer not to state": "Other",
        "Other": "Other"
    },
    ethDbMap2: {
        "African/African-American/Black": "AfrAfrAmBlack",
        "Med / Mid East": "MedMidEast",
        "Latin / S. Amer": "LatinSAmer",
        "East Asian": "EastAsian",
        "South Asian": "SouthAsian",
        "N. European": "NEuropean",
        "Other": "Other"
    },
    demoBinStatuses: [
        'Open',
        'Closed'
    ],
    demoBinStatusDictionary: {
        0: 'Open',
        1: 'Closed',
        2: 'Closed'
    },

    hairLength: {
        0: 'Bald',
        1: 'Short',
        2: 'Medium',
        3: 'Long'
    },
    hairType: {
        0: 'Curly',
        1: 'Coily',
        2: 'Straight',
        3: 'Wavy'
    },
    noAvailabilityReason: {
        0: 'I am generally not interested in going to an onsite study.',
        1: "I am hesitant to join a study when I don't know what it is about but I would like to have more information.",
        2: 'I am not interested in participating in this study.',
        3: 'I am worried about sharing personal information.',
        4: 'I do not have time at the moment.',
        5: 'I do not want to answer this question.',
        6: 'Something else - please provide more information in the feedback if you want.',
        7: 'The compensation is generally not enough for me.',
        8: 'The compensation is not enough for me to go to Los Angeles. I would go if the place would be nearer.',
        9: 'The place is too far for me.'
    },
    healthConditions: {
        0: "Are experiencing altered or distorted thinking",
        1: "Are experiencing or have recently experienced dizziness, lightheadedness, or vertigo",
        2: "Are prone to motion sickness",
        3: "Currently taking photosensitizing medications or have any known photosensitizing medical conditions",
        4: "Diabetes",
        5: "Diagnosis of photo-induced seizures or epilepsy",
        6: "Have been advised by a healthcare provider not to wear a head-mounted display or AR/VR devices or have previously experienced negative effects when using such devices.",
        7: "Hearing loss",
        8: "Heart condition",
        9: "High blood pressure",
        10: "Known neurological disorder",
        11: "Medical eye condition (other than prescriptive lenses or LASIK surgery)",
        12: "Migraines/Headaches or earaches",
        13: "Need assistance climbing a flight of stairs",
        14: "Need assistance walking",
        15: "Need assistance standing or have difficulty remaining standing for 10-20 minutes (for example, you feel unsteady on your feet)",
        16: "Previously had a seizure, or have an epileptic condition",
        17: "Sensitivity to enclosed spaces",
        18: "none"

    },
    rejectedHealthConditions: [
        0, 1, 2, 3, 5, 6, 10, 12, 13, 14, 15, 16
    ],
    rejectedCompanies: [
        0, 1, 2, 3, 5, 6, 7, 10, 11, 12, 15, 16,
    ],
    earConditions: {
        0: "Swimmer’s ear/Bony growths",
        1: "Excessive Hair",
        2: "Impacted Wax/Cerumen",
        3: "Unremovable piercings",
        4: "Fluids/Drainage",
        5: "Possible infections",
        6: "Visible blood",
        7: "none"
    },
    registeredAs: {
        0: 'I am registering as a participant over the age of 18',
        1: 'I am a parent or guardian registering a child under 18'
    },
    genders: {
        // Do no modify these in any case !!
        0: "Male",
        1: "Female",
        2: "Non-binary",
        3: "Prefer not to say"
    },
    facialHair: {
        0: 'Full beard',
        1: 'Stubble',
        2: 'Mustache',
        3: 'Goatee',
        4: 'None'
    },
    hairColor: {
        0: 'Black',
        1: 'Blonde',
        2: 'Brown',
        3: 'Grey',
        4: 'Red',
        5: 'White',
        6: 'Colorful'
    }, piercings: {
        0: 'Face, neck or head',
        1: 'Arms',
        2: 'Upper body or torso',
        3: 'Legs',
        4: 'none'
    }, tattoos: {
        0: 'Face, neck or head',
        1: 'Arms',
        2: 'Upper body or torso',
        3: 'Legs',
        4: 'none'
    },
    usStates: {
        // Do no modify these in any case !!
        0: '',
        1: 'Alabama',
        2: 'Alaska',
        3: 'Arizona',
        4: 'Arkansas',
        5: 'California',
        6: 'Colorado',
        7: 'Connecticut',
        8: 'Delaware',
        9: 'Florida',
        10: 'Georgia',
        11: 'Hawaii',
        12: 'Idaho',
        13: 'Illinois',
        14: 'Indiana',
        15: 'Iowa',
        16: 'Kansas',
        17: 'Kentucky',
        18: 'Louisiana',
        19: 'Maine',
        20: 'Maryland',
        21: 'Massachusetts',
        22: 'Michigan',
        23: 'Minnesota',
        24: 'Mississippi',
        25: 'Missouri',
        26: 'Montana',
        27: 'Nebraska',
        28: 'Nevada',
        29: 'New Hampshire',
        30: 'New Jersey',
        31: 'New Mexico',
        32: 'New York',
        33: 'North Carolina',
        34: 'North Dakota',
        35: 'Ohio',
        36: 'Oklahoma',
        37: 'Oregon',
        38: 'Pennsylvania',
        39: 'Rhode Island',
        40: 'South Carolina',
        41: 'South Dakota',
        42: 'Tennessee',
        43: 'Texas',
        44: 'Utah',
        45: 'Vermont',
        46: 'Virginia',
        47: 'Washington',
        48: 'Washington, D.C.',
        49: 'West Virginia',
        50: 'Wisconsin',
        51: 'Wyoming'
    },

    noAvailabilityReasons: {
        0: 'I am generally not interested in going to an onsite study.',
        1: "I am hesitant to join a study when I don't know what it is about but I would like to have more information.",
        2: 'I am not interested in participating in this study.',
        3: 'I am worried about sharing personal information.',
        4: 'I do not have time at the moment.',
        5: 'I do not want to answer this question.',
        6: 'Something else - please provide more information in the feedback if you want.',
        7: 'The compensation is generally not enough for me.',
        8: 'The compensation is not enough for me to go to Los Angeles. I would go if the place would be nearer.',
        9: 'The place is too far for me.'
    },

    otherCompanies: {
        0: 'Alphabet',
        1: 'Amazon',
        2: 'Appen',
        3: 'Apple',
        4: 'BOSE',
        5: 'Google',
        6: 'HTC',
        7: 'Huawei',
        8: 'IBM',
        9: 'LG',
        10: 'Magic Leap',
        11: 'Meta',
        12: 'Microsoft',
        13: 'Netflix',
        14: 'Nuance',
        15: 'Samsung',
        16: 'Sony',
        17: 'Yahoo',
        18: 'none'
    },
    industries: {
        0: 'Aerospace',
        1: 'Commercial Services',
        2: 'Health Care and Medicine',
        3: 'Public Services',
        4: 'Agriculture',
        5: 'Construction',
        6: 'Hospitality',
        7: 'Technology',
        8: 'Advertising',
        9: 'Education',
        10: 'Marketing and Media',
        11: 'Telecommunications',
        12: 'Fashion',
        13: 'Entertainment',
        14: 'Manufacturing',
        15: 'Tourism',
        16: 'Finance',
        17: 'Energy Sector',
        18: 'Mining',
        19: 'Transportation',
        20: 'Charity or NGO',
        21: 'Environmental Sciences',
        22: 'Pharmaceutics',
        23: 'I am currently not working',
    },

    sources: {
        0: 'Respondent',
        1: 'TELUS International Website',
        2: 'Facebook',
        3: 'LinkedIn',
        4: 'Flyer',
        5: 'Newspaper',
        6: 'I was referred by someone',
        7: 'Instagram',
        8: 'Indeed',
        9: 'FlexJobs',
        10: 'Work Market platform',
        11: 'Through my association',
        12: 'Twitter',
        13: 'Craiglist',
        14: 'Google Ad',
        15: "I'm a TELUS International employee",
        16: 'I was contacted by TELUS International directly',
        17: 'Snapchat',
        18: 'Reddit',
        19: 'Retirement Jobs',
        20: 'TikTok'
    },
    documentStatuses: {
        1: "",
        2: "Pass",
        3: "Pending",
        4: "Rejected"
    },
    logEventActions: {
        // Do no modify these in any case !!
        0: "Participant status",
        1: "Participant comment",
        2: "Email sent",
        3: "document status",
        4: "session status",
        5: "session comment",
        6: "lock session",
        7: "unlock session",
        8: "Book session",
        9: "Cancel session",
        10: "Update session",
        11: "Bonus addition",
        12: "Bonus removal",
        13: "Update parameter"
    },

    emailTypes: {
        // Do no modify these in any case !!
        0: "ICF Request",
        1: "ICF Reminder",
        2: "Schedule Request",
        3: "Confirmation"
    },

    participantStatuses: {
        // Do no modify these in any case !!
        0: "",
        1: "Contacted",
        2: "Scheduled",
        3: "Completed",
        4: "Not Selected",
        5: "Rejected",
        6: "Duplicate",
        7: "Withdrawn"
    },
    ageRanges: [
        "<13",
        "13-14",
        "15-17",
        "18-20",
        "21-30",
        "31-40",
        "41-50",
        "51-60",
        "61-70",
        "71-75",
        "75+"
    ],
    listOfAgeRanges: [
        "13-14",
        "15-17",
        "18-20",
        "21-30",
        "31-40",
        "41-50",
        "51-60",
        "61-70",
        "71-75",
    ],
    bmiRanges: [
        "<18.5",
        "18.5-24.9",
        "25-29.9",
        "30-34.9",
        ">35"
    ],
    skintones: [
        "1-2",
        "3-4",
        "5-6",
        "7-8",
        "9-10"
    ],

    icfNames: {
        "icfExternal": "HRTF Modeling Scan",
        "icfFaceHands": "Head, Face and Hands",
        "icfFullBody": "Full Body Light Stage"
    },

    sessionStatuses: {
        0: "Scheduled",
        1: "Checked In",
        2: "Completed",
        3: "Rescheduled",
        4: "NoShow",
        5: "Withdrawn",
        6: "Failed - Comp.",
        7: "Failed - No Comp."
    },

    bonuses: {
        b1: "Bonus",
        b2: "Bonus",
        b3: "Bonus",
    },

    bonusList: [
        "0",
        "25",
        "50",
        "75"
    ],
    makeup: {
        0: "",
        1: "Makeup",
        2: "No Makeup"
    },
    sessionNumbers: [
        1, 2
    ],

    getKeyByValue: function (obj, value) {
        return Object.keys(obj).find(key => obj[key] === value);
    }

}

export default Constants;