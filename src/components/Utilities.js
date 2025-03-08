function calculateAgeDetails(dateOfBirth, baseDate) {
    const dob = new Date(dateOfBirth + "-01-01");
    const diff = (baseDate ? (new Date(baseDate)).getTime() : Date.now()) - dob.getTime();
    const diffAge = new Date(diff);
    const year = diffAge.getUTCFullYear();
    const age = Math.abs(year - 1970);

    let ageRange = "";
    if (age < 18) {
        ageRange = "<18";
    }
    else if (age >= 18 && age <= 29) {
        ageRange = "18-29"
    } else if (age >= 30 && age <= 50) {
        ageRange = "30-50"
    } else if (age >= 51 && age <= 65) {
        ageRange = "51-65"
    } else if (age > 50) {
        ageRange = "65+"
    }

    return {
        ageRange: ageRange,
        age: age
    };
}