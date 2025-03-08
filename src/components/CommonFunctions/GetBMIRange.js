import BMICalculator from "./BMICalculator";


function GetBMIRange(participant) {
    let bmi = BMICalculator(participant['heightFt'], participant['heightIn'], participant['weightLbs']);

    let bmiRange = '';

    if (bmi < 18.5) {
        bmiRange = "<18.5";
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiRange = "18.5-24.9";
    } else if (bmi >= 25 && bmi < 30) {
        bmiRange = "25-29.9";
    } else if (bmi >= 30 && bmi < 35) {
        bmiRange = "30-34.9";
    } else if (bmi >= 35) {
        bmiRange = ">35";
    }

    return { bmi: bmi, bmiRange: bmiRange };
}

export default GetBMIRange;