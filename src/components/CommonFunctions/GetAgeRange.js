
function GetAgeRange(participant) {

    const dateOfBirth = participant['dob'];
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    let ageRange = '';
    if (age < 13) {
        ageRange = "<13";
    } else if (age >= 13 && age <= 14) {
        ageRange = "13-14";
    } else if (age >= 15 && age <= 17) {
        ageRange = "15-17";
    } else if (age >= 18 && age <= 20) {
        ageRange = "18-20";
    } else if (age >= 21 && age <= 30) {
        ageRange = "21-30";
    } else if (age >= 31 && age <= 40) {
        ageRange = "31-40";
    } else if (age >= 41 && age <= 50) {
        ageRange = "41-50";
    } else if (age >= 51 && age <= 60) {
        ageRange = "51-60";
    } else if (age >= 61 && age <= 70) {
        ageRange = "61-70";
    } else if (age >= 71 && age <= 75) {
        ageRange = "71-75";
    } else {
        ageRange = "75+";
    }

    return { age: age, ageRange: ageRange };
}

export default GetAgeRange;